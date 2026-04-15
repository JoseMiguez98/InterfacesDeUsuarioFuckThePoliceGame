'use strict';

class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    const sm = new ScoreManager();
    const isNewBest = sm.isHighScore(this.finalScore);
    sm.saveHighScore(this.finalScore);
    const scores = sm.getHighScores();

    // Dark overlay
    this.add.rectangle(400, 320, 800, 640, 0x000000, 0.72).setDepth(1);

    // ── GAME OVER title ────────────────────────────────────────────────────
    this.add.text(400, 110, 'GAME OVER', {
      fontSize: '74px',
      color: '#ff4444',
      fontFamily: 'Arial Black, Arial',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5).setDepth(2);

    // ── Final score ────────────────────────────────────────────────────────
    this.add.text(400, 210, 'Score: ' + this.finalScore, {
      fontSize: '46px',
      color: '#ffffff',
      fontFamily: 'Arial Black, Arial',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5).setDepth(2);

    // ── New high-score banner ──────────────────────────────────────────────
    if (isNewBest) {
      const banner = this.add.text(400, 278, '★  NEW HIGH SCORE!  ★', {
        fontSize: '30px',
        color: '#ffff00',
        fontFamily: 'Arial Black, Arial',
        stroke: '#000000',
        strokeThickness: 3
      }).setOrigin(0.5).setDepth(2);

      // Pulsing scale tween
      this.tweens.add({
        targets: banner,
        scaleX: 1.08,
        scaleY: 1.08,
        duration: 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut'
      });
    }

    // ── Top-5 leaderboard ─────────────────────────────────────────────────
    this.add.text(400, 320, 'Best Scores', {
      fontSize: '24px',
      color: '#aaaaaa',
      fontFamily: 'Arial',
      stroke: '#000000',
      strokeThickness: 2
    }).setOrigin(0.5).setDepth(2);

    scores.forEach((s, i) => {
      const isThis = (s === this.finalScore && i === scores.indexOf(this.finalScore));
      this.add.text(400, 352 + i * 30, `${i + 1}.  ${s} pts`, {
        fontSize: '22px',
        color: isThis ? '#ffff00' : '#ffffff',
        fontFamily: 'Arial',
        stroke: '#000000',
        strokeThickness: 2
      }).setOrigin(0.5).setDepth(2);
    });

    // ── Buttons ────────────────────────────────────────────────────────────
    this._makeButton(400, 552, 'REINICIAR', () => this.scene.start('GameScene'));
    this._makeButton(400, 608, 'MENÚ',      () => this.scene.start('MenuScene'));
  }

  _makeButton(x, y, label, callback) {
    const bg = this.add.rectangle(x, y, 230, 46, 0x90ee90)
      .setDepth(2)
      .setInteractive({ useHandCursor: true });

    const text = this.add.text(x, y, label, {
      fontSize: '26px',
      color: '#1a1a1a',
      fontFamily: 'Arial Black, Arial'
    }).setOrigin(0.5).setDepth(3);

    bg.on('pointerover', () => {
      bg.setFillStyle(0x222222);
      text.setStyle({ color: '#ffffff' });
    });
    bg.on('pointerout', () => {
      bg.setFillStyle(0x90ee90);
      text.setStyle({ color: '#1a1a1a' });
    });
    bg.on('pointerdown', callback);
  }
}
