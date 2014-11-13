/// <reference path="Game.js" />
/// <reference path="Canvas.js" />

var vastengine = vastengine || {};


/**
 * Used specifically for manipulating directly the main game canvas, i.e. drawing on it.
 * @constructor
 */
vastengine.Canvas = function () {
    this.canvas = this.buildCanvas();
    this.contextDefaults = this.setContextDefaults();

    // forward the mousedown event to the Game's active controller.
    this.canvas.onmousedown = function (e) {
        vastengine.Game.Input.onTouch(e);
    };

    // forward the mouseup event to the Game's active controller.
    this.canvas.onmouseup = function (e) {
        vastengine.Game.Input.onTouchEnd(e);
    };
};


/**
 * Enumeration of ways to scale the canvas.
 */
vastengine.CanvasScaleMode = {
    NONE: 0,
    FIT: 1,
    COVER: 2
};


/** 
 * build the HTML canvas and insert into the DOM.
 * @return {Object} Reference to the canvas that was built.
 */
vastengine.Canvas.prototype.buildCanvas = function () {
    var canvas = document.createElement('canvas');
    canvas.id = 'vastCanvas';
    canvas.width = vastengine.Game.Config.canvasWidth;
    canvas.height = vastengine.Game.Config.canvasHeight;
    document.body.appendChild(canvas);
    return canvas;
};


/**
 * Retrieves a reference of the 2D drawing context.
 * @return {object} 2D drawing context of the game's canvas.
 */
vastengine.Canvas.prototype.getDrawingContext = function () {
    return this.canvas.getContext('2d');
};


/**
 * Sets the default properties of the drawing context. Should be called 
 * after any other object does drawing and sets font styles, colors, etc.
 * @return {Array.<Object>} Key-value list of context properties.
 */
vastengine.Canvas.prototype.setContextDefaults = function () {
    var defaults = [];
    var context = this.getDrawingContext();
    for (var property in context) {
        if (property != 'canvas') {
            defaults.push({ key: property, value: context[property] });
        }
    }
    return defaults;
};


/**
 * Resets the properties of the drawing context to the default.
 */
vastengine.Canvas.prototype.resetContext = function () {
    var context = this.getDrawingContext();
    for (var i = 0; i < this.contextDefaults.length; i++) {
        var property = this.contextDefaults[i];
        context[property.key] = property.value;
    }
};

/**
 * Sets the background-color property of the game canvas.
 * @param {string} color CSS color value.
 */
vastengine.Canvas.prototype.setBackgroundColor = function (color) {
    this.canvas.style.background = color;
};


/**
 * Sets the background-image property of the game canvas.
 * @param {string} url URL to image resource to use as background image.
 * @param {boolean} Whether to tile the background image or not.
 */
vastengine.Canvas.prototype.setBackgroundImage = function (url, tiled) {
    this.canvas.style.backgroundImage = 'url(' + url + ')';
    if (!tiled) {
        this.canvas.style.backgroundRepeat = 'no-repeat';
    }
};


/**
 * Sets the background-position property of the game canvas.
 * @param {number} x New X-offset from origin.
 * @param {number} y New Y-offset from origin.
 */
vastengine.Canvas.prototype.setBackgroundPosition = function (x, y) {
    this.canvas.style.backgroundPosition = x + 'px ' + y + 'px';
};


/**
 * Retrieves the width of the game canvas.
 * @return {number} Width of the game canvas.
 */
vastengine.Canvas.prototype.getCanvasWidth = function () {
    return this.canvas.width;
};


/**
 * Retrieve the height of the game canvas.
 * @return {number} Height of the game canvas.
 */
vastengine.Canvas.prototype.getCanvasHeight = function () {
    return this.canvas.height;
};


/**
 * Sets the width and height of the HTML canvas.
 * @param {number} w New width for the canvas.
 * @param {number} h New height for the canvas.
 */
vastengine.Canvas.prototype.setCanvasSize = function (w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
};


/**
 * Sets the scaling mode of the canvas.
 * @param {CanvasScaleMode} scaleMode New scale mode.
 */
vastengine.Canvas.prototype.setScaleMode = function (scaleMode) {
    this.scaleMode = scaleMode;
};


/**
 * Scales the canvas depending on the current CanvasScaleMode.
 */
vastengine.Canvas.prototype.scaleCanvas = function () {
    var scale = this.getScale();
    this.canvas.style.transformOrigin = "0 0";
    this.canvas.style.transform = "scale(" + scale + ")";
};


/**
 * Gets a single scaling ratio depending on the current CanvasScaleMode.
 */
vastengine.Canvas.prototype.getScale = function () {
    switch (this.scaleMode) {
        case vastengine.CanvasScaleMode.COVER:
            return Math.max(window.innerWidth / this.canvas.width, window.innerHeight / this.canvas.height);

        case vastengine.CanvasScaleMode.FIT:
            return Math.min(window.innerWidth / this.canvas.width, window.innerHeight / this.canvas.height);

        default:
            return 1;
    }
};


/**
 * Retrieve the horizontal position of the view.
 * @return {number} X-coordinate of the given Controller object's view property.
 */
vastengine.Canvas.prototype.getViewRelativeX = function (controller) {
    if (controller.view !== undefined) {
        return controller.view.x;
    } else {
        return 0;
    }
};


/**
 * Retrieve the vertical position of the view.
 * @return {number} Y-coordinate of the given Controller object's view property.
 */
vastengine.Canvas.prototype.getViewRelativeY = function (controller) {
    if (controller.view !== undefined) {
        return controller.view.y;
    } else {
        return 0;
    }
};


/**
 * Clears the game canvas and draws the given Controller object. Draws the given controller's managed entities relative to its view.
 * @param {Controller} controller Controller object to draw.
 */
vastengine.Canvas.prototype.draw = function (controller) {
    var context = this.getDrawingContext();
    context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // get relative (x,y) to the location of the controller's view
    var relativeX = this.getViewRelativeX(controller);
    var relativeY = this.getViewRelativeY(controller);

    // adjust the background position according to the relative (x, y)
    this.setBackgroundPosition(-relativeX, -relativeY);

    // draw entities (sorted in reverse order by depth).
    controller.sortEntities();
    var entities = controller.getEntities();
    for (var i = 0; i < entities.length; i++) {
        // first call each Entitiy's draw() 
        if (entities[i].draw) {
            entities[i].draw();
        }

        // then draw its Image.
        if (entities[i]) {
            var img = entities[i].getImage();
            if (img) {
                try {
                    context.drawImage(img, entities[i].x - relativeX, entities[i].y - relativeY);
                } catch (e) {
                    vastengine.Game.setError("Failed drawing entity image: " + img.src);
                }
            }
        }
    }

    // do scaling
    this.scaleCanvas();
};
