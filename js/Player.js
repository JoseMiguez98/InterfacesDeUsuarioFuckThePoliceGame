function Player(_x_off,_y_off,_speed){
  this.xOffset = _x_off;
  this.yOffset = _y_off;
  this.speed = _speed;
}

Player.prototype.moveRight = function(){
  let road_limit_width = parseInt(($(".roadLimit").css('width')).replace("px",""));
  let player_width = parseInt(($(".player").css('height')).replace('px',''));
  if(this.xOffset<=road_limit_width-player_width){
    this.xOffset += this.speed;
    $(".player").css("left", this.xOffset+"px");
  }
}

Player.prototype.moveLeft = function(){
  let road_limit_width = parseInt(($(".roadLimit").css('width')).replace("px",""));
  if(this.xOffset>=0){
    this.xOffset -= this.speed;
    $(".player").css("left", this.xOffset+"px");
  }
}

Player.prototype.moveUp = function(){
  let road_width = parseInt(($(".road").css('width')).replace("px",""));
  let road_top = parseInt(($(".road").css('top')).replace("px",""));
  if(this.yOffset+40>=road_top){
    this.yOffset -= this.speed;
    $(".player").css("top", this.yOffset+"px");
  }
}

Player.prototype.moveDown = function(){
  let road_width = parseInt(($(".road").css('width')).replace("px",""));
  let road_height = parseInt(($(".road").css('height')).replace("px",""));
  let road_top = parseInt(($(".road").css('top')).replace("px",""));
  let limitB = road_top+road_height;
  if(this.yOffset+160<=limitB){
    this.yOffset += this.speed;
    $(".player").css("top", this.yOffset+"px");
  }
}
