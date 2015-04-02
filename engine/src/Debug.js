/// <reference path="namespace.js" />

vastengine.Debug = (function () {
    var drawableElements = [{ 0: 'showFPS' }, { 1: 'showEntityCount' }];

    /**
     * Returns the current FPS measured every one second.
     * Credit: http://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe
     * @return {number} Current FPS.
     */
    var getCurrentFPS = (function () {
        var lastLoop = (new Date()).getMilliseconds();
        var count = 1;
        var fps = 0;

        // this is awesome: 
        return function () {
            var currentLoop = (new Date()).getMilliseconds();
            if (lastLoop > currentLoop) {
                fps = count;
                count = 1;
            } else {
                count += 1;
            }
            lastLoop = currentLoop;
            return fps;
        };
    }());

    return {
        displayFont: 'normal 16pt Arial',
        displayColor: 'White',
        showDebug: false,
        /**
         * Draws any debug-related elements on the canvas.
         */
        draw: function () {
            if (this.showDebug) {
                vastengine.Canvas.drawElement(function (context) {
                    context.fillStyle = vastengine.Debug.displayColor;
                    context.font = vastengine.Debug.displayFont;
                    for (var i = 0; i < drawableElements.length; i++) {
                        var text = "";
                        // TODO: need a much better way to do this.
                        if (i === 0) {
                            text = "FPS: " + getCurrentFPS();
                        } else if (i === 1) {
                            var ctrl = vastengine.Game.getActiveController();
                            if (ctrl) {
                                text = "Entities: " + vastengine.Game.getActiveController().getEntities().length;
                            }
                        }

                        context.fillText(text, 16, 32 + (i * 16));
                    }
                    
                });
            }
        }
    };
}());
