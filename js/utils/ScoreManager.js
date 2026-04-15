'use strict';

class ScoreManager {
  constructor() {
    this.score = 0;
    this._timer = null;
    this.STORAGE_KEY = 'ftp_highscores';
  }

  // Start the +5/s tick tied to a Phaser scene's clock
  start(scene) {
    this._timer = scene.time.addEvent({
      delay: 1000,
      callback: () => { this.score += 5; },
      loop: true
    });
  }

  stop() {
    if (this._timer) {
      this._timer.remove(false);
      this._timer = null;
    }
  }

  reset() {
    this.score = 0;
  }

  getScore() {
    return this.score;
  }

  // Persist score into top-5 localStorage list
  saveHighScore(score) {
    let scores = this.getHighScores();
    scores.push(score);
    scores.sort((a, b) => b - a);
    scores = scores.slice(0, 5);
    localStorage.setItem(this.STORAGE_KEY, JSON.stringify(scores));
  }

  getHighScores() {
    try {
      return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || [];
    } catch (e) {
      return [];
    }
  }

  isHighScore(score) {
    const scores = this.getHighScores();
    return scores.length < 5 || score > scores[scores.length - 1];
  }
}
