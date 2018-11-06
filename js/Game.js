"use strict";


function gameOver(){
  let player = $('.player');
  player.addClass('explosion');

  player.one('webkitAnimationEnd oanimationend msAnimationEnd animationend',
  function(e) {
    player.removeClass('explosion');
    player.css('background-image','none');
  });
}

function update(inputManager, actionsManager, player, enemies, alive){
  if(alive){
    for (let key in inputManager.keysDown){
      if(inputManager.keysDown[key]){
        eval(actionsManager.getAction(key));
      }
    }
  }

  for (let i = 0; i < enemies.length; i++) {
    enemies[i].move();
    if(enemies[i].collisionPlayer()){
      gameOver();
      alive = false;
    }
  }

  window.requestAnimationFrame(function(){
    update(inputManager,actionsManager,player,enemies,alive);
  });

}

$(document).ready(function(){
  let player = new Player(400,500,9,"player");
  let enemies = [];
  let alive = true;
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
    update(inputManager,actionsManager,player,enemies,alive);
  });
});
