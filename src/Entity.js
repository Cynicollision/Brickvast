var vastengine = vastengine || {};

/**
 * Represents one (usually visible) "thing" to exist in the game.
 * @param {string} type Used to group and retrieve similar Entity objects.
 * @constructor
 */
vastengine.Entity = function (type, id) {
    this.x = 0;
    this.y = 0;
    this.depth = 0;
    this.type = type;
    this.id = id;
    this.isDestroyed = false;
    this.speed = 0;
    this.direction = 0;
    this.width = 0;
    this.height = 0;
};


/** 
 * Called during the managing Controller object's own step function continuously.
 */
vastengine.Entity.prototype.step = function () {
    // to be overridden in instantiation to define step behavior
};


/**
 * Called by the managing Controller object if e's coordinates are within this Entity's bounding area.
 * @param {number} x X-coordinate of onmousedown event.
 * @param {number} y Y-coordinate of onmousedown event.
 */
vastengine.Entity.prototype.mousedown = function (x, y) {
    // to be overridden in instantiation to define mousedown behavior
};


/**
 * Called by the managing Controller object if e's coordinates are within this Entity's bounding area.
 * @param {number} x X-coordinate of onmouseup event.
 * @param {number} y Y-coordinate of onmouseup event.
 */
vastengine.Entity.prototype.mouseup = function (x, y) {
    // to be overridden in instantiation to define mouseup behavior
};


/** 
 * Called by the managing Controller object's own draw() function each frame.
 */
vastengine.Entity.prototype.draw = function () {
    // to be overridden in instantiation to perform special drawing functions
};


/**
 * Destroy this Entity on the managing Controller's next step.
 */
vastengine.Entity.prototype.destroy = function () {
    this.isDestroyed = true;
};


/** 
 * Determine if this Entity object's bounding area intersects with that of the given Entity object to compare to.
 * @param {Entity} Other entity to check for a collision with.
 * @return {boolean} True if the other Entity object's bounding area intersects with this one's.
 */
vastengine.Entity.prototype.checkCollision = function (other) {
    return !((this.x + this.width < other.x + 1) || (other.x + other.width - 1 < this.x) || (this.y + this.height < other.y + 1) || (other.y + other.height - 1 < this.y));
};




/**************************************************************
 * Getters and setters
 **************************************************************/
vastengine.Entity.prototype.getImage = function () {
    return this.image;
};

vastengine.Entity.prototype.setImage = function (newImage) {
    this.image = newImage;
};

vastengine.Entity.prototype.setPosition = function (newX, newY) {
    this.x = newX;
    this.y = newY;
};

vastengine.Entity.prototype.getX = function () {
    return this.x;
};

vastengine.Entity.prototype.setX = function (newX) {
    this.x = newX;
};

vastengine.Entity.prototype.getY = function () {
    return this.y;
};

vastengine.Entity.prototype.setY = function (newY) {
    this.y = newY;
};

vastengine.Entity.prototype.getSpeed = function () {
    return this.speed;
};

vastengine.Entity.prototype.setSpeed = function (newSpeed) {
    this.speed = newSpeed;
};

vastengine.Entity.prototype.getDirection = function () {
    return this.direction;
};

vastengine.Entity.prototype.setDirection = function (newDir) {
    this.direction = newDir;
};

vastengine.Entity.prototype.setSize = function (newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
};
