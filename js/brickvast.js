

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
        this.x += 4;
    }

    var player2 = new Entity('fastPlayer');
    player2.setImage(testPlayerImage);
    player2.setY(200);
    player2.step = function () {
        this.x += 25;
    }

    // create a controller and add the entities to it
    var controller = new Controller();
    controller.addEntity(player);
    controller.addEntity(player2);

    // what the controller can check for after every step
    controller.postStep = function () {
        if (player.x > 800)
        {
            player.x = -100;
            player.y += 100;
        }

        if (player2.x > 800)
        {
            player2.x = -200;
            player2.y += 20;
        }
    }

    if (controller.getEntityById('player1') !== undefined) {
        var ent = controller.getEntityById('player1');
        // whatever you want to do with the specific entity
    }

    return controller;
}
