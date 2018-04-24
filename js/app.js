
// Enemies our player must avoid
var Enemy = function( imgEnemy, abscissa, ordinate ) {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = abscissa;
    this.y = ordinate;


    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = imgEnemy;
};

const enemy1 = new Enemy('images/enemy-bug.png', -50, 50);
const enemy2 = new Enemy('images/enemy-bug.png', -70, 140);
const enemy3 = new Enemy('images/enemy-bug.png', -15, 230);

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if (this.x < 500){
      this.x++;
    } else {
      this.x = -60;
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function( imgPlayer ){
  this.x = 200;
  this.y = 420;

  this.sprite  = imgPlayer;

};

// Update the playuer position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    if ( player.y === -60){
      player.y = 420;
    }
};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Movement of Player
Player.prototype.handleInput = function( direction ) {

  console.log(player.y);
  switch (direction) {
    case 'up':
          if ( player.y > -60 ) player.y -= 30;
      break;
    case 'down':
          if ( player.y < 420 ) player.y += 30;
      break;
    case 'left':
          if ( player.x > 0 ) player.x -= 25;
      break;
    case 'right':
          if ( player.x < 400) player.x += 25;
      break;

    default:
      break;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [ enemy1, enemy2, enemy3];
var player = new Player('images/char-boy.png');



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
