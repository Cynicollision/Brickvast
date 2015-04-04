/// <reference path="namespace.js" />

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
    // initialize Canvas, Images, and Audio
    vastengine.Canvas.buildCanvas();
    vastengine.Images = new vastengine.AssetManager(vastengine.AssetType.IMAGE);
    vastengine.Audio = new vastengine.AssetManager(vastengine.AssetType.AUDIO);

    // default state is stopped. run() must be called to start the game.
    var activeController, state = vastengine.GameState.STOPPED;

    return {
        /**
         * Sets the game state, used to pause and resume the game loop.
         * @param {GameState} state.
         */
        setState: function (newState) {
            state = newState;
        },

        getState: function () {
            return state;
        },

        /** 
         * Sets the running Controller to the given Controller object.
         * @param {Controller} controller.
         */
        setActiveController: function (newActiveController) {
            activeController = newActiveController;
        },

        /** 
         * Returns the running Controller
         */
        getActiveController: function () {
            return activeController;
        },

        /**
         * The main game loop. Keeps the game running at a fixed FPS.
         */
        run: function () {
            var stepSize, previous, now, offset = 0;
            stepSize = 1 / vastengine.Config.gameSpeed;
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

                vastengine.Canvas.draw();

                previous = current;
                requestAnimationFrame(stepAndDraw);
            }

            vastengine.Canvas.updateCanvasSize();
            vastengine.Canvas.setVisible(true);
            requestAnimationFrame(stepAndDraw);
        },

        /**
         * For throwing exceptions by errors raised by vastengine itself.
         * @param {string} message Error message.
         * @param {string} (optional) e Inner exception.
         */
        setError: function (message, e) {
            var error = "vastengine error: ";
            if (message) {
                error += message;
            }
            if (e) {
                error += '\n\n' + e;
            }

            throw error;
        }
    };
}());
