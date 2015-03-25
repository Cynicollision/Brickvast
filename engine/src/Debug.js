var vastengine = vastengine || {};

vastengine.Debug = (function () {
    var _properties = {
        'show_fps': false
    };

    this.setProperty = function (name, value) {
        if (_properties[name] !== undefined) {
            _properties[name] = value;
        } else {
            vastengine.Game.setError('Unknown property: ' + name);
        }
    };

    this.getProperty = function (name) {
        return _properties[name];
    };

    /**
     * Draws any debug-related elements on the canvas.
     */
    this.draw = function () {
        if (_properties) {
            vastengine.Canvas.drawElement(function (context) {
                context.fillStyle = "White";
                context.font = "normal 16pt Arial";
                context.fillText(this.getCurrentFPS() + " fps", 64, 96);
            });
        }
    };

    /**
     * Returns the current FPS measured every one second.
     * Credit: http://stackoverflow.com/questions/8279729/calculate-fps-in-canvas-using-requestanimationframe
     * @return {number} Current FPS.
     */
    this.getCurrentFPS = (function () {
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

    return this;
})();
