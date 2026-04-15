'use strict';

class DifficultyManager {
  constructor() {
    // Each tier activates when score >= minScore
    this.TIERS = [
      { minScore: 0,   enemyCount: 4, minSpeed: 150, maxSpeed: 250, scrollSpeed: 3 },
      { minScore: 100, enemyCount: 4, minSpeed: 175, maxSpeed: 300, scrollSpeed: 4 },
      { minScore: 250, enemyCount: 5, minSpeed: 200, maxSpeed: 350, scrollSpeed: 5 },
      { minScore: 500, enemyCount: 6, minSpeed: 225, maxSpeed: 420, scrollSpeed: 7 }
    ];
    this.currentTierIndex = 0;
  }

  reset() {
    this.currentTierIndex = 0;
  }

  getCurrentTier() {
    return this.TIERS[this.currentTierIndex];
  }

  // Call every frame with current score.
  // Returns the new tier config if a threshold was just crossed, otherwise null.
  update(score) {
    let newIndex = 0;
    for (let i = this.TIERS.length - 1; i >= 0; i--) {
      if (score >= this.TIERS[i].minScore) {
        newIndex = i;
        break;
      }
    }
    if (newIndex !== this.currentTierIndex) {
      this.currentTierIndex = newIndex;
      return this.TIERS[this.currentTierIndex];
    }
    return null;
  }

  getRandomSpeed() {
    const tier = this.getCurrentTier();
    return Phaser.Math.Between(tier.minSpeed, tier.maxSpeed);
  }
}
