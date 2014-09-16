/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/MathUtil.js" />
/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/CanvasManager.js" />
/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/Controller.js" />
/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/Entity.js" />
/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/Game.js" />
// set background color and load assets
Game.CanvasManager.setBackgroundColor('#cce');
Game.Assets.Images.add('sun', 'img/engine_demo/sun.jpg');
Game.Assets.Images.add('flag', 'img/engine_demo/flag.png');
Game.Assets.Images.add('stone', 'img/engine_demo/stone.png');
Game.Assets.Images.load();

// for drawing the grid and movement
var tileSize = 64;
var width = Game.CanvasManager.getCanvasWidth();
var tilesWide = width / tileSize;
var height = Game.CanvasManager.getCanvasHeight();
var tilesTall = height / tileSize;

// our hero
var mainPlayer = buildPlayerEntity();
var goal = buildGoalEntity();

// setup Controller and Entity objects, then run the game
function buildAndRun() {
    
    // set up the "controller" with the test Entity object
    var ctrl = new Controller();
    ctrl.addEntity(mainPlayer);
    ctrl.addEntity(goal);
    ctrl.postmousedown = gameClick;

    buildWallMap(ctrl);
    Game.setActiveController(ctrl);

    // run the game
    Game.run();
}

// called when the user clicks on the screen
function gameClick(e) {
    var speed = 50;
    var clickedTileX = Math.floor(e.pageX / tileSize);
    var clickedTileY = Math.floor(e.pageY / tileSize);
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

// builds and returns the player Entity object
function buildPlayerEntity() {
    var player = new Entity(null, 'player');
    player.setImage(Game.Assets.Images.getById('sun'));
    player.step = playerStep; // assign a step() function
    player.draw = playerDraw; // going to draw the grid
    player.depth = -100; // make sure player stays on top
    player.setPosition(64, 64);
    return player;
}

// mainPlayer's step()
function playerStep() {
    var x = Math.floor(mainPlayer.getX());
    var y = Math.floor(mainPlayer.getY());
    if ((x % tileSize < 5) && (y % tileSize < 5) && (mainPlayer.getSpeed() > 0)) {
        // "snap" to the grid
        mainPlayer.setSpeed(0);
        mainPlayer.setPosition(tileSize * Math.floor(x / tileSize), tileSize * Math.floor(y / tileSize));

        // see if we made it to the goal
        checkForWin();
    }
}

// mainPlayer's draw() - draw a grid
function playerDraw() {
    var drawingContext = Game.CanvasManager.getDrawingContext();
    
    for (var r = 0; r < tilesWide; r++) {
        drawingContext.beginPath();
        drawingContext.moveTo(r * tileSize, 0);
        drawingContext.lineTo(r * tileSize, height);
        drawingContext.stroke();
    }

    for (var c = 0; c < tilesTall; c++) {
        drawingContext.beginPath();
        drawingContext.moveTo(0, c * tileSize);
        drawingContext.lineTo(width, c * tileSize);
        drawingContext.stroke();
    }
}

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

// builds and returns the goal Entity object
function buildGoalEntity() {
    var goal = new Entity(null, 'goal');
    goal.setImage(Game.Assets.Images.getById('flag'));
    goal.setX(Game.CanvasManager.getCanvasWidth() - 128);
    goal.setY(Game.CanvasManager.getCanvasHeight() - 128);
    return goal;
}

function buildWallMap(ctrl) {
    var levelMap = {
        0: '##########',
        1: '#        #',
        2: '#####    #',
        3: '#        #',
        4: '# #  ### #',
        5: '# #  #   #',
        6: '#        #',
        7: '##########'
    }

    var rowCount = 8; 

    for (var i = 0; i < rowCount; i++) {
        var row = levelMap[i];
        for (var j = 0; j < row.length; j++) {
            if (row.charAt(j) === '#') {
                var wall = new Entity('wall', 0);
                wall.setImage(Game.Assets.Images.getById('stone'));
                wall.setX(j * tileSize);
                wall.setY(i * tileSize);
                ctrl.addEntity(wall);
            }
        }
    }
}

// kick it off
buildAndRun();