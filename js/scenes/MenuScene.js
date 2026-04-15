'use strict';

class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' });
  }

  preload() {
    this.load.image('road',       'img/background/1.png');
    this.load.image('cover',      'img/cover/cover.jpg');
    this.load.image('cover_text', 'img/cover/text.png');
    this.load.image('rate',       'img/rate/rate.png');
    this.load.image('wasd',       'img/controls/wasd.png');
    this.load.image('arrows',     'img/controls/arrowKeys.png');
  }

  create() {
    // Slow-scrolling road as atmospheric background
    this.road = this.add.tileSprite(400, 320, 840, 640, 'road').setDepth(0);

    // Amber panel — matches the original game's colour palette
    this.add.rectangle(400, 320, 800, 640, 0xfadd90, 0.93).setDepth(1);

    // ── Title ──────────────────────────────────────────────────────────────
    this.add.text(400, 48, 'Fuck the Police!', {
      fontSize: '50px',
      color: '#1a1a1a',
      fontFamily: 'Arial Black, Arial',
      stroke: '#ffffff',
      strokeThickness: 3
    }).setOrigin(0.5).setDepth(2);

    this.add.rectangle(400, 88, 740, 3, 0x333333).setDepth(2);

    // ── Cover art (right column) ───────────────────────────────────────────
    this.add.image(620, 280, 'cover')
      .setDisplaySize(310, 400).setDepth(2);
    this.add.image(530, 132, 'cover_text')
      .setDisplaySize(110, 110).setDepth(3);

    // Rating
    this.add.text(570, 500, 'Valoración:', {
      fontSize: '20px', color: '#333333',
      fontFamily: 'Arial', fontStyle: 'bold'
    }).setDepth(2);
    this.add.image(640, 535, 'rate')
      .setDisplaySize(170, 36).setDepth(2);

    // ── High-scores panel ─────────────────────────────────────────────────
    this.add.text(565, 560, 'High Scores:', {
      fontSize: '20px', color: '#333333',
      fontFamily: 'Arial', fontStyle: 'bold'
    }).setDepth(2);

    const sm = new ScoreManager();
    const scores = sm.getHighScores();
    const medals = ['🥇', '🥈', '🥉', '4th', '5th'];

    if (scores.length === 0) {
      this.add.text(565, 585, 'No scores yet — be the first!', {
        fontSize: '16px', color: '#555555', fontFamily: 'Arial'
      }).setDepth(2);
    } else {
      scores.forEach((s, i) => {
        this.add.text(565, 585 + i * 22, `${medals[i]}  ${s} pts`, {
          fontSize: '16px', color: '#222222', fontFamily: 'Arial'
        }).setDepth(2);
      });
    }

    // ── Left column: description ──────────────────────────────────────────
    this.add.text(36, 110, 'Descripción:', {
      fontSize: '26px', color: '#333333',
      fontFamily: 'Arial Black, Arial'
    }).setDepth(2);
    this.add.text(36, 148, 'Huye de la policía y suma puntos!', {
      fontSize: '20px', color: '#333333', fontFamily: 'Arial'
    }).setDepth(2);

    this.add.text(36, 182, '• 4 tipos de vehículos enemigos', {
      fontSize: '16px', color: '#555555', fontFamily: 'Arial'
    }).setDepth(2);
    this.add.text(36, 202, '• Dificultad progresiva', {
      fontSize: '16px', color: '#555555', fontFamily: 'Arial'
    }).setDepth(2);
    this.add.text(36, 222, '• Top-5 mejores puntuaciones', {
      fontSize: '16px', color: '#555555', fontFamily: 'Arial'
    }).setDepth(2);

    // Vertical divider between left and right columns
    this.add.rectangle(536, 390, 3, 500, 0x333333).setDepth(2);

    // ── Controls ──────────────────────────────────────────────────────────
    this.add.text(36, 260, 'Controles:', {
      fontSize: '26px', color: '#333333',
      fontFamily: 'Arial Black, Arial'
    }).setDepth(2);

    this.add.image(105, 360, 'wasd').setDisplaySize(155, 155).setDepth(2);
    this.add.text(200, 352, 'O', {
      fontSize: '34px', color: '#333333', fontFamily: 'Arial'
    }).setDepth(2);
    this.add.image(310, 360, 'arrows').setDisplaySize(155, 155).setDepth(2);

    // ── Play button ────────────────────────────────────────────────────────
    const btnBg = this.add.rectangle(400, 468, 260, 58, 0x90ee90)
      .setDepth(2)
      .setInteractive({ useHandCursor: true });

    const btnText = this.add.text(400, 468, 'JUGAR', {
      fontSize: '30px', color: '#1a1a1a',
      fontFamily: 'Arial Black, Arial'
    }).setOrigin(0.5).setDepth(3);

    btnBg.on('pointerover', () => {
      btnBg.setFillStyle(0x222222);
      btnText.setStyle({ color: '#ffffff' });
    });
    btnBg.on('pointerout', () => {
      btnBg.setFillStyle(0x90ee90);
      btnText.setStyle({ color: '#1a1a1a' });
    });
    btnBg.on('pointerdown', () => this.scene.start('GameScene'));
  }

  update() {
    // Gentle background scroll so the menu feels alive
    this.road.tilePositionY -= 2;
  }
}
