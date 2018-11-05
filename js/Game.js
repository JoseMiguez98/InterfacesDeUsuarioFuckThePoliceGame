"use strict";

function update(inputManager, actionsManager, player, enemies){
  for (let key in inputManager.keysDown){
    if(inputManager.keysDown[key]){
      eval(actionsManager.getAction(key));
    }
  }

  enemies.forEach(function(enemie){
    enemie.move();
  })

  window.requestAnimationFrame(function(){
    update(inputManager,actionsManager,player,enemies);
  });

}

$(document).ready(function(){
  let player = new Player(400,500,9,"player");
  let enemies = [];
  for (var i = 0; i < 4; i++) {
    enemies.push(new Enemie(i));
  }

  let inputManager = new InputManager();
  let actionsManager = new ActionsManager();

  $(document).on("keydown",function(e) {
    inputManager.setKeyPressed(e.key,true);
  });
  $(document).on("keyup",function(e) {
    inputManager.setKeyPressed(e.key,false);
  });


  // update(inputManager,actionsManager);
  window.requestAnimationFrame(function(){
    update(inputManager,actionsManager,player,enemies);
  });
});
