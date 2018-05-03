// Modal window
// Model Variable
// Get the modal
let modal = document.getElementById('myModal');
// Get the button that opens the modal
let btn = document.getElementById('myBtn');
let playButton = document.querySelector('button');
let modalWindow = document.getElementById('myModal');
let modalMessage = document.querySelector('.modal-message');
modalWindow.style.display = 'none';

// Level Game
var levelGame = 1;
var levelGameCounter = document.querySelector('.myLevel');

var displayResult = document.querySelector('.container');

// Time Variables
var startGame = 0;
var initTime = 0;
var t = 0;
var timerBoardId;
var timerBoard = document.querySelector('.myTime');


// Manage time of game
function initTimerBoard() {
  timerBoard.innerText = t + 's';
  t++;
}

// Check Collision from Player and Enemies
// Axis-Aligned Bounding Box
// Original Source
// https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detections
function checkCollision() {
  var result = 0;
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
  // Add enemy if player pass level
  if (allEnemies.length < levelGame) {
    allEnemies.push(new Enemy('images/enemy-bug.png', -150, randomOrdinate()));
  }
}

//reset variable and game
function finishGame() {
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
var Enemy = function(imgEnemy, abscissa, ordinate) {

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
      this.speed = Math.floor(Math.random() * 500 * dt) + 1;
    } else this.x += this.speed;
  } else {
    this.speed += Math.floor(this.speed * dt * Math.random() * 200);
    this.x = -150 - Math.floor(5000 * Math.random());
    this.y = randomOrdinate();
  }

  // if true end game
  if (checkCollision() === 1) {
    finishGame();
  } else {
    // Add enemy if player pass level
    nextLevel();
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(imgPlayer, speed) {
  if (startGame === 0) {
    startGame = 1;
    timerBoardId = setInterval(function() {
      initTimerBoard();
    }, 1000);
    initTime++;
  }

  this.x = 200;
  this.y = 420;

  this.width = 70;
  this.height = 60;

  this.speed = speed;

  this.sprite = imgPlayer;
};


Player.prototype.update = function() {

  if (this.y === -30) {
    levelGame++;
    levelGameCounter.innerText = 'Level ' + levelGame;
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

var allEnemies = [];

allEnemies.push(new Enemy('images/enemy-bug.png', -150, randomOrdinate()));
var player = new Player('images/char-cat-girl.png', 1);

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

// restart button
playButton.addEventListener('click', function() {
  document.location.reload(true);
});
