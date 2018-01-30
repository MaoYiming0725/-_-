
window.onload = function(){
  var target = document.getElementById("target");
  target.addEventListener('click', function(){
    var trial = new LeftMove(this, {
      start: 200,
      target:100,
      mode: 'constant',
    });
    //console.log(trial);
    trial.animate();
  })
  var target2 = document.getElementById("target2");
  target2.addEventListener('click', function(){
    var trial2 = new LeftMove(this, {
      start: 200,
      target:300,
    });
    //console.log(trial);
    trial2.animate();
  })
}

function LeftMove(ele, set){
  this.element = ele;
  this.start = set['start'] ? set['start'] : parseInt(this.element.style.left);
  this.target = set['target'];
  this.t = set['t'] ? set['t'] : 50;
  this.step = set['step'] ? set['step'] : 10;
  this.speed = set['speed'] ? set['speed'] : 6;
  this.mode = set['mode'] ? set['mode'] : 'buffer';
  if(this.target < this.start)this.step = -this.step;
}

LeftMove.prototype.animate = function(){
  var flag = false;
  var _this = this;
  this.element.style.left = this.start + 'px';
  this.timer = setInterval(function(){
    if(_this.mode == "buffer"){
      _this.t = (_this.target - parseInt(_this.element.style.left))/ _this.speed;
      _this.step = _this.t > 0 ? Math.ceil(_this.t) : Math.floor(_this.t);
    }
    tmp = parseInt(_this.element.style.left) + _this.step;
    if((_this.target > _this.start && tmp > _this.target) || (_this.target < _this.start && tmp < _this.target) || parseInt(_this.element.style.left) == _this.target){
      _this.element.style.left = _this.target; + 'px';
      flag = true;
    }else{
      //console.log(tmp);
      _this.element.style.left = tmp + 'px';
    }
    if(flag){
      clearInterval(_this.timer);
    }
  }, _this.t);
}
