/**
 * 引っ張り式の入力: 移動は自動（Game 側）、打球は画面のどこでも
 * ドラッグ（引っ張り）。ボールは引っ張った方向の延長線上に飛び、
 * 強く（長く）引くほど速く・遠くへ（アウトもあり得る）。
 * ゆっくり長いドラッグ = ロブ。タップ = ふんわり返球/サーブ。
 * キーボード: スペース/Z = ショット、X = ロブ、A/D = コース。
 */
import type { ShotKind } from '../net/protocol';

/** これ未満の移動量(px)はタップ扱い */
const TAP_PX = 24;
/** これより遅いドラッグ(px/s)はロブ */
const LOB_SPEED = 330;

export interface SwipeShot {
  kind: ShotKind;
  /** 引っ張り方向（自分視点。右+） */
  dirX: number;
  /** 引っ張り方向（自分視点。前=ネット方向+） */
  dirY: number;
  /** 強さ 0..1 */
  power: number;
}

export class Controls {
  onShot: (shot: SwipeShot) => void = () => {};
  /** 引っ張り中のライブ状態（返球プレビューマーカー用） */
  live = { active: false, dirX: 0, dirY: 1, power: 0 };
  /** A/D・←→ キーによるコース（キーボード派のフォールバック） */
  keyAim = 0;

  private pointer: number | null = null;
  private start = { x: 0, y: 0, t: 0 };
  private readonly keys = new Set<string>();

  private readonly zone = document.getElementById('swipe-zone') as HTMLElement;

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) {
      if (e.code === 'Space') e.preventDefault();
      return;
    }
    this.keys.add(e.code);
    if (e.code === 'Space' || e.code === 'KeyZ') {
      e.preventDefault();
      this.onShot({ kind: 'drive', dirX: this.keyAim * 0.55, dirY: 1, power: 0.7 });
    } else if (e.code === 'KeyX' || e.code === 'ShiftLeft') {
      this.onShot({ kind: 'lob', dirX: this.keyAim * 0.55, dirY: 1, power: 0.7 });
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

  /** 引っ張りベクトル(px) → 方向と強さ。画面上方向 = 前（ネット方向） */
  private metrics(dx: number, dyDown: number): { dirX: number; dirY: number; power: number } {
    const len = Math.hypot(dx, dyDown);
    const power = Math.max(
      0.1,
      Math.min(1, len / (Math.min(window.innerWidth, window.innerHeight) * 0.45)),
    );
    return { dirX: dx, dirY: -dyDown, power };
  }

  private readonly onDown = (e: PointerEvent): void => {
    if (this.pointer !== null) return;
    this.pointer = e.pointerId;
    this.start = { x: e.clientX, y: e.clientY, t: performance.now() };
    this.live = { active: true, dirX: 0, dirY: 1, power: 0.1 };
    this.zone.setPointerCapture(e.pointerId);
  };

  private readonly onMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointer) return;
    const m = this.metrics(e.clientX - this.start.x, e.clientY - this.start.y);
    this.live = { active: true, ...m };
  };

  private readonly onUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.pointer) return;
    this.pointer = null;
    this.live = { active: false, dirX: 0, dirY: 1, power: 0 };
    const dx = e.clientX - this.start.x;
    const dy = e.clientY - this.start.y;
    const len = Math.hypot(dx, dy);
    const dur = Math.max(0.03, (performance.now() - this.start.t) / 1000);
    if (len < TAP_PX) {
      // タップ = ふんわり真ん中（サーブのトリガーにもなる）
      this.onShot({ kind: 'drive', dirX: 0, dirY: 1, power: 0.5 });
      return;
    }
    const m = this.metrics(dx, dy);
    const kind: ShotKind = len / dur < LOB_SPEED ? 'lob' : 'drive';
    this.onShot({ kind, ...m });
  };

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.zone.addEventListener('pointerdown', this.onDown);
    this.zone.addEventListener('pointermove', this.onMove);
    this.zone.addEventListener('pointerup', this.onUp);
    this.zone.addEventListener('pointercancel', this.onUp);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.zone.removeEventListener('pointerdown', this.onDown);
    this.zone.removeEventListener('pointermove', this.onMove);
    this.zone.removeEventListener('pointerup', this.onUp);
    this.zone.removeEventListener('pointercancel', this.onUp);
  }
}
