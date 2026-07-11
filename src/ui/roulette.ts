/**
 * 罰ゲーム/ご褒美ルーレットの演出。ホストが抽選した当選者に必ず止まる
 * （回転演出だけを各画面でローカルに行い、結果は全員同じ）。
 * セグメント幅 = ポイントから計算した確率（%）。
 *
 * パチンコ風の演出:
 * - 高速回転 → 長い減速 → 境界ぎわでギリギリ止まる「じらし」
 * - 目盛りを跨ぐたびにカチカチ音 + 矢印が跳ねる
 * - 外周LEDのチェイス点滅（終盤は点滅が加速、当選後はストロボ）
 * - 終盤は矢印の下のセグメントだけスポットライト（他は暗転）
 * - 停止時の画面シェイク → タメ → 結果がドンと出て紙吹雪 + 効果音
 */
import { sfx } from '../core/audio';
import type { RouletteKind } from '../net/protocol';

const COLORS = ['#e8452c', '#27b7e8', '#ccff33', '#f2a33c', '#9d6bf2', '#3ce8a0', '#f25c9a', '#5c7cf2'];
const LED_COUNT = 28;
/** 回転の総時間 (ms)。長めにとって減速のじらしを効かせる */
const SPIN_MS = 6600;

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
  private readonly closeBtn = document.getElementById('roulette-close') as HTMLElement;
  private readonly flashEl = document.getElementById('roulette-flash') as HTMLElement;
  private raf = 0;
  private timers: number[] = [];

  constructor() {
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  show(kind: RouletteKind, entries: RouletteEntry[], winner: number): void {
    this.hide();
    this.root.hidden = false;
    this.resultEl.textContent = '';
    this.resultEl.classList.remove('pop');
    this.closeBtn.hidden = true;
    this.title.textContent = kind === 'penalty' ? '罰ゲームルーレット' : 'ご褒美ルーレット';
    this.title.className = kind;

    // セグメント角度
    const total = entries.reduce((a, e) => a + e.pct, 0) || 1;
    let acc = 0;
    let winStart = 0;
    let winSpan = 0;
    const spans: { from: number; span: number }[] = [];
    for (let i = 0; i < entries.length; i++) {
      const span = (entries[i].pct / total) * Math.PI * 2;
      spans.push({ from: acc, span });
      if (i === winner) {
        winStart = acc;
        winSpan = span;
      }
      acc += span;
    }
    // 境界ぎわに止めて「入った！/危なかった！」のギリギリ感を出す
    // （セグメントが狭いときは中央寄りに逃がす）
    const edge =
      winSpan > 0.4
        ? Math.random() < 0.5
          ? 0.1 + Math.random() * 0.16
          : 0.74 + Math.random() * 0.16
        : 0.3 + Math.random() * 0.4;
    const landing = winStart + winSpan * edge;
    const spins = 5 + Math.floor(Math.random() * 2);
    const finalRot = -Math.PI / 2 - landing + Math.PI * 2 * spins;

    const start = performance.now();
    let lastIdx = -1;
    let pointerKick = 0;
    let shake = 0;
    let stopped = false;
    const particles: Particle[] = [];

    // 矢印（真上 = -PI/2）の下にあるセグメント番号
    const segAt = (rot: number): number => {
      const twoPi = Math.PI * 2;
      let a = (-Math.PI / 2 - rot) % twoPi;
      if (a < 0) a += twoPi;
      for (let i = 0; i < spans.length; i++) {
        if (a >= spans[i].from && a < spans[i].from + spans[i].span) return i;
      }
      return spans.length - 1;
    };

    const tick = (now: number): void => {
      const u = Math.min(1, (now - start) / SPIN_MS);
      const ease = 1 - Math.pow(1 - u, 3.6); // 長い尻尾の減速カーブ
      const rot = finalRot * ease;

      const idx = segAt(rot);
      if (idx !== lastIdx) {
        if (lastIdx !== -1) {
          sfx.rlTick(u);
          pointerKick = 1;
        }
        lastIdx = idx;
      }
      pointerKick = Math.max(0, pointerKick - 0.09);
      shake = Math.max(0, shake - 0.035);

      if (u >= 1 && !stopped) {
        stopped = true;
        shake = 1;
        // タメてから結果発表
        this.timers.push(
          window.setTimeout(() => {
            const name = entries[winner]?.name ?? '?';
            this.resultEl.textContent =
              kind === 'penalty' ? `💥 ${name} さんが罰ゲーム！` : `🎉 ${name} さんにご褒美！`;
            this.resultEl.classList.add('pop');
            this.flashEl.className = `go ${kind}`;
            if (kind === 'penalty') sfx.rlThud();
            else sfx.rlFanfare();
            this.spawnConfetti(particles, kind);
            this.timers.push(window.setTimeout(() => (this.closeBtn.hidden = false), 900));
          }, 450),
        );
      }

      this.draw(entries, spans, rot, {
        time: now,
        u,
        spotlight: u > 0.82 && !stopped ? lastIdx : stopped ? winner : -1,
        pointerKick,
        shake,
        stopped,
        particles,
      });

      // 紙吹雪が消えるまで描き続ける
      if (!stopped || particles.length > 0 || now - start < SPIN_MS + 3000) {
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
    entries: RouletteEntry[],
    spans: { from: number; span: number }[],
    rot: number,
    fx: {
      time: number;
      u: number;
      /** 強調するセグメント（-1 = なし。他は暗転する） */
      spotlight: number;
      pointerKick: number;
      shake: number;
      stopped: boolean;
      particles: Particle[];
    },
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
    const r = size / 2 - 22;

    ctx.clearRect(0, 0, size, size);
    ctx.save();
    if (fx.shake > 0) {
      ctx.translate((Math.random() * 2 - 1) * 7 * fx.shake, (Math.random() * 2 - 1) * 7 * fx.shake);
    }

    // セグメント
    for (let i = 0; i < entries.length; i++) {
      const a0 = spans[i].from + rot;
      const a1 = a0 + spans[i].span;
      const dimmed = fx.spotlight !== -1 && i !== fx.spotlight;
      ctx.save();
      ctx.globalAlpha = dimmed ? 0.32 : 1;
      if (!dimmed && fx.spotlight === i) {
        ctx.shadowColor = '#ffffff';
        ctx.shadowBlur = 24;
      }
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.shadowBlur = 0;
      ctx.strokeStyle = '#0b1530';
      ctx.lineWidth = 3;
      ctx.stroke();

      // ラベル（名前 + %）
      const mid = (a0 + a1) / 2;
      const lr = r * 0.62;
      ctx.translate(cx + Math.cos(mid) * lr, cy + Math.sin(mid) * lr);
      ctx.rotate(mid + Math.PI / 2);
      ctx.fillStyle = '#0d1220';
      ctx.textAlign = 'center';
      ctx.font = `800 ${Math.max(13, size * 0.035)}px system-ui, sans-serif`;
      ctx.fillText(entries[i].name, 0, 0);
      ctx.font = `700 ${Math.max(11, size * 0.026)}px system-ui, sans-serif`;
      ctx.fillText(`${entries[i].pct.toFixed(1)}%`, 0, size * 0.035);
      ctx.restore();
    }

    // 外周 LED（回転中: チェイス → 終盤: 全点滅が加速 → 停止後: ストロボ）
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
      ctx.arc(cx + Math.cos(a) * (r + 11), cy + Math.sin(a) * (r + 11), 3.4, 0, Math.PI * 2);
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

    // 上部の矢印（目盛り通過で跳ねる）
    const kick = fx.pointerKick;
    ctx.save();
    ctx.translate(cx, 6);
    ctx.scale(1 + kick * 0.35, 1 + kick * 0.35);
    ctx.beginPath();
    ctx.moveTo(-12, 0);
    ctx.lineTo(12, 0);
    ctx.lineTo(0, 28);
    ctx.closePath();
    ctx.fillStyle = kick > 0.4 ? '#ffffff' : '#ccff33';
    ctx.fill();
    ctx.restore();

    // 紙吹雪
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

    ctx.restore();
  }

  hide(): void {
    cancelAnimationFrame(this.raf);
    for (const t of this.timers) window.clearTimeout(t);
    this.timers = [];
    this.resultEl.classList.remove('pop');
    this.flashEl.className = '';
    this.root.hidden = true;
  }
}
