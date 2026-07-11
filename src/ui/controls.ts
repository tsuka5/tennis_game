/**
 * 入力:
 * - 移動は手動。スマホ = 左半分のバーチャルスティック、PC = WASD/矢印
 * - 打球はフリック（スマホ = 右半分、PC = マウスドラッグ）。
 *   フリックの向きの延長線上へ飛び、速く長いほど強い。ゆっくり = ロブ
 * - フリック中は「これから飛ぶ軌道」が3Dで表示される（Game 側の live 参照）
 */
import type { ShotKind } from '../net/protocol';

const JOY_RADIUS = 60;
const JOY_DEADZONE = 8;
/** これ未満の移動量(px)はタップ扱い */
const TAP_PX = 24;
/** これより遅いフリック(px/s)はロブ */
const LOB_SPEED = 330;

export interface SwipeShot {
  kind: ShotKind;
  /** フリック方向（自分視点。右+） */
  dirX: number;
  /** フリック方向（自分視点。前=ネット方向+） */
  dirY: number;
  /** 強さ 0..1 */
  power: number;
}

export class Controls {
  /** 自分視点の移動入力 (-1..1) */
  state = { x: 0, y: 0 };
  onShot: (shot: SwipeShot) => void = () => {};
  /** フリック中のライブ状態（返球プレビューマーカー用） */
  live = { active: false, dirX: 0, dirY: 1, power: 0 };

  private readonly keys = new Set<string>();
  private keysVec = { x: 0, y: 0 };

  // バーチャルスティック
  private joyPointer: number | null = null;
  private joyOrigin = { x: 0, y: 0 };
  private joyVec = { x: 0, y: 0 };

  // フリック
  private flickPointer: number | null = null;
  private start = { x: 0, y: 0, t: 0 };

  private readonly joyZone = document.getElementById('joy-zone') as HTMLElement;
  private readonly joyBase = document.getElementById('joy-base') as HTMLElement;
  private readonly joyKnob = document.getElementById('joy-knob') as HTMLElement;
  private readonly flickZone = document.getElementById('swipe-zone') as HTMLElement;

  // ---------- キーボード ----------

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) {
      if (e.code === 'Space') e.preventDefault();
      return;
    }
    this.keys.add(e.code);
    if (e.code === 'Space' || e.code === 'KeyZ') {
      e.preventDefault();
      this.onShot({ kind: 'drive', dirX: this.state.x * 0.55, dirY: 1, power: 0.7 });
    } else if (e.code === 'KeyX' || e.code === 'ShiftLeft') {
      this.onShot({ kind: 'lob', dirX: this.state.x * 0.55, dirY: 1, power: 0.7 });
    }
    this.updateKeyboard();
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
    this.updateKeyboard();
  };

  private updateKeyboard(): void {
    const k = this.keys;
    let x = 0;
    let y = 0;
    if (k.has('KeyA') || k.has('ArrowLeft')) x -= 1;
    if (k.has('KeyD') || k.has('ArrowRight')) x += 1;
    if (k.has('KeyW') || k.has('ArrowUp')) y += 1;
    if (k.has('KeyS') || k.has('ArrowDown')) y -= 1;
    const len = Math.hypot(x, y);
    this.keysVec = len > 1 ? { x: x / len, y: y / len } : { x, y };
    this.apply();
  }

  private apply(): void {
    // スティック優先、なければキーボード
    if (this.joyPointer !== null) this.state = { ...this.joyVec };
    else this.state = { ...this.keysVec };
  }

  // ---------- バーチャルスティック（移動） ----------

  private readonly onJoyDown = (e: PointerEvent): void => {
    if (this.joyPointer !== null) return;
    this.joyPointer = e.pointerId;
    this.joyOrigin = { x: e.clientX, y: e.clientY };
    this.joyVec = { x: 0, y: 0 };
    this.joyBase.hidden = false;
    this.joyBase.style.left = `${e.clientX}px`;
    this.joyBase.style.top = `${e.clientY}px`;
    this.setKnob(0, 0);
    this.joyZone.setPointerCapture(e.pointerId);
  };

  private readonly onJoyMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.joyPointer) return;
    let dx = e.clientX - this.joyOrigin.x;
    let dy = e.clientY - this.joyOrigin.y;
    const len = Math.hypot(dx, dy);
    if (len < JOY_DEADZONE) {
      this.joyVec = { x: 0, y: 0 };
    } else {
      const clamped = Math.min(len, JOY_RADIUS);
      dx = (dx / len) * clamped;
      dy = (dy / len) * clamped;
      // 画面の上方向 = ネット方向(+y)
      this.joyVec = { x: dx / JOY_RADIUS, y: -dy / JOY_RADIUS };
    }
    this.setKnob(dx, dy);
    this.apply();
  };

  private readonly onJoyUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.joyPointer) return;
    this.joyPointer = null;
    this.joyVec = { x: 0, y: 0 };
    this.joyBase.hidden = true;
    this.apply();
  };

  private setKnob(dx: number, dy: number): void {
    const l = Math.hypot(dx, dy);
    const c = Math.min(l, JOY_RADIUS);
    const ux = l > 0 ? dx / l : 0;
    const uy = l > 0 ? dy / l : 0;
    this.joyKnob.style.transform = `translate(${ux * c}px, ${uy * c}px)`;
  }

  // ---------- フリック（打球） ----------

  /** フリックベクトル(px) → 方向と強さ。画面上方向 = 前（ネット方向） */
  private metrics(dx: number, dyDown: number): { dirX: number; dirY: number; power: number } {
    const len = Math.hypot(dx, dyDown);
    const power = Math.max(
      0.1,
      Math.min(1, len / (Math.min(window.innerWidth, window.innerHeight) * 0.34)),
    );
    return { dirX: dx, dirY: -dyDown, power };
  }

  private readonly onFlickDown = (e: PointerEvent): void => {
    if (this.flickPointer !== null) return;
    this.flickPointer = e.pointerId;
    this.start = { x: e.clientX, y: e.clientY, t: performance.now() };
    this.live = { active: true, dirX: 0, dirY: 1, power: 0.1 };
    this.flickZone.setPointerCapture(e.pointerId);
  };

  private readonly onFlickMove = (e: PointerEvent): void => {
    if (e.pointerId !== this.flickPointer) return;
    const m = this.metrics(e.clientX - this.start.x, e.clientY - this.start.y);
    this.live = { active: true, ...m };
  };

  private readonly onFlickUp = (e: PointerEvent): void => {
    if (e.pointerId !== this.flickPointer) return;
    this.flickPointer = null;
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
    this.joyZone.addEventListener('pointerdown', this.onJoyDown);
    this.joyZone.addEventListener('pointermove', this.onJoyMove);
    this.joyZone.addEventListener('pointerup', this.onJoyUp);
    this.joyZone.addEventListener('pointercancel', this.onJoyUp);
    this.flickZone.addEventListener('pointerdown', this.onFlickDown);
    this.flickZone.addEventListener('pointermove', this.onFlickMove);
    this.flickZone.addEventListener('pointerup', this.onFlickUp);
    this.flickZone.addEventListener('pointercancel', this.onFlickUp);
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.joyZone.removeEventListener('pointerdown', this.onJoyDown);
    this.joyZone.removeEventListener('pointermove', this.onJoyMove);
    this.joyZone.removeEventListener('pointerup', this.onJoyUp);
    this.joyZone.removeEventListener('pointercancel', this.onJoyUp);
    this.flickZone.removeEventListener('pointerdown', this.onFlickDown);
    this.flickZone.removeEventListener('pointermove', this.onFlickMove);
    this.flickZone.removeEventListener('pointerup', this.onFlickUp);
    this.flickZone.removeEventListener('pointercancel', this.onFlickUp);
    this.joyBase.hidden = true;
  }
}
