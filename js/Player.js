function Player(_x_off,_y_off,_life,_className){
  this.xOffset = _x_off+"px";
  this.yOffset = _y_off+"px";
  this.life = _life;
  this.className = _className;
  this.generateDiv();
}

Player.prototype.moveRight = function(x_off){
  let road_width = parseInt(($(".road").css('width')).replace("px",""));
  let limitR = (84*road_width)/100;
  let actualOffset = parseInt(this.xOffset.replace("px",""));
  if(actualOffset-175<=limitR){
    this.xOffset = (actualOffset+x_off) + "px";
    $("."+this.className).css("left", this.xOffset);
  }
}

Player.prototype.moveLeft = function(x_off){
  let road_width = parseInt(($(".road").css('width')).replace("px",""));
  let limitL = (16*road_width)/100;
  let actualOffset = parseInt(this.xOffset.replace("px",""));
  if(actualOffset-225>=limitL){
    this.xOffset = (actualOffset-x_off) + "px";
    $("."+this.className).css("left", this.xOffset);
  }
}

Player.prototype.moveUp = function(y_off){
  let road_width = parseInt(($(".road").css('width')).replace("px",""));
  let road_top = parseInt(($(".road").css('top')).replace("px",""));
  let actualOffset = parseInt(this.yOffset.replace("px",""));
  if(actualOffset>=road_top){
    this.yOffset = (actualOffset-y_off) + "px";
    $("."+this.className).css("top", this.yOffset);
  }
}

Player.prototype.moveDown = function(y_off){
  let road_width = parseInt(($(".road").css('width')).replace("px",""));
  let road_height = parseInt(($(".road").css('height')).replace("px",""));
  let road_top = parseInt(($(".road").css('top')).replace("px",""));
  let limitB = road_top+road_height;
  let actualOffset = parseInt(this.yOffset.replace("px",""));
  if(actualOffset+110<=limitB){
    this.yOffset = (actualOffset+y_off) + "px";
    $("."+this.className).css("top", this.yOffset);
  }
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
