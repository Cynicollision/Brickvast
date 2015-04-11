(function () {
    $vast.Config.canvasWidth = 300;
    $vast.Config.canvasHeight = 300;
    //$vast.Config.fullScreen = true;
    //$vast.Config.scale = 2;
    $vast.Debug.showFPS = true;

    $vast.Canvas.setBackgroundColor('rgb(33,66,99)');

    $vast.Images.add('sheet0', '../images/walk.png');
    $vast.Images.load();

    var ent = new $vast.Entity(0, 0);
    ent.setPosition(0, 150);

    // build a 4-frame animated 64x64 sprite.
    var srcImage = $vast.Images.getById('sheet0');
    ent.sprite = $vast.Sprite.fromImage(srcImage, 64, 64, 0, 3);

    // call be used to change the sprite after the animation ends.
    ent.sprite.onAnimationEnd = function () {
        ent.x += 20;
    };

    // don't walk off the screen...
    ent.step = function () {
        if (this.x >= $vast.Canvas.getWidth() - this.sprite.width) {
            this.x = 0;
        }
    }

    var ctrl = new $vast.Controller();
    ctrl.addEntity(ent);

    $vast.Game.setActiveController(ctrl);
    $vast.Game.run();
})();