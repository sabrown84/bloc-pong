var animate = window.requestAnimationFrame ||
        window.webkitRequestAnimationFrame ||
        window.mozRequestAnimationFrame    ||
        function(callback) { window.setTimeout (callback, 1000 / 60);
};

var canvas = document.getElementById('pong');
var pongTableContext = canvas.getContext('2d');
    pongTableContext.font = '40pt Calibri';
var width = 800;
var height = 550;

var player = new Player();

var computer = new Computer();

var ball = new Ball(200, 100);

var keysDown = {};

var render = function() {
  pongTableContext.fillStyle = 'orange';
  pongTableContext.fillRect(0, 0, width, height);
  player.render();
  computer.render();
  ball.render();
};

var update = function() {
    player.update();
//    computer.update(ball);
    ball.update(player.paddle, computer.paddle);
};

var step = function() {
    update();
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
    pongTableContext.fillStyle = 'black';
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
    } else if (this.x + this.height > 600) {
        this.x = 600 - this.height;
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
    if (value == 38) {
      this.paddle.move(0, -4);
    } else if (value == 40) {
      this.paddle.move(0, 4);
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
//    pongTableContext.fillStyle = 'black';
};


function Ball(x, y) {
    this.x = x;
    this.y = y;
    this.xSpeed = 3;
    this.ySpeed = 0;
    this.radius = 5;
}

Ball.prototype.render = function () {
    pongTableContext.beginPath();
    pongTableContext.arc(this.x, this.y, 5, 2 * Math.PI, false); 
    pongTableContext.fillStyle = 'white';
    pongTableContext.fill();
};  

Ball.prototype.update = function(paddle1, paddle2) {
    this.x += this.xSpeed;
    this.y += this.ySpeed;
    var topX = this.x - 5;
    var topY = this.y - 5;
    var bottomX = this.x + 5;
    var bottomY = this.y + 5;
    
    if (this.x - 5 < 0) {
        this.x = 5;
        this.xSpeed = -this.xSpeed;
    } else if (this.x + 5 > 600) {
        this.x = 595;
        this.xSpeed = -this.xSpeed;
    }
    
    if (topY > 300) {
        if (topY < (paddle1.y + paddle1.height) && bottomY > paddle1.y && topX < (paddle1.x + paddle1.width) && bottomX > paddle1.x) {
            this.ySpeed = -3;
            this.xSpeed += (paddle2.xSpeed / 2);
            this.y += this.ySpeed;
        }
    } else {
        if (topY < (paddle2.y + paddle2.height) && bottomY > paddle2.y && topX < (paddle2.x + paddle1.width) && bottomX > paddle2.x) {
            this.ySpeed = 3;
            this.xSpeed += (paddle2.xSpeed /2);
            this.y += this.ySpeed;
        }
    }
};

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

window.addEventListener('keydown', function(event) {
    keysDown[event.keyCode] = true;
});
window.addEventListener('keyup', function(event) {
    delete keysDown[event.keyCode];
});
