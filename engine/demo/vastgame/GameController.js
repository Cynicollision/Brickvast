
(function () {
    var gameController;

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

                if (gameController.isPositionFree(x, y, 'wall')) {
                    if (clickedTileY === playerTileY) {
                        if (clickedTileX === playerTileX + 1) {
                            gameController.moving = true;
                            mainPlayer.moveRight();
                        } else if (clickedTileX === playerTileX - 1) {
                            gameController.moving = true;
                            mainPlayer.moveLeft();
                        }
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
            var x = (mainPlayer.x + (mainPlayer.width / 2)) - ($vast.Canvas.getWidth() / 2);
            var y = (mainPlayer.y + (mainPlayer.height / 2)) - ($vast.Canvas.getHeight() / 2);
            gameController.setViewPosition(x, y);
        };

        // sets up a room to move around in
        function buildRoom() {
            var levelMap = [
                '#################',
                '#               #',
                '#               #',
                '#               #',
                '#               #',
                '####            #',
                '###### P      ###',
                '#########     ###',
                '#########     ###',
                '################'
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
                    }
                }
            }
        }

        return gameController;
    }
}());
