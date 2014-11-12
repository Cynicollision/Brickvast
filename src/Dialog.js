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
vastengine.Dialog = function (text, width, height, options, callback) {
    this.text = text;
    this.width = width;
    this.height = height;
    this.options = options;
    this.callback = callback;
    this.scale = 1;

    this.x = (vastengine.Game.Canvas.getCanvasWidth() / 2) - (this.width / 2);
    this.y = (vastengine.Game.Canvas.getCanvasHeight() / 2) - (this.height / 2);
    this.visible = false;
    this.textPadding = 10;
    this.buttons = this.buildButtons();
    
    this.state = function () {
        var currentState = vastengine.DialogState.closed;
        return {
            get: function () { return currentState; },
            set: function (newVal) { currentState = newVal; }
        };
    }(); 
};


vastengine.Dialog.prototype.buildButtons = function () {
    var buttons = [];
    if (this.options.length === 1) {
        buttons.push({ text: this.options[0], x: this.x, y: this.y + this.height - 50, w: this.width, h: 50 });
    } else if (this.options.length === 2) {
        buttons.push({ text: this.options[0], x: this.x, y: this.y + this.height - 50, w: this.width / 2, h: 50 });
        buttons.push({ text: this.options[1], x: this.x + (this.width / 2), y: this.y + this.height - 50, w: this.width / 2, h: 50 });
    } else {
        for (var i = 0; i < this.options.length; i++) {
            // TODO
        }
    }
    return buttons;
}


/**
 * Enumeration of states the dialog box can be in.
 */
vastengine.DialogState = {
    closed: 0,
    open: 1
};


vastengine.Dialog.prototype.show = function () {
    if (this.state.get() === vastengine.DialogState.closed) {
        this.visible = true;
        this.scale = 0;
        this.state.set(vastengine.DialogState.open);
    }
};

vastengine.Dialog.prototype.hide = function () {
    if (this.state.get() === vastengine.DialogState.open) {
        this.visible = false;
        this.state.set(vastengine.DialogState.open);
    }
};

vastengine.Dialog.prototype.onTouch = function (x, y) {
    var selection = -1;
    if (this.state.get() === vastengine.DialogState.open) {
        for (var i = 0; i < this.buttons.length; i++) {
            if (x > this.buttons[i].x && x < (this.buttons[i].x + this.buttons[i].w) && y > this.buttons[i].y && (y < this.buttons[i].y + this.buttons[i].h)) {
                selection = i;
            }
        }

        // destroy the dialog if a button was clicked and call the callback.
        if (selection > -1) {
            vastengine.Game.setDialog(undefined);
            if (this.callback) {
                this.callback(selection);
            }
        }
    }
};



vastengine.Dialog.prototype.draw = function () {
    if (this.visible) {
        var context = $vast.Game.Canvas.getDrawingContext();

        var orig_fillStyle = context.fillStyle;
        var orig_globalAlpha = context.globalAlpha;
        var orig_textAlign = context.textAlign;
        var orig_textBaseline = context.textBaseline;
        var orig_font = context.font;

        var inc = 0.2;
        if (this.scale < 1 - inc) {
            this.scale += inc;
        } else if (this.scale > 0.75) {
            this.scale = 1;
        }

        // shadow
        context.fillStyle = '#000';
        context.globalAlpha = 0.5;
        context.fillRect(0, 0, vastengine.Game.Canvas.getCanvasWidth(), vastengine.Game.Canvas.getCanvasHeight());

        // dialog background
        context.globalAlpha = 1;
        context.fillStyle = '#FFF';;
        context.fillRect(this.x + ((this.width - this.width * this.scale) / 2), this.y + ((this.height - this.height * this.scale) / 2), this.width * this.scale, this.height * this.scale);

        if (this.scale === 1) {
            // draw the text. TODO: build words in constructor? (or make build() function to build buttons, text, width, height, etc)
            context.textBaseline = 'top';
            context.font = '18pt Calibri';
            context.fillStyle = '#000';
            var words = this.text.split(' ');
            var line = '';
            var textY = this.y;
            for (var i = 0; i < words.length; i++) {
                var testLine = line + words[i] + ' ';
                var metrics = context.measureText(testLine);
                var testWidth = metrics.width;
                if (testWidth > this.width - this.textPadding && i > 0) {
                    context.fillText(line, this.x + this.textPadding, textY);
                    line = words[i] + ' ';
                    textY += 22;
                }
                else {
                    line = testLine;
                }
            }
            //context.fillText(line, this.x + this.textPadding, textY); // the last line

            // draw the buttons
            context.font = '20pt Calibri';
            context.textAlign = 'center';
            context.textBaseline = 'middle';
            for (var i = 0; i < this.buttons.length; i++) {
                context.fillText(this.buttons[i].text, this.buttons[i].x + (this.buttons[i].w / 2), this.buttons[i].y + (this.buttons[i].h / 2));
            }
        }


        
        // reset styles
        context.fillStyle = orig_fillStyle;
        context.globalAlpha = orig_globalAlpha;
        context.textAlign = orig_textAlign;
        context.textBaseline = orig_textBaseline;
        context.font = orig_font;
    }
};
