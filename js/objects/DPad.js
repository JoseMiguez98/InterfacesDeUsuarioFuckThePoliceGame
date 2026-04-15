'use strict';

/**
 * DPad — on-screen directional buttons for touch devices.
 *
 * Creates four semi-transparent arrow buttons in the bottom-left corner.
 * Exposes boolean flags (up / down / left / right) that Player reads
 * alongside the keyboard each frame.
 *
 * Supports two simultaneous touches so diagonal movement works.
 */
class DPad {
  constructor(scene) {
    this.up    = false;
    this.down  = false;
    this.left  = false;
    this.right = false;

    // Enable extra pointers so two buttons can be held at once
    scene.input.addPointer(2);

    // D-pad centre position (bottom-left, clear of road action)
    const cx   = 100;
    const cy   = 548;
    const step = 62;  // distance from centre to each button centre

    this._btn(scene, cx,        cy - step, '▲', v => { this.up    = v; });
    this._btn(scene, cx,        cy + step, '▼', v => { this.down  = v; });
    this._btn(scene, cx - step, cy,        '◀', v => { this.left  = v; });
    this._btn(scene, cx + step, cy,        '▶', v => { this.right = v; });
  }

  /**
   * Create one button.
   * @param {Phaser.Scene} scene
   * @param {number} x
   * @param {number} y
   * @param {string} arrow  Unicode arrow character
   * @param {Function} setState  Called with true (press) or false (release)
   */
  _btn(scene, x, y, arrow, setState) {
    const SIZE = 58;

    const bg = scene.add
      .rectangle(x, y, SIZE, SIZE, 0x000000, 0.40)
      .setDepth(30)
      .setInteractive();

    // Rounded-corner visual via a slightly smaller inner rect
    scene.add
      .rectangle(x, y, SIZE - 4, SIZE - 4, 0xffffff, 0.08)
      .setDepth(30);

    scene.add.text(x, y + 1, arrow, {
      fontSize: '26px',
      color: '#ffffff',
      fontFamily: 'Arial'
    }).setOrigin(0.5).setDepth(31);

    const press   = () => { bg.setFillStyle(0x444444, 0.70); setState(true);  };
    const release = () => { bg.setFillStyle(0x000000, 0.40); setState(false); };

    bg.on('pointerdown',      press);
    bg.on('pointerup',        release);
    bg.on('pointerout',       release);
    bg.on('pointerupoutside', release);
  }
}
