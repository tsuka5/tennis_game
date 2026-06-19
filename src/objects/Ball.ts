/**
 * Ball with pseudo-height for a top-down 2D view.
 * See docs/specs/03-controls-ux.md 3.3.3 and 04-game-rules.md 4.6.
 *
 * Horizontal motion (x, y) is driven by an Arcade Physics body (an invisible
 * image). The vertical "height" (h, vHeight) is integrated manually and shown
 * via a shadow at ground level plus a visible ball sprite offset upward.
 */
import Phaser from 'phaser';
import { CONFIG } from '../config/gameConfig';

const HEIGHT_PX = 6; // screen pixels per height unit (visual only)

export class Ball {
  /** Arcade body that owns horizontal motion (kept invisible). */
  body: Phaser.Physics.Arcade.Image;
  private vis: Phaser.GameObjects.Image;
  private shadow: Phaser.GameObjects.Image;

  height = 0;
  vHeight = 0;
  shot: 'normal' | 'smash' | 'lob' = 'normal';

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.shadow = scene.add.image(x, y, 'shadow').setDepth(5);
    this.body = scene.physics.add.image(x, y, 'ball').setVisible(false);
    this.arcade.setCircle(CONFIG.ball.RADIUS);
    this.vis = scene.add.image(x, y, 'ball').setDepth(20);
  }

  private get arcade(): Phaser.Physics.Arcade.Body {
    return this.body.body as Phaser.Physics.Arcade.Body;
  }

  get x(): number {
    return this.body.x;
  }
  get y(): number {
    return this.body.y;
  }
  get vx(): number {
    return this.arcade.velocity.x;
  }
  get vy(): number {
    return this.arcade.velocity.y;
  }
  get speed(): number {
    return this.arcade.velocity.length();
  }

  setVelocity(vx: number, vy: number): void {
    this.body.setVelocity(vx, vy);
  }

  place(x: number, y: number, height: number): void {
    this.body.setPosition(x, y);
    this.body.setVelocity(0, 0);
    this.height = height;
    this.vHeight = 0;
  }

  /** Launch with horizontal velocity and an upward height impulse. */
  launch(vx: number, vy: number, vHeight: number, shot: Ball['shot']): void {
    this.body.setVelocity(vx, vy);
    this.vHeight = vHeight;
    if (this.height <= 0) this.height = 0.01;
    this.shot = shot;
  }

  /** Advance height by dt seconds. Returns true on a ground bounce. */
  update(dt: number): boolean {
    this.vHeight -= CONFIG.physics.GRAVITY_H * dt;
    this.height += this.vHeight * dt;

    let bounced = false;
    if (this.height <= 0) {
      this.height = 0;
      if (this.vHeight < 0) {
        bounced = true;
        this.vHeight = -this.vHeight * CONFIG.physics.BOUNCE_DAMP;
        if (this.vHeight < 1.2) this.vHeight = 0; // settle
      }
    }
    this.render();
    return bounced;
  }

  private render(): void {
    const lift = this.height * HEIGHT_PX;
    this.vis.setPosition(this.x, this.y - lift);
    this.vis.setScale(1 + this.height * 0.03);

    this.shadow.setPosition(this.x, this.y);
    this.shadow.setScale(Phaser.Math.Clamp(1 - this.height * 0.04, 0.45, 1));
    this.shadow.setAlpha(Phaser.Math.Clamp(0.4 - this.height * 0.01, 0.12, 0.4));
  }
}
