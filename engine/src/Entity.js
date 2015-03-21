var vastengine = vastengine || {};
(function () {
    /**
     * Represents one (usually visible) "thing" to exist in the game.
     * @param {string} type Used to group and retrieve similar Entity objects.
     * @constructor
     */
    vastengine.Entity = function (type, id) {
        this.x = 0;
        this.y = 0;
        this.depth = 0;
        this.type = type || '';
        this.id = id || 0;
        this.isDestroyed = false;
        this.speed = 0;
        this.direction = 0;
        this.width = 0; // TODO: get width and height from Sprite?
        this.height = 0;
        this.image = null; // TODO: replace with sprite

        // methods.
        this.onTouch = null;
        this.onTouchEnd = null;
        this.step = null;
        this.draw = null;
    };

    vastengine.Entity.prototype = {

        /**
         * Set the function to be called when this Entity is "clicked on". The means the coordinates 
         * of the touch event fall within this Entity object's bounds (width x height at x, y).
         * @param {function} onTouchFn function to call when clicked on.
         */
        setOnTouch: function (onTouchFn) {
            this.onTouch = onTouchFn;
        },

        /**
         * Set the function to be called when a click is released within this Entity object's bounds.
         * @param {function} onTouchEndFn function to call when a click is released.
         */
        setOnTouchEnd: function (onTouchEndFn) {
            this.onTouchEnd = onTouchEndFn;
        },

        /** 
         * Set the function this Entity object calls each game step.
         * @param {function} step function to call each game step.
         */
        setStep: function (stepFn) {
            this.step = stepFn;
        },

        /**
         * Set the function this Entity object calls when each frame is drawn.
         * @param {function} drawFn draw function to call each frame.
         */
        setDraw: function (drawFn) {
            this.draw = drawFn;
        },

        /**
         * Called by the managing Controller object if e's coordinates are within this Entity's bounding area.
         * @param {number} x X-coordinate of onmouseup event.
         * @param {number} y Y-coordinate of onmouseup event.
         */
        mouseup: function (x, y) {
            // to be overridden in instantiation to define mouseup behavior
        },

        /**
         * Destroy this Entity on the managing Controller's next step.
         */
        destroy: function () {
            this.isDestroyed = true;
        },

        /** 
         * Determine if this Entity object's bounding area intersects with that of the given Entity object to compare to.
         * @param {Entity} Other entity to check for a collision with.
         * @return {boolean} True if the other Entity object's bounding area intersects with this one's.
         */
        checkCollision: function (other) {
            return !((this.x + this.width < other.x + 1) || (other.x + other.width - 1 < this.x) || (this.y + this.height < other.y + 1) || (other.y + other.height - 1 < this.y));
        },

        /**
         * Determine if the given coordinates fall within the bounds of this Entity object.
         * @param {number} onX X-coordinate to check.
         * @param {number} onY Y-coordinate to check.
         * @return Whether the given coordinates fall within the bounds of this Entity object.
         */
        onPosition: function (onX, onY) {
            return (onX > this.x && onY > this.y && onX < this.x + this.width && onY < this.y + this.height);
        },

        /**************************************************************
         * Getters and setters
         **************************************************************/
        getImage: function () { // TODO: replace with getSprite
            return this.image;
        },

        setImage: function (newImage) { // TODO: replace with setSprite
            this.image = newImage;
        },

        setPosition: function (newX, newY) {
            this.x = newX;
            this.y = newY;
        },

        getX: function () {
            return this.x;
        },

        setX: function (newX) {
            this.x = newX;
        },

        getY: function () {
            return this.y;
        },

        setY: function (newY) {
            this.y = newY;
        },

        getSpeed: function () {
            return this.speed;
        },

        setSpeed: function (newSpeed) {
            this.speed = newSpeed;
        },

        getDirection: function () {
            return this.direction;
        },

        setDirection: function (newDir) {
            this.direction = newDir;
        },

        setSize: function (newWidth, newHeight) {
            this.width = newWidth;
            this.height = newHeight;
        }
    };
})();