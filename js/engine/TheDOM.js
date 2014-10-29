//************************************************************************************//
// Class: TheDOM
//  For interacting directly with the DOM.
//  TODO: create theCanvas, don't "find" it in HTML
//  TODO: can this be moved to the CanvasManager instead?
function TheDOM() {
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
}

TheDOM.prototype.getCanvasContext = function () {
    return this.canvas[0];
}

TheDOM.prototype.getCanvas = function () {
    return this.canvas;
}

// setBackgroundPosition(x, y)
//  Adjusts the CSS of the canvas's background to the given coordinates.
TheDOM.prototype.setBackgroundPosition = function (x, y) {
    this.canvas.css('background-position', x + 'px ' + y + 'px');
}