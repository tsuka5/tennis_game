/**
 * Heads-up display. In Phase 1 (wall rally) we show the current/best rally
 * count and a transient status line. Score UI proper arrives in Phase 4.
 * See docs/specs/04-game-rules.md 4.5.
 */
import Phaser from 'phaser';
import { VIEW } from '../config/gameConfig';

export class Hud {
  private rallyText: Phaser.GameObjects.Text;
  private status: Phaser.GameObjects.Text;

  constructor(scene: Phaser.Scene) {
    this.rallyText = scene.add
      .text(24, 18, '', { fontSize: '26px', color: '#eafff5', fontStyle: 'bold' })
      .setDepth(200)
      .setScrollFactor(0);

    this.status = scene.add
      .text(VIEW.WIDTH / 2, 90, '', {
        fontSize: '40px',
        color: '#ffe066',
        fontStyle: 'bold',
        align: 'center',
      })
      .setOrigin(0.5)
      .setDepth(200)
      .setScrollFactor(0);
  }

  setRally(current: number, best: number): void {
    this.rallyText.setText(`ラリー: ${current}   最高: ${best}`);
  }

  flash(scene: Phaser.Scene, msg: string): void {
    this.status.setText(msg);
    this.status.setAlpha(1);
    scene.tweens.add({
      targets: this.status,
      alpha: 0,
      duration: 800,
      delay: 400,
    });
  }
}
