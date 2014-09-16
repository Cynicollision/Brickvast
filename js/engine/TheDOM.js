//************************************************************************************//
// Class: TheDOM
//  For interacting directly with the DOM.
//  TODO: create theCanvas, don't "find" it in HTML
function TheDOM() {
    this.canvas = $('#theCanvas');

    // forward the even to the Game's active controller
    this.canvas.mousedown(function (e) {
        if (Game.getActiveController() !== undefined) {
            Game.getActiveController().mousedown(e);
        }
    });

    // forward the even to the Game's active controller
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
