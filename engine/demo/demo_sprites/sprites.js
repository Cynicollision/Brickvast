(function () {
    $vast.Game.init();
    $vast.Canvas.setBackgroundColor('#5B9');

    $vast.Images.add('sheet0', '../images/walk.png');
    $vast.Images.load();

    var srcImage = $vast.Images.getById('sheet0');
    var sprite0 = $vast.Sprite.buildFromSheet(srcImage, 64, 64, 0, 3);

    var ent = new $vast.Entity(0, 0);
    ent.setDraw(function () {
        $vast.Canvas.drawElement(function (context) {
            sprite0.update();
            sprite0.draw(context, 25, 100);
        })
    });

    var ctrl = new $vast.Controller();
    ctrl.addEntity(ent);

    $vast.Game.setActiveController(ctrl);
    $vast.Game.run();
})();