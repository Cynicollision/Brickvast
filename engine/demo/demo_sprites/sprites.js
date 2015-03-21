(function () {
    $vast.Game.init();
    $vast.Game.Canvas.setBackgroundColor('#5B9');

    $vast.Game.Images.add('sheet0', '../images/walk.png');
    $vast.Game.Images.load();

    var srcImage = $vast.Game.Images.getById('sheet0');
    var sprite0 = $vast.Sprite.buildFromSheet(srcImage, 64, 64, 0, 3);

    var ent = new $vast.Entity(0, 0);
    ent.setDraw(animate);

    var ctrl = new $vast.Controller();
    ctrl.addEntity(ent);

    function animate() {
        $vast.Game.Canvas.drawElement(function (context) {
            sprite0.update();
            sprite0.draw(context, 25, 100);
        })
    }

    $vast.Game.setActiveController(ctrl);
    $vast.Game.run();
})();