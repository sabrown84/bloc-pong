$(document).ready(function() {
    var canvas = document.getElementById('pong');
    var pongTableContext = canvas.getContext('2d');

// do cool things with the context
    pongTableContext.font = '40pt Calibri';
    //pongTableContext.fillRect(50, 25, 150, 200);
//context.fillText('Time to Play', 300, 250);

    var paddle = function(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        };
        
    paddle.prototype.render = function() {
      pongTableContext.fillRect(this.x, this.y, this.width, this.height);
    };

    var Player = function(paddle) {
        this.paddle = paddle;
    };
  
    Player.prototype.render = function() {
        this.paddle.render()
    };

    var Computer = function(paddle) {
        this.paddle = paddle;
    };

    Computer.prototype.render = function() {
        this.paddle.render()
    };

    var Ball = function() {
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
   
    var player = new Player(
        new paddle(620, 200, 10, 80)
    );

    var computer = new Computer(
        new paddle(10, 200, 10, 80)
    );
    
    var ball = new Ball();

    player.render();
    computer.render();
    ball.render();
});