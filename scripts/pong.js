var animate = window.requestAnimateFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

var canvas = document.createElement('canvas');
var width = 600;
var height = 400;
canvas.width = width;
canvas.height = height;
var context = canvas.getContext('2d');

window.onload = function() {
    document.body.appendChild(canvas);
    animate(step);
};

var step = function() {
    update();
    render();
    animate(step);
};

var update = function() {
};

var render = function() {
    context.fillStyle = 'orange';
    context.fillRect(0, 0, width, height);
};

function Paddle( x, y, width, height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.x_speed = 0;
    this.y_speed = 0;
}

Paddle.prototype.render = function () {
    context.fillStyle = 'black';
    context.fillRect(this.x, this.y, this.width, this.height);
};

function Player() {
    this.paddle = new Paddle(10, 175, 10, 50);
}

function Computer() {
    this.paddle = new Paddle(580, 175, 10, 50);
}

Player.prototype.render = function() {
    this.paddle.render();
};

function Ball(x, y) {
    this.x = x; 
    this.y = y;
    this.x_speed = 0;
    this.y_speed = 3;
    this.radius = 5;
}

Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);

var render = function() {
    context.fillStyle = 'yellow';
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
};