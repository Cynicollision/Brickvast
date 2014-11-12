function buildAndRun() {
    $vast.Game.init();

    var DIALOG_TEXT = 'Hello, world! Here is a whole bunch of text that hopefully fits in this dialog.';
    var text = 'Click to be PROMPTED!!!';

    // set the background color
    $vast.Game.Canvas.setBackgroundColor('#ecc');

    // set up Controller;
    var ctrl = new $vast.Controller();
    $vast.Game.setActiveController(ctrl);
    ctrl.setOnTouch(function () {
        var dialog = new $vast.Dialog(DIALOG_TEXT, 250, 350, ['vast1', 'vast2'], function (choice) {
            //var d2 = new $vast.Dialog('you', 250, 350, ['OK']);
            //$vast.Game.setDialog(d2);
            text = 'You picked ' + choice + '!';
        });
        $vast.Game.setDialog(dialog);
    });


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