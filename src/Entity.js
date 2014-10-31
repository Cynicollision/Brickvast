/**
 * Represents one (usually visible) "thing" to exist in the game.
 * @param {string} type Used to group and retrieve similar Entity objects.
 * @constructor
 */
function Entity(type, id) {
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
}


/** 
 * Called during the managing Controller object's own step function continuously.
 */
Entity.prototype.step = function () {
    // to be overridden in instantiation to define step behavior
}


/**
 * Called by the managing Controller object if e's coordinates are within this Entity's bounding area.
 * @param {number} x X-coordinate of onmousedown event.
 * @param {number} y Y-coordinate of onmousedown event.
 */
Entity.prototype.mousedown = function (x, y) {
    // to be overridden in instantiation to define mousedown behavior
}


/**
 * Called by the managing Controller object if e's coordinates are within this Entity's bounding area.
 * @param {number} x X-coordinate of onmouseup event.
 * @param {number} y Y-coordinate of onmouseup event.
 */
Entity.prototype.mouseup = function (x, y) {
    // to be overridden in instantiation to define mouseup behavior
}


/** 
 * Called by the managing Controller object's own draw() function each frame.
 */
Entity.prototype.draw = function () {
    // to be overridden in instantiation to perform special drawing functions
}


/**
 * Destroy this Entity on the managing Controller's next step.
 */
Entity.prototype.destroy = function () {
    this.isDestroyed = true;
}


/** 
 * Determine if this Entity object's bounding area intersects with that of the given Entity object to compare to.
 * @param {Entity} Other entity to check for a collision with.
 * @return {boolean} True if the other Entity object's bounding area intersects with this one's.
 */
Entity.prototype.checkCollision = function (other) {
    return !((this.x + this.width < other.x) || (other.x + other.width < this.x) || (this.y + this.height < other.y) || (other.y + other.height < this.y));
}




/**************************************************************
 * Getters and setters
 **************************************************************/
Entity.prototype.getImage = function () {
    return this.image;
}

Entity.prototype.setImage = function (newImage) {
    this.image = newImage;
}

Entity.prototype.setPosition = function (newX, newY) {
    this.x = newX;
    this.y = newY;
}

Entity.prototype.getX = function () {
    return this.x;
}

Entity.prototype.setX = function (newX) {
    this.x = newX;
}

Entity.prototype.getY = function () {
    return this.y;
}

Entity.prototype.setY = function (newY) {
    this.y = newY;
}

Entity.prototype.getSpeed = function () {
    return this.speed;
}

Entity.prototype.setSpeed = function (newSpeed) {
    this.speed = newSpeed;
}

Entity.prototype.getDirection = function () {
    return this.direction;
}

Entity.prototype.setDirection = function (newDir) {
    this.direction = newDir;
}

Entity.prototype.setSize = function (newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
}