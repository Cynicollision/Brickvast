function buildAndRun() {
    // loading assets should be done before calling Game.run
    Game.Assets.Images.add('tile', 'images/tile.png');
    Game.Assets.Images.load();

    // set up the "controller" with the two test Entity objects
    var ctrl = new Controller();
    ctrl.addEntity(buildEntityOne());
    ctrl.addEntity(buildEntityTwo());
    Game.setActiveController(ctrl);

    // set the background color
    Game.CanvasManager.setBackgroundColor('#cce');

    // run the game
    Game.run();
}

function buildEntityOne() {
    // set up an Entity with an image and position
    var testEntOne = new Entity(null, 1);
    testEntOne.setImage(Game.Assets.Images.getById('tile'));
    testEntOne.setPosition(100, 100);

    return testEntOne;
}

function buildEntityTwo() {
    // set up an Entity with no image
    var testEntTwo = new Entity(null, 2);

    // draw some text by overridding the draw() method
    testEntTwo.draw = function () {
        var drawingContext = Game.CanvasManager.getDrawingContext();
        drawingContext.font = '48px "Courier New"';
        drawingContext.fillText('Hello World!', 250, 100);
    }

    return testEntTwo;
}

buildAndRun();