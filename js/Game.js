"use strict";

$(document).ready(function(){
  let player = new Player(400,500,100,"player");
  let inputManager = new InputManager();

  $(document).on("keydown",function(e) {
    if(inputManager.keyPressed(e,"a")){
      player.moveLeft(20);
    }
    else if (inputManager.keyPressed(e,"d")) {
      player.moveRight(15);
    }
    else if (inputManager.keyPressed(e,"w")) {
      player.moveUp(15);
    }
    else if (inputManager.keyPressed(e,"s")) {
      player.moveDown(15);
    }
  });
});
