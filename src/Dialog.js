/// <reference path="Game.js" />
/// <reference path="Canvas.js" />
var vastengine = vastengine || {};

/**
 * Used to pause the game while waiting for user input. Uses the Canvas to 
 * show a HTML/CSS dialog box, returns the selection, closes, and resumes the game.
 * @constructor
 * @param {string} text The text to show in the dialog message (prompt).
 * @param {number} width The width of the dialog box.
 * @param {number} height The height of the dialog box.
 * @param {Array.<string>} options List of options to choose from.
 * @returns {number} Selection made, based on index in options array.
 */
vastengine.Dialog = function (text, width, height, options) {
    this.text = text;
    this.options = options;
    this.choice = -1;
    this.width = width;
    this.height = height;
    this.visible = false;
    this.ready = false;
    setTimeout(function () {
        vastengine.Dialog.awake = true;
    }, 200);
};

vastengine.Dialog.awake = false;

vastengine.Dialog.prototype.show = function () {
    vastengine.Game.running = false;
    this.visible = true;
};

vastengine.Dialog.prototype.onTouch = function (x, y) {
    if (vastengine.Dialog.awake) {
        setTimeout(function () {
            vastengine.Dialog.awake = false;
        }, 200);
        this.choice = 123; // TODO: actually set from option that was clicked.
        this.visible = false;
        vastengine.Game.running = true;
    }
};


vastengine.Dialog.prototype.draw = function (d) {
    if (this.visible) {
        var context = $vast.Game.Canvas.getDrawingContext();

        var orig_fillStyle = context.fillStyle;
        var orig_globalAlpha = context.globalAlpha;

        context.fillStyle = '#000';
        context.globalAlpha = 0.5;
        context.fillRect(0, 0, vastengine.Game.Canvas.getCanvasWidth(), vastengine.Game.Canvas.getCanvasHeight());

        context.globalAlpha = 1;
        context.fillStyle = '#0F0';
        var x = (vastengine.Game.Canvas.getCanvasWidth() / 2) - (this.width / 2);
        var y = (vastengine.Game.Canvas.getCanvasHeight() / 2) - (this.height / 2);
        context.fillRect(x, y, this.width, this.height);
        

        context.fillStyle = orig_fillStyle;
        context.globalAlpha = orig_globalAlpha;
    }
};