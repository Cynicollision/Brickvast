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
    this.theDOM = new TheDOM();
    this.context = this.theDOM.getCanvasContext().getContext('2d');
}

// TODO: test, document
CanvasManager.prototype.getDrawingContext = function () {
    return this.context;
}

// setBackgroundColor(newColor)
//  Sets the background-color property of the main game canvas to newColor.
CanvasManager.prototype.setBackgroundColor = function (color) {
    this.theDOM.getCanvas().css('background', color);
}

// setBackgroundImage(newImage, tiled)
//  Sets the background-image property of the main canvas to the given image url amd tiled or not.
CanvasManager.prototype.setBackgroundImage = function (url, tiled) {
    this.theDOM.getCanvas().css('background-image', 'url(' + url + ')');
    if (!tiled) {
        this.theDOM.getCanvas().css('background-repeat', 'no-repeat');
    }
}

CanvasManager.prototype.getCanvasWidth = function () {
    return this.theDOM.getCanvasContext().width;
}

CanvasManager.prototype.getCanvasHeight = function () {
    return this.theDOM.getCanvasContext().height;
}


// draw()
//  Clears the game canvas and draws the current controller (entities relative to viewport).
CanvasManager.prototype.draw = function (controller) {
    // clear
    var contextArea = this.theDOM.getCanvasContext();
    this.context.clearRect(0, 0, contextArea.width, contextArea.height);

    // get relative (x,y) to the location of the controller's view
    var relativeX = this.getViewRelativeX(controller);
    var relativeY = this.getViewRelativeY(controller);

    // adjust the background position according to the relative (x, y)
    this.theDOM.setBackgroundPosition(-relativeX, -relativeY);

    // draw entities (sorted in reverse order by depth): .draw() then Image
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
