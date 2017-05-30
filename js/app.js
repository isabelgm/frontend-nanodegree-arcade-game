// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-ship.png';
    this.x = x;
    this.y = y;

    //speed is pixels per second
    this.speed = 100;
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter which will ensure the game runs at the same speed for all computers.
    // updates location
    // distance is the number of pixels to move
    var distance = this.speed * dt;
    if (this.x > 500) {
      this.x = -10;
    } else {
      this.x = this.x + distance;
    }
    this.checkCollision();
};

Enemy.prototype.checkCollision = function(){
  if (this.x + 75 > player.x && player.x + 75 > this.x && this.y + 67 > player.y && player.y + 67 > this.y){
    console.log("Collison detected");
    blast.play();
    player.reset();
    player.lives = player.lives - 1;

    if (player.lives > 0){
      console.log("Total Lives: " + player.lives);
    } else {
      console.log("Game Over");
    }
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Player class
// This class requires an update(), render() and a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/millenium-falcon.png';
  this.x = x;
  this.y = y;
  this.score = 0;
  this.lives = 3;
  this.speed = 60;
};

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

   // variables replace %data% using .replace method
   var updateScore = Score.replace("%data%", this.score);
   var updateLives = Lives.replace("%data%", this.lives);

   //target the score and lives ids in html to update score and lives
   $("#score").html(" ");
   $("#score").html(updateScore);

   $("#lives").html(" ");
   $("#lives").html(updateLives);

   if (this.lives === 0){
     alert("Game Over! Click OK to play again. :)");
     this.score = 0;
     this.lives = 3;
   }

  // updates the player score by 100 if the player reaches the water and moves player back to start position.
  if(this.playerWins()){
    this.score += 100;
    woohoo.play();
    console.log("Score!! +100")
    alert("Score! You just scored 100 points!");
    player.reset();
  }

  //invokes player.boundaries so the player stays in Canvas
  this.boundaries();
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

//receives user input and moves the player according to that input.
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

// handles if player tries to move offscreen
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

//reset player to it's starting position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 465;
}

Player.prototype.playerWins = function(){
  if (this.y < 40){
    return true;
  }
};

//Creates enemies and player objects
var enemy1 = new Enemy(0,130);
var enemy2 = new Enemy(120,215);
var enemy3 = new Enemy(230,300);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200,465);

// Add sound effects
var blast = new Audio('sounds/blaster-firing.mp3');
var woohoo = new Audio('sounds/R2D2.mp3');


// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };

    player.handleInput(allowedKeys[e.keyCode]);
});
