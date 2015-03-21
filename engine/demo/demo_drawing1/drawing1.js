function buildAndRun() {
    $vast.Game.init();

    // loading assets should be done before calling Game.run
    $vast.Images.add('tile', '../images/tile.png');
    $vast.Images.load();

    // set up the "controller" with the two test Entity objects
    var ctrl = new $vast.Controller();
    ctrl.addEntity(buildEntityOne());
    ctrl.addEntity(buildEntityTwo());
    $vast.Game.setActiveController(ctrl);

    // set the background color
    $vast.Canvas.setBackgroundColor('#cce');

    // run the game
    $vast.Game.run();
}

function buildEntityOne() {
    // set up an Entity with an image and position
    var testEntOne = new $vast.Entity(null, 1);
    testEntOne.setImage($vast.Images.getById('tile'));
    testEntOne.setPosition(100, 100);

    return testEntOne;
}

function buildEntityTwo() {
    // set up an Entity with no image
    var testEntTwo = new $vast.Entity(null, 2);

    // draw some text by overridding the draw() method
    testEntTwo.setDraw(function () {
        var context = $vast.Canvas.getDrawingContext();
        context.font = '48px "Courier New"';
        context.fillText('Hello World!', 250, 100);
    });

    return testEntTwo;
}

buildAndRun();