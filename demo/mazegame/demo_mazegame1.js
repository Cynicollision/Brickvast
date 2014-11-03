﻿/// <reference path="../../src/MathUtil.js" />
/// <reference path="../../src/Canvas.js" />
/// <reference path="../../src/Controller.js" />
/// <reference path="../../src/Entity.js" />
/// <reference path="../../src/Game.js" />
// set background color and load assets
(function () {
    $vast.Game.Canvas.setBackgroundImage('../_images/texture.png');
    $vast.Game.Images.add('sun', '../_images/sun.jpg');
    $vast.Game.Images.add('flag', '../_images/flag.png');
    $vast.Game.Images.add('stone', '../_images/stone.png');
    $vast.Game.Images.add('badguy', '../_images/enemy.png');
    $vast.Game.Images.load();

    // optional: config game settings... just one so far
    //$vast.Game.Config.fps = 60;

    // used for grid movement
    var TILE_SIZE = 64;

    // set canvas size and scale mode
    var gameWidth = 640;
    var gameHeight = 512;
    $vast.Game.Canvas.setCanvasSize(gameWidth, gameHeight);
    $vast.Game.Canvas.setScaleMode(CanvasScaleMode.FIT);

    var ctrl = new $vast.Controller();

    // some maze objects
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
            var x = (mainPlayer.getX() + (mainPlayer.width / 2)) - (gameWidth / 2);
            var y = (mainPlayer.getY() + (mainPlayer.height / 2)) - (gameHeight / 2);
            ctrl.setViewPosition(x, y);
        }

        buildWallMap(ctrl);
        $vast.Game.setActiveController(ctrl);

        // run the game
        $vast.Game.run();
    }


    // builds and returns the player Entity object
    function buildPlayerEntity() {
        var player = new $vast.Entity(null, 'player');
        player.setSize(TILE_SIZE, TILE_SIZE);
        player.setImage($vast.Game.Images.getById('sun'));
        player.setPosition(192, 64);
        player.depth = -100; // make sure player stays on top

        // define a step function
        player.step = function () {
            var x = Math.floor(mainPlayer.getX());
            var y = Math.floor(mainPlayer.getY());
            if ((x % TILE_SIZE < 5) && (y % TILE_SIZE < 5) && (mainPlayer.getSpeed() > 0)) {
                // "snap" to the grid
                mainPlayer.setSpeed(0);
                mainPlayer.setPosition(TILE_SIZE * Math.floor(x / TILE_SIZE), TILE_SIZE * Math.floor(y / TILE_SIZE));

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
        var goal = new $vast.Entity(null, 'goal');
        goal.setImage($vast.Game.Images.getById('flag'));
        goal.setX($vast.Game.Canvas.getCanvasWidth() - 128);
        goal.setY($vast.Game.Canvas.getCanvasHeight() - 128);
        return goal;
    }

    // builds and returns an enemy
    function buildEnemyEntity() {
        var enemy = new $vast.Entity(null, 'enemy');
        enemy.setImage($vast.Game.Images.getById('badguy'));
        enemy.setPosition(64, 64);
        enemy.setSize(TILE_SIZE, TILE_SIZE);
        enemy.setSpeed(10);
        enemy.setDirection(180); // left
        enemy.step = function () {
            // "bounce" left and right
            var toMyLeft = ctrl.getEntitiesAtPosition(enemy.getX() - 2, enemy.getY() + 2, 'wall');
            var toMyRight = ctrl.getEntitiesAtPosition(enemy.getX() + enemy.width + 2, enemy.getY() + 2, 'wall');

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
                    var wall = new $vast.Entity('wall', 0);
                    wall.setImage($vast.Game.Images.getById('stone'));
                    wall.setPosition(j * TILE_SIZE, i * TILE_SIZE);
                    wall.setSize(TILE_SIZE, TILE_SIZE);
                    ctrl.addEntity(wall);
                }
            }
        }
    }

    // called when the user clicks on the screen
    function gameClick(x, y) {
        var speed = 50;
        var clickedTileX = Math.floor(x / TILE_SIZE);
        var clickedTileY = Math.floor(y / TILE_SIZE);
        var playerTileX = Math.floor(mainPlayer.x / TILE_SIZE);
        var playerTileY = Math.floor(mainPlayer.y / TILE_SIZE);

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
        tileX *= TILE_SIZE;
        tileY *= TILE_SIZE;
        var entities = $vast.Game.getActiveController().getEntities();
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
            mainPlayer.setSpeed(0);
        }
    }

    // determine if the player made it to the goal
    function checkForWin() {
        var playerX = mainPlayer.getX();
        var playerY = mainPlayer.getY();
        var goalX = goal.getX();
        var goalY = goal.getY();

        var d = $vast.MathUtil.getPointDistance(playerX, playerY, goalX, goalY);
        if (d <= 1) {
            alert('Goal!!!1');
            mainPlayer.setPosition(64, 64);
        }
    }


    // kick it off
    buildAndRun();
})();
