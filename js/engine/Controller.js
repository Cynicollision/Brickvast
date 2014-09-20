﻿//************************************************************************************//
// Controller
//  Handles the states of a collection of entities and moves the viewport around the 
//  available space.
//
// Properties
//  entities    - Collection of entities managed by this controller object.
//  view        - Coordinates to adjust the "view" of the game (relative origin of top-left corner)
//
// Controller()
//  Constructor
function Controller() {
    this.entities = [];
    this.view = { x: 0, y: 0 }
}


// mousedown(clickEvent)
//  Calls mousedown() on any managed Entity object's that were clicked on.
Controller.prototype.mousedown = function (e) {
    // need to adjust for view's coordinates
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


// mouseup(clickEvent)
//  Calls mousedown() on any managed Entity object's that were un-clicked on.
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
}


// TODO: test, document
Controller.prototype.postmousedown = function (x, y) {
    // to be overridden
}


// addEntity(newEnt)
//  Adds Entity object newEnt to the collection of entities managed by this controller.
Controller.prototype.addEntity = function (newEnt) {
    this.entities.push(newEnt);
}

// getEntities()
//  Returns the collection of entities managed by this controller.
Controller.prototype.getEntities = function () {
    return this.entities;
}

// getEntityById(id)
//  Returns the managed Entity with the given ID value if it exists.
//  NOTE: ID values are not enforced to be unique.
Controller.prototype.getEntityById = function (id) {
    for (var i = 0; i < this.entities.length; i++) {
        if (this.entities[i].id === id) {
            return this.entities[i];
        }
    }
}

// getEntitiesAtPosition(x, y)
//  Returns a collection of Entity objects for which (x, y)
//  falls within its width and height bounds
Controller.prototype.getEntitiesAtPosition = function (x, y) {
    var hits = [];
    for (var i = 0; i < this.entities.length; i++) {
        if (x > this.entities[i].x && y > this.entities[i].y && x < this.entities[i].x + this.entities[i].width && y < this.entities[i].y + this.entities[i].height) {
            hits.push(this.entities[i]);
        }
    }
    return hits;
}

// step()
//  Called by the controller continuously while the game loop is running. Calls all 
//  managed entities' own step() functions, then its own postStep() function.
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

// postStep()
//  Called after step(). Intended to be overridden by user functionality.
Controller.prototype.postStep = function () {
    // to be overridden in instantiation
}

// sortEntities()
//  Sorts entities in descending order by depth.
Controller.prototype.sortEntities = function () {
    this.entities.sort(function (a, b) {
        return -(a.depth - b.depth);
    })
}

// removeDestroyedEntities()
//  Removes all managed Entity object where property isDestroyed is true
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

// setViewPosition(x, y)
//  Sets the view position to the given coordinates.
Controller.prototype.setViewPosition = function (newX, newY) {
    this.view.x = newX;
    this.view.y = newY;
}