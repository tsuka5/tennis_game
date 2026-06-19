/**
 * Player paddle. Moves within its own (bottom) half via the virtual joystick.
 * See docs/specs/03-controls-ux.md 3.2 and 04-game-rules.md (Q-5 move bounds).
 */
import Phaser from 'phaser';
import { CONFIG } from '../config/gameConfig';

export class Player {
  sprite: Phaser.Physics.Arcade.Image;

  constructor(scene: Phaser.Scene, x: number, y: number) {
    this.sprite = scene.physics.add.image(x, y, 'player').setDepth(15);
    (this.sprite.body as Phaser.Physics.Arcade.Body).setCircle(CONFIG.player.RADIUS);
  }

  get x(): number {
    return this.sprite.x;
  }
  get y(): number {
    return this.sprite.y;
  }

  /**
   * Apply a movement vector (already in logical space, components in [-1, 1]).
   * Velocity is set via Arcade Physics; position is clamped to the move bounds.
   */
  move(vx: number, vy: number): void {
    const sp = CONFIG.player.PLAYER_MAX_SPEED;
    this.sprite.setVelocity(vx * sp, vy * sp);
  }

  /** Clamp position into the allowed rectangle. Call after the physics step. */
  clamp(): void {
    const b = CONFIG.player.moveBounds;
    const x = Phaser.Math.Clamp(this.sprite.x, b.minX, b.maxX);
    const y = Phaser.Math.Clamp(this.sprite.y, b.minY, b.maxY);
    if (x !== this.sprite.x || y !== this.sprite.y) {
      this.sprite.setPosition(x, y);
    }
  }
}
