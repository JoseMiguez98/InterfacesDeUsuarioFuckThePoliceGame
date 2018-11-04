function ActionsManager(){
  this.actions =
  { w : "player.moveUp(9)",
    a : "player.moveLeft(9)",
    s : "player.moveDown(9)",
    d : "player.moveRight(9)",
    ArrowUp : "player.moveUp(9)",
    ArrowRight : "player.moveRight(9)",
    ArrowDown : "player.moveDown(9)",
    ArrowLeft : "player.moveLeft(9)"
  }
}

ActionsManager.prototype.getAction = function(key){
  return this.actions[key];
}
