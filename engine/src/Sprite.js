/// <reference path="Game.js" />
var vastengine = vastengine || {};
(function () {

    /** 
     * A graphical asset that can be animated, used as the visual representation of an Entity object.
     * TOOD parms
     */
    vastengine.Sprite = function (image, width, height, frames) {
        this.image = image;
        this.width = width;
        this.height = height;
        this.frames = frames;

        this.currentFrame = 0;
        this.counter = 0;
        

        
    };

    /**
     * "Factory" function for building and returning a new Sprite object from the given Image from the AssetManager.
     * Can be used to create from a single-frame image or a sheet for animated Sprite objects.
     * @param {Image} Image to build the Sprite from. 
     * @param {number} width Width of the Sprite (each frame).
     * @param {number} height Height of the Sprite (each frame).
     * @param {number} frames (optional) Number of frames.
     * @param {number} originX (optional) X-coorindate to create as the top-left origin of the image.
     * @param {number} originY (optional) Y-coorindate to create as the top-left origin of the image.
     */
    vastengine.Sprite.buildFromSheet = function (image, width, height, startFrame, endFrame) {
        if (!image) {
            vastengine.Game.setError("Can't build Sprite from undefined image!");
        }
        if (width <= 0 || height <= 0) {
            vastengine.Game.setError("Can't build Sprite with zero or negative frame size!");
        }

        // default values for optional start (x, y)
        //frames = (frames !== undefined ? frames : 1);
        //originX = (originX !== undefined ? originX : 0);
        //originY = (originY !== undefined ? originY : 0);

        // create the sequence of frame numbers for the animation
        var frames = [];
        for (var frameNumber = startFrame; frameNumber <= endFrame; frameNumber++) {
            frames.push(frameNumber);
        }

        return new vastengine.Sprite(image, width, height, frames);
    };

    vastengine.Sprite.prototype = {

        update: function () {
            var frameSpeed = 10;

            // update to the next frame if it is time
            if (this.counter == (frameSpeed - 1)) {
                this.currentFrame = (this.currentFrame + 1) % this.frames.length;
            }
 
            this.counter = (this.counter + 1) % frameSpeed;
        },

        draw: function (context, x, y) {
            // get the row and col of the frame
            var framesPerRow = this.image.width / this.width;

            var row = Math.floor(this.frames[this.currentFrame] / framesPerRow);
            var col = Math.floor(this.frames[this.currentFrame] % framesPerRow);

            context.drawImage(this.image, col * this.width, row * this.height, this.width, this.height, x, y, this.width, this.height);
        }

    };
})();