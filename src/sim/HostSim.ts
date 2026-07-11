/**
 * ホスト権威シミュレーション: ボール物理、サーブ/ラリー/ポイントの進行、
 * スコア管理。プレイヤーの位置は入力側（自分/クライアント/AI）が更新し、
 * ここではルール判定にのみ使う。
 */
import { COURT, PLAY, SERVE } from '../config';
import type { FxCounters, Phase, Score, ShotKind } from '../net/protocol';
import { BallSim, shotAtLanding, shotWithClearance } from './physics';
import { addPoint, newScore } from './score';

export interface PlayerState {
  x: number;
  z: number;
  /**
   * スイングアニメーション。絶対値が残量 1→0、符号が振る側
   * （+ = 自分の右側/フォアハンド、- = 左側/バックハンド）。
   */
  swing: number;
}

export interface SwingCmd {
  kind: ShotKind;
  /** そのプレイヤー視点の左右狙い -1..1 */
  aim: number;
}

const clamp = (v: number, lo: number, hi: number): number => Math.min(hi, Math.max(lo, v));

/** プレイヤー i が守る側の z 符号 */
export const sideOf = (i: 0 | 1): 1 | -1 => (i === 0 ? 1 : -1);

/**
 * サーブを打てる立ち位置。ベースライン上（z 固定）かつ、デュース/アドサイドに
 * 応じた正しい半面側の x 範囲 [x0, x1] のみ。
 */
export function serveStand(server: 0 | 1, points: [number, number]): { z: number; x0: number; x1: number } {
  const s = sideOf(server);
  const deuce = (points[0] + points[1]) % 2 === 0;
  const sign = (deuce ? 1 : -1) * s;
  const a = sign * SERVE.STAND_X_MIN;
  const b = sign * SERVE.STAND_X_MAX;
  return { z: s * SERVE.STAND_Z, x0: Math.min(a, b), x1: Math.max(a, b) };
}

/** サーブ照準（予測着地点とパワー）。マーカー表示とスナップショット配信に使う。 */
export interface ServeAim {
  x: number;
  z: number;
  /** 0=最弱（浅い・遅い） 1=最強（深い・速い） */
  power: number;
}

/** 1回の返球で貯まる必殺ゲージ量（4回の返球で満タン） */
export const SPECIAL_CHARGE = 0.25;

export interface ShotPlan {
  tx: number;
  tz: number;
  /** 滞空時間の初期値（小さいほど速い） */
  t: number;
  margin: number;
  smash: boolean;
  special: boolean;
}

/**
 * 返球の弾道プラン（決定論部分）。doHit の実弾道と、打つ前の
 * 着地予測マーカー表示の両方で使い、表示と実際のズレをなくす。
 * oppX を渡すと、必殺で狙いが中立のとき相手から遠いコーナーを自動選択する。
 */
export function planShot(
  b: { x: number; y: number; z: number },
  pl: { x: number; z: number },
  s: 1 | -1,
  cmd: SwingCmd,
  oppX = 0,
): ShotPlan {
  // 押したタイミング: ボールを体の前（ネット寄り）で捉えるほど 1、
  // 引きつけて（遅らせて）打つほど 0。返球の深さと速さが変わる。
  const frontDist = (pl.z - b.z) * s;
  const front = clamp((frontDist + PLAY.REACH) / (2 * PLAY.REACH), 0, 1);

  const special = cmd.kind === 'special';
  const smash = cmd.kind === 'drive' && b.y > PLAY.SMASH_MIN_Y;
  let t: number;
  let depth: number;
  let margin: number;
  if (special) {
    // 必殺: 超高速・低弾道・深いコース
    t = 0.46 - 0.06 * front;
    depth = 0.82;
    margin = 0.04;
  } else if (cmd.kind === 'lob') {
    t = 1.55;
    depth = 0.6 + 0.3 * front;
    margin = 1.7;
  } else if (smash) {
    t = 0.58 - 0.12 * front; // 早いタイミングで叩くほど鋭い
    depth = 0.5 + 0.4 * front;
    margin = 0.05;
  } else {
    t = 0.95 - 0.2 * front; // 前で捉えるほど速く
    depth = 0.45 + 0.5 * front; // 前で捉えるほど深く、引きつけるとドロップ気味
    margin = 0.28;
  }

  let aim = cmd.aim;
  if (special && Math.abs(aim) < 0.15) {
    // 狙いが中立なら相手から遠いサイドへ（本人視点の左右に変換）
    aim = -Math.sign(oppX || 1) * s * 0.95;
  }
  const tx = clamp(aim * s * (COURT.HALF_SW - 0.6), -(COURT.HALF_SW - 0.35), COURT.HALF_SW - 0.35);
  const tz = -s * clamp(COURT.HALF_L * depth, 2.2, COURT.HALF_L - 0.4);
  return { tx, tz, t, margin, smash, special };
}

export class HostSim {
  ball = new BallSim();
  score: Score;
  phase: Phase = 'between';
  players: [PlayerState, PlayerState] = [
    { x: 0, z: COURT.HALF_L + 1, swing: 0 },
    { x: 0, z: -(COURT.HALF_L + 1), swing: 0 },
  ];
  fx: FxCounters = { hit: 0, smash: 0, bounce: 0, net: 0, point: 0, fault: 0 };
  msgSeq = 0;
  msgText = '';
  resetSeq = 0;

  /** await-serve 中のサーブ照準（それ以外は null） */
  serveAim: ServeAim | null = null;
  /** 必殺ゲージ 0..1（返球で貯まり、必殺で消費。試合をまたがない） */
  meters: [number, number] = [0, 0];

  private lastHitter: 0 | 1 = 0;
  private bouncesSinceHit = 0;
  private canSwingArr: [boolean, boolean] = [false, false];
  private serving = false;
  private serveNum: 1 | 2 = 1;
  private serveBoxXSign = 1;
  private serveT = 0;
  private timer = 1.2;

  private readonly gamesToWin: number;

  constructor(firstServer: 0 | 1, gamesToWin: number) {
    this.gamesToWin = gamesToWin;
    this.score = newScore(firstServer);
    this.say('スタート！');
  }

  restart(): void {
    this.score = newScore(Math.random() < 0.5 ? 0 : 1);
    this.serveNum = 1;
    this.meters = [0, 0];
    this.phase = 'between';
    this.timer = 1.2;
    this.say('スタート！');
  }

  private say(text: string): void {
    this.msgSeq++;
    this.msgText = text;
  }

  /** ポイント開始: サーブ位置にプレイヤーとボールを配置。 */
  private setupPoint(): void {
    const sv = this.score.server;
    const rc = (1 - sv) as 0 | 1;
    const s = sideOf(sv);
    const total = this.score.points[0] + this.score.points[1];
    const deuce = total % 2 === 0;
    // サーバーから見た「右」の世界 x 符号は s と一致する
    const sx = (deuce ? 1 : -1) * s * 1.3;
    this.players[sv].x = sx;
    this.players[sv].z = s * (COURT.HALF_L + 0.5);
    this.players[rc].x = -Math.sign(sx) * 1.8;
    this.players[rc].z = -s * (COURT.HALF_L + 0.7);
    this.players[sv].swing = 0;
    this.players[rc].swing = 0;
    this.ball.hold(sx, 1.35, s * (COURT.HALF_L + 0.3));
    this.serving = false;
    this.bouncesSinceHit = 0;
    this.canSwingArr = [false, false];
    this.phase = 'await-serve';
    this.serveT = 0;
    this.updateServeAim();
    this.resetSeq++;
    if (this.serveNum === 2) this.say('セカンドサーブ');
  }

  /**
   * サーブ照準の更新。サーバーをベースライン上（正しい半面）に拘束し、
   * 予測着地点を時間の関数でスイープさせる（横=方向、深さ=パワー）。
   */
  private updateServeAim(): void {
    const sv = this.score.server;
    const s = sideOf(sv);
    const stand = serveStand(sv, this.score.points);
    const pl = this.players[sv];
    pl.z = stand.z;
    pl.x = clamp(pl.x, stand.x0, stand.x1);
    this.serveBoxXSign = -Math.sign(stand.x0 + stand.x1) || 1;
    const u = 0.5 + 0.5 * Math.sin(this.serveT * SERVE.AIM_SPEED);
    const power = 0.5 + 0.5 * Math.sin(this.serveT * SERVE.POW_SPEED + 2.1);
    const tx = this.serveBoxXSign * (0.55 + u * (COURT.HALF_SW - 0.95));
    const tz = -s * (1.7 + power * (COURT.SERVICE_LINE - 2.3));
    this.serveAim = { x: tx, z: tz, power };
  }

  canHit(i: 0 | 1): boolean {
    if (this.phase !== 'rally' || !this.canSwingArr[i]) return false;
    const b = this.ball.p;
    const pl = this.players[i];
    // ボールが自陣側（ネット際は少し許容）にあること
    if (Math.sign(b.z) !== sideOf(i) && Math.abs(b.z) > 0.4) return false;
    if (b.y > PLAY.MAX_HIT_Y) return false;
    return Math.hypot(b.x - pl.x, b.z - pl.z) <= PLAY.REACH;
  }

  /** ボールがプレイヤーの右側にあれば +1、左側なら -1（本人視点） */
  swingDirFor(i: 0 | 1): 1 | -1 {
    const right = (this.ball.p.x - this.players[i].x) * sideOf(i);
    return right >= 0 ? 1 : -1;
  }

  /** スイング入力。当たれば true。 */
  trySwing(i: 0 | 1, cmd: SwingCmd): boolean {
    this.players[i].swing = this.swingDirFor(i);
    if (this.phase === 'await-serve' && i === this.score.server) {
      this.doServe();
      return true;
    }
    if (this.canHit(i)) {
      this.doHit(i, cmd);
      return true;
    }
    return false;
  }

  private doServe(): void {
    const sv = this.score.server;
    // 立ち位置の拘束と照準を打った瞬間の状態に更新（マーカーの位置に落ちる）
    this.updateServeAim();
    const pl = this.players[sv];
    const aim = this.serveAim as ServeAim;
    const from = { x: pl.x, y: 2.75, z: pl.z };
    // パワーが高いほど速く・ネットすれすれの弾道になる
    const t0 = SERVE.T_SLOW - (SERVE.T_SLOW - SERVE.T_FAST) * aim.power;
    const margin = 0.5 - 0.42 * aim.power;
    const v = shotAtLanding(from, aim.x, aim.z, t0, margin);
    this.ball.set(from, v);
    this.serveAim = null;
    this.serving = true;
    this.lastHitter = sv;
    this.bouncesSinceHit = 0;
    this.canSwingArr[sv] = false;
    this.canSwingArr[1 - sv] = true;
    this.phase = 'rally';
    this.fx.hit++;
  }

  private doHit(i: 0 | 1, cmd: SwingCmd): void {
    const s = sideOf(i);
    const b = this.ball.p;
    const from = { x: b.x, y: Math.max(b.y, 0.45), z: b.z };

    // 必殺はゲージ満タンのときだけ（足りなければ通常ショット扱い）
    let kind = cmd.kind;
    if (kind === 'special' && this.meters[i] < 1) kind = 'drive';
    const plan = planShot(b, this.players[i], s, { kind, aim: cmd.aim }, this.players[1 - i].x);

    if (plan.special) {
      this.meters[i] = 0;
      this.fx.smash++;
      this.say('⚡ 必殺ショット！');
    } else {
      this.meters[i] = Math.min(1, this.meters[i] + SPECIAL_CHARGE);
      if (plan.smash) {
        this.fx.smash++;
        this.say('スマッシュ！');
      }
    }

    // 着地予測マーカーを見て狙えるよう、ブレは控えめ（必殺はブレなし）
    const noise = plan.special ? 0 : 1;
    const tx = clamp(
      plan.tx + (Math.random() * 2 - 1) * 0.15 * noise,
      -(COURT.HALF_SW - 0.35),
      COURT.HALF_SW - 0.35,
    );
    const tz = -s * clamp(Math.abs(plan.tz) + (Math.random() * 2 - 1) * 0.2 * noise, 2.2, COURT.HALF_L - 0.4);
    const v = shotWithClearance(from, tx, tz, plan.t, plan.margin);
    this.ball.set(from, v);
    this.serving = false;
    this.lastHitter = i;
    this.bouncesSinceHit = 0;
    this.canSwingArr[i] = false;
    this.canSwingArr[1 - i] = true;
    this.fx.hit++;
  }

  update(dt: number): void {
    for (const p of this.players) {
      p.swing = Math.sign(p.swing) * Math.max(0, Math.abs(p.swing) - dt / PLAY.SWING_TIME);
    }

    if (this.phase === 'between') {
      this.timer -= dt;
      if (this.timer <= 0) {
        if (this.score.finished) this.phase = 'over';
        else this.setupPoint();
      }
      return;
    }

    if (this.phase === 'await-serve') {
      // 立ち位置拘束＋照準スイープ。トス位置はサーバーに追従
      this.serveT += dt;
      this.updateServeAim();
      this.ball.p.x = this.players[this.score.server].x;
      return;
    }

    if (this.phase !== 'rally') return;

    const ev = this.ball.step(dt);
    if (ev.netHit) {
      this.fx.net++;
      if (this.serving) {
        this.fault();
        return;
      }
    }
    if (ev.bounce) {
      this.fx.bounce++;
      this.onBounce(ev.bounce.x, ev.bounce.z);
      if (this.phase !== 'rally') return;
    }

    // 転がってしまった（=相手が返せなかった）
    if (
      this.ball.active &&
      this.ball.p.y <= 0.06 &&
      Math.abs(this.ball.v.y) < 0.4 &&
      this.bouncesSinceHit >= 1
    ) {
      this.pointTo(this.lastHitter, 'ナイスショット！');
      return;
    }

    // 安全弁: ワールド外
    if (Math.abs(this.ball.p.x) > 35 || Math.abs(this.ball.p.z) > 45) {
      this.pointTo((1 - this.lastHitter) as 0 | 1, 'アウト！');
    }
  }

  private onBounce(bx: number, bz: number): void {
    const sideIdx: 0 | 1 = bz >= 0 ? 0 : 1;
    this.bouncesSinceHit++;

    if (this.serving && this.bouncesSinceHit === 1) {
      if (this.inServiceBox(bx, bz)) {
        this.serving = false;
        return;
      }
      this.fault();
      return;
    }

    if (this.bouncesSinceHit === 1) {
      if (sideIdx === this.lastHitter) {
        // ネットを越えず自陣に落ちた
        this.pointTo((1 - this.lastHitter) as 0 | 1, 'ミス！');
        return;
      }
      if (!this.inSingles(bx, bz)) {
        this.pointTo((1 - this.lastHitter) as 0 | 1, 'アウト！');
        return;
      }
      return; // イン: ラリー続行
    }

    // ツーバウンド
    this.pointTo(this.lastHitter, 'ナイスショット！');
  }

  private inSingles(x: number, z: number): boolean {
    const m = COURT.LINE_MARGIN;
    return Math.abs(x) <= COURT.HALF_SW + m && Math.abs(z) <= COURT.HALF_L + m;
  }

  private inServiceBox(x: number, z: number): boolean {
    const m = COURT.LINE_MARGIN;
    const s = sideOf(this.score.server);
    if (Math.sign(z) !== -s) return false;
    if (Math.abs(z) > COURT.SERVICE_LINE + m) return false;
    if (Math.abs(x) > COURT.HALF_SW + m) return false;
    return Math.sign(x || this.serveBoxXSign) === this.serveBoxXSign;
  }

  private fault(): void {
    this.ball.active = false;
    this.fx.fault++;
    if (this.serveNum === 1) {
      this.serveNum = 2;
      this.say('フォルト！');
      this.phase = 'between';
      this.timer = 1.5;
    } else {
      this.serveNum = 1;
      const receiver = (1 - this.score.server) as 0 | 1;
      this.pointTo(receiver, 'ダブルフォルト');
    }
  }

  private pointTo(w: 0 | 1, reason: string): void {
    this.ball.active = false;
    this.serveNum = 1;
    const gamesBefore = this.score.games[0] + this.score.games[1];
    addPoint(this.score, w, this.gamesToWin);
    this.fx.point++;
    const gamesAfter = this.score.games[0] + this.score.games[1];
    // ポイントコールはスコアボード側で見せる。ここでは理由＋ゲーム獲得のみ。
    this.say(gamesAfter > gamesBefore ? `${reason}　ゲーム！` : reason);
    this.phase = 'between';
    this.timer = this.score.finished ? 1.2 : 2.2;
  }
}
