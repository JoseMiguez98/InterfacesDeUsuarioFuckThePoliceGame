function InputManager(){
  this.keys =
  { w : 87,
    a : 65,
    s : 83,
    d : 68 ,
    ArrowUp : 38,
    ArrowRight : 39,
    ArrowDown : 40,
    ArrowLeft : 37
  }

  this.keysDown =
  { w : false,
    a : false,
    s : false,
    d : false,
    ArrowUp : false,
    ArrowRight : false,
    ArrowDown : false,
    ArrowLeft : false
  }
}

InputManager.prototype.keyPressed = function(e,key){
  if(e.keyCode===this.keys[key]){
    return true;
  }
  return false;
}

InputManager.prototype.setKeyPressed = function(key,value){
  if(key in this.keys){
    this.keysDown[key] = value;
  }
}
