//************************************************************************************//
// CanvasManager
//  Specifically for manipulating the main game canvas, i.e. drawing on it.
//
// Properties
//  context - The drawing context of that canvas.
//
// CanvasManager()
//  Constructor - store a reference to the 2D drawing context.
function CanvasManager() {
    this.canvas = $('#theCanvas');

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

    this.context = this.canvas[0].getContext('2d');
}

// TODO: test, document
CanvasManager.prototype.getDrawingContext = function () {
    return this.context;
}

// setBackgroundColor(newColor)
//  Sets the background-color property of the main game canvas to newColor.
CanvasManager.prototype.setBackgroundColor = function (color) {
    this.canvas.css('background', color);
}

// setBackgroundImage(newImage, tiled)
//  Sets the background-image property of the main canvas to the given image url amd tiled or not.
CanvasManager.prototype.setBackgroundImage = function (url, tiled) {
    this.canvas.css('background-image', 'url(' + url + ')');
    if (!tiled) {
        this.canvas.css('background-repeat', 'no-repeat');
    }
}

CanvasManager.prototype.setBackgroundPosition = function (x, y) {
    this.canvas.css('background-position', x + 'px ' + y + 'px');
}

CanvasManager.prototype.getCanvasWidth = function () {
    return this.canvas[0].width;
}

CanvasManager.prototype.getCanvasHeight = function () {
    return this.canvas[0].height;
}


// draw()
//  Clears the game canvas and draws the current controller (entities relative to viewport).
CanvasManager.prototype.draw = function (controller) {
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

// getViewRelativeX()
//  Returns the x-coordinate of the given Controller's view
CanvasManager.prototype.getViewRelativeX = function (controller) {
    if (controller.view !== undefined) {
        return controller.view.x;
    } else {
        return 0;
    }
}

// getViewRelativeY()
//  Returns the y-coordinate of the given Controller's view
CanvasManager.prototype.getViewRelativeY = function (controller) {
    if (controller.view !== undefined) {
        return controller.view.y;
    } else {
        return 0;
    }
}
