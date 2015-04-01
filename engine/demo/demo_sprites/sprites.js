(function () {
    $vast.Debug.showFPS = true;

    $vast.Canvas.setBackgroundColor('rgb(33,66,99)');

    $vast.Images.add('sheet0', '../images/walk.png');
    $vast.Images.load();

    // build a 4-frame animated 64x64 sprite.
    var srcImage = $vast.Images.getById('sheet0');
    var sprite0 = $vast.Sprite.buildFromImage(srcImage, 64, 64, 0, 3);

    // set an Entity's sprite
    var ent = new $vast.Entity(0, 0);
    ent.setPosition(25, 150);
    ent.setSprite(sprite0);

    var ctrl = new $vast.Controller();
    ctrl.addEntity(ent);

    // alternate way doesn't work because step() is called before draw()
    // TODO: does Controller need a draw() that is called last?
    ctrl.setPostStep(function () {
        $vast.Canvas.drawElement(function (context) {
            sprite0.draw(context, 250, 250);
        });
    });
    

    $vast.Game.setActiveController(ctrl);
    $vast.Game.run();
})();