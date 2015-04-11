/// <reference path="C:\Users\Sean\workspace\vastengine\engine\src/namespace.js" />
(function () {
    var player, moveSpeed = 50, frameSpeed = 5;
   
    var State = {
        idle: 0,
        falling: 1,
        movingRight: 2,
        movingLeft: 3,
        stopping: 4
    };

    var sprite = {
        idleRight:0,
        idleLeft: 1,
        moveRight: 2,
        moveLeft: 3
    };




    vastgame.buildPlayer = function (ctrl) {
        var srcImage = $vast.Images.getById('playersheet');
        

        player = new $vast.Entity(null, 'player');
        player.state = State.idle;
        player.setSize(64, 64);
        player.depth = -100; // make sure player stays on top
        player.step = function () {
            var x = Math.floor(player.x), y = Math.floor(player.y);

            switch (player.state) {
                case State.movingLeft:
                case State.movingRight:
                    // TODO: better way to see if ctrl.moving is true...
                    if ((x % vastgame.TILE_SIZE < 5) && (y % vastgame.TILE_SIZE < 5)) {
                        player.stop();
                    }
                    break;
                case State.falling:
                    if (!ctrl.isPositionFree(player.x + 2, player.y + 63, 'wall')) {
                        player.stop();
                    }
                    break;
                case State.stopping:
                    if (ctrl.isPositionFree(player.x + 2, player.y + 65)) {
                        player.fall();
                    } else {
                        player.state = State.idle;
                    }
            }
        };

        player.stop = function () {
            if (player.state === State.movingLeft) {
                player.setSprite(sprite.idleLeft);
            } else {
                player.setSprite(sprite.idleRight);
            }

            
            player.state = State.stopping;
            player.speed = 0;
            // snap to the grid
            player.setPosition(vastgame.TILE_SIZE * Math.floor(Math.floor(player.x) / vastgame.TILE_SIZE), vastgame.TILE_SIZE * Math.floor(Math.floor(player.y) / vastgame.TILE_SIZE));
        };

        player.moveRight = function () {
            player.setSprite(sprite.moveRight);
            player.state = State.movingRight;
            player.direction = 0;
            player.speed = moveSpeed;
        };

        player.moveLeft = function () {
            player.setSprite(sprite.moveLeft);
            player.state = State.movingLeft;
            player.direction = 180;
            player.speed = moveSpeed;
        };

        player.fall = function () {
            player.state = State.falling;
            player.direction = 90;
            player.speed = moveSpeed;
        };

        player.setSprite = function (spr) {
            var newSprite;
            switch (spr) {
                case (sprite.moveRight):
                    newSprite = $vast.Sprite.fromImage(srcImage, 64, 64, 0, 3, 1);
                    break;
                case (sprite.moveLeft):
                    newSprite = $vast.Sprite.fromImage(srcImage, 64, 64, 4, 7, 1);
                    break;
                case (sprite.idleLeft): 
                    newSprite = $vast.Sprite.fromImage(srcImage, 64, 64, 4, 4);
                    break;
                case (sprite.idleRight):
                default:
                    newSprite = $vast.Sprite.fromImage(srcImage, 64, 64, 0, 0);
            }

            newSprite.frameSpeed = frameSpeed;
            player.sprite = newSprite;
        };

        player.setSprite(sprite.idleRight);

        return player;
    }
}());
