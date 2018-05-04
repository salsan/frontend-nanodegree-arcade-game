// Get the button that opens the modal
let playButton = document.querySelector('button');


// Manage time of game
function initTimerBoard() {
  // Time Variables
  let t = document.querySelector('.myTime').innerText;
  const timerBoard = document.querySelector('.myTime');
  t++;
  timerBoard.innerText = t;

}

// Check Collision from Player and Enemies
// Axis-Aligned Bounding Box
// Original Source
// https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detections
function checkCollisions() {
  let result = 0;
  allEnemies.forEach(function(collision) {
    if (player.x < collision.x + collision.width &&
      player.x + player.width > collision.x &&
      player.y < collision.y + collision.height &&
      player.height + player.y > collision.y) {
      result = 1;
    }
  });
  return result;
}

function nextLevel() {
  let levelGame = document.querySelector('.myLevel').innerText;

  // Add enemy if player pass level
  if (allEnemies.length < levelGame) {
    allEnemies.push(new Enemy('images/enemy-bug.png', -150, randomOrdinate()));
  }
}

//reset variable and game
function finishGame() {

  const t = document.querySelector('.myTime').innerText;
  const levelGame = document.querySelector('.myLevel').innerText;
  const modalWindow = document.getElementById('myModal');
  const modalMessage = document.querySelector('.modal-message');
  const displayResult = document.querySelector('.container');

  clearInterval(timerBoardId);

  modalWindow.style.display = 'block';
  displayResult.style.display = 'none';
  // show result
  modalMessage.innerText = 'FINISH\n Level ' + levelGame + ' \n' + 'Time : ' + t + 'seconds';

  player.y = 420;

}

// Return a random block start enemy
function randomOrdinate() {
  let stoneBlock = [60, 143, 226];
  let index = Math.floor(Math.random() * 3);
  return (stoneBlock[index]);
}

// Enemies our player must avoid
const Enemy = function(imgEnemy, abscissa, ordinate) {

  // Variables applied to each of our instances go here,
  // we've provided one for you to get started
  this.x = abscissa;
  this.y = ordinate;

  this.width = 60;
  this.height = 60;

  this.speed = 1;

  // The image/sprite for our enemies, this uses
  // a helper we've provided to easily load images
  this.sprite = imgEnemy;
};


// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.
  if (this.x < 500) {
    if (this.speed > 10) {
      this.speed = Math.floor(Math.random() * 100 * dt) + 1;
    } else this.x += this.speed;
  } else {
    this.speed += Math.floor(dt * 100);
    this.x = -150 - Math.floor(5000 * Math.random());

    // Random Block Stone Start
    this.stoneBlock = [60, 143, 226];
    this.index = Math.floor(Math.random() * 3);
    this.y = this.stoneBlock[this.index];

  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

const Player = function(imgPlayer, speed) {

  this.x = 200;
  this.y = 420;

  this.width = 70;
  this.height = 60;

  this.speed = speed;

  this.sprite = imgPlayer;
};


Player.prototype.update = function() {

  this.levelGame = document.querySelector('.myLevel').innerText;

  this.levelGameCounter = document.querySelector('.myLevel');

  if (this.y === -30) {
    this.levelGame++;
    this.levelGameCounter.innerText = this.levelGame;
    this.y = 420;
  }

};

// Draw the Player on the screen, required method for game
Player.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Movement of Player
Player.prototype.handleInput = function(direction) {

  switch (direction) {
    case 'up':
      if (this.y > -60) this.y -= 30 * this.speed;
      break;
    case 'down':
      if (this.y < 420) this.y += 30 * this.speed;
      break;
    case 'left':
      if (this.x > 0) this.x -= 25 * this.speed;
      break;
    case 'right':
      if (this.x < 400) this.x += 25 * this.speed;
      break;

    default:
      break;
  }

};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

const allEnemies = [];

allEnemies.push(new Enemy('images/enemy-bug.png', -150, randomOrdinate()));
const player = new Player('images/char-cat-girl.png', 1);

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
  const allowedKeys = {
    37: 'left',
    38: 'up',
    39: 'right',
    40: 'down'
  };

  player.handleInput(allowedKeys[e.keyCode]);
});

// restart button
playButton.addEventListener('click', function() {
  document.location.reload(true);
});
