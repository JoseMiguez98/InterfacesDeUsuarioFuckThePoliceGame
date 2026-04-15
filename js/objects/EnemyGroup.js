'use strict';

class EnemyGroup {
  constructor(scene, difficultyManager, count) {
    this.scene = scene;
    this.difficultyManager = difficultyManager;
    this.enemies = [];

    for (let i = 0; i < count; i++) {
      this._spawnStaggered(i);
    }
  }

  _spawnStaggered(index) {
    const x = Phaser.Math.Between(115, 655);
    // Spread enemies vertically so they don't all arrive at once
    const y = -130 - index * 200;
    const enemy = new Enemy(this.scene, x, y);
    const speed = Math.round(
      this.difficultyManager.getRandomSpeed() * enemy.enemyType.speedMult
    );
    enemy.setVelocityY(speed);
    this.enemies.push(enemy);
    return enemy;
  }

  update() {
    for (const enemy of this.enemies) {
      enemy.update(this.difficultyManager);
    }
  }

  // Called when the difficulty tier increases — refresh all speeds
  applyNewTier(tier) {
    for (const enemy of this.enemies) {
      const speed = Math.round(
        Phaser.Math.Between(tier.minSpeed, tier.maxSpeed) * enemy.enemyType.speedMult
      );
      enemy.setVelocityY(speed);
    }
  }

  // Grow enemy count to match the new tier if it increased
  setCount(desiredCount) {
    while (this.enemies.length < desiredCount) {
      this._spawnStaggered(this.enemies.length);
    }
  }
}
