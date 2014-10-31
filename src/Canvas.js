/**
 * Used specifically for manipulating directly the main game canvas, i.e. drawing on it.
 * @constructor
 */
function Canvas() {
    this.canvas = $('#theCanvas');
    this.context = this.canvas[0].getContext('2d');

    // forward the event to the Game's active controller
    this.canvas.mousedown(function (e) {
        if (Game.getActiveController() !== undefined) {
            Game.getActiveController().mousedown(e);
        }
    });

    // forward the event to the Game's active controller
    this.canvas.mouseup(function (e) {
        if (Game.getActiveController() !== undefined) {
            Game.getActiveController().mouseup(e);
        }
    });
}


/**
 * Retrieves a reference of the 2D drawing context.
 * @return {object} 2D drawing context of the game's canvas.
 */
Canvas.prototype.getDrawingContext = function () {
    return this.context;
}


/**
 * Sets the background-color property of the game canvas.
 * @param {string} color CSS color value.
 */
Canvas.prototype.setBackgroundColor = function (color) {
    this.canvas.css('background', color);
}


/**
 * Sets the background-image property of the game canvas.
 * @param {string} url URL to image resource to use as background image.
 * @param {boolean} Whether to tile the background image or not.
 */
Canvas.prototype.setBackgroundImage = function (url, tiled) {
    this.canvas.css('background-image', 'url(' + url + ')');
    if (!tiled) {
        this.canvas.css('background-repeat', 'no-repeat');
    }
}


/**
 * Sets the background-position property of the game canvas.
 * @param {number} x New X-offset from origin.
 * @param {number} y New Y-offset from origin.
 */
Canvas.prototype.setBackgroundPosition = function (x, y) {
    this.canvas.css('background-position', x + 'px ' + y + 'px');
}


/**
 * Retrieves the width of the game canvas.
 * @return {number} Width of the game canvas.
 */
Canvas.prototype.getCanvasWidth = function () {
    return this.canvas[0].width;
}


/**
 * Retrieve the height of the game canvas.
 * @return {number} Height of the game canvas.
 */
Canvas.prototype.getCanvasHeight = function () {
    return this.canvas[0].height;
}


/**
 * Retrieve the horizontal position of the view.
 * @return {number} X-coordinate of the given Controller object's view property.
 */
Canvas.prototype.getViewRelativeX = function (controller) {
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
Canvas.prototype.getViewRelativeY = function (controller) {
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
Canvas.prototype.draw = function (controller) {
    // clear the entire canvas
    this.context.clearRect(0, 0, this.canvas[0].width, this.canvas[0].height);

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
}