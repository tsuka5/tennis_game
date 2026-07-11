/**
 * 入力の統合: キーボード (WASD/矢印 + スペース/X) とタッチ
 * （左半分バーチャルジョイスティック + 右下ボタン）。
 * state は「自分視点」の移動ベクトル（x: 右+, y: ネット方向+）。
 */
import type { ShotKind } from '../net/protocol';

const JOY_RADIUS = 60;
const JOY_DEADZONE = 8;

export class Controls {
  /** 自分視点の移動入力 (-1..1) */
  state = { x: 0, y: 0 };
  onSwing: (kind: ShotKind) => void = () => {};

  private keys = new Set<string>();
  private joyPointer: number | null = null;
  private joyOrigin = { x: 0, y: 0 };
  private joyVec = { x: 0, y: 0 };

  private readonly joyZone = document.getElementById('joy-zone') as HTMLElement;
  private readonly joyBase = document.getElementById('joy-base') as HTMLElement;
  private readonly joyKnob = document.getElementById('joy-knob') as HTMLElement;
  private readonly btnA = document.getElementById('btnA') as HTMLElement;
  private readonly btnB = document.getElementById('btnB') as HTMLElement;
  private readonly btnC = document.getElementById('btnC') as HTMLElement;

  private readonly onKeyDown = (e: KeyboardEvent): void => {
    if (e.repeat) {
      if (e.code === 'Space') e.preventDefault();
      return;
    }
    this.keys.add(e.code);
    if (e.code === 'Space' || e.code === 'KeyZ') {
      e.preventDefault();
      this.onSwing('drive');
    } else if (e.code === 'KeyX' || e.code === 'ShiftLeft') {
      this.onSwing('lob');
    } else if (e.code === 'KeyC') {
      this.onSwing('special');
    }
    this.updateKeyboard();
  };

  private readonly onKeyUp = (e: KeyboardEvent): void => {
    this.keys.delete(e.code);
    this.updateKeyboard();
  };

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
      this.setKnob(dx, dy);
      this.apply();
      return;
    }
    const clamped = Math.min(len, JOY_RADIUS);
    dx = (dx / len) * clamped;
    dy = (dy / len) * clamped;
    // 画面の上方向 = ネット方向(+y)
    this.joyVec = { x: dx / JOY_RADIUS, y: -dy / JOY_RADIUS };
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

  private readonly onBtnA = (e: PointerEvent): void => {
    e.preventDefault();
    this.onSwing('drive');
  };

  private readonly onBtnB = (e: PointerEvent): void => {
    e.preventDefault();
    this.onSwing('lob');
  };

  private readonly onBtnC = (e: PointerEvent): void => {
    e.preventDefault();
    this.onSwing('special');
  };

  constructor() {
    window.addEventListener('keydown', this.onKeyDown);
    window.addEventListener('keyup', this.onKeyUp);
    this.joyZone.addEventListener('pointerdown', this.onJoyDown);
    this.joyZone.addEventListener('pointermove', this.onJoyMove);
    this.joyZone.addEventListener('pointerup', this.onJoyUp);
    this.joyZone.addEventListener('pointercancel', this.onJoyUp);
    this.btnA.addEventListener('pointerdown', this.onBtnA);
    this.btnB.addEventListener('pointerdown', this.onBtnB);
    this.btnC.addEventListener('pointerdown', this.onBtnC);
  }

  private setKnob(dx: number, dy: number): void {
    const l = Math.hypot(dx, dy);
    const c = Math.min(l, JOY_RADIUS);
    const ux = l > 0 ? dx / l : 0;
    const uy = l > 0 ? dy / l : 0;
    this.joyKnob.style.transform = `translate(${ux * c}px, ${uy * c}px)`;
  }

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

  private keysVec = { x: 0, y: 0 };

  private apply(): void {
    // ジョイスティック優先、なければキーボード
    if (this.joyPointer !== null) this.state = { ...this.joyVec };
    else this.state = { ...this.keysVec };
  }

  dispose(): void {
    window.removeEventListener('keydown', this.onKeyDown);
    window.removeEventListener('keyup', this.onKeyUp);
    this.joyZone.removeEventListener('pointerdown', this.onJoyDown);
    this.joyZone.removeEventListener('pointermove', this.onJoyMove);
    this.joyZone.removeEventListener('pointerup', this.onJoyUp);
    this.joyZone.removeEventListener('pointercancel', this.onJoyUp);
    this.btnA.removeEventListener('pointerdown', this.onBtnA);
    this.btnB.removeEventListener('pointerdown', this.onBtnB);
    this.btnC.removeEventListener('pointerdown', this.onBtnC);
    this.joyBase.hidden = true;
  }
}
