import Phaser from 'phaser';
import { VIEW } from './config/gameConfig';
import { BootScene } from './scenes/BootScene';
import { GameScene } from './scenes/GameScene';

const config: Phaser.Types.Core.GameConfig = {
  type: Phaser.AUTO,
  parent: 'app',
  width: VIEW.WIDTH,
  height: VIEW.HEIGHT,
  backgroundColor: '#0b3d2e',
  scale: {
    // Fit the fixed 1280x720 landscape canvas into the device viewport.
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { x: 0, y: 0 },
      debug: false,
    },
  },
  input: {
    activePointers: 3, // two thumbs + spare
  },
  scene: [BootScene, GameScene],
};

new Phaser.Game(config);
