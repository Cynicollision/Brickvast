
var vastengine = vastengine || {};
var $vast = vastengine;

/**
 * Manages game-level components such as the currently running Controller object, routing input, and accessing assets through AssetManager instances.
 * @constructor
 */
vastengine.Game = function() {
    this.activeController = null;
};


/**
 * Game-level constants. Intended to be overridden as the first step of game setup (or use these defaults).
 */
vastengine.Game.Config = {
    fps: 60
};


/** 
 * Sets the running Controller to the given Controller object.
 */
vastengine.Game.setActiveController = function (newActiveController) {
    this.activeController = newActiveController;
};


/** 
 * Returns the running Controller
 */
vastengine.Game.getActiveController = function () {
    return this.activeController;
};


/**
 * Determines whether a Controller object has been assigned as the active controller.
 * @return {boolean} True if an active controller exists.
 */
vastengine.Game.hasActiveControler = function () {
    if (this.activeController) {
        return this.activeController.view !== undefined;
    }
    return false;
};


/**
 * Get the current timestamp (e.g. 87.134....)
 * @return {number} The current timestamp
 */
vastengine.Game.getTimestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};


/**
 * Initializes all game-level resources. Must be called first when setting up the game.
 */
vastengine.Game.init = function () {
    vastengine.Game.Input = new vastengine.Input();
    vastengine.Game.Images = new vastengine.AssetManager(vastengine.AssetType.IMAGE);
    vastengine.Game.Audio = new vastengine.AssetManager(vastengine.AssetType.AUDIO);
    vastengine.Game.Canvas = new vastengine.Canvas();
};


/**
 * The main game loop. Keeps the game running at a fixed FPS.
 */
vastengine.Game.run = function () {
    

    var fps = vastengine.Game.Config.fps;
    var stepSize = 1 / fps;
    var offset = 0;
    var previous = vastengine.Game.getTimestamp();

    function stepAndDraw() {
        var current = vastengine.Game.getTimestamp();
        offset += (Math.min(1, (current - previous) / 1000));

        // still step during the offset (time difference between frames)
        while (offset > stepSize) {
            if (vastengine.Game.hasActiveControler()) {
                vastengine.Game.getActiveController().step(stepSize);
            }
            
            offset -= stepSize;
        }

        // draw
        if (vastengine.Game.hasActiveControler()) {
            vastengine.Game.Canvas.draw(vastengine.Game.getActiveController());
        }
        
        previous = current;
        requestAnimationFrame(stepAndDraw);
    }

    requestAnimationFrame(stepAndDraw);
};
