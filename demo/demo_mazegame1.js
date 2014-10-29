/// <reference path="../src/MathUtil.js" />
/// <reference path="../src/CanvasManager.js" />
/// <reference path="../src/Controller.js" />
/// <reference path="../src/Entity.js" />
/// <reference path="../src/Game.js" />
// set background color and load assets
(function () {
    Game.CanvasManager.setBackgroundImage('images/texture.png');
    Game.Assets.Images.add('sun', 'images/sun.jpg');
    Game.Assets.Images.add('flag', 'images/flag.png');
    Game.Assets.Images.add('stone', 'images/stone.png');
    Game.Assets.Images.add('badguy', 'images/enemy.png');
    Game.Assets.Images.load();

    // for grid movement
    var tileSize = 64;
    var width = Game.CanvasManager.getCanvasWidth();
    var height = Game.CanvasManager.getCanvasHeight();

    var ctrl = new Controller();

    // our hero
    var mainPlayer = buildPlayerEntity();
    var goal = buildGoalEntity();
    var badguy = buildEnemyEntity();

    // setup Controller and Entity objects, then run the game
    function buildAndRun() {

        // set up the "controller" with the test Entity object
        ctrl.addEntity(mainPlayer);
        ctrl.addEntity(goal);
        ctrl.addEntity(badguy);
        ctrl.postmousedown = gameClick;
        ctrl.postStep = function () {
            // adjust the view's coordinates to follow the player Entity
            var x = (mainPlayer.getX() + (mainPlayer.width / 2)) - (width / 2);
            var y = (mainPlayer.getY() + (mainPlayer.height / 2)) - (height / 2);
            ctrl.setViewPosition(x, y);
        }

        buildWallMap(ctrl);
        Game.setActiveController(ctrl);

        // run the game
        Game.run();
    }


    // builds and returns the player Entity object
    function buildPlayerEntity() {
        var player = new Entity(null, 'player');
        player.setSize(64, 64);
        player.setImage(Game.Assets.Images.getById('sun'));
        player.setPosition(64, 64);
        player.depth = -100; // make sure player stays on top

        // define a step function
        player.step = function () {
            var x = Math.floor(mainPlayer.getX());
            var y = Math.floor(mainPlayer.getY());
            if ((x % tileSize < 5) && (y % tileSize < 5) && (mainPlayer.getSpeed() > 0)) {
                // "snap" to the grid
                mainPlayer.setSpeed(0);
                mainPlayer.setPosition(tileSize * Math.floor(x / tileSize), tileSize * Math.floor(y / tileSize));

                // see if we made it to the goal
                checkForWin();
            } else {
                // check to see if we died
                checkForDead();
            }
        }

        return player;
    }

    // builds and returns the goal Entity object
    function buildGoalEntity() {
        var goal = new Entity(null, 'goal');
        goal.setImage(Game.Assets.Images.getById('flag'));
        goal.setX(Game.CanvasManager.getCanvasWidth() - 128);
        goal.setY(Game.CanvasManager.getCanvasHeight() - 128);
        return goal;
    }

    // builds and returns an enemy
    function buildEnemyEntity() {
        var enemy = new Entity(null, 'enemy');
        enemy.setImage(Game.Assets.Images.getById('badguy'));
        enemy.setPosition(Game.CanvasManager.getCanvasWidth() - 256, Game.CanvasManager.getCanvasHeight() - 128);
        enemy.setSize(64, 64);
        enemy.setSpeed(10);
        enemy.setDirection(180); // left
        enemy.step = function () {
            // "bounce" left and right
            var toMyLeft = ctrl.getEntitiesAtPosition(enemy.getX() - 2, enemy.getY() + 2);
            var toMyRight = ctrl.getEntitiesAtPosition(enemy.getX() + enemy.width + 2, enemy.getY() + 2);

            if (enemy.getDirection() === 180 && toMyLeft.length > 0) {
                enemy.setDirection(0);
            } else if (enemy.getDirection() === 0 && toMyRight.length > 0) {
                enemy.setDirection(180);
            }
        }
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
            6: '#      # #     #',
            7: '# ###### ####  #',
            8: '#           #  #',
            9: '################'

        }

        var rowCount = 10;

        for (var i = 0; i < rowCount; i++) {
            var row = levelMap[i];
            for (var j = 0; j < row.length; j++) {
                if (row.charAt(j) === '#') {
                    var wall = new Entity('wall', 0);
                    wall.setImage(Game.Assets.Images.getById('stone'));
                    wall.setPosition(j * tileSize, i * tileSize);
                    wall.setSize(64, 64);
                    ctrl.addEntity(wall);
                }
            }
        }
    }

    // called when the user clicks on the screen
    function gameClick(x, y) {
        var speed = 50;
        var clickedTileX = Math.floor(x / tileSize);
        var clickedTileY = Math.floor(y / tileSize);
        var playerTileX = Math.floor(mainPlayer.x / tileSize);
        var playerTileY = Math.floor(mainPlayer.y / tileSize);

        if (placeFree(clickedTileX, clickedTileY)) {
            // determine which way to move
            if (clickedTileX === playerTileX) {
                if (clickedTileY === playerTileY + 1) {
                    // move down
                    mainPlayer.setSpeed(speed);
                    mainPlayer.setDirection(90);
                } else if (clickedTileY === playerTileY - 1) {
                    // move up
                    mainPlayer.setSpeed(speed);
                    mainPlayer.setDirection(270);
                }
            } else if (clickedTileY === playerTileY) {
                if (clickedTileX === playerTileX + 1) {
                    // move right
                    mainPlayer.setSpeed(speed);
                    mainPlayer.setDirection(0);
                } else if (clickedTileX === playerTileX - 1) {
                    //move left
                    mainPlayer.setSpeed(speed);
                    mainPlayer.setDirection(180);
                }
            }
        }
    }

    // assumes the Entity's (x,y) is exactly the same - only check for type === 'wall'
    function placeFree(tileX, tileY) {
        tileX *= tileSize;
        tileY *= tileSize;
        var entities = Game.getActiveController().getEntities();
        for (var i = 0; i < entities.length; i++) {
            if ((entities[i].type === 'wall') && (entities[i].getX() === tileX) && (entities[i].getY() === tileY)) {
                return false;
            }
        }

        return true;
    }

    // determine if the player ran into the enemy
    function checkForDead() {
        if (mainPlayer.checkCollision(badguy)) {
            //alert('Sooo dead!');
            mainPlayer.setPosition(64, 64);
        }
    }

    // determine if the player made it to the goal
    function checkForWin() {
        var playerX = mainPlayer.getX();
        var playerY = mainPlayer.getY();
        var goalX = goal.getX();
        var goalY = goal.getY();

        var d = MathUtil.getPointDistance(playerX, playerY, goalX, goalY);
        if (d <= 1) {
            alert('Goal!!!1');
            mainPlayer.setPosition(64, 64);
        }
    }


    // kick it off
    buildAndRun();
})();
