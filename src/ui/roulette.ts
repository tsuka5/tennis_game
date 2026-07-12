/**
 * 罰ゲーム/ご褒美ルーレットの演出。ホストが抽選した当選者に必ず止まる
 * （回転演出だけを各画面でローカルに行い、結果は全員同じ）。
 * セグメント幅 = ポイントから計算した確率（%）。
 *
 * カジノルーレット式:
 * - ホイールが回り、ボールが逆方向にリムを周回 → 減速して内側へ螺旋降下
 * - 決まる瞬間はスローモーション + ボールへズームイン。当選枠と隣の枠の
 *   境界でカタカタと弾んでから落ちる（どっちに入るかの緊張感）
 * - 着地後はオリパ風のレア度演出（確率が低いほど豪華: 青 → 金 → 虹）
 */
import { sfx } from '../core/audio';
import type { RouletteKind } from '../net/protocol';

const COLORS = ['#e8452c', '#27b7e8', '#ccff33', '#f2a33c', '#9d6bf2', '#3ce8a0', '#f25c9a', '#5c7cf2'];
const LED_COUNT = 28;
/** ホイールのポケット数（1〜N の番号つき。色の数 = メンバーの当選確率） */
const POCKETS = 24;

// タイムライン（ゲーム内秒。クライマックスはスローモーションで実時間が伸びる）
const T_SPIN = 2.6; // ボールがリムを高速周回
const T_DESC = 1.7; // 内側へ螺旋降下
const T_CLIMAX = 0.5; // 境界ぎわのカタカタ（この間だけ超スロー）
const T_TOTAL = T_SPIN + T_DESC + T_CLIMAX;
/** クライマックス開始時の時間倍率。終端に向けてさらに遅くなる */
const SLOWMO_IN = 0.18;
/** クライマックス終端の時間倍率（ボールが這うように転がる） */
const SLOWMO_OUT = 0.07;

export interface RouletteEntry {
  name: string;
  pct: number;
}

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  rot: number;
  vr: number;
  color: string;
  life: number;
}

export class RouletteView {
  private readonly root = document.getElementById('roulette') as HTMLElement;
  private readonly canvas = document.getElementById('roulette-canvas') as HTMLCanvasElement;
  private readonly title = document.getElementById('roulette-title') as HTMLElement;
  private readonly resultEl = document.getElementById('roulette-result') as HTMLElement;
  private readonly pctEl = document.getElementById('roulette-pct') as HTMLElement;
  private readonly closeBtn = document.getElementById('roulette-close') as HTMLElement;
  private readonly flashEl = document.getElementById('roulette-flash') as HTMLElement;
  private readonly auraEl = document.getElementById('rl-aura') as HTMLElement;
  private readonly raysEl = document.getElementById('rl-rays') as HTMLElement;
  private raf = 0;
  private timers: number[] = [];

  constructor() {
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  show(kind: RouletteKind, entries: RouletteEntry[], winner: number): void {
    this.hide();
    this.root.hidden = false;
    this.resultEl.textContent = '';
    this.resultEl.className = '';
    this.pctEl.textContent = '';
    this.auraEl.className = '';
    this.raysEl.className = '';
    this.closeBtn.hidden = true;
    this.title.textContent = kind === 'penalty' ? '罰ゲームルーレット' : 'ご褒美ルーレット';
    this.title.className = kind;

    // 本物のルーレット風: 等間隔の番号ポケット。各メンバーの色ポケット数が
    // 確率に比例し（最大剰余法・最低1個）、同じ色は飛び飛びに散らす
    const total = entries.reduce((a, e) => a + e.pct, 0) || 1;
    const exact = entries.map((e) => (e.pct / total) * POCKETS);
    const alloc = exact.map((x) => Math.max(1, Math.floor(x)));
    let rem = POCKETS - alloc.reduce((a, b) => a + b, 0);
    const byFrac = exact
      .map((x, i) => ({ i, frac: x - Math.floor(x) }))
      .sort((a, b) => b.frac - a.frac);
    for (let k = 0; rem > 0; k = (k + 1) % byFrac.length) {
      alloc[byFrac[k].i]++;
      rem--;
    }
    for (let k = byFrac.length - 1; rem < 0 && k >= 0; k--) {
      if (alloc[byFrac[k].i] > 1) {
        alloc[byFrac[k].i]--;
        rem++;
      }
      if (k === 0 && rem < 0) k = byFrac.length; // 足りなければもう一周
    }
    // 均等散布: 各スロットで「期待配置数 - 実配置数」が最大のメンバーを置く
    const pockets: number[] = [];
    const placed = entries.map(() => 0);
    for (let s = 0; s < POCKETS; s++) {
      let best = 0;
      let bestScore = -Infinity;
      for (let i = 0; i < entries.length; i++) {
        if (placed[i] >= alloc[i]) continue;
        const score = (alloc[i] * (s + 1)) / POCKETS - placed[i];
        if (score > bestScore) {
          bestScore = score;
          best = i;
        }
      }
      pockets.push(best);
      placed[best]++;
    }

    // 当選メンバーのポケットからランダムに1つ選び、境界ぎわに落とす
    const span = (Math.PI * 2) / POCKETS;
    const winSlots: number[] = [];
    pockets.forEach((m, s) => {
      if (m === winner) winSlots.push(s);
    });
    const slot = winSlots[Math.floor(Math.random() * winSlots.length)] ?? 0;
    const edge = Math.random() < 0.5 ? 0.14 + Math.random() * 0.14 : 0.72 + Math.random() * 0.14;
    const landing = slot * span + span * edge;
    // カタカタは近い側の境界（=隣の色）を跨ぐ
    const distToEdge = Math.min(span * edge, span * (1 - edge));
    const wobSign = edge < 0.5 ? -1 : 1;
    const wobAmp = Math.min(distToEdge * 2.6 + 0.03, span * 0.95);

    // 凡例（だれが何色か + 確率）
    const legend = document.getElementById('rl-legend') as HTMLElement;
    legend.innerHTML = '';
    entries.forEach((e, i) => {
      const chip = document.createElement('span');
      chip.className = 'lg-chip';
      const dot = document.createElement('i');
      dot.className = 'lg-dot';
      dot.style.background = COLORS[i % COLORS.length];
      const nm = document.createElement('span');
      nm.textContent = e.name;
      const pc = document.createElement('span');
      pc.className = 'lg-pct';
      pc.textContent = `${e.pct.toFixed(0)}%・${alloc[i]}枠`;
      chip.append(dot, nm, pc);
      legend.appendChild(chip);
    });

    const wheelSpins = 4;
    const finalRot = Math.PI * 2 * wheelSpins;
    // ホイールに対して逆方向の周回数。ホイール回転と相殺しても
    // 世界座標で十分速く逆走して見えるよう多めに回す
    const ballSpins = 9;
    const climaxStart = T_SPIN + T_DESC;

    let tau = 0; // ゲーム内時間
    let lastNow = performance.now();
    let zoom = 1;
    let zoomTarget = 1;
    let lastIdx = -1;
    let shake = 0;
    let stopped = false;
    let stopAt = 0;
    const particles: Particle[] = [];

    // ボールのホイール内角度からポケット番号
    const segAtLocal = (a0: number): number => {
      const twoPi = Math.PI * 2;
      let a = a0 % twoPi;
      if (a < 0) a += twoPi;
      return Math.min(POCKETS - 1, Math.floor(a / span));
    };

    const tick = (now: number): void => {
      const dtReal = Math.min(0.05, (now - lastNow) / 1000);
      lastNow = now;
      // スローモーション: クライマックスに入ると減速し、終端ほどさらに遅く
      const pPre = Math.min(1, Math.max(0, (tau - climaxStart) / T_CLIMAX));
      const scale =
        tau > climaxStart && tau < T_TOTAL ? SLOWMO_IN - (SLOWMO_IN - SLOWMO_OUT) * pPre : 1;
      tau = Math.min(T_TOTAL, tau + dtReal * scale);
      const u = tau / T_TOTAL;

      // ホイール回転（長い尻尾で減速）
      const rotW = finalRot * (1 - Math.pow(1 - u, 2.6));

      // ボール: ホイールに対する相対角。降下完了までに landing 付近へ収束
      const xl = Math.min(1, tau / climaxStart);
      let local = landing + Math.PI * 2 * ballSpins * Math.pow(1 - xl, 2.2);
      // 半径: リム → ポケットへ螺旋降下
      const desc = Math.min(1, Math.max(0, (tau - T_SPIN) / T_DESC));
      let rFrac = 1.06 - 0.27 * (1 - Math.pow(1 - desc, 2)); // 1.06 → 0.79
      let p = 0;
      if (tau > climaxStart) {
        // クライマックス: 境界を跨いで戻るダンピング振動 + 小さなホップ
        p = (tau - climaxStart) / T_CLIMAX;
        local = landing + wobSign * wobAmp * Math.exp(-2.8 * p) * Math.cos(p * Math.PI * 2.5);
        rFrac = 0.79 + 0.045 * Math.exp(-2.5 * p) * Math.abs(Math.sin(p * Math.PI * 2.5));
      }
      // ズーム: 降下の中盤から寄り始め、クライマックスで最大
      if (!stopped) {
        if (tau > climaxStart) {
          zoomTarget = 3.0;
        } else {
          const zp = Math.min(1, Math.max(0, (tau - (T_SPIN + T_DESC * 0.35)) / (T_DESC * 0.65)));
          zoomTarget = 1 + 1.4 * zp;
        }
      }
      zoom += (zoomTarget - zoom) * Math.min(1, dtReal * 4.5);

      // ボールがセグメント境界を跨ぐたびにカチッ（クライマックスのカタカタも同じ経路で鳴る）
      const idx = segAtLocal(local);
      if (idx !== lastIdx) {
        if (lastIdx !== -1 && !stopped) sfx.rlTick(tau > climaxStart ? 1 : u);
        lastIdx = idx;
      }
      shake = Math.max(0, shake - 0.035);

      if (tau >= T_TOTAL && !stopped) {
        stopped = true;
        stopAt = now;
        shake = 1;
        zoomTarget = 1.18; // 引きながら結果発表
        // オリパ風: 当選確率でレア度が決まる（低いほど豪華）
        const pct = entries[winner]?.pct ?? 100;
        const tier = pct < 10 ? 'tier-epic' : pct < 30 ? 'tier-rare' : 'tier-common';
        const epic = tier === 'tier-epic';
        this.auraEl.className = `${tier} on`;
        const beats = epic ? [60, 260, 430, 570, 690, 800] : [80, 330, 560];
        for (const bt of beats) this.timers.push(window.setTimeout(() => sfx.rlHeart(), bt));
        this.timers.push(
          window.setTimeout(
            () => {
              const name = entries[winner]?.name ?? '?';
              this.resultEl.textContent =
                kind === 'penalty' ? `💥 ${name} さんが罰ゲーム！` : `🎉 ${name} さんにご褒美！`;
              this.resultEl.className = epic ? `pop ${tier}` : 'pop';
              this.pctEl.textContent = epic
                ? `当選確率 ${pct.toFixed(1)}% — ✨奇跡の引き！！✨`
                : `当選確率 ${pct.toFixed(1)}%`;
              this.raysEl.className = `${tier} on`;
              this.flashEl.className = epic ? `go epic ${kind}` : `go ${kind}`;
              if (kind === 'penalty') sfx.rlThud();
              else sfx.rlFanfare();
              this.spawnConfetti(particles, kind);
              if (epic) {
                this.timers.push(window.setTimeout(() => sfx.rlFanfare(), 350));
                this.timers.push(window.setTimeout(() => this.spawnConfetti(particles, kind), 500));
                this.timers.push(window.setTimeout(() => this.spawnConfetti(particles, kind), 1000));
              }
              this.timers.push(window.setTimeout(() => (this.closeBtn.hidden = false), 900));
            },
            epic ? 950 : 600,
          ),
        );
      }

      this.draw(
        pockets,
        rotW,
        {
          time: now,
          u,
          spotlight: tau > climaxStart ? lastIdx : -1,
          stopped,
          shake,
          particles,
          ballLocal: local,
          ballR: rFrac,
        },
        zoom,
      );

      // 結果演出（紙吹雪の波・LEDストロボ）が終わるまで描き続ける
      if (!stopped || particles.length > 0 || now - stopAt < 4500) {
        this.raf = requestAnimationFrame(tick);
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  private spawnConfetti(particles: Particle[], kind: RouletteKind): void {
    const c = this.canvas;
    const w = c.width / Math.min(window.devicePixelRatio, 2);
    const palette =
      kind === 'penalty'
        ? ['#ff5050', '#ff9f43', '#f25c9a', '#ffffff']
        : ['#ccff33', '#ffd700', '#3ce8a0', '#ffffff', '#27b7e8'];
    for (let i = 0; i < 110; i++) {
      const ang = -Math.PI / 2 + (Math.random() * 2 - 1) * 1.15;
      const sp = 5 + Math.random() * 9;
      particles.push({
        x: w / 2,
        y: w / 2,
        vx: Math.cos(ang) * sp,
        vy: Math.sin(ang) * sp - 2,
        rot: Math.random() * Math.PI,
        vr: (Math.random() * 2 - 1) * 0.3,
        color: palette[Math.floor(Math.random() * palette.length)],
        life: 1.4 + Math.random() * 0.8,
      });
    }
  }

  private draw(
    pockets: number[],
    rot: number,
    fx: {
      time: number;
      u: number;
      spotlight: number;
      stopped: boolean;
      shake: number;
      particles: Particle[];
      /** ボールのホイール内角度 */
      ballLocal: number;
      /** ボール半径（ホイール半径比） */
      ballR: number;
    },
    zoom: number,
  ): void {
    const c = this.canvas;
    const dpr = Math.min(window.devicePixelRatio, 2);
    const size = Math.min(window.innerWidth, window.innerHeight) * 0.62;
    c.width = size * dpr;
    c.height = size * dpr;
    c.style.width = `${size}px`;
    c.style.height = `${size}px`;
    const ctx = c.getContext('2d') as CanvasRenderingContext2D;
    ctx.scale(dpr, dpr);
    const cx = size / 2;
    const cy = size / 2;
    const r = size / 2 - 26;

    // ボールのキャンバス座標
    const ballA = rot + fx.ballLocal;
    const bx = cx + Math.cos(ballA) * r * fx.ballR;
    const by = cy + Math.sin(ballA) * r * fx.ballR;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    if (fx.shake > 0) {
      ctx.translate((Math.random() * 2 - 1) * 7 * fx.shake, (Math.random() * 2 - 1) * 7 * fx.shake);
    }
    // ズームカメラ（ボール中心）
    if (zoom > 1.01) {
      ctx.translate(cx, cy);
      ctx.scale(zoom, zoom);
      ctx.translate(-bx, -by);
    }

    // 外周ボウル（ボールが走るリム）
    ctx.beginPath();
    ctx.arc(cx, cy, r * 1.12, 0, Math.PI * 2);
    ctx.fillStyle = '#101a36';
    ctx.fill();
    ctx.strokeStyle = '#2a3a66';
    ctx.lineWidth = 2;
    ctx.stroke();

    // 番号つきポケット（色 = メンバー。金色のフレットで仕切る）
    const span = (Math.PI * 2) / pockets.length;
    for (let s = 0; s < pockets.length; s++) {
      const a0 = s * span + rot;
      const a1 = a0 + span;
      const dimmed = fx.spotlight !== -1 && s !== fx.spotlight;
      ctx.save();
      ctx.globalAlpha = dimmed ? 0.34 : 1;
      if (!dimmed && fx.spotlight === s) {
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 22;
      }
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = COLORS[pockets[s] % COLORS.length];
      ctx.fill();
      ctx.shadowBlur = 0;
      // フレット（仕切り）
      ctx.strokeStyle = '#c8a23c';
      ctx.lineWidth = 2;
      ctx.stroke();

      // ポケット番号
      const mid = a0 + span / 2;
      const lr = r * 0.84;
      ctx.translate(cx + Math.cos(mid) * lr, cy + Math.sin(mid) * lr);
      ctx.rotate(mid + Math.PI / 2);
      ctx.fillStyle = '#0d1220';
      ctx.textAlign = 'center';
      ctx.font = `800 ${Math.max(11, size * 0.032)}px system-ui, sans-serif`;
      ctx.fillText(String(s + 1), 0, 0);
      ctx.restore();
    }

    // 内側の飾りリング
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.55, 0, Math.PI * 2);
    ctx.strokeStyle = '#c8a23c';
    ctx.lineWidth = 2.5;
    ctx.stroke();

    // 外周 LED（回転中: チェイス → 終盤: 点滅加速 → 停止後: ストロボ）
    for (let i = 0; i < LED_COUNT; i++) {
      const a = (i / LED_COUNT) * Math.PI * 2;
      let on: boolean;
      let color = '#ffd76a';
      if (fx.stopped) {
        on = Math.floor(fx.time / 75) % 2 === 0;
        color = '#ffd700';
      } else if (fx.u > 0.85) {
        on = Math.floor(fx.time / (150 - 90 * ((fx.u - 0.85) / 0.15))) % 2 === 0;
      } else {
        on = (i + Math.floor(fx.time / 70)) % 4 === 0;
      }
      ctx.beginPath();
      ctx.arc(cx + Math.cos(a) * (r * 1.12 + 5), cy + Math.sin(a) * (r * 1.12 + 5), 3.4, 0, Math.PI * 2);
      ctx.fillStyle = on ? color : '#3a3f55';
      if (on) {
        ctx.shadowColor = color;
        ctx.shadowBlur = 8;
      }
      ctx.fill();
      ctx.shadowBlur = 0;
    }

    // 中心キャップ
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = '#eaf2ff';
    ctx.fill();

    // ボール（白球 + ハイライト + 落ち影）
    const br = Math.max(5, size * 0.016);
    ctx.beginPath();
    ctx.ellipse(bx + br * 0.3, by + br * 0.5, br * 0.9, br * 0.5, 0, 0, Math.PI * 2);
    ctx.fillStyle = 'rgba(0,0,0,0.35)';
    ctx.fill();
    const grad = ctx.createRadialGradient(bx - br * 0.35, by - br * 0.35, br * 0.15, bx, by, br);
    grad.addColorStop(0, '#ffffff');
    grad.addColorStop(0.6, '#e8edf6');
    grad.addColorStop(1, '#9aa7bd');
    ctx.beginPath();
    ctx.arc(bx, by, br, 0, Math.PI * 2);
    ctx.fillStyle = grad;
    ctx.fill();

    ctx.restore();

    // 紙吹雪（ズームの外＝画面空間で描く）
    const dt = 1 / 60;
    for (let i = fx.particles.length - 1; i >= 0; i--) {
      const p = fx.particles[i];
      p.life -= dt;
      if (p.life <= 0) {
        fx.particles.splice(i, 1);
        continue;
      }
      p.vy += 0.16;
      p.x += p.vx;
      p.y += p.vy;
      p.rot += p.vr;
      ctx.save();
      ctx.translate(p.x, p.y);
      ctx.rotate(p.rot);
      ctx.globalAlpha = Math.min(1, p.life);
      ctx.fillStyle = p.color;
      ctx.fillRect(-4, -2.5, 8, 5);
      ctx.restore();
    }
  }

  hide(): void {
    cancelAnimationFrame(this.raf);
    for (const t of this.timers) window.clearTimeout(t);
    this.timers = [];
    this.resultEl.className = '';
    this.pctEl.textContent = '';
    this.auraEl.className = '';
    this.raysEl.className = '';
    this.flashEl.className = '';
    const legend = document.getElementById('rl-legend');
    if (legend) legend.innerHTML = '';
    this.root.hidden = true;
  }
}
