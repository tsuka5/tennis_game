/**
 * ボール物理（重力・バウンド・ネット・空気抵抗）と弾道ソルバ。
 * three.js に依存しない純粋ロジック（ホスト/クライアント両方で使用）。
 */
import { BALL, COURT, G } from '../config';

export interface V3 {
  x: number;
  y: number;
  z: number;
}

export interface StepEvents {
  bounce: { x: number; z: number } | null;
  netHit: boolean;
  crossedNet: boolean;
}

export class BallSim {
  p: V3 = { x: 0, y: 1, z: 0 };
  v: V3 = { x: 0, y: 0, z: 0 };
  /** false のあいだは物理を進めない（サーブ待ちで保持中など） */
  active = false;

  set(from: V3, vel: V3): void {
    this.p = { ...from };
    this.v = { ...vel };
    this.active = true;
  }

  hold(x: number, y: number, z: number): void {
    this.p = { x, y, z };
    this.v = { x: 0, y: 0, z: 0 };
    this.active = false;
  }

  step(dt: number): StepEvents {
    const ev: StepEvents = { bounce: null, netHit: false, crossedNet: false };
    if (!this.active) return ev;

    const x0 = this.p.x;
    const y0 = this.p.y;
    const z0 = this.p.z;
    this.v.y -= G * dt;
    const drag = Math.max(0, 1 - BALL.DRAG * dt);
    this.v.x *= drag;
    this.v.z *= drag;

    this.p.x += this.v.x * dt;
    this.p.y += this.v.y * dt;
    this.p.z += this.v.z * dt;

    // ネット面 (z=0) の通過判定
    if (z0 !== 0 && Math.sign(z0) !== Math.sign(this.p.z) && this.p.z !== 0) {
      const f = z0 / (z0 - this.p.z); // 0..1 交差点までの割合
      const xAt = x0 + (this.p.x - x0) * f;
      const yAt = y0 + (this.p.y - y0) * f;
      if (yAt < COURT.NET_HEIGHT + BALL.R && Math.abs(xAt) < COURT.NET_POST_X) {
        // ネットに当たった: 入射側に落とす
        this.p.x = xAt;
        this.p.y = Math.max(yAt, 0.15);
        this.p.z = Math.sign(z0) * 0.07;
        this.v.z *= -0.12;
        this.v.x *= 0.3;
        this.v.y = Math.min(this.v.y, 0) * 0.3;
        ev.netHit = true;
      } else {
        ev.crossedNet = true;
      }
    }

    // 地面バウンド
    if (this.p.y <= BALL.R && this.v.y < 0) {
      this.p.y = BALL.R;
      ev.bounce = { x: this.p.x, z: this.p.z };
      this.v.y = -this.v.y * BALL.RESTITUTION;
      this.v.x *= BALL.FRICTION;
      this.v.z *= BALL.FRICTION;
      if (this.v.y < 0.8) this.v.y = 0; // 転がり状態
    }
    return ev;
  }
}

/** from から (tx, 0, tz) に t 秒で到達する初速を求める（放物線）。 */
export function solveShot(from: V3, tx: number, tz: number, t: number): V3 {
  return {
    x: (tx - from.x) / t,
    y: (BALL.R - from.y) / t + 0.5 * G * t,
    z: (tz - from.z) / t,
  };
}

/**
 * ネットを margin 以上の余裕で越えるまで滞空時間を伸ばしながら弾道を解く。
 * 必ず着地点 (tx, tz) は保たれる（時間だけが変わり山なりになる）。
 * ソルバは空気抵抗を無視した理想放物線なので、実飛行はやや低め・遅めになる。
 * その分をボール半径＋ドラッグ補正として必要クリアランスに上乗せする。
 */
export function shotWithClearance(from: V3, tx: number, tz: number, t0: number, margin: number): V3 {
  let t = t0;
  let v = solveShot(from, tx, tz, t);
  for (let i = 0; i < 8; i++) {
    if (Math.sign(from.z) === Math.sign(tz) || v.z === 0) return v;
    const tc = (0 - from.z) / v.z; // ネット面到達時刻（理想値）
    const yc = from.y + v.y * tc - 0.5 * G * tc * tc;
    // ドラッグで実軌道が沈む量の概算: 到達遅れ ≒ tc^2 * DRAG / 2 の間の落下
    const vyAtNet = v.y - G * tc;
    const droop = Math.abs(vyAtNet) * tc * tc * BALL.DRAG * 0.5;
    const need = COURT.NET_HEIGHT + BALL.R + droop + margin;
    if (yc >= need) return v;
    t += 0.08;
    v = solveShot(from, tx, tz, t);
  }
  return v;
}

/** 弾道プレビュー用: 最初の着地（またはネット/時間切れ）までの軌跡点列。 */
export function simulatePath(from: V3, vel: V3, step = 1 / 90, maxT = 3): V3[] {
  const sim = new BallSim();
  sim.set(from, vel);
  const pts: V3[] = [{ ...from }];
  for (let t = 0; t < maxT; t += step) {
    const ev = sim.step(step);
    pts.push({ ...sim.p });
    if (ev.bounce || ev.netHit) break;
  }
  return pts;
}

/** 初速 vel で打ったボールの最初の着地点（先にネットに当たったら null）。 */
export function simulateLanding(from: V3, vel: V3): { x: number; z: number } | null {
  const sim = new BallSim();
  sim.set(from, vel);
  const dt = 1 / 240;
  for (let t = 0; t < 4; t += dt) {
    const ev = sim.step(dt);
    if (ev.netHit) return null;
    if (ev.bounce) return ev.bounce;
  }
  return null;
}

/**
 * 着地点 (tx, tz) にドラッグ込みで「実際に」落ちる初速を求める。
 * ソルバはドラッグを無視して手前に落ちるため、シミュレーションで測った
 * 着地誤差ぶん照準をずらす反復で補正する（予測マーカーの位置保証用）。
 */
export function shotAtLanding(from: V3, tx: number, tz: number, t0: number, margin: number): V3 {
  let ax = tx;
  let az = tz;
  let v = shotWithClearance(from, ax, az, t0, margin);
  for (let i = 0; i < 3; i++) {
    const land = simulateLanding(from, v);
    if (!land) return v;
    ax += tx - land.x;
    az += tz - land.z;
    v = shotWithClearance(from, ax, az, t0, margin);
  }
  return v;
}
