// Modal window
/* Model Variable */
/* Get the modal */
let modal = document.getElementById('myModal');
/* Get the button that opens the modal */
let btn = document.getElementById('myBtn');
let playButton = document.querySelector("button");
let modalWindow = document.getElementById('myModal');
let modalMessage = document.querySelector('.modal-message');
modalWindow.style.display = 'none';

/* Level Game*/
var levelGame = 1;
var levelGameCounter = document.querySelector('.myLevel');

var displayResult = document.querySelector('.container');

/* Time Variables*/
var startGame = 0;
var initTime = 0;
var t = 0;
var timerBoardId;
var timerBoard = document.querySelector('.myTime');


/* Manage time of game */
function initTimerBoard() {
  timerBoard.innerText = t + 's';
  t++;
}

/* Return a random block start enemy  */
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
      this.speed = Math.floor(Math.random() * 10 + 1);
    } else this.x += this.speed;
  } else {
    this.speed = Math.floor(Math.random() * this.speed + 2);
    this.x = -150 - Math.floor(5000 * Math.random());
    this.y = randomOrdinate();
  }

  // Check Collision from Player and Enemies
  // Axis-Aligned Bounding Box
  // Original Source
  // https://developer.mozilla.org/kab/docs/Games/Techniques/2D_collision_detections

  allEnemies.forEach(function(enemy, index) {
    if (player.x < enemy.x + enemy.width &&
      player.x + player.width > enemy.x &&
      player.y < enemy.y + enemy.height &&
      player.height + player.y > enemy.y) {
      console.log('collision');
      // reset variable and game
      clearInterval(timerBoardId);
      modalWindow.style.display = 'block';
      displayResult.style.display = 'none';

      // show result
      modalMessage.innerText = 'FINISH\n Level ' + levelGame + ' \n' + 'Time : ' + t + 'seconds';


      player.y = 420;

    }
  });

  /* Add enemy if player pass level */
  if (allEnemies.length < levelGame) {
    allEnemies.push(new Enemy('images/enemy-bug.png', -150, randomOrdinate()));
  }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
  ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function(imgPlayer) {
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
  this.height = 90;

  this.sprite = imgPlayer;

};

// Update the playuer position, required method for game
// Parameter: dt, a time delta between ticks
Player.prototype.update = function(dt) {
  // You should multiply any movement by the dt parameter
  // which will ensure the game runs at the same speed for
  // all computers.

  if (player.y === -30) {
    levelGame++;
    levelGameCounter.innerText = 'Level ' + levelGame;
    console.log('Next Level');
    player.y = 420;
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
      if (player.y > -60) player.y -= 30;
      break;
    case 'down':
      if (player.y < 420) player.y += 30;
      break;
    case 'left':
      if (player.x > 0) player.x -= 25;
      break;
    case 'right':
      if (player.x < 400) player.x += 25;
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
var player = new Player('images/char-cat-girl.png');

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

/* restart button  */
playButton.addEventListener('click', function(){
  document.location.reload(true);
});
