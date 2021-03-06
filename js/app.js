// Enemies our player must avoid
var Enemy = function() {
    // Variables applied to each of our instances go here,
    // we've provided one for you to get started

    // The image/sprite for our enemies, this uses
    // a helper we've provided to easily load images
    this.restart();
    this.sprite = 'images/enemy-bug.png';
};

// Update the enemy's position, required method for game
// Parameter: dt, a time delta between ticks
Enemy.prototype.update = function(dt) {
    // You should multiply any movement by the dt parameter
    // which will ensure the game runs at the same speed for
    // all computers.
    this.x = (this.x + this.speed);    
    if(this.x > 101*4){
        this.restart();
    }
};

// Draw the enemy on the screen, required method for game
Enemy.prototype.render = function() {
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Enemy.prototype.restart = function(){
    this.x = 0 * 101;
    this.y = getRandomInt(1,3) * 83;
    this.speed = getRandomInt(4,8);
};

// Now write your own player class
// This class requires an update(), render() and
// a handleInput() method.

var Player = function(){
    this.restart();
    this.sprite = 'images/char-boy.png';
};

Player.prototype.update = function(){

    if(this.colDetection() == 'true'){
        alert('Looser!!');
        this.restart();
        allEnemies.forEach(function(enemy){
            enemy.restart();
        });
        allRocks.forEach(function(rock){
            rock.restart();
        });
    }
}

Player.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
};

Player.prototype.restart = function(){
    this.x = getRandomInt(0,4)*101;
    this.y = 5 * 83;
};

Player.prototype.handleInput = function(key){
    var noRock = 1;

    switch (key){
        case 'left':
            if(this.x > 100){
                this.x = this.x - 101;
            }
            break;
        case 'right':
            if(this.x < 101*4){
                this.x = this.x + 101;
            }
            break;
        case 'up':
            if(this.y > 82){
                allRocks.forEach(function(rock){
                    if((player.y - 83) == rock.y && player.x == rock.x){
                        noRock = 0;
                    }
                });
                if(noRock == 1){
                    player.y = player.y - 83;
                }
            }
            else{
                alert('Win!!');
                this.restart();
                allEnemies.forEach(function(enemy){
                    enemy.restart();
                });
                allRocks.forEach(function(rock){
                    rock.restart();
                })
            }
            break;
        case 'down':
            if(this.y < 83 * 5){
                this.y = this.y + 83;
            }
            break;
    }
};

Player.prototype.colDetection = function(){
    var collision = 'false';
    allEnemies.forEach(function(enemy){
        if(enemy.y == player.y){
            if(enemy.x >= player.x && enemy.x <= player.x+101){
                collision = 'true';
            }
        }
    });
    return collision;
}

var Rock = function(){
    this.sprite='images/Rock.png';
    this.restart();
}

Rock.prototype.render = function(){
    ctx.drawImage(Resources.get(this.sprite), this.x, this.y);
}

Rock.prototype.restart = function(){
    this.x = getRandomInt(0,4)*101;
    this.y = getRandomInt(1,3) * 83;
}

var getRandomInt = function(min, max){
    return Math.floor(Math.random() * (max - min + 1)) + min;
};

// Now instantiate your objects.
// Place all enemy objects in an array called allEnemies

var allEnemies = [ new Enemy(), new Enemy(), new Enemy()];

// Place the player object in a variable called player

var player = new Player();

var allRocks = [ new Rock(), new Rock()];

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
