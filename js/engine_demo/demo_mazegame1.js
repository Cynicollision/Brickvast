// set background color and load assets
Game.CanvasManager.setBackgroundColor('#cce');
Game.Assets.Images.add('sun', 'img/engine_demo/sun.jpg');
Game.Assets.Images.load();


// for drawing the grid
var tileSize = 64;
var width = Game.CanvasManager.getCanvasWidth();
var tilesWide = width / tileSize;
var height = Game.CanvasManager.getCanvasHeight();
var tilesTall = height / tileSize;

var mainPlayer = buildPlayerEntity();

function buildAndRun() {
    
    // set up the "controller" with the test Entity object
    var ctrl = new Controller();
    ctrl.addEntity(mainPlayer);
    ctrl.postmousedown = gameClick;
    Game.setActiveController(ctrl);

    // run the game
    Game.run();
}

function gameClick(e) {
    var speed = 50;
    var clickedTileX = Math.floor(e.pageX / tileSize);
    var clickedTileY = Math.floor(e.pageY / tileSize);
    var playerTileX = Math.floor(mainPlayer.x / tileSize);
    var playerTileY = Math.floor(mainPlayer.y / tileSize);

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

function getTileX(x) {
    return 
}

function getTileY(y) {
    return Math.floor(y / tileSize);
}


function buildPlayerEntity() {
    var player = new Entity(null, 'player');
    player.setImage(Game.Assets.Images.getById('sun'));

    player.step = playerStep;

    // player is also going to draw the grid
    player.draw = playerDraw;


    return player;
}

function playerStep() {
    var x = Math.floor(mainPlayer.getX());
    var y = Math.floor(mainPlayer.getY());
    if ((x % tileSize < 5) && (y % tileSize < 5) && (mainPlayer.getSpeed() > 0)) {
        mainPlayer.setSpeed(0);
        var newX = tileSize * Math.floor(x / tileSize);
        var newY = tileSize * Math.floor(y / tileSize);
        mainPlayer.setPosition(newX, newY);
    }
}

function playerDraw() {
    var context = Game.CanvasManager.getDrawingContext();
    
    for (var r = 0; r < tilesWide; r++) {
        context.beginPath();
        context.moveTo(r * tileSize, 0);
        context.lineTo(r * tileSize, height);
        context.stroke();
    }

    for (var c = 0; c < tilesTall; c++) {
        context.beginPath();
        context.moveTo(0, c * tileSize);
        context.lineTo(width, c * tileSize);
        context.stroke();
    }
}

buildAndRun();