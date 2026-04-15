'use strict';

// Scenes are loaded via <script> tags in index.html before this file,
// so MenuScene, GameScene, and GameOverScene are already in global scope.

const config = {
  type: Phaser.AUTO,
  width: 800,
  height: 640,
  parent: 'game-container',
  backgroundColor: '#2a2a2a',
  // Scale to fit any screen (phone, tablet, desktop) while keeping aspect ratio
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false
    }
  },
  // First scene in the array is launched automatically
  scene: [MenuScene, GameScene, GameOverScene]
};

const game = new Phaser.Game(config);
