// a demo of sorts
function buildAndRun() {
    // loading assets probably should be done asynchonously, but before calling Game.run
    Game.Assets.Images.add('player', 'img/player.png');
    Game.Assets.Images.load();

    // configure game-specific stuff
    var myTestController = setupController();
    Game.setActiveController(myTestController);

    // set the background color
    Game.CanvasManager.setBackgroundColor("#59c");

    // run the game
    Game.run();
}


// instantiates and returns a controller
function setupController() {
    var testPlayerImage = Game.Assets.Images.getByName('player');

    // create some entities
    var player = new Entity('slowPlayer', 'player1');
    player.setImage(testPlayerImage);

    // what the player does, checks for, etc. every step
    player.step = function () {
        //this.x += 4;
    }

    var player2 = new Entity('fastPlayer');
    player2.setImage(testPlayerImage);
    player2.setX(300);
    player2.setY(300);

    var d = 0;

    player2.draw = function () {
        d += 2;
        if (d >= 180) {
            d = -180;
        }

        // testing lengthdir function
        var context = Game.CanvasManager.context;
        context.beginPath();
        x2 = 300 + MathUtil.getLengthDirectionX(50, d);
        y2 = 300 + MathUtil.getLengthDirectionY(50, d);
        context.moveTo(300, 300);
        context.lineTo(x2, y2);
        context.stroke();
    }

    // create a controller and add the entities to it
    var controller = new Controller();
    controller.addEntity(player);
    controller.addEntity(player2);

    // set speed and direction on player2
    player2.setSpeed(2);
    player2.setDirection(-45);

    controller.view.x = 50;
    controller.view.y = 50;

    // what the controller can check for after every step
    controller.postStep = function () {
        if (player.x > 800)
        {
            player.x = -50;
            player.y += 50;
        }
    }

    if (controller.getEntityById('player1') !== undefined) {
        var ent = controller.getEntityById('player1');
        // whatever you want to do with the specific entity
    }

    return controller;
}

buildAndRun();