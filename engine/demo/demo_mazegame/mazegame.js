
// set background color and load assets
(function () {
    // used for grid movement
    var TILE_SIZE = 64;

    // game config/debug settings
    $vast.Config.scaleCenter = true;
    $vast.Config.fullScreen = true;

    $vast.Debug.showDebug = true;

    // images
    $vast.Canvas.setBackgroundImage('../images/bg.png', true);
    $vast.Images.add('sun', '../images/man.png');
    $vast.Images.add('flag', '../images/flag.png');
    $vast.Images.add('stone', '../images/stone.png');
    $vast.Images.add('badguy', '../images/enemy.png');
    $vast.Images.load();

    // one way to set a horizontal resolution...
    // TODO: better way to set resolution like this based on a target width/height (target size and then horizontally or vertically oriented)
    // just need better way to set scale in general
    var resX = (1 / (512 / window.innerWidth ));
    vastengine.Config.scale = resX;

    // cool background scolling effect
    $vast.Canvas.setScrollFactor(0.6);

    // game components
    var ctrl = new $vast.Controller();
    var mainPlayer = buildPlayerEntity();
    var goal;
    var badguy = buildEnemyEntity();

    // setup Controller and Entity objects, then run the game
    function buildAndRun() {

        // set up the "controller" with the test Entity object
        ctrl.addEntity(mainPlayer);
        ctrl.addEntity(badguy);
        ctrl.onTouch = gameClick;
        ctrl.postStep = function () {
            // adjust the view's coordinates to follow the player Entity
            var x = (mainPlayer.x + (mainPlayer.width / 2)) - ($vast.Canvas.getCanvasWidth() / 2);
            var y = (mainPlayer.y + (mainPlayer.height / 2)) - ($vast.Canvas.getCanvasHeight() / 2);
            ctrl.setViewPosition(x, y);

            // trick to avoid "jumping" effect on load if you call Canvas.setVisible(false) right after Game.run(), then this.
            // (when view is drawn at (0, 0) briefly before "snapping" to desired position)
            if (!$vast.Canvas.visible) {
                $vast.Canvas.setVisible(true);
            }
        };

        buildWallMap(ctrl);
        $vast.Game.setActiveController(ctrl);

        // run the game, hide the Canvas until we're ready
        $vast.Game.run();
        $vast.Canvas.setVisible(false);
    }


    // builds and returns the player Entity object
    function buildPlayerEntity() {
        var player = new $vast.Entity(null, 'player');
        player.setSize(TILE_SIZE, TILE_SIZE);
        player.setPosition(64, 64);
        player.depth = -100; // make sure player stays on top

        var sprite = $vast.Sprite.buildFromImage($vast.Images.getById('sun'), 64, 64);
        player.setSprite(sprite);

        // define a step function
        player.step = function () {
            var x = Math.floor(mainPlayer.x);
            var y = Math.floor(mainPlayer.y);
            if ((x % TILE_SIZE < 5) && (y % TILE_SIZE < 5) && (mainPlayer.speed > 0)) {
                // "snap" to the grid
                mainPlayer.speed = 0;
                mainPlayer.setPosition(TILE_SIZE * Math.floor(x / TILE_SIZE), TILE_SIZE * Math.floor(y / TILE_SIZE));

                // see if we made it to the goal
                checkForWin();
            } else {
                // check to see if we died
                checkForDead();
            }
        };

        return player;
    }


    // builds and returns an enemy
    function buildEnemyEntity() {
        var enemy = new $vast.Entity(null, 'enemy');
        var sprite = $vast.Sprite.buildFromImage($vast.Images.getById('badguy'));
        enemy.setSprite(sprite);
        enemy.setPosition(384, 256);
        enemy.setSize(TILE_SIZE, TILE_SIZE);
        enemy.speed = 10;
        enemy.direction = 0; // right
        enemy.step = function () {
            // "bounce" left and right
            var toMyLeft = ctrl.getEntitiesAtPosition(enemy.x - 2, enemy.y + 2, 'wall');
            var toMyRight = ctrl.getEntitiesAtPosition(enemy.x + enemy.width + 2, enemy.y + 2, 'wall');

            if (enemy.direction === 180 && toMyLeft.length > 0) {
                enemy.direction = 0;
            } else if (enemy.direction === 0 && toMyRight.length > 0) {
                enemy.direction = 180;
            }
        };
        return enemy;
    }

    // sets up a room to move around in
    function buildWallMap(ctrl) {
        var levelMap = {
            0: '################',
            1: '#              #',
            2: '#####  ######  #',
            3: '#   ####  ###  #',
            4: '# ####      #  #',
            5: '# #  # ###  #  #',
            6: '#      #F#     #',
            7: '# ###### ####  #',
            8: '#           #  #',
            9: '################'
        }

        var rowCount = 10;

        for (var i = 0; i < rowCount; i++) {
            var row = levelMap[i];
            for (var j = 0; j < row.length; j++) {
                if (row.charAt(j) === '#') {
                    var wall = new $vast.Entity('wall', 0);
                    var sprite = $vast.Sprite.buildFromImage($vast.Images.getById('stone'));
                    wall.setSprite(sprite);
                    wall.setPosition(j * TILE_SIZE, i * TILE_SIZE);
                    wall.setSize(TILE_SIZE, TILE_SIZE);
                    ctrl.addEntity(wall);
                } else if (row.charAt(j) === 'F') {
                    goal = new $vast.Entity(null, 'goal');

                    var sprite = $vast.Sprite.buildFromImage($vast.Images.getById('flag'));
                    goal.setSprite(sprite);
                    goal.setPosition(j * TILE_SIZE, i * TILE_SIZE);
                    ctrl.addEntity(goal);
                }
            }
        }
    }

    // called when the user clicks on the screen
    function gameClick(x, y) {
        if (mainPlayer.speed === 0) {
            var speed = 50;
            var clickedTileX = Math.floor(x / TILE_SIZE);
            var clickedTileY = Math.floor(y / TILE_SIZE);
            var playerTileX = Math.floor(mainPlayer.x / TILE_SIZE);
            var playerTileY = Math.floor(mainPlayer.y / TILE_SIZE);

            if (ctrl.isPositionFree(x, y, 'wall')) {
                // determine which way to move
                if (clickedTileX === playerTileX) {
                    if (clickedTileY === playerTileY + 1) {
                        // move down
                        mainPlayer.speed = speed;
                        mainPlayer.direction = 90;
                    } else if (clickedTileY === playerTileY - 1) {
                        // move up
                        mainPlayer.speed = speed;
                        mainPlayer.direction = 270;
                    }
                } else if (clickedTileY === playerTileY) {
                    if (clickedTileX === playerTileX + 1) {
                        // move right
                        mainPlayer.speed = speed;
                        mainPlayer.direction = 0;
                    } else if (clickedTileX === playerTileX - 1) {
                        //move left
                        mainPlayer.speed = speed;
                        mainPlayer.direction = 180;
                    }
                }
            }
        }
    }

    // determine if the player ran into the enemy
    function checkForDead() {
        if (mainPlayer.checkCollision(badguy)) {
            mainPlayer.setPosition(64, 64);
            mainPlayer.speed = 0;
        }
    }

    // determine if the player made it to the goal
    function checkForWin() {

        var d = $vast.MathUtil.getPointDistance(mainPlayer.x, mainPlayer.y, goal.x, goal.y);
        if (d <= 1) {
            var text = 'Win!';
            var w = vastengine.Game.Canvas.getCanvasWidth() / 2;

            $vast.Game.setDialog(new $vast.Dialog(text, w, -1, ['Start over'], function () {
                mainPlayer.setPosition(64, 64);
            }));
        }
    }


    // kick it off
    buildAndRun();
})();
