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
    //handles collision with player
};
// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and a handleInput() method.
var Player = function(x,y) {
  this.sprite = 'images/char-cat-girl.png';
  this.x = x;
  this.y = y;
  this.speed = 20;
};

Player.prototype.update = function(dt){
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
};

Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.handleInput = function(i){
  //receives user input and moves the player according to that input.
  // left key moves player to the left, right key moves to right.. etc.
  // handles if player tries to move offscreen
  // handles when player reaches water by reseting back to inital location.
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
