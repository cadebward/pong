Number.prototype.clamp = function(min, max) {
  return Math.min(Math.max(this, min), max);
};

function collides(a, b) {
  return a.x < b.x + b.width &&
         a.x + a.width > b.x &&
         a.y < b.y + b.height &&
         a.y + a.height > b.y;
}

var canvas = document.getElementById('c');
var context = canvas.getContext('2d');

canvas.width = 1000;
canvas.height = 500;

var viewportWidth = document.body.clientWidth;
var viewportHeight = window.innerHeight;

canvas.style.marginLeft = viewportWidth / 2 - canvas.width + 500 +  'px';
canvas.style.marginTop = '100px';




function doResize() {
  canvas.width = document.body.clientWidth;
  canvas.height = document.body.clientHeight;
}

var keys = [];

window.addEventListener('keydown', function (e) {
  keys[e.keyCode] = true;
});

window.addEventListener('keyup', function (e) {
  keys[e.keyCode] = false;
});

var update = function () {
}

var draw = function () {
  context.clearRect(0, 0, canvas.width, canvas.height);
  context.fillRect (0, 0, canvas.width, canvas.height);
  context.fillStyle = '#000000';
}

var gameLoop = function () {
  update();
  draw();
};

var ONE_FRAME_TIME = 1000 / 60 ;

var animFrame = window.requestAnimationFrame ||
  window.webkitRequestAnimationFrame ||
  window.mozRequestAnimationFrame    ||
  window.oRequestAnimationFrame      ||
  window.msRequestAnimationFrame     ||
  null ;

if ( animFrame !== null ) {
  var recursiveAnim = function() {
    gameLoop();
    animFrame(recursiveAnim);
  };
  // start the mainloop
  animFrame(recursiveAnim);
} else {
  var ONE_FRAME_TIME = 1000.0 / 60.0 ;
  setInterval(mainloop, ONE_FRAME_TIME);
}