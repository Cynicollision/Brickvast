/**
 * Manages a collection of Entity objects and adjusts the visible view area.
 * @constructor
 */
function Controller() {
    this.entities = [];
    this.view = { x: 0, y: 0 }
}


// setViewPosition(x, y)
//  Sets the view position to the given coordinates.
Controller.prototype.setViewPosition = function (newX, newY) {
    this.view.x = newX;
    this.view.y = newY;
}


/** 
 * Called by the controller continuously while the game loop is running. Calls all managed entities' own step() functions, then its own postStep() function.
 */
Controller.prototype.step = function () {
    this.removeDestroyedEntities();

    for (var i = 0; i < this.entities.length; i++) {

        // apply Entity motion
        if (this.entities[i].speed !== 0) {
            this.entities[i].x += Math.round((MathUtil.getLengthDirectionX(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10));
            this.entities[i].y += Math.round((MathUtil.getLengthDirectionY(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10));
        }

        this.entities[i].step();
    }

    this.postStep();
}


/** 
 * Called at the end of this object's step() call. Intended to be overridden if needed at instantiation.
 */
Controller.prototype.postStep = function () {
    // to be overridden in instantiation
}


/** 
 * Forwards the mouse event coordinates to any managed Entity objects that were clicked on.
 * @param {onmousedown event} e The actual onmousedown event received from the mouse click.
 */
Controller.prototype.mousedown = function (e) {
    // adjust for the view's coordinates
    var clickX = e.pageX + this.view.x;
    var clickY = e.pageY + this.view.y;

    for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
            ent.mousedown(clickX, clickY);
        }
    }

    this.postmousedown(clickX, clickY);
}


/** 
 * Forwards the mouse event coordinates to any managed Entity objects that were un-clicked on.
 * @param {event:onmouseup} e The actual onmouseup event received from the mouse click release.
 */
Controller.prototype.mouseup = function (e) {
    // need to adjust for view's coordinates
    var clickX = e.pageX + this.view.x;
    var clickY = e.pageY + this.view.y;

    for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
            ent.mouseup(clickX, clickY);
        }
    }

    // TODO: implement this.postmousedown?
    // TODO: refactor some of this code and call from mousedown also.
}


/** 
 * Called after forwarding mouse event to each managed Entity object.
  * @param {number} x X-coordinate of mouse click relative to game canvas.
  * @param {number} x X-coordinate of mouse click relative to game canvas.
  */
Controller.prototype.postmousedown = function (x, y) {
    // to be overridden
}


/**
 * Adds an Entity object to the collection of entities managed by this controller.
 * @param 
 */
Controller.prototype.addEntity = function (newEnt) {
    this.entities.push(newEnt);
}


/**
 * Retrieve the collection of entities managed by this controller.
 * @return {Array.<Entity>} 
 */
Controller.prototype.getEntities = function () {
    return this.entities;
}


/** 
 * Returns a single managed Entity with the given ID value if it exists (ID values are not enforced to be unique).
 * @return {Entity} The Entity with the given id value, if one exists within the managed collection.
 */
Controller.prototype.getEntityById = function (id) {
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].id === id) {
            return this.entities[i];
        }
    }
}


/**
 * Retrieves all managed entities with the given type.
 * @param {string} type Find Entity objects with type property that matches.
 * @return {Array.<Entity>} Array of Entities with the given type.
 */
Controller.prototype.getEntitiesByType = function (type) {
    var hits = [];
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].type === type) {
            hits.push(this.entities[i]);
        }
    }
    return hits;
}


/**
 * Retrieve all Entity objects at the given position.
 * @param {number} x X-coordinate to check.
 * @param {number} y Y-coordinate to check.
 * @return {Array.<Entity>} Cllection of Entity objects for which (x, y) falls within its width and height bounds.
 */
Controller.prototype.getEntitiesAtPosition = function (x, y) {
    var hits = [];
    for (var i = 0; i < this.entities.length; i++) {
        if (x > this.entities[i].x && y > this.entities[i].y && x < this.entities[i].x + this.entities[i].width && y < this.entities[i].y + this.entities[i].height) {
            hits.push(this.entities[i]);
        }
    }
    return hits;
}


/**
 * Sorts managed entities in descending order by depth.
 */
Controller.prototype.sortEntities = function () {
    this.entities.sort(function (a, b) {
        return -(a.depth - b.depth);
    })
}


/** 
 * Removes all managed Entity object where property isDestroyed is true.
 */ 
Controller.prototype.removeDestroyedEntities = function () {
    if (this.entities !== undefined && this.entities.length > 0) {
        this.entities = this.entities.filter(function (entity) {
            try {
                return !entity.isDestroyed;
            }
            catch (e) {
                throw "Can't call step() on undefined managed Entity!";
            }
        });
    }
}