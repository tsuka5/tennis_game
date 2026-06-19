/**
 * Boot: generate simple textures procedurally, then start the game.
 * Keeping textures code-generated avoids asset loading for the prototype.
 */
import Phaser from 'phaser';
import { CONFIG } from '../config/gameConfig';

export class BootScene extends Phaser.Scene {
  constructor() {
    super('Boot');
  }

  create(): void {
    this.makeCircle('player', CONFIG.player.RADIUS, 0xffd23f, 0x7a5c00);
    this.makeCircle('ball', CONFIG.ball.RADIUS, 0xf6ff63, 0x9aa800);
    this.makeShadow('shadow', CONFIG.ball.RADIUS);
    this.scene.start('Game');
  }

  private makeCircle(key: string, r: number, fill: number, stroke: number): void {
    const g = this.add.graphics();
    g.fillStyle(fill, 1);
    g.lineStyle(3, stroke, 1);
    g.fillCircle(r + 3, r + 3, r);
    g.strokeCircle(r + 3, r + 3, r);
    g.generateTexture(key, (r + 3) * 2, (r + 3) * 2);
    g.destroy();
  }

  private makeShadow(key: string, r: number): void {
    const g = this.add.graphics();
    g.fillStyle(0x000000, 1);
    g.fillEllipse(r + 3, r + 3, r * 2, r * 1.3);
    g.generateTexture(key, (r + 3) * 2, (r + 3) * 2);
    g.destroy();
  }
}
