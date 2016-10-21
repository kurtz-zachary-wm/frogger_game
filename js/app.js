// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started
    this.x = Math.random() * -1000;
    this.y = Math.random() * 150 + 85;
    this.speed = 1;
    this.width = 100;
    this.height = 50;
    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.sprite = 'images/enemy-bug.png';

};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt, i) {
    this.x += this.speed;
    if (this.x > 500){
        allEnemies.push(new Enemy(this.x - 600, this.y));
        allEnemies.splice(i, 1);
    }
    var rect1 = this;
    var rect2 = player;
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        // collision detected!
        player.die();
    }

    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.
var Player = function () {
    this.sprite = 'images/char-boy.png';
    this.x = 200;
    this.y = 400;
    this.width = 100;
    this.height = 50;
};

var score = 1;
var running = false;
var characters = new Array ('images/char-cat-girl.png','images/char-boy.png','images/char-horn-girl.png',
    'images/char-pink-girl.png','images/char-princess-girl.png');

Player.prototype.update = function(dt) {
    if (this.y <= 0 ) {
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
        this.x = 200;
        this.y = 400;
    }

};

Player.prototype.die = function(){
    location.reload();
};

Player.prototype.render = function() {
    if(running) ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
    else {
        for(var i = 0; i < characters.length; i ++) {
            var c = characters[i];
            ctx.drawImage(Resources.get(c), i * 100, 300);
            ctx.font = '30px Arial';
            ctx.fillText(i + 1 + "", i * 100, 400);

        }
    }
};

Player.prototype.handleInput = function(key) {
  if (key == 'up') {
      if (this.y > 0) {
          this.y += -86;
      }
  }
  if (key == 'down') {
      if (this.y < 400) {
          this.y -= -86;
      }
  }
  if (key == 'right') {
      if (this.x < 400) {
          this.x += 101;
      }
  }
  if (key == 'left') {
      if (this.x > 0) {
          this.x -= 101;
      }
  }
};


var player = new Player(202, 401);
// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies
// Place the player object in a variable called player

var allEnemies = [
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy(),
    new Enemy()
];

// This listens for key presses and sends the keys to your
// Player.handleInput() method. You don't need to modify this.
document.addEventListener('keyup', function(e) {
    var allowedKeys = {
        37: 'left',
        38: 'up',
        39: 'right',
        40: 'down'
    };
    for(var i = 0; i < characters.length; i++) {
        if(e.keyCode == 49 + i) {
            player.sprite = characters[i];
            running = true;
        }
    }
    if(running) {
        player.handleInput(allowedKeys[e.keyCode]);
    }
});

var Gem = function() {
    this.sprite = new Array ('images/Gem_Blue.png', 'images/Gem_Green.png', 'images/Gem_Orange.png')[Math.floor(Math.random() * 3)];
    this.x = Math.random() * 400;
    this.y = Math.random() * 150 + 85;
    this.width = 100;
    this.height = 50;
};

var allGem = [
    new Gem()
];

Gem.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);

};

Gem.prototype.update = function(dt, i) {
    var rect1 = this;
    var rect2 = player;
    if (rect1.x < rect2.x + rect2.width &&
        rect1.x + rect1.width > rect2.x &&
        rect1.y < rect2.y + rect2.height &&
        rect1.height + rect1.y > rect2.y) {
        // collision detected!
        setTimeout(function() {
            allGem.push(new Gem());
        }, 1000);
        allGem.splice(i, 1);
        score++;
        document.getElementById('score').innerHTML = 'Score: ' + score;
    }
};


