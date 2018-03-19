
window.onload = function(){
  var target = document.getElementById("target");
  var trial = new Move(target, {
    mul: {
      'h' : 200,
      'x': 500
    }
  });
  target.addEventListener('click', function(){
    //console.log(trial);
    trial.animate();
  })
  /*
  var target2 = document.getElementById("target2");
  target2.addEventListener('click', function(){
    var trial2 = new LeftMove(this, {
      start: 200,
      target:300,
    });
    //console.log(trial);
    trial2.animate();
  })
  */
}

function Move(ele, set){
  this.element = ele;
  this.attr = set['attr'] == 'o' ? 'opacity' : set['attr'] == 'h' ? 'height' : 'left';
  this.start = set['start'] ? set['start'] : parseInt(this.element.style[this.attr]);
  this.target = set['target'];
  this.t = set['t'] ? set['t'] : 50;
  this.step = set['step'] ? set['step'] : 10;
  this.speed = set['speed'] ? set['speed'] : 6;
  this.mode = set['mode'] ? set['mode'] : 'buffer';
  this.mul = set['mul'];
  if(this.target < this.start)this.step = -this.step;
}

Move.prototype.animate = function(){
  var flag = false;
  var _this = this;
  if(this.mul == undefined){
    this.mul = {};
    this.mul[this.attr] = this.target;
  }
  //this.element.style[this.attr] = this.start + 'px';
  var _this = this;
  this.timer = setInterval(function(){
    for(var attr in _this.mul){
      var flag = true;
      _this.attr = attr == 'o' ? 'opacity' : attr == 'h' ? 'height' : attr == 'x' ? 'left':'left';
      _this.target = _this.mul[attr];

      if(_this.mode == "buffer"){
        _this.t = (_this.target - parseInt(_this.element.style[_this.attr]))/ _this.speed;
        _this.step = _this.t > 0 ? Math.ceil(_this.t) : Math.floor(_this.t);
      }

      tmp = parseInt(_this.element.style[_this.attr]) + _this.step;
      if(attr =='h'){
        console.log(_this.element.style[_this.attr]);
        console.log(tmp);
      }
      if((_this.step > 0 && tmp > _this.target) || (_this.step<0 && tmp < _this.target) || parseInt(_this.element.style[_this.attr]) == _this.target){
        _this.element.style[_this.attr] = _this.target + 'px';
        //flag = true;
        //clearInterval(_this.timer);
      }else{
        //console.log(tmp);
        _this.element.style[_this.attr] = tmp + 'px';
        flag = false;
      }
    }


    if(flag){
      clearInterval(_this.timer);
    }

  }, _this.t);
}
