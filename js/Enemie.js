function Enemie(_id){
  this.id = _id;
  this.generateDiv(this.id);
  this.xOffset = this.generateXPosition();
  this.yOffset = this.getYPosition();
  this.y0 = this.yOffset;
  this.y1 = this.generateLimit();
  this.speed = this.getSpeed();
}

Enemie.prototype.generateDiv = function(id){
  $(".roadLimit").append('<div class="enemie" id=enm_'+this.id+'></div>');
}

Enemie.prototype.getSpeed = function(){
  return Math.floor(Math.random()*5)+3;
}

Enemie.prototype.move = function(){
  let road_limit_height = parseInt(($(".roadLimit").css("height")).replace("px"));
  if(this.yOffset<=this.y1){
    if(this.yOffset>road_limit_height){
      $("#enm_"+this.id).css("display","none");
    }
    this.yOffset+=this.speed;
  }
  else{
    this.yOffset=this.y0;
    this.xOffset=this.generateXPosition();
    this.speed=this.getSpeed();
    $("#enm_"+this.id).css("left", this.xOffset+"px");
    $("#enm_"+this.id).css("display","block");
  }
  $("#enm_"+this.id).css("top", this.yOffset+"px");
}

Enemie.prototype.generateXPosition = function(){
  let road_limit_width = parseInt(($(".roadLimit").css("width")).replace("px"));
  return (Math.floor(Math.random()*(road_limit_width-110)));
}

Enemie.prototype.getYPosition = function(){
  let top = parseInt(($(".enemie").css("top")).replace("px"));
  return top;
}

Enemie.prototype.generateLimit = function(){
  let road_limit_height = parseInt(($(".roadLimit").css("height")).replace("px"));
  return road_limit_height+(this.y0*-1)+100;
}