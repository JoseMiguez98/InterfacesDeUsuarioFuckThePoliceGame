function ScoreManager(){
  this.score = 0;
}

ScoreManager.prototype.getScore=function(){
  return this.score;
}

ScoreManager.prototype.add=function(score){
  this.score += score;
}

ScoreManager.prototype.start=function(){
  let _this = this;
  setInterval(function(){_this.add(5);}, 1000);
}
