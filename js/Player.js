function Player(_x_off,_y_off,_life,_className){
  this.xOffset = _x_off+"px";
  this.yOffset = _y_off+"px";
  this.life = _life;
  this.className = _className;


}

Player.prototype.moveRight = function(x_off){
  let actualOffset = parseInt(this.xOffset.replace("px",""));
  this.xOffset = (actualOffset+x_off) + "px";
  $("."+this.className).css("left", this.xOffset);
}

Player.prototype.moveLeft = function(y_off){
  let actualOffset = Integer.parseInt(this.yOffset.replace("px",""));
  this.yOffset = (actualOffset+y_off) + "px";
}

Player.prototype.generateDiv = function(){
  let image = new Image();
  image.src = "../img/cars/resized/black_viper.png";
  $("body").append("<div class="+this.className+"></div>");
  image.onload = function(){
    $("."+this.className).css("background-image", "url("+image.src+")");
    $("."+this.className).css("width", image.clientWidth);
    $("."+this.className).css("height", image.clientHeight);
  }
  $("."+this.className).css("left", this.xOffset);
  $("."+this.className).css("top", this.yOffset);
}
