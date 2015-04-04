/// <reference path="C:\Users\Sean\workspace\vastengine\engine\src/Entity.js" />
/// <reference path="C:\Users\Sean\workspace\vastengine\engine\src/Sprite.js" />
(function () {
    // images
    $vast.Images.add('sun', '../images/sun.jpg');
    $vast.Images.add('stone', '../images/stone.png');
    $vast.Images.add('badguy', '../images/enemy.png');
    $vast.Images.load();

    // build the game
    var room1 = buildController1();
    var room2 = buildController2();
    var room3 = buildController3();
    setRoom(room1);
    $vast.Game.run();

    function setRoom(room) {
        $vast.Canvas.setBackgroundColor(room.bgcolor);
        $vast.Game.setActiveController(room);
    }

    function buildController1() {
        var ent = new $vast.Entity();
        ent.setPosition(400, 100);
        ent.setSize(64, 64); // TODO: set size from image somehow?
        ent.setOnTouch(function () {
            setRoom(room2);
        });

        var sprite = $vast.Sprite.fromImage($vast.Images.getById('sun'), 64, 64);
        ent.setSprite(sprite);

        var ctrl = new $vast.Controller();
        ctrl.addEntity(ent);
        ctrl.bgcolor = '#00B';
        return ctrl;
    };

    function buildController2() {
        var ent = new $vast.Entity();
        ent.setPosition(100, 100);
        ent.setSize(64, 64);
        ent.setOnTouch(function () {
            setRoom(room3);
        });

        var sprite = $vast.Sprite.fromImage($vast.Images.getById('stone'), 64, 64);
        ent.setSprite(sprite);

        var ctrl = new $vast.Controller();
        ctrl.addEntity(ent);
        ctrl.bgcolor = '#B00';
        return ctrl;
    };

    function buildController3() {
        var ent = new $vast.Entity();
        ent.setPosition(100, 400);
        ent.setSize(64, 64);
        ent.setOnTouch(function () {
            setRoom(room1);
        });

        var sprite = $vast.Sprite.fromImage($vast.Images.getById('badguy'), 64, 64);
        ent.setSprite(sprite);

        var ctrl = new $vast.Controller();
        ctrl.addEntity(ent);
        ctrl.bgcolor = '#0B0';
        return ctrl;
    };
    
})();
