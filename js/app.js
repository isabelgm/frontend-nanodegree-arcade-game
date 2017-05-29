// Enemies our player must avoid
var Enemy = function(x,y) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';
    this.x = x;
    this.y = y;

    //speed is pixels per second
    this.speed = 80;
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
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
  this.score = 0;
  this.lives = 3;
  this.speed = 20;
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
    this.x -= 90;
    break;
  case 'right':
    this.x += 90;
    break;
  case 'up':
    this.y -= 90;
    break;
  case 'down':
    this.y += 90;
   break;
  }

};

// handles if player tries to move offscreen
Player.prototype.boundaries = function (){
  if (this.x > 420) {
    this.x = 420;
  } else if(this.x < -15) {
    this.x = -15;
  } else {
    this.x = this.x;
  }

  if (this.y > 430){
    this.y = 430;
  } else if (this.y < -10){
    this.y = -10;
  } else {
    this.y = this.y;
  }
}

//reset player to it's starting position
Player.prototype.reset = function() {
  this.x = 200;
  this.y = 400;
}

Player.prototype.playerWins = function(){
  if (this.y < -5){
    return true;
  }
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player
var enemy1 = new Enemy(10,60);
var enemy2 = new Enemy(80,145);
var enemy3 = new Enemy(120,230);
var allEnemies = [enemy1, enemy2, enemy3];
var player = new Player(200,400);


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
