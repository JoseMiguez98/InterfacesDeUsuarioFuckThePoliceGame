'use strict';

// Enemy type definitions — speedMult scales the base difficulty speed
const ENEMY_TYPES = [
  { key: 'police_sheet', animated: true,  animKey: 'police_drive', speedMult: 1.0 },
  { key: 'taxi',         animated: false,                           speedMult: 1.3 },
  { key: 'ambulance',    animated: false,                           speedMult: 0.8 },
  { key: 'truck',        animated: false,                           speedMult: 0.7 }
];

class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    const type = ENEMY_TYPES[Phaser.Math.Between(0, ENEMY_TYPES.length - 1)];
    super(scene, x, y, type.key);

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.enemyType = type;
    this.setDepth(5);
    // Slightly tighter hitbox than the 110x110 sprite
    this.setSize(80, 90);

    if (type.animated) {
      this.play(type.animKey);
    }
  }

  // Reposition to top of screen with a new random type, lane and speed
  respawn(difficultyManager) {
    const type = ENEMY_TYPES[Phaser.Math.Between(0, ENEMY_TYPES.length - 1)];
    this.enemyType = type;
    this.setTexture(type.key);

    if (type.animated) {
      this.play(type.animKey);
    } else {
      this.anims.stop();
    }

    const x = Phaser.Math.Between(115, 655);
    const speed = Math.round(difficultyManager.getRandomSpeed() * type.speedMult);

    this.setPosition(x, -130);
    this.setVelocityY(speed);
    this.setActive(true);
    this.setVisible(true);
  }

  update(difficultyManager) {
    if (this.y > 760) {
      this.respawn(difficultyManager);
    }
  }
}
