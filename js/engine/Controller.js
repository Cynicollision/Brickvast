//************************************************************************************//
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
    var clickX = e.pageX;
    var clickY = e.pageY;

    for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
            ent.mousedown(e);
        }
    }

    this.postmousedown(e);
}

// TODO: test, document
Controller.prototype.postmousedown = function (e) {
    // to be overridden
}

// mouseup(clickEvent)
//  Calls mousedown() on any managed Entity object's that were un-clicked on.
Controller.prototype.mouseup = function (e) {
    var clickX = e.pageX;
    var clickY = e.pageY;

    for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
            ent.mouseup(e);
        }
    }
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
            return !entity.isDestroyed;
        });
    }
}