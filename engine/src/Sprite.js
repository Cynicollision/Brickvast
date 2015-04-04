/// <reference path="Game.js" />
var vastengine = vastengine || {};
(function () {

    /** 
     * A graphical asset that can be animated, used as the visual representation of an Entity object.
     * @param {object] Image object from vastengine.AssetManager
     * @param {number} width Width of the new Sprite (pixels)
     * @param {number} height Height of the new Sprite (pixels)
     */
    vastengine.Sprite = function (image, width, height, frames) {
        this.image = image;
        this.frames = frames;
        this.width = width;
        this.height = height;
        this.frameSpeed = 10;

        this.currentFrame = 0;
        this.counter = 0;
    };

    /**
     * "Factory" function for building and returning a new Sprite object from the given Image from the AssetManager.
     * Can be used to create from a single-frame image or a sheet for animated Sprite objects.
     * @param {Image} image Image to build the Sprite from. 
     */
    vastengine.Sprite.fromImage = function (image, frameWidth, frameHeight, startFrame, endFrame) {
        if (!image) {
            vastengine.Game.setError("Can't build Sprite from undefined image!");
        }

        // default values for width/height (get from image) and for start/end frame
        frameWidth = (frameWidth !== undefined ? frameWidth : image.width);
        frameHeight = (frameHeight !== undefined ? frameHeight : image.height);

        startFrame = (startFrame !== undefined ? startFrame : 0);
        endFrame = (endFrame !== undefined ? endFrame : 0);

        // create the sequence of frame numbers for the animation
        var frames = [];
        for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
            frames.push(frameNumber);
        }

        return new vastengine.Sprite(image, frameWidth, frameHeight, frames);
    };

    vastengine.Sprite.prototype = {
        /**
         * Draws the current frame of the Sprite.
         * @param {object} context Drawing context to draw on.
         * @param {number} x Horizontal position relative to Controller's view.
         * @param {number} y Vertical position relative to Controller's view.
         */
        draw: function (context, x, y) {
            if (this.image) {
                var row = 0, col = 0;

                if (this.frames.length > 1) {
                    if (this.counter == (this.frameSpeed - 1)) {
                        this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                    }
                    this.counter = (this.counter + 1) % this.frameSpeed;

                    row = Math.floor(this.frames[this.currentFrame] / (this.image.width / this.width));
                    col = Math.floor(this.frames[this.currentFrame] % (this.image.width / this.width));
                    context.drawImage(this.image, col * this.width, row * this.height, this.width, this.height, x, y, this.width, this.height);
                } else {
                    context.drawImage(this.image, x, y);
                }
            }
        }
    };
})();