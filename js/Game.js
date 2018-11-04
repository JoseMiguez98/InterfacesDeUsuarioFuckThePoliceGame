"use strict";

function update(inputManager, actionsManager, player){
  for (let key in inputManager.keysDown){
    if(inputManager.keysDown[key]){
      eval(actionsManager.getAction(key));
    }
  }
  window.requestAnimationFrame(function(){
    update(inputManager,actionsManager,player);
  });
}

$(document).ready(function(){
  let player = new Player(400,500,100,"player");
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
    update(inputManager,actionsManager,player);
  });
});
