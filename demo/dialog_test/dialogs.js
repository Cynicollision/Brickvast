function buildAndRun() {
    $vast.Game.init();

    // set the background color
    $vast.Game.Canvas.setBackgroundColor('#ecc');

    // set up Controller;
    var ctrl = new $vast.Controller();
    $vast.Game.setActiveController(ctrl);
    ctrl.setOnTouch(function () {
        var dialog = new $vast.Dialog('Hello, world!', 250, 350, ['vast', 'vaster']);
        $vast.Game.setDialog(dialog);
    });

    // show some text
    var ent = new $vast.Entity();
    ent.setSpeed(10);
    ent.setDirection(90);

    ent.setDraw(function () {
        var context = $vast.Game.Canvas.getDrawingContext();
        context.font = '48px "Courier New"';
        context.fillText('Click to be PROMPTED!!!', 25, ent.y);
    });
    ctrl.addEntity(ent);

    // run the game
    $vast.Game.run();
}


buildAndRun();