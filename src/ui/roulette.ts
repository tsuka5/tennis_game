/**
 * 罰ゲーム/ご褒美ルーレットの演出。ホストが抽選した当選者に必ず止まる
 * （回転演出だけを各画面でローカルに行い、結果は全員同じ）。
 * セグメント幅 = ポイントから計算した確率（%）。
 */
import type { RouletteKind } from '../net/protocol';

const COLORS = ['#e8452c', '#27b7e8', '#ccff33', '#f2a33c', '#9d6bf2', '#3ce8a0', '#f25c9a', '#5c7cf2'];

export interface RouletteEntry {
  name: string;
  pct: number;
}

export class RouletteView {
  private readonly root = document.getElementById('roulette') as HTMLElement;
  private readonly canvas = document.getElementById('roulette-canvas') as HTMLCanvasElement;
  private readonly title = document.getElementById('roulette-title') as HTMLElement;
  private readonly resultEl = document.getElementById('roulette-result') as HTMLElement;
  private readonly closeBtn = document.getElementById('roulette-close') as HTMLElement;
  private raf = 0;

  constructor() {
    this.closeBtn.addEventListener('click', () => this.hide());
  }

  show(kind: RouletteKind, entries: RouletteEntry[], winner: number): void {
    cancelAnimationFrame(this.raf);
    this.root.hidden = false;
    this.resultEl.textContent = '';
    this.closeBtn.hidden = true;
    this.title.textContent = kind === 'penalty' ? '罰ゲームルーレット' : 'ご褒美ルーレット';
    this.title.className = kind;

    // 当選セグメントの中央（少しだけランダムにずらす）に矢印が来る回転角を求める
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
    const landing = winStart + winSpan * (0.25 + Math.random() * 0.5);
    // 矢印は上（-90°）。セグメント角 landing が上に来る最終回転角:
    const finalRot = -Math.PI / 2 - landing + Math.PI * 2 * 6; // 6周まわす

    const dur = 4600;
    const start = performance.now();
    const tick = (now: number): void => {
      const t = Math.min(1, (now - start) / dur);
      const ease = 1 - Math.pow(1 - t, 3.2);
      this.draw(entries, spans, finalRot * ease);
      if (t < 1) {
        this.raf = requestAnimationFrame(tick);
      } else {
        const name = entries[winner]?.name ?? '?';
        this.resultEl.textContent =
          kind === 'penalty' ? `💥 ${name} さんが罰ゲーム！` : `🎉 ${name} さんにご褒美！`;
        this.closeBtn.hidden = false;
      }
    };
    this.raf = requestAnimationFrame(tick);
  }

  private draw(entries: RouletteEntry[], spans: { from: number; span: number }[], rot: number): void {
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
    const r = size / 2 - 14;

    ctx.clearRect(0, 0, size, size);
    for (let i = 0; i < entries.length; i++) {
      const a0 = spans[i].from + rot;
      const a1 = a0 + spans[i].span;
      ctx.beginPath();
      ctx.moveTo(cx, cy);
      ctx.arc(cx, cy, r, a0, a1);
      ctx.closePath();
      ctx.fillStyle = COLORS[i % COLORS.length];
      ctx.fill();
      ctx.strokeStyle = '#0b1530';
      ctx.lineWidth = 3;
      ctx.stroke();

      // ラベル（名前 + %）
      const mid = (a0 + a1) / 2;
      const lr = r * 0.62;
      ctx.save();
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

    // 中心キャップと上部の矢印
    ctx.beginPath();
    ctx.arc(cx, cy, r * 0.12, 0, Math.PI * 2);
    ctx.fillStyle = '#eaf2ff';
    ctx.fill();
    ctx.beginPath();
    ctx.moveTo(cx - 12, 2);
    ctx.lineTo(cx + 12, 2);
    ctx.lineTo(cx, 30);
    ctx.closePath();
    ctx.fillStyle = '#ccff33';
    ctx.fill();
  }

  hide(): void {
    cancelAnimationFrame(this.raf);
    this.root.hidden = true;
  }
}
