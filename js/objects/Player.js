'use strict';

class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player');

    scene.add.existing(this);
    scene.physics.add.existing(this);

    this.setDepth(10);
    // Use a tighter hitbox than the 110x110 sprite for forgiving collisions
    this.setSize(80, 80);

    // Input
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.wasd = scene.input.keyboard.addKeys('W,A,S,D');

    this.moveSpeed = 270;

    // Road boundaries (player center must stay within these)
    this.minX = 110;
    this.maxX = 670;
    this.minY = 70;
    this.maxY = 570;
  }

  update() {
    const left  = this.cursors.left.isDown  || this.wasd.A.isDown;
    const right = this.cursors.right.isDown || this.wasd.D.isDown;
    const up    = this.cursors.up.isDown    || this.wasd.W.isDown;
    const down  = this.cursors.down.isDown  || this.wasd.S.isDown;

    let vx = 0;
    let vy = 0;

    if (left)  { vx = -this.moveSpeed; this.setAngle(-15); }
    if (right) { vx =  this.moveSpeed; this.setAngle(15);  }
    if (!left && !right) { this.setAngle(0); }
    if (up)   vy = -this.moveSpeed;
    if (down) vy =  this.moveSpeed;

    this.setVelocity(vx, vy);

    // Clamp position to road bounds
    this.x = Phaser.Math.Clamp(this.x, this.minX, this.maxX);
    this.y = Phaser.Math.Clamp(this.y, this.minY, this.maxY);
  }

  reset() {
    this.setPosition(400, 520);
    this.setVelocity(0, 0);
    this.setAngle(0);
    this.setActive(true);
    this.setVisible(true);
  }
}
