function buildAndRun() {
    $vast.Game.init();

    var text = 'Click to be PROMPTED!!!';

    // set the background color
    $vast.Game.Canvas.setBackgroundColor('#ecc');

    // set up Controller;
    var ctrl = new $vast.Controller();
    $vast.Game.setActiveController(ctrl);
    ctrl.setOnTouch(function () {
        var dialog = new $vast.Dialog('Hello, world! Here is a whole bunch of text that hopefully fits in this dialog.', 250, 350, ['vast1', 'vast2'], choiceMade);
        $vast.Game.setDialog(dialog);
    });

    function choiceMade(index) {
        text = 'You picked ' + index + '!';
    }

    // show some text
    var ent = new $vast.Entity();
    ent.setSpeed(10);
    ent.setDirection(90);

    ent.setDraw(function () {
        var context = $vast.Game.Canvas.getDrawingContext();
        context.font = '48px "Courier New"';
        context.fillText(text, 25, ent.y);
    });
    ctrl.addEntity(ent);

    // run the game
    $vast.Game.run();
}


buildAndRun();