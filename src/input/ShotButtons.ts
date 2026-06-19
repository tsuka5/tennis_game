/**
 * Shot buttons (right half of the screen): A = shot/smash, B = lob.
 * See docs/specs/03-controls-ux.md 3.3.
 *
 * Large transparent circular targets, sized to avoid mis-taps. Pressing a
 * button fires onShot(type) which the scene resolves into a hit attempt.
 */
import Phaser from 'phaser';
import { VIEW } from '../config/gameConfig';

export type ShotKind = 'A' | 'B';

interface Btn {
  kind: ShotKind;
  x: number;
  y: number;
  r: number;
  color: number;
  label: string;
}

export class ShotButtons {
  private scene: Phaser.Scene;
  private gfx: Phaser.GameObjects.Graphics;
  private buttons: Btn[];
  private pressed = new Map<ShotKind, boolean>();
  onShot: (kind: ShotKind) => void = () => {};

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
    const cx = VIEW.WIDTH - 220;
    this.buttons = [
      { kind: 'A', x: cx + 70, y: VIEW.HEIGHT - 180, r: 78, color: 0x39d98a, label: 'A\nスマッシュ' },
      { kind: 'B', x: cx - 90, y: VIEW.HEIGHT - 110, r: 60, color: 0x4aa3ff, label: 'B\nロブ' },
    ];

    this.gfx = scene.add.graphics().setDepth(100).setScrollFactor(0);
    this.drawLabels();
    this.draw();

    scene.input.on(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
    scene.input.on(Phaser.Input.Events.POINTER_UP, this.onUp, this);
  }

  private drawLabels(): void {
    for (const b of this.buttons) {
      this.scene.add
        .text(b.x, b.y, b.label, {
          fontSize: '20px',
          color: '#ffffff',
          align: 'center',
          fontStyle: 'bold',
        })
        .setOrigin(0.5)
        .setDepth(101)
        .setScrollFactor(0)
        .setAlpha(0.85);
    }
  }

  private onDown(p: Phaser.Input.Pointer): void {
    if (p.x < VIEW.WIDTH / 2) return; // right half only
    for (const b of this.buttons) {
      if (Math.hypot(p.x - b.x, p.y - b.y) <= b.r) {
        this.pressed.set(b.kind, true);
        this.onShot(b.kind);
        this.draw();
        break;
      }
    }
  }

  private onUp(): void {
    this.pressed.clear();
    this.draw();
  }

  private draw(): void {
    this.gfx.clear();
    for (const b of this.buttons) {
      const on = this.pressed.get(b.kind);
      this.gfx.fillStyle(b.color, on ? 0.45 : 0.22);
      this.gfx.fillCircle(b.x, b.y, b.r);
      this.gfx.lineStyle(3, b.color, 0.7);
      this.gfx.strokeCircle(b.x, b.y, b.r);
    }
  }

  /** Brief highlight pulse when a hit is available (spec 3.3.1 SHOULD). */
  setReady(ready: boolean): void {
    // Drawn as an extra ring on the A button; cheap visual hint.
    const a = this.buttons[0];
    this.draw();
    if (ready) {
      this.gfx.lineStyle(4, 0xffff66, 0.9);
      this.gfx.strokeCircle(a.x, a.y, a.r + 8);
    }
  }

  destroy(): void {
    this.scene.input.off(Phaser.Input.Events.POINTER_DOWN, this.onDown, this);
    this.scene.input.off(Phaser.Input.Events.POINTER_UP, this.onUp, this);
    this.gfx.destroy();
  }
}
