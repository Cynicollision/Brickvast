var vastengine = vastengine || {};

var CanvasScaleMode = {
    NONE: 0,
    TO_FIT: 1,
    COVER: 2
}

/**
 * Used specifically for manipulating directly the main game canvas, i.e. drawing on it.
 * @constructor
 */
vastengine.Canvas = function () {
    this.scaleX = 1;
    this.scaleY = 1;

    // build the HTML canvas and insert into the DOM.
    this.canvas = document.createElement('canvas');
    this.canvas.id = 'vastCanvas';
    this.setCanvasSize(640, 512);
    this.context = this.canvas.getContext('2d');
    document.body.appendChild(this.canvas);

    // forward the mousedown event to the Game's active controller.
    this.canvas.onmousedown = function (e) {
        if (vastengine.Game.getActiveController() !== undefined) {
            vastengine.Game.getActiveController().mousedown(e.pageX, e.pageY);
        }
    }

    // forward the mouseup event to the Game's active controller.
    this.canvas.onmouseup = function (e) {
        if (vastengine.Game.getActiveController() !== undefined) {
            vastengine.Game.getActiveController().mouseup(e.pageX, e.pageY);
        }
    }
}


/**
 * Retrieves a reference of the 2D drawing context.
 * @return {object} 2D drawing context of the game's canvas.
 */
vastengine.Canvas.prototype.getDrawingContext = function () {
    return this.context;
}


/**
 * Sets the background-color property of the game canvas.
 * @param {string} color CSS color value.
 */
vastengine.Canvas.prototype.setBackgroundColor = function (color) {
    //this.canvas.css('background', color);
    this.canvas.style.background = color;
}


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
}


/**
 * Sets the background-position property of the game canvas.
 * @param {number} x New X-offset from origin.
 * @param {number} y New Y-offset from origin.
 */
vastengine.Canvas.prototype.setBackgroundPosition = function (x, y) {
    this.canvas.style.backgroundPosition = x + 'px ' + y + 'px';
}


/**
 * Retrieves the width of the game canvas.
 * @return {number} Width of the game canvas.
 */
vastengine.Canvas.prototype.getCanvasWidth = function () {
    return this.canvas.width;
}


/**
 * Retrieve the height of the game canvas.
 * @return {number} Height of the game canvas.
 */
vastengine.Canvas.prototype.getCanvasHeight = function () {
    return this.canvas.height;
}


/**
 * Sets the width and height of the HTML canvas.
 * @param {number} w New width for the canvas.
 * @param {number} h New height for the canvas.
 */
vastengine.Canvas.prototype.setCanvasSize = function (w, h) {
    this.canvas.width = w;
    this.canvas.height = h;
}


/**
 * Sets the scaling mode of the canvas.
 * @param {CanvasScaleMode} scaleMode New scale mode.
 */
vastengine.Canvas.prototype.setScaleMode = function (scaleMode) {
    this.scaleMode = scaleMode;
}


/**
 * Scales the canvas to fill the available visible area.
 * Default is to scale to fill the window.
 * @param {number} scaleX Specific horizontal scale ratio.
 * @param {number} scaleY Specific vertical scale ratio.
 */
vastengine.Canvas.prototype.setCanvasScale = function (scaleX, scaleY) {
    if (!scaleX) {
        var scaleX = window.innerWidth / this.canvas.width;
    }
    
    if (!scaleY) {
        var scaleY = window.innerHeight / this.canvas.height;
    }

    this.scaleX = scaleX;
    this.scaleY = scaleY;

    var scale = this.getScale();
    this.canvas.style.transformOrigin = "0 0";
    this.canvas.style.transform = "scale(" + scale + ")";
}


/**
 * Gets a single scaling ratio depending on the current CanvasScaleMode.
 */
vastengine.Canvas.prototype.getScale = function () {
    switch (this.scaleMode) {
        case CanvasScaleMode.COVER:
            return Math.max(this.scaleX, this.scaleY);
            break;
        case CanvasScaleMode.TO_FIT:
            return Math.min(this.scaleX, this.scaleY);
            break;
        case CanvasScaleMode.NONE:
        default:
            return 1;
            break;
    }
}


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
}


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
}


/**
 * Clears the game canvas and draws the given Controller object. Draws the given controller's managed entities relative to its view.
 * @param {Controller} controller Controller object to draw.
 */
vastengine.Canvas.prototype.draw = function (controller) {
    // clear the entire canvas
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);

    // get relative (x,y) to the location of the controller's view
    var relativeX = this.getViewRelativeX(controller);
    var relativeY = this.getViewRelativeY(controller);

    // adjust the background position according to the relative (x, y)
    this.setBackgroundPosition(-relativeX, -relativeY);

    // draw entities (sorted in reverse order by depth): call each Entitiy's draw() then draw its Image
    controller.sortEntities();
    var entities = controller.getEntities();
    for (var i = 0; i < entities.length; i++) {
        entities[i].draw();

        var img = entities[i].getImage();
        if (img !== undefined) {
            this.context.drawImage(img, entities[i].x - relativeX, entities[i].y - relativeY);
        }
    }

    // do scaling
    this.setCanvasScale();
}