
(function () {
    var gameController, heldBox;

    vastgame.buildGameController = function () {
        gameController = new vastengine.Controller();

        // build entities
        var mainPlayer = vastgame.buildPlayer(gameController);
        gameController.addEntity(mainPlayer);
        buildRoom();

        gameController.moving = false;

        gameController.onTouch = function (x, y) {
            if (mainPlayer.speed === 0) {
                var speed = 50, clickedTileX, clickedTileY, playerTileX, playerTileY;
                clickedTileX = Math.floor(x / vastgame.TILE_SIZE);
                clickedTileY = Math.floor(y / vastgame.TILE_SIZE);
                playerTileX = Math.floor(mainPlayer.x / vastgame.TILE_SIZE);
                playerTileY = Math.floor(mainPlayer.y / vastgame.TILE_SIZE);

                // moving/jumping
                // TODO: special checks if player's hands are held (i.e. heldBox is defined?)
                if (gameController.isPositionFree(x, y)) {
                    if (clickedTileX === playerTileX + 1) {
                        if (clickedTileY === playerTileY || clickedTileY === playerTileY + 1) {
                            gameController.moving = true;
                            mainPlayer.moveRight();
                        } else if (clickedTileY === playerTileY - 1 && !gameController.isPositionFree(mainPlayer.x + vastgame.TILE_SIZE + 1, mainPlayer.y + 1)) {
                            mainPlayer.jumpRight();
                        }
                    } else if (clickedTileX === playerTileX - 1) {
                        if (clickedTileY === playerTileY || clickedTileY === playerTileY + 1) {
                            gameController.moving = true;
                            mainPlayer.moveLeft();
                        } else if (clickedTileY === playerTileY - 1 && !gameController.isPositionFree(mainPlayer.x - 1, mainPlayer.y + 1)) {
                            mainPlayer.jumpLeft();
                        }
                    }
                } else {
                    gameController.moving = false;
                }

                // lifting a block
                var box = gameController.getEntitiesAtPosition(x, y, 'box');
                if (box.length > 0) {
                    if (box[0].x === (playerTileX * vastgame.TILE_SIZE) - vastgame.TILE_SIZE || box[0].x === (playerTileX * vastgame.TILE_SIZE) + vastgame.TILE_SIZE) {
                        var attemptedLift = mainPlayer.liftBox(box[0]);
                        if (attemptedLift) {
                            heldBox = attemptedLift;
                        }
                    }
                }

                // dropping a block
                if (heldBox) {
                    if (clickedTileX === playerTileX && clickedTileY === playerTileY - 1) {

                    }
                }
            }
        };

        gameController.onTouchEnd = function () {
            if (gameController.moving) {
                gameController.moving = false;
            }
        }

        gameController.postStep = function () {
            // trick to avoid "jumping" effect on load if you call Canvas.setVisible(false) right after Game.run(), then this.
            // (when view is drawn at (0, 0) briefly before "snapping" to desired position)
            if (!$vast.Canvas.visible) {
                $vast.Canvas.setVisible(true);
            }

            // adjust the view's coordinates to follow the player Entity
            var viewX = (mainPlayer.x + (mainPlayer.width / 2)) - ($vast.Canvas.getWidth() / 2),
                viewY = (mainPlayer.y + (mainPlayer.height / 2)) - ($vast.Canvas.getHeight() / 2);
            gameController.setViewPosition(viewX, viewY);

            // if the player is holding a box, update its position
            if (heldBox && mainPlayer.handsFull) {
                heldBox.x = mainPlayer.x;
                heldBox.y = mainPlayer.y - heldBox.height;
            }
        };

        // sets up a room to move around in
        function buildRoom() {
            var levelMap = [
                '##################',
                '#                #',
                '#                #',
                '#                #',
                '#XX              #',
                '#####           X#',
                '####### P      ###',
                '##########    ####',
                '##########  ## ###',
                '##################'
            ];

            for (var i = 0; i < levelMap.length; i++) {
                var row = levelMap[i];
                for (var j = 0; j < row.length; j++) {
                    switch (row.charAt(j)) {
                        case '#':
                            var wall = new $vast.Entity('wall', 0);
                            wall.sprite = $vast.Sprite.fromImage($vast.Images.getById('stone'), 64, 64);
                            wall.setPosition(j * vastgame.TILE_SIZE, i * vastgame.TILE_SIZE);
                            wall.setSize(vastgame.TILE_SIZE, vastgame.TILE_SIZE);
                            gameController.addEntity(wall);
                            break;
                        case 'P':
                            mainPlayer.setPosition(j * vastgame.TILE_SIZE, i * vastgame.TILE_SIZE);
                            break;
                        case 'X':
                            var box = new $vast.Entity('box', 0);
                            box.sprite = $vast.Sprite.fromImage($vast.Images.getById('box'), 64, 64);
                            box.setPosition(j * vastgame.TILE_SIZE, i * vastgame.TILE_SIZE);
                            box.setSize(vastgame.TILE_SIZE, vastgame.TILE_SIZE);
                            gameController.addEntity(box);
                    }
                }
            }
        }

        return gameController;
    }
}());
