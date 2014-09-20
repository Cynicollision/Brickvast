//************************************************************************************//
// Entity
//  Represents one (usually visible) "thing" to exist in the game.
//
// Properties
//  x       - x coordinate relative to (0,0) for the controller
//  y       - y coordinate relative to (0,0) for the controller
//  depth   - Entity objects are drawn in reverse order by depth (i.e. -1 would be "over" 1)
//  type    - The type of Entity. Can be used to retrieve all of a Controller's Entity objects of a given type
//  id      - The ID of this Entity. Can be used to retrieve a specific Entity by ID from the Controller.
//
// Entity(type)
//  Contructor - instantiates a Entity object with the given type and id values
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

// step()
//  Called by the managing Controller object's own step() function continuously.
Entity.prototype.step = function () {
    // to be overridden in instantiation to define step behavior
}

// mousedown()
//  Called by the managing Controller object if e's coordinates are within this Entity's bounding area
Entity.prototype.mousedown = function (x, y) {
    // to be overridden in instantiation to define on-mousedown behavior
}

// mouseup()
//  Called by the managing Controller object if e's coordinates are within this Entity's bounding area
Entity.prototype.mouseup = function (x, y) {
    // to be overridden in instantiation to define on-mouseup behavior
}

// draw()
//  Called by the managing Controller object's own draw() function each frame.
Entity.prototype.draw = function () {
    // to be overridden in instantiation to perform special drawing functions
}

// destroy()
//  Destroy this Entity (remove from managing Controller's collection)
Entity.prototype.destroy = function () {
    this.isDestroyed = true;
}

// getters and setters
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