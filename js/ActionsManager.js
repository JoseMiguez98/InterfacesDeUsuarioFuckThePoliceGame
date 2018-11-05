function ActionsManager(){
  this.actions =
  { w : "player.moveUp()",
    a : "player.moveLeft()",
    s : "player.moveDown()",
    d : "player.moveRight()",
    ArrowUp : "player.moveUp()",
    ArrowRight : "player.moveRight()",
    ArrowDown : "player.moveDown()",
    ArrowLeft : "player.moveLeft()"
  }
}

ActionsManager.prototype.getAction = function(key){
  return this.actions[key];
}
