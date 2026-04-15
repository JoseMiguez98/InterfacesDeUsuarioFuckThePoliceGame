'use strict';

class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  preload() {
    // Road background
    this.load.image('road', 'img/background/1.png');

    // Player
    this.load.image('player', 'img/cars/resized/black_viper.png');

    // Enemy sprites
    this.load.spritesheet('police_sheet',
      'img/cars/resized/police_animation/police_sheet.png',
      { frameWidth: 112, frameHeight: 112 }
    );
    this.load.image('taxi',      'img/cars/resized/taxi.png');
    this.load.image('ambulance', 'img/cars/resized/ambulance.png');
    this.load.image('truck',     'img/cars/resized/truck.png');

    // Explosion (52 frames, each 276×276 px)
    this.load.spritesheet('explosion',
      'img/explosion/explosion.png',
      { frameWidth: 276, frameHeight: 276 }
    );
  }

  create() {
    // ── Road background (tileSprite scrolls each update) ──────────────────
    this.road = this.add.tileSprite(400, 320, 840, 640, 'road').setDepth(0);

    // ── Animations (guarded so they survive scene restarts) ───────────────
    if (!this.anims.exists('police_drive')) {
      this.anims.create({
        key: 'police_drive',
        frames: this.anims.generateFrameNumbers('police_sheet', { start: 0, end: 2 }),
        frameRate: 1.5,
        repeat: -1
      });
    }
    if (!this.anims.exists('explode')) {
      this.anims.create({
        key: 'explode',
        frames: this.anims.generateFrameNumbers('explosion', { start: 0, end: 51 }),
        frameRate: 26,
        repeat: 0
      });
    }

    // ── Managers ──────────────────────────────────────────────────────────
    this.scoreManager = new ScoreManager();
    this.difficultyManager = new DifficultyManager();

    // ── Player ────────────────────────────────────────────────────────────
    this.player = new Player(this, 400, 520);

    // ── Enemies ───────────────────────────────────────────────────────────
    const initialCount = this.difficultyManager.getCurrentTier().enemyCount;
    this.enemyGroup = new EnemyGroup(this, this.difficultyManager, initialCount);

    // ── Score ticker ──────────────────────────────────────────────────────
    this.scoreManager.start(this);

    // ── UI overlay ────────────────────────────────────────────────────────
    this.scoreText = this.add.text(12, 10, 'Score: 0', {
      fontSize: '26px',
      color: '#ffffff',
      fontFamily: 'Arial Black, Arial',
      stroke: '#000000',
      strokeThickness: 4
    }).setDepth(20);

    // "LEVEL UP!" flash text — starts invisible
    this.levelText = this.add.text(400, 300, '', {
      fontSize: '52px',
      color: '#ffff00',
      fontFamily: 'Arial Black, Arial',
      stroke: '#000000',
      strokeThickness: 6,
      align: 'center'
    }).setOrigin(0.5).setDepth(20).setAlpha(0);

    // Collision flag — set to false once game over begins
    this.collisionActive = true;
  }

  update() {
    // Once a collision is detected we stop processing gameplay
    if (!this.collisionActive) return;

    // Scroll road downward (toward player)
    const tier = this.difficultyManager.getCurrentTier();
    this.road.tilePositionY -= tier.scrollSpeed;

    // Player movement
    this.player.update();

    // Enemy movement & recycling
    this.enemyGroup.update();

    // Score display
    const score = this.scoreManager.getScore();
    this.scoreText.setText('Score: ' + score);

    // Difficulty tier check
    const newTier = this.difficultyManager.update(score);
    if (newTier) {
      this.enemyGroup.setCount(newTier.enemyCount);
      this.enemyGroup.applyNewTier(newTier);
      this._showLevelUp();
    }

    // Collision detection (manual AABB on physics bodies)
    this._checkCollisions();
  }

  _checkCollisions() {
    const pb = this.player.body;

    for (const enemy of this.enemyGroup.enemies) {
      if (!enemy.active || !enemy.body) continue;
      const eb = enemy.body;

      if (pb.x < eb.x + eb.width  &&
          pb.x + pb.width  > eb.x &&
          pb.y < eb.y + eb.height  &&
          pb.y + pb.height > eb.y) {
        this._triggerGameOver();
        return;
      }
    }
  }

  _triggerGameOver() {
    this.collisionActive = false;
    this.scoreManager.stop();

    const finalScore = this.scoreManager.getScore();
    const px = this.player.x;
    const py = this.player.y;

    this.player.setVisible(false);

    // Play explosion at the collision point, then hand off to GameOverScene
    const explosion = this.add.sprite(px, py, 'explosion').setDepth(15);
    explosion.setDisplaySize(220, 220);
    explosion.play('explode');
    explosion.once('animationcomplete', () => {
      this.scene.start('GameOverScene', { score: finalScore });
    });
  }

  _showLevelUp() {
    this.levelText.setText('LEVEL UP!');
    this.levelText.setAlpha(1);
    this.tweens.add({
      targets: this.levelText,
      alpha: 0,
      duration: 1400,
      ease: 'Power2'
    });
  }
}
