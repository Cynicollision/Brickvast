/// <reference path="Game.js" />
var vastengine = vastengine || {};
(function () {

    /** 
     * A graphical asset that can be animated, used as the visual representation of an Entity object.
     * TOOD parms
     */
    vastengine.Sprite = function (image, width, height, frames) {
        this.image = image;
        this.frames = frames;
        this.width = width;
        this.height = height;

        this.currentFrame = 0;
        this.counter = 0;
    };

    /**
     * "Factory" function for building and returning a new Sprite object from the given Image from the AssetManager.
     * Can be used to create from a single-frame image or a sheet for animated Sprite objects.
     * @param {Image} image Image to build the Sprite from. 
     */
    vastengine.Sprite.buildFromImage = function (image, frameWidth, frameHeight, startFrame, endFrame) {
        if (!image) {
            vastengine.Game.setError("Can't build Sprite from undefined image!");
        }

        // default values for width/height - get from image
        frameWidth = (frameWidth !== undefined ? frameWidth : image.width);
        frameHeight = (frameHeight !== undefined ? frameHeight : image.height);

        // default values for start/end frame
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

        getImage: function () {
            return this.image;
        },

        draw: function (context, x, y) {
            var row = 0, col = 0;

            if (this.frames.length > 1) {
                var frameSpeed = 10; // TODO: where to get this from? setSpeed() ?

                // update to the next frame if it is time
                if (this.counter == (frameSpeed - 1)) {
                    this.currentFrame = (this.currentFrame + 1) % this.frames.length;
                }

                this.counter = (this.counter + 1) % frameSpeed;

                // draw the image
                row = Math.floor(this.frames[this.currentFrame] / (this.image.width / this.width));
                col = Math.floor(this.frames[this.currentFrame] % (this.image.width / this.width));
                context.drawImage(this.image, col * this.width, row * this.height, this.width, this.height, x, y, this.width, this.height);
            } else {
                context.drawImage(this.image, x, y);
            }
        }
    };
})();