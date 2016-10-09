var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        window.oRequestAnimationFrame      ||
        window.msRquestAnimationFrame      ||
        function(callback) { window.setTimeout (callback, 1000/60);
};

var canvas = document.getElementById('pong');
var pongTableContext = canvas.getContext('2d');
    pongTableContext.font = '40pt Calibri';
var width = 400;
var height = 600;

var player = new Player();
//    new paddle(620, 200, 10, 80)

var computer = new Computer();
//    new paddle(10, 200, 10, 80)


var ball = new Ball(200, 300);

var keysDown = {};

var render = function() {
  player.render();
  computer.render();
  ball.render();
};

var step = function() {
    render();
    animate(step);
};

function Paddle(x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.xspeed = 0;
    this.yspeed = 0;
};

Paddle.prototype.render = function() {
  pongTableContext.fillRect(this.x, this.y, this.width, this.height);
};

Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.xSpeed = x;
    this.ySpeed = y;
    if (this.x < 0) {
        this.x = 0;
        this.xSpeed = 0;
    } else if (this.x + this.width > 400) {
        this.x = 400 - this.width;
        this.xSpeed = 0;
    }
};

function Player() {
    this.paddle = new Paddle(620, 200, 10, 80);
};

Player.prototype.render = function() {
    this.paddle.render()
};

Player.prototype.update = function() {
  for (var key in keysDown) {
    var value = Number(key);
    if (value === 38) {
      this.paddle.move(-4, 0);
    } else if (value === 40) {
      this.paddle.move(4, 0);
    } else {
      this.paddle.move(0, 0);
    }
  }
};

function Computer() {
    this.paddle = new Paddle(10, 200, 10, 80);
};

Computer.prototype.render = function() {
    this.paddle.render()
};

function Ball(x, y) {
    this.x = canvas.width / 2;
    this.y = canvas.height / 2;
    this.radius = 5;
    this.startAngle = 0;
    this.endAngle = 2 * Math.PI;
    this.counterClockwise = false;
};

Ball.prototype.render = function () {
    pongTableContext.beginPath();
    pongTableContext.arc(this.x, this.y, this.radius, this.startAngle, this.endAngle, this.counterClockwise);
    pongTableContext.lineWidth = 10;
    pongTableContext.strokeStyle = 'red';
    pongTableContext.stroke();
    pongTableContext.closePath();
};    

animate(step);

window.addEventListener('keydown', function(event) {
    keysDown[event.keyCode] = true;
});
window.addEventListener('keyup', function(event) {
    delete keysDown[event.keyCode];
});
