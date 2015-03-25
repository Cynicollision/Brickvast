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
vastengine.Game = function () {
    // TODO: move to own class.
    this.Config = {
        gameSpeed: 60,
        canvasWidth: window.innerWidth,
        canvasHeight: window.innerHeight,
        scaleFromCenter: false
    };

    var activeController = null;
    var activeDialog = null;
    var state = vastengine.GameState.STOPPED;

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
     * Pauses the game loop to launch the given Dialog object.
     * @param {Dialog} Dialog object to show.
     */
    // TODO: Dialog needs to be entirely external from the core engine.
    this.setDialog = function (dialog) {
        if (dialog) {
            activeDialog = dialog;
            activeDialog.setVisible(true);
            this.setState(vastengine.GameState.STOPPED);
        } else {
            this.setState(vastengine.GameState.RUNNING);
            this.activeDialog.setVisible(false);
            this.activeDialog = null;
        }
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
        var fpsActual = 0;
        var stepSize = 1 / vastengine.Game.Config.gameSpeed;
        var offset = 0;
        var previous = getTimestamp();
        state = vastengine.GameState.RUNNING;

        function getTimestamp() {
            if (window.performance && window.performance.now) {
                return window.performance.now();
            } else {
                return (new Date()).getTime();
            }
        }

        function stepAndDraw() {
            var current = getTimestamp();
            offset += (Math.min(1, (current - previous) / 1000));

            // perform all step operations
            while (offset > stepSize) {
                if (state === vastengine.GameState.RUNNING) {
                    if (activeController) {
                        activeController.step(stepSize);
                    }
                }

                offset -= stepSize;
            }

            // draw components
            if (activeController) {
                vastengine.Canvas.drawController(activeController);
            }

            if (activeDialog) {
                if (activeDialog.isVisible()) {
                    activeDialog.draw();
                }
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
}();
