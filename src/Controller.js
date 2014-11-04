var vastengine = vastengine || {};

/**
 * Manages a collection of Entity objects and adjusts the visible view area.
 * @constructor
 */
vastengine.Controller = function() {
    this.entities = [];
    this.view = { x: 0, y: 0 };

    this.postStep;
    this.onTouch;
};


/**
 * Sets the view position to the given coordinates.
 * @param {number} newX New X-coordinate for the view position (horizontal offset).
 * @param {number} newY New Y-coordinate for the view position (vertical offset)
 */
vastengine.Controller.prototype.setViewPosition = function (newX, newY) {
    this.view.x = newX;
    this.view.y = newY;
};


/** 
 * Called by the controller continuously while the game loop is running. Calls all managed entities' own step() functions, then its own postStep() function.
 */
vastengine.Controller.prototype.step = function () {
    this.removeDestroyedEntities();

    for (var i = 0; i < this.entities.length; i++) {

        // apply Entity motion
        if (this.entities[i].speed !== 0) {
            this.entities[i].x += Math.round((vastengine.MathUtil.getLengthDirectionX(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10));
            this.entities[i].y += Math.round((vastengine.MathUtil.getLengthDirectionY(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10));
        }

        if (this.entities[i].step) {
            this.entities[i].step();
        }
    }

    if (this.postStep) {
        this.postStep();
    }
};


/** 
 * Sets the function to call at the end of each game step.
 * @param {function} step() function to be called.
 */
vastengine.Controller.prototype.setPostStep = function (postStepFn) {
    this.postStep = postStepFn;
};


/** 
 * Forwards the mouse event coordinates to any managed Entity objects that were clicked on.
 * @param {onmousedown event} e The actual onmousedown event received from the mouse click.
 */
vastengine.Controller.prototype.setOnTouch = function (onTouchFn) {
    this.onTouch = onTouchFn;
};


/** 
 * Forwards the mouse event coordinates to any managed Entity objects that were un-clicked on.
 * @param {event:onmouseup} e The actual onmouseup event received from the mouse click release.
 */
vastengine.Controller.prototype.mouseup = function (x, y) {
    // need to adjust for view's coordinates
    var clickX = x + this.view.x;
    var clickY = y + this.view.y;

    for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
            ent.mouseup(clickX, clickY);
        }
    }

    // TODO: eliminate mousedown, mouseup: change to onTouch, implement postTouch.
    // Make class for handling touch input (scaling down to 1:1 coordinates, touch or release, etc.) and use it in Canvas to pass values to onTouch, postTouch.
    // above class can also store the currently clicked (x, y).
};


/** 
 * Called after forwarding mouse event to each managed Entity object.
  * @param {number} x X-coordinate of mouse click relative to game canvas.
  * @param {number} x X-coordinate of mouse click relative to game canvas.
  */
vastengine.Controller.prototype.postmousedown = function (x, y) {
    // to be overridden
};


/**
 * Adds an Entity object to the collection of entities managed by this controller.
 * @param 
 */
vastengine.Controller.prototype.addEntity = function (newEnt) {
    this.entities.push(newEnt);
};


/**
 * Retrieve the collection of entities managed by this controller.
 * @return {Array.<Entity>} 
 */
vastengine.Controller.prototype.getEntities = function () {
    return this.entities;
};


/** 
 * Returns a single managed Entity with the given ID value if it exists (ID values are not enforced to be unique).
 * @return {Entity} The Entity with the given id value, if one exists within the managed collection.
 */
vastengine.Controller.prototype.getEntityById = function (id) {
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].id === id) {
            return this.entities[i];
        }
    }
};


/**
 * Retrieves all managed entities with the given type.
 * @param {string} type Find Entity objects with type property that matches.
 * @return {Array.<Entity>} Array of Entities with the given type.
 */
vastengine.Controller.prototype.getEntitiesByType = function (type) {
    var hits = [];
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].type === type) {
            hits.push(this.entities[i]);
        }
    }
    return hits;
};


/**
 * Retrieve all Entity objects at the given position.
 * @param {number} x X-coordinate to check.
 * @param {number} y Y-coordinate to check.
 * @param {string} Optional type to check for. If specified, only Entity objects with this type will be returned.
 * @return {Array.<Entity>} Cllection of Entity objects for which (x, y) falls within its width and height bounds.
 */
vastengine.Controller.prototype.getEntitiesAtPosition = function (x, y, type) {
    var hits = [];
    for (var i = 0; i < this.entities.length; i++) {
        if (x > this.entities[i].x && y > this.entities[i].y && x < this.entities[i].x + this.entities[i].width && y < this.entities[i].y + this.entities[i].height) {
            if (type === undefined) {
                hits.push(this.entities[i]);
            } else if (this.entities[i].type === type) {
                hits.push(this.entities[i]);
            }
        }
    }
    return hits;
};


/**
 * Sorts managed entities in descending order by depth.
 */
vastengine.Controller.prototype.sortEntities = function () {
    this.entities.sort(function (a, b) {
        return -(a.depth - b.depth);
    });
};


/** 
 * Removes all managed Entity object where property isDestroyed is true.
 */ 
vastengine.Controller.prototype.removeDestroyedEntities = function () {
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
};
