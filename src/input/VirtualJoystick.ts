/**
 * Dynamic virtual joystick (left half of the screen).
 * See docs/specs/03-controls-ux.md 3.2.
 *
 * Touching anywhere in the left half spawns the stick at that point; dragging
 * gives a 360° direction with magnitude. Releasing zeroes input and hides it.
 */
import Phaser from 'phaser';
import { CONFIG, VIEW } from '../config/gameConfig';

export class VirtualJoystick {
  private scene: Phaser.Scene;
  private gfx: Phaser.GameObjects.Graphics;
  private pointerId: number | null = null;
  private origin = { x: 0, y: 0 };
  private current = { x: 0, y: 0 };

  /** Normalized vector in [-1, 1] for each axis (local/screen space). */
  vec = { x: 0, y: 0 };
  active = false;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    this.gfx = scene.add.graphics().setDepth(100).setScrollFactor(0);

    scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
    scene.input.on(Phaser.Input.Events.POINTER_MOVE, this.onMove, this);
    scene.input.on(Phaser.Input.Events.POINTER_UP, this.onUp, this);
    scene.input.on(Phaser.Input.Events.GAME_OUT, this.reset, this);
  }

  private isLeftHalf(p: Phaser.Input.Pointer): boolean {
    return p.x < VIEW.WIDTH / 2;
  }

  private onDown(p: Phaser.Input.Pointer): void {
    if (this.pointerId !== null || !this.isLeftHalf(p)) return;
    this.pointerId = p.id;
    this.origin = { x: p.x, y: p.y };
    this.current = { x: p.x, y: p.y };
    this.active = true;
    this.recompute();
  }

  private onMove(p: Phaser.Input.Pointer): void {
    if (p.id !== this.pointerId) return;
    this.current = { x: p.x, y: p.y };
    this.recompute();
  }

  private onUp(p: Phaser.Input.Pointer): void {
    if (p.id !== this.pointerId) return;
    this.reset();
  }

  private reset(): void {
    this.pointerId = null;
    this.active = false;
    this.vec = { x: 0, y: 0 };
    this.gfx.clear();
  }

  private recompute(): void {
    const { JOY_DEADZONE_PX, JOY_MAX_RADIUS_PX } = CONFIG.joystick;
    let dx = this.current.x - this.origin.x;
    let dy = this.current.y - this.origin.y;
    const len = Math.hypot(dx, dy);

    if (len < JOY_DEADZONE_PX) {
      this.vec = { x: 0, y: 0 };
    } else {
      const clamped = Math.min(len, JOY_MAX_RADIUS_PX);
      this.vec = {
        x: (dx / len) * (clamped / JOY_MAX_RADIUS_PX),
        y: (dy / len) * (clamped / JOY_MAX_RADIUS_PX),
      };
    }
    this.draw(len);
  }

  private draw(len: number): void {
    const { JOY_MAX_RADIUS_PX } = CONFIG.joystick;
    this.gfx.clear();
    // base ring
    this.gfx.lineStyle(3, 0xffffff, 0.35);
    this.gfx.strokeCircle(this.origin.x, this.origin.y, JOY_MAX_RADIUS_PX);
    // stick
    const clamped = Math.min(len, JOY_MAX_RADIUS_PX) || 0;
    const ux = len > 0 ? (this.current.x - this.origin.x) / len : 0;
    const uy = len > 0 ? (this.current.y - this.origin.y) / len : 0;
    const sx = this.origin.x + ux * clamped;
    const sy = this.origin.y + uy * clamped;
    this.gfx.fillStyle(0xffffff, 0.55);
    this.gfx.fillCircle(sx, sy, 26);
  }

  destroy(): void {
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
    this.scene.input.off(Phaser.Input.Events.POINTER_MOVE, this.onMove, this);
    this.scene.input.off(Phaser.Input.Events.POINTER_UP, this.onUp, this);
    this.scene.input.off(Phaser.Input.Events.GAME_OUT, this.reset, this);
    this.gfx.destroy();
  }
}
