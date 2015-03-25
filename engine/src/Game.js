/// <reference path="Debug.js" />
/// <reference path="Canvas.js" />
var vastengine = vastengine || {};
var $vast = vastengine;

/**
 * Enum of states that the game loop can be in (stopped or running).
 * @enum {number}
 */
vastengine.GameState = {
    STOPPED: 0,
    RUNNING: 1
};

/**
 * Manages game-level components such as the currently running Controller object, routing input, and accessing assets through AssetManager instances.
 * @constructor
 */
vastengine.Game = (function () {
    // default state is stopped. run() must be called to start the game.
    var activeController, state = vastengine.GameState.STOPPED;

    /**
     * Sets the game state, used to pause and resume the game loop.
     * @param {GameState} state.
     */
    this.setState = function (state) {
        state = state;
    };

    /** 
     * Sets the running Controller to the given Controller object.
     * @param {Controller} controller.
     */
    this.setActiveController = function (newActiveController) {
        activeController = newActiveController;
    };

    /** 
     * Returns the running Controller
     */
    this.getActiveController = function () {
        return activeController;
    };


    /**
     * Initializes all game-level resources. Must be called first when setting up the game.
     */
    // TODO: eliminate this, rename Canvas back, can be declared as static classes in their own files.
    this.init = function () {
        vastengine.Images = new vastengine.AssetManager(vastengine.AssetType.IMAGE);
        vastengine.Audio = new vastengine.AssetManager(vastengine.AssetType.AUDIO);
        vastengine.Canvas = new vastengine.CanvasManager();
    };

    /**
     * The main game loop. Keeps the game running at a fixed FPS.
     */
    this.run = function () {
        var stepSize, previous, state, now, offset = 0;
        stepSize = 1 / vastengine.Config.getProperty('game_speed');
        state = vastengine.GameState.RUNNING;
        now = (function () {
            return function () {
                if (window.performance && window.performance.now) {
                    return window.performance.now();
                } else {
                    return (new Date()).getTime();
                }
            };
        })();

        previous = now();

        function stepAndDraw() {
            var current = now();
            offset += (Math.min(1, (current - previous) / 1000));

            while (offset > stepSize) {
                if (state === vastengine.GameState.RUNNING) {
                    if (activeController) {
                        activeController.step(stepSize);
                    }
                }

                offset -= stepSize;
            }

            if (activeController) {
                vastengine.Canvas.drawController(activeController);
            }

            if (vastengine.Debug) {
                vastengine.Debug.draw();
            }

            previous = current;
            requestAnimationFrame(stepAndDraw);
        }

        requestAnimationFrame(stepAndDraw);
    };

    /**
     * For throwing exceptions by errors raised by vastengine itself.
     * @param {string} message Error message.
     * @param {string} (optional) e Inner exception.
     */
    this.setError = function (message, e) {
        var error = "vastengine error: ";
        if (message) {
            error += message;
        }
        if (e) {
            error += '\n\n' + e;
        }

        throw error;
    };

    return this;
})();
