/// <reference path="Game.js" />
/// <reference path="Canvas.js" />

var vastengine = vastengine || {};
(function () {
    /**
     * Used specifically for manipulating directly the main game canvas, i.e. drawing on it.
     * @constructor
     */
    vastengine.CanvasManager = function () {
        this.canvas = this.buildCanvas();
        this.backgroundScrollFactor = 1;
        this.scaleFactor = 2;

        // forward the mousedown event to the input handler.
        this.canvas.onmousedown = function (e) {
            vastengine.Input.onTouch(e);
        };

        // forward the mouseup event to the input handler..
        this.canvas.onmouseup = function (e) {
            vastengine.Input.onTouchEnd(e);
        };
    };

    vastengine.CanvasManager.prototype = {

        /** 
         * build the HTML canvas and insert into the DOM.
         * @return {Object} Reference to the canvas that was built.
         */
        buildCanvas: function () {
            var canvas = document.createElement('canvas');
            canvas.id = 'vastCanvas';
            canvas.className = 'canvasStlye';

            // TODO: move to Config, add default width/height
            var fullscreen = true;

            if (fullscreen) {
                canvas.width = window.innerWidth;
                canvas.height = window.innerHeight;
            } else {
                canvas.width = 640;
                canvas.height = 480;
            }

            document.body.appendChild(canvas);
            return canvas;
        },

        /**
         * Retrieves a reference of the 2D drawing context.
         * @return {object} 2D drawing context of the game's canvas.
         */
        getDrawingContext: function () {
            return this.canvas.getContext('2d');
        },

        /**
         * Sets the background-color property of the game canvas.
         * @param {string} color CSS color value.
         */
        setBackgroundColor: function (color) {
            this.canvas.style.background = color;
        },

        /**
         * Sets the background-image property of the game canvas.
         * @param {string} url URL to image resource to use as background image.
         * @param {boolean} Whether to tile the background image or not.
         */
        setBackgroundImage: function (url, tiled) {
            this.canvas.style.backgroundImage = 'url(' + url + ')';
            if (!tiled) {
                this.canvas.style.backgroundRepeat = 'no-repeat';
            }
        },

        /**
         * Sets the background-position property of the game canvas.
         * @param {number} x New X-offset from origin.
         * @param {number} y New Y-offset from origin.
         */
        setBackgroundPosition: function (x, y) {
            this.canvas.style.backgroundPosition = x + 'px ' + y + 'px';
        },

        /**
         * Sets the scroll factor (ratio) for the background image. A value of 0 results 
         * in a fixed background and a value of 1 results in the background scrolling 
         * proportionally to the active controller's view position.
         * @param {number} factor Scroll factor (ratio to active controller's view position).
         */
        setScrollFactor: function (factor) {
            this.backgroundScrollFactor = factor;
        },

        /**
         * Retrieves the width of the game canvas.
         * @return {number} Width of the game canvas.
         */
        getCanvasWidth: function () {
            return this.canvas.width;
        },

        /**
         * Retrieve the height of the game canvas.
         * @return {number} Height of the game canvas.
         */
        getCanvasHeight: function () {
            return this.canvas.height;
        },

        /**
         * Sets the width and height of the HTML canvas.
         * @param {number} w New width for the canvas.
         * @param {number} h New height for the canvas.
         */
        setCanvasSize: function (w, h) {
            this.canvas.width = w;
            this.canvas.height = h;
        },

        /**
         * Sets the scale ratio for the canvas.
         * @param {number} Scale ratio.
         */
        setScale: function (factor) {
            this.scaleFactor = factor;
        },

        /**
         * Gets a single scaling ratio of the canvas.
         */
        getScale: function () {
            return this.scaleFactor;
        },

        /**
         * Retrieve the horizontal position of the view.
         * @return {number} X-coordinate of the given Controller object's view property.
         */
        getViewRelativeX: function (controller) {
            if (controller.view !== undefined) {
                return controller.view.x;
            } else {
                return 0;
            }
        },

        /**
         * Retrieve the vertical position of the view.
         * @return {number} Y-coordinate of the given Controller object's view property.
         */
        getViewRelativeY: function (controller) {
            if (controller.view !== undefined) {
                return controller.view.y;
            } else {
                return 0;
            }
        },

        /**
         * Draw directly on the canvas, passing a delegate function to call with the Canvas's 2D drawing context.
         * @param {function} Delegate to call, passing the Canvas's 2D drawing context.
         */
        drawElement: function (func) {
            var context = this.getDrawingContext();
            context.save();
            func(this.getDrawingContext());
            context.restore();
        },

        /**
         * Clears the game canvas and draws the given Controller object. Draws the given controller's managed entities relative to its view.
         * @param {Controller} controller Controller object to draw.
         */
        drawController: function (controller) {
            // clear and save the drawing context, then scale.
            var context = this.getDrawingContext();
            context.clearRect(0, 0, this.canvas.width, this.canvas.height);
            context.save();
            context.scale(this.scaleFactor, this.scaleFactor);

            // translate context to account for scaling if scale mode is "from center"
            var translateX = (this.getCanvasWidth() - (this.getCanvasWidth() / this.scaleFactor)) / 2;
            var translateY = (this.getCanvasHeight() - (this.getCanvasHeight() / this.scaleFactor)) / 2;
            if (vastengine.Config.getProperty('scale_center')) {
                context.translate(-translateX, -translateY);
            }

            // get relative (x,y) to the location of the controller's view.
            var relativeX = this.getViewRelativeX(controller);
            var relativeY = this.getViewRelativeY(controller);

            // adjust the background position according to the relative (x, y) of the view.
            this.setBackgroundPosition(-relativeX * this.backgroundScrollFactor, -relativeY * this.backgroundScrollFactor);

            // draw entities (sorted in reverse order by depth) at their positions relative to the view.
            controller.sortEntities();
            var entities = controller.getEntities();
            for (var i = 0; i < entities.length; i++) {
                // first call each Entitiy's draw() ...
                if (entities[i].draw) {
                    entities[i].draw();
                }

                // ...then draw its Image.
                if (entities[i]) {
                    var sprite = entities[i].getSprite();
                    if (sprite) {
                        sprite.draw(context, entities[i].x - relativeX, entities[i].y - relativeY);
                    }   
                }
            }

            // restore the drawing context.
            this.getDrawingContext().restore();
        }
    };
})();