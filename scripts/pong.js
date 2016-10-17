var animate = window.requestAnimateFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame || function(callback) { window.setTimeout(callback, 1000/60) };

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
    player.update();
    computer.update(ball);
    ball.update(player.paddle, computer.paddle, scorePlayer, scoreComputer);
    scorePlayer.update();
    scoreComputer.update();
};

var player = new Player();
var computer = new Computer();
var ball = new Ball(300, 200);
var scorePlayer = new ScorePlayer();
var scoreComputer = new ScoreComputer();

var render = function() {
    context.fillStyle = 'orange';
    context.fillRect(0, 0, width, height);
    player.render();
    computer.render();
    ball.render();
    scorePlayer.render();
    scoreComputer.render();
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

function Computer() {
    this.paddle = new Paddle(10, 175, 10, 50);
}

function Player() {
    this.paddle = new Paddle(580, 175, 10, 50);
}

Player.prototype.render = function() {
    this.paddle.render();
};

Computer.prototype.render = function() {
    this.paddle.render();
};

function Ball(x, y) {
    this.x = x; 
    this.y = y;
    this.x_speed = 3;
    this.y_speed = 0;
    this.radius = 5;
}

Ball.prototype.render = function () {
    context.beginPath();
    context.arc(this.x, this.y, this.radius, 2 * Math.PI, false);
    context.fillStyle = 'red';
    context.fill();
};

var keysDown = {};

window.addEventListener("keydown", function(event) {
    keysDown[event.keyCode] = true;
});

window.addEventListener("keyup", function(event) {
    delete keysDown[event.keyCode];
});

Player.prototype.update = function() {
    for(var key in keysDown) {
        var value = Number(key);
        if(value == 38) {
            this.paddle.move(0, -4);
        } else if (value == 40) {
            this.paddle.move(0, 4);
        } else {
            this.paddle.move(0, 0);
        }
    }
};

Computer.prototype.update = function(ball) {
    var y_pos = ball.y;
    var diff = -((this.paddle.y + (this.paddle.height / 2)) - y_pos);
    if(diff < 0 && diff < -4) {
        diff = -5;
    } else if(diff > 0 && diff > 4) {
        diff = 5;
    }
    this.paddle.move(0, diff);
    if(this.paddle.y < 0) {
        this.paddle.y = 0;
    } else if(this.paddle.y + this.paddle.height > 400) {
        this.paddle.y = 400 - this.paddle.height;
    }
};

Paddle.prototype.move = function(x, y) {
    this.x += x;
    this.y += y;
    this.x_speed = x;
    this.y_speed = y;
    if(this.y < 0) {
        this.y = 0;
        this.y_speed = 0;
    } else if (this.y + this.height > 400) {
        this.y = 400 - this.height;
        this.y_speed = 0;
    }
};

Ball.prototype.update = function(paddle1, paddle2, score) {
    this.x += this.x_speed;
    this.y += this.y_speed;
    var top_x = this.x - 5;
    var top_y = this.y - 5;
    var bottom_x = this.x + 5;
    var bottom_y = this.y + 5;
    
    if(this.y - 5 < 0) {
        this.y = 5;
        this.y_speed = - this.y_speed;
    } else if(this.y + 5 > 400) {
        this.y = 395;
        this.y_speed = - this.y_speed;
    }
    
    if(this.x < 0 || this.x > 600) {
        this.x_speed = 3;
        this.y_speed = 0;
        if (this.x < 0) {
            scorePlayer.incrementPlayerScore();
        }
        
        if(this.x > 600) {
            scoreComputer.incrementComputerScore();
        }
        
        this.x = 300;
        this.y = 200;
        
    }
    
    if(top_x > 300) {
        if(top_x < (paddle1.x + paddle1.width) && bottom_x > paddle1.x && top_y < (paddle1.y + paddle1.height) && bottom_y > paddle1.y) {
            this.x_speed = - 3;
            this.y_speed += (paddle1.y_speed / 2);
            this.x += this.x_speed;
        }
    } else {
        if(top_x < (paddle2.x + paddle2.width) && bottom_x > paddle2.x && top_y < (paddle2.y + paddle2.height) && bottom_y > paddle2.y) {
            this.x_speed = 3;
            this.y_speed += this.x_speed;
        }
    }
};

function ScorePlayer() {
    this.playerScore = 0;
}

function ScoreComputer() {
    this.computerScore = 0;
}

ScorePlayer.prototype.update = function() {
    if(this.playerScore === 6) {
        alert("Game Over, You've succeeded!");
        location.reload();
    }
}

ScoreComputer.prototype.update = function() {
    if(this.computerScore === 6) {
        alert("Game Over, Computer's Success!");
        location.reload();
    }
}

ScorePlayer.prototype.incrementPlayerScore = function() {
    this.playerScore++;
}

ScoreComputer.prototype.incrementComputerScore = function() {
    this.computerScore++;
}

ScorePlayer.prototype.render = function() {
    context.font = "25px Open Sans";
    context.fillStyle = 'black';
    context.fillText(this.playerScore, 500, 30);
}

ScoreComputer.prototype.render = function () {
    context.font = "25px Open Sans";
    context.fillStyle = 'black';
    context.fillText(this.computerScore, 100, 30);
}
