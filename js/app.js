// Enemy Class
var Enemy = function(x,y) {
    this.sprite = 'images/enemy-ship.png';
    this.x = x;
    this.y = y;

    // Speed is pixels per second
    this.speed = Math.floor(Math.random() * (150 - 100)) + 100;
};

// Updates the enemy's position, required method for game
// Parameter: dt, a time delta between ticks ensure the game runs at the same speed for all computers.
Enemy.prototype.update = function(dt) {
    // distance is the number of pixels to move
    var distance = this.speed * dt;
    if (this.x > 500) {
      this.x = -10;
    } else {
      this.x = this.x + distance;
    }
    this.checkCollision();
};

// Checks for collision between player and enemy using bounding boxes
Enemy.prototype.checkCollision = function(){
  if (this.x + 75 > player.x && player.x + 75 > this.x && this.y + 67 > player.y && player.y + 67 > this.y){
    console.log("Collison detected");
    firing.play();
    this.reset();
    player.reset();
    player.lives = player.lives - 1;
  }
};

// Draws the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Resets enemy coordinates and speed randomly
Enemy.prototype.reset = function(){
  this.x = Math.floor(Math.random() * (230 - 0)) - 0;
  this.y = Math.floor(Math.random() * (300 - 130)) + 130;
  this.speed = Math.floor(Math.random() * (150 - 100)) + 100;
}

// Player class
var Player = function(x,y) {
  this.sprite = 'images/millenium-falcon.png';
  this.x = x;
  this.y = y;
  this.score = 0;
  this.lives = 3;
  this.speed = 60;
};

// Draws bounding box on enemy and player when called. Useful for debugging.
function drawBox(x, y, width, height, color) {
    ctx.beginPath();
    ctx.rect(x, y, width, height);
    ctx.lineWidth = 2;
    ctx.strokeStyle = color;
    ctx.stroke();
};


Player.prototype.update = function(dt){
  // Create variable with %data% inside objects to add scores and lives to game
   var Score = "SCORE: %data%";
   var Lives = "LIVES: %data%";

   // Variables replace %data% using .replace method
   var updateScore = Score.replace("%data%", this.score);
   var updateLives = Lives.replace("%data%", this.lives);

   // Target the score and lives ids in html to update score and lives
   $("#score").html(" ");
   $("#score").html(updateScore);

   $("#lives").html(" ");
   $("#lives").html(updateLives);

   if (this.lives === 0){
     alert("Game Over! Click OK to play again. :)");
     this.score = 0;
     this.lives = 3;
   }

  // updates the player score by 100 if the player reaches the water, plays woohoo sound,
  // and moves player back to start position.
  if(this.playerWins()){
      this.score += 100;
      woohoo.play();
      console.log("Score!! +100")
      alert("Score! You just scored 100 points!");
      player.reset();
  } else if(this.winsGame()){
      song.play();
      alert("Congrats Rebel! You Won! Click OK to play again!");
      this.score = 0;
      this.lives = 3;
      player.reset();
      song.pause();
  }

  // Invokes player.boundaries so the player stays in Canvas
  this.boundaries();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Receives user input and moves the player according to that input.
Player.prototype.handleInput = function(i){
  switch(i){
  case 'left':
    this.x -= 100;
    break;
  case 'right':
    this.x += 100;
    break;
  case 'up':
    this.y -= 85;
    break;
  case 'down':
    this.y += 85;
   break;
  }
};

// Handles if player tries to move offscreen
Player.prototype.boundaries = function (){
  if (this.x > 400) {
    this.x = 400;
  } else if(this.x < 0) {
    this.x = 0;
  } else {
    this.x = this.x;
  }

  if (this.y > 500){
    this.y = 500;
  } else if (this.y < 45){
    this.y = 45;
  } else {
    this.y = this.y;
  }
}

// Resets player to it's starting position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 465;
}

// Determines boundaries for when a player wins
Player.prototype.playerWins = function(){
  if (this.y < 40){
    return true;
  }
};

// Determines if player won game
Player.prototype.winsGame = function(){
  if (this.score === 500){
    return true;
  }
};

// Creates enemies and player objects
var allEnemies = [];

  // Enemy x and y coordinates are determined randomly.
  var createEnemies = function(){
    for(i = 0; i<4; i++){
      var enemy = new Enemy((Math.floor(Math.random() * (230 - 0)) + 0),(Math.floor(Math.random() * (300 - 130)) + 130));
      allEnemies.push(enemy);
    }
  };

createEnemies();
var player = new Player(200,465);

// Adds sound effects
var firing = new Audio('sounds/TIE-Fire.wav');
var woohoo = new Audio('sounds/R2D2.mp3');
var flying = new Audio('sounds/Falcon-Fly.wav');
var song = new Audio('sounds/theme.mp3');


// Listens for key presses and sends the keys to handleInput
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
