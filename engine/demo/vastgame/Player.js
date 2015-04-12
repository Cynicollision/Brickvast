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
        player = new $vast.Entity(null, 'player');
        player.state = State.idle;
        player.setSize(64, 64);
        player.depth = -100; // make sure player stays on top
        player.step = function () {
            var x = Math.floor(player.x), y = Math.floor(player.y);

            switch (player.state) {
                case State.movingLeft:
                case State.movingRight:
                    if ((x % vastgame.TILE_SIZE < 5) && (y % vastgame.TILE_SIZE < 5)) {
                        if (ctrl.isPositionFree(player.x + 2, player.y + 66)) {
                            player.fall();
                        } else if (!ctrl.moving) {
                            player.stop();
                        }
                    }

                    if (!ctrl.isPositionFree(player.x + 65, player.y + 2, 'wall')) {
                        player.stop();
                    } else if (!ctrl.isPositionFree(player.x - 1, player.y + 2, 'wall')) {
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
            var xL = Math.floor(player.x / vastgame.TILE_SIZE) * vastgame.TILE_SIZE;
            var xR = Math.floor((player.x + vastgame.TILE_SIZE) / vastgame.TILE_SIZE) * vastgame.TILE_SIZE;
            var yU = Math.floor(player.y / vastgame.TILE_SIZE) * vastgame.TILE_SIZE;
            var yD = Math.floor((player.t + vastgame.TILE_SIZE) / vastgame.TILE_SIZE) * vastgame.TILE_SIZE;

            var targetX = xL, targetY = yU;
            var distanceToLeft = player.x - xL;
            var distanceToRight = xR - player.x;
            var distanceToUp = player.y - yU;
            var distanceToDown = yD - player.y;

            if (distanceToLeft > distanceToRight) {
                targetX = xR;
            }
            if (distanceToDown > distanceToUp) {
                targetY = yU;
            }

            player.setPosition(targetX, targetY);
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
            var newSprite, srcImage = $vast.Images.getById('playersheet');
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
