//************************************************************************************//
// Game 
//  Manages game-level components such as the currently running Controller object, 
//  routing input, and accessing assets through AssetManager instances.
//
// Properties
//  activeController    - The "running" Controller object: whose step() and draw() are called.
//
function Game() {
    this.activeController;
}

Game.Assets = function () { }
Game.Assets.Images = new AssetManager('image');
Game.Assets.Audio = new AssetManager('audio');
Game.CanvasManager = new CanvasManager();

// Game.setActiveController(newActiveController)
//  Sets the running Controller to the given Controller object.
Game.setActiveController = function (newActiveController) {
    this.activeController = newActiveController;
}

// Game.getActiveController()
//  Returns the running Controller
Game.getActiveController = function () {
    return this.activeController;
}

Game.hasActiveControler = function () {
    return this.activeController !== undefined;
}

// Game.getTimestamp()
//  Returns the current timestamp (e.g. 87.134....)
Game.getTimestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// Game.run()
//  The main game loop. Keeps the game running at a fixed FPS.
//  Note: this will fail if there is no active Controller!
Game.run = function () {
    var stepSize = 1 / 60; // TODO: load from "global game settings" (whatever those end up being)
    var offset = 0;
    var previous = Game.getTimestamp()

    function stepAndDraw() {
        var current = Game.getTimestamp();
        offset += (Math.min(1, (current - previous) / 1000));

        // still step during the offset (time difference between frames)
        while (offset > stepSize) {
            if (Game.hasActiveControler()) {
                Game.getActiveController().step(stepSize);
            }
            
            offset -= stepSize;
        }

        // draw
        if (Game.hasActiveControler()) {
            Game.CanvasManager.draw(Game.getActiveController());
        }
        
        previous = current;
        requestAnimationFrame(stepAndDraw);
    }

    requestAnimationFrame(stepAndDraw);
}