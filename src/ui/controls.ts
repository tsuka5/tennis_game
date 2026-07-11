/**
 * Tennis Clash 式の入力: 移動は自動（Game 側）、打球は画面のどこでも
 * スワイプ。スワイプの左右 = コース、長さ = 深さ・速さ、
 * ゆっくり長いドラッグ = ロブ、タップ/短いスワイプ = 弱いショット。
 * ⚡ボタン（タッチ）/ C キーで必殺。キーボードはスペース/Z/X も使える。
 */
import type { ShotKind } from '../net/protocol';

/** これ未満の移動量(px)はタップ扱い */
const TAP_PX = 24;
/** これより遅いスワイプ(px/s)はロブ */
const LOB_SPEED = 330;

export interface SwipeShot {
  kind: ShotKind;
  /** 自分視点の左右 -1..1 */
  aim: number;
  /** 深さ・速さ 0..1 */
  power: number;
}

export class Controls {
  onShot: (shot: SwipeShot) => void = () => {};
  /** スワイプ中のライブ状態（返球プレビューマーカー用） */
  live = { active: false, aim: 0, power: 0 };
  /** A/D・←→ キーによる狙い（キーボード派のフォールバック） */
  keyAim = 0;

  private pointer: number | null = null;
  private start = { x: 0, y: 0, t: 0 };
  private readonly keys = new Set<string>();

  private readonly zone = document.getElementById('swipe-zone') as HTMLElement;
  private readonly btnC = document.getElementById('btnC') as HTMLElement;

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) {
      if (e.code === 'Space') e.preventDefault();
      return;
    }
    this.keys.add(e.code);
    if (e.code === 'Space' || e.code === 'KeyZ') {
      e.preventDefault();
      this.onShot({ kind: 'drive', aim: this.keyAim, power: 0.7 });
    } else if (e.code === 'KeyX' || e.code === 'ShiftLeft') {
      this.onShot({ kind: 'lob', aim: this.keyAim, power: 0.7 });
    } else if (e.code === 'KeyC') {
      this.onShot({ kind: 'special', aim: this.keyAim, power: 1 });
    }
    this.updateKeyAim();
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
    this.updateKeyAim();
  };

  private updateKeyAim(): void {
    let x = 0;
    if (this.keys.has('KeyA') || this.keys.has('ArrowLeft')) x -= 1;
    if (this.keys.has('KeyD') || this.keys.has('ArrowRight')) x += 1;
    this.keyAim = x;
  }

  /** スワイプベクトル → 狙いと強さ */
  private metrics(dx: number, dy: number): { aim: number; power: number } {
    const aim = Math.max(-1, Math.min(1, dx / (window.innerWidth * 0.22)));
    const len = Math.hypot(dx, dy);
    const power = Math.max(
      0.15,
      Math.min(1, len / (Math.min(window.innerWidth, window.innerHeight) * 0.42)),
    );
    return { aim, power };
  }

  private readonly onDown = (e: PointerEvent): void => {
    if (this.pointer !== null) return;
    this.pointer = e.pointerId;
    this.start = { x: e.clientX, y: e.clientY, t: performance.now() };
    this.live = { active: true, aim: 0, power: 0.15 };
    this.zone.setPointerCapture(e.pointerId);
  };

  private readonly onMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointer) return;
    const m = this.metrics(e.clientX - this.start.x, e.clientY - this.start.y);
    this.live = { active: true, aim: m.aim, power: m.power };
  };

  private readonly onUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointer) return;
    this.pointer = null;
    this.live = { active: false, aim: 0, power: 0 };
    const dx = e.clientX - this.start.x;
    const dy = e.clientY - this.start.y;
    const len = Math.hypot(dx, dy);
    const dur = Math.max(0.03, (performance.now() - this.start.t) / 1000);
    if (len < TAP_PX) {
      // タップ = ふんわり真ん中（サーブのトリガーにもなる）
      this.onShot({ kind: 'drive', aim: 0, power: 0.5 });
      return;
    }
    const m = this.metrics(dx, dy);
    const kind: ShotKind = len / dur < LOB_SPEED ? 'lob' : 'drive';
    this.onShot({ kind, aim: m.aim, power: m.power });
  };

  private readonly onBtnC = (e: PointerEvent): void => {
    e.preventDefault();
    e.stopPropagation();
    this.onShot({ kind: 'special', aim: 0, power: 1 });
  };

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.zone.addEventListener('pointerdown', this.onDown);
    this.zone.addEventListener('pointermove', this.onMove);
    this.zone.addEventListener('pointerup', this.onUp);
    this.zone.addEventListener('pointercancel', this.onUp);
    this.btnC.addEventListener('pointerdown', this.onBtnC);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.zone.removeEventListener('pointerdown', this.onDown);
    this.zone.removeEventListener('pointermove', this.onMove);
    this.zone.removeEventListener('pointerup', this.onUp);
    this.zone.removeEventListener('pointercancel', this.onUp);
    this.btnC.removeEventListener('pointerdown', this.onBtnC);
  }
}
