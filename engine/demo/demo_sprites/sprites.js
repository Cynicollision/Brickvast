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
    ent.setPosition(25, 150);

    // build a 4-frame animated 64x64 sprite.
    var srcImage = $vast.Images.getById('sheet0');
    ent.sprite = $vast.Sprite.buildFromImage(srcImage, 64, 64, 0, 3);

    var ctrl = new $vast.Controller();
    ctrl.addEntity(ent);

    $vast.Game.setActiveController(ctrl);
    $vast.Game.run();
})();