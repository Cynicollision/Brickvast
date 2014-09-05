//************************************************************************************//
// Class: TheDOM
//  For interacting directly with the DOM.
function TheDOM() { }
TheDOM.CanvasContext = $('#theCanvas')[0];
TheDOM.Canvas = $('#theCanvas');



//************************************************************************************//
// CanvasManager
//  Specifically for manipulating the main game canvas, i.e. drawing on it.
//
// Properties
//  context - The drawing context of that canvas.
//
// CanvasManager()
//  Constructor - store a reference to the 2D drawing context.
function CanvasManager() {
    this.context = TheDOM.CanvasContext.getContext('2d');
}

// setBackgroundColor(newColor)
//  Sets the background color of the main game canvas to newColor.
CanvasManager.prototype.setBackgroundColor = function(color) {
    TheDOM.Canvas.css('background-color', color);
}

// draw()
//  Clears the game canvas and draws the current controller (entities relative to viewport).
CanvasManager.prototype.draw = function (controller) {
    // clear
    this.context.clearRect(0, 0, TheDOM.CanvasContext.width, TheDOM.CanvasContext.height);

    // get relative (x,y) to the location of the controller's view
    var relativeX = this.getViewRelativeX(controller);
    var relativeY = this.getViewRelativeY(controller);

    controller.sortEntities();
    var entities = controller.getEntities();

    // draw entities (sorted in reverse order by depth)
    // TODO: check a state here? or expect a destroyed state in step()
    var sortedEntities = entities
    for (var i = 0; i < entities.length; i++) {
        var img = entities[i].getImage();
        if (img !== undefined) {
            this.context.drawImage(img, entities[i].x - relativeX, entities[i].y);
        }
    }
}

// getViewRelativeX()
//  Returns the x-coordinate of the given Controller's view
CanvasManager.prototype.getViewRelativeX = function (controller) {
    if (controller.view !== undefined) {
        return controller.view.x;
    } else {
        return 0;
    }
}

// getViewRelativeY()
//  Returns the y-coordinate of the given Controller's view
CanvasManager.prototype.getViewRelativeY = function (controller) {
    if (controller.view !== undefined) {
        return controller.view.y;
    } else {
        return 0;
    }
}



//************************************************************************************//
// Controller
//  Handles the states of a collection of entities and moves the viewport around the 
//  available space.
//
// Properties
//  entities    - Collection of entities managed by this controller object.
//
// Controller()
//  Constructor
function Controller() {
    this.entities = [];
    this.view = { x: 0, y: 0 }
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
    for (var i = 0; i < this.entities.length; i++) {
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
// TODO: rename, return copy with all isDestroyed === true
Controller.prototype.sortEntities = function () {
    this.entities.sort(function (a, b) {
        return -(a.depth - b.depth);
    })
}


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
    //TODO: speed, direction, width, height
}

// getImage()
//  Returns the main Image object for this Entity.
Entity.prototype.getImage = function () {
    return this.image;
}

// setImage(newImage)
//  Sets the main Image object to newImage.
Entity.prototype.setImage = function (newImage) {
    this.image = newImage;
}

// setX(newX)
//  Sets the Entity's X position to newX.
Entity.prototype.setX = function (newX) {
    this.x = newX;
}

// setY(newY)
//  Sets the Entity's Y position to newY.
Entity.prototype.setY = function (newY) {
    this.y = newY;
}

// step()
//  Called by the managing Controller object's own step() function continuously.
Entity.prototype.step = function () {
    // to be overridden in instantiation
}



//************************************************************************************//
// Game 
//  Manages game-level components such as the currently running Controller object, 
//  routing input, and accessing assets through AssetManager instances.
//
// Properties
//  activeController    - The "running" Controller object: whose step() and draw() are called.
//
function Game() {
    this.activeController;
}

Game.Assets = function () { }
Game.Assets.Images = new AssetManager("image");
Game.Assets.Audio = new AssetManager("audio");
Game.CanvasManager = new CanvasManager();


// Game.setActiveController(newActiveController)
//  Sets the running Controller to the given Controller object.
Game.setActiveController = function (newActiveController) {
    this.activeController = newActiveController;
}

// Game.getActiveController()
//  Returns the running Controller
Game.getActiveController = function () {
    return this.activeController;
}

// Game.getTimestamp()
//  Returns the current timestamp (e.g. 87.134....)
Game.getTimestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// Game.run()
//  The main game loop. Keeps the game running at a fixed FPS.
//  Note: this will fail if there is no active Controller!
Game.run = function () {
    // make sure an active Controller has been defined
    if (this.activeController === undefined) {
        return "No active controller set!";
    }

    var stepSize = 1 / 60; // TODO: constant or from "global game settings"?
    var offset = 0;
    var previous = Game.getTimestamp()
    
    function stepAndDraw() {
        var current = Game.getTimestamp();
        offset += (Math.min(1, (current - previous) / 1000));

        // still step during the offset (time difference between frames)
        while (offset > stepSize) {
            Game.getActiveController().step(stepSize);
            offset -= stepSize;
        }

        // draw
        Game.CanvasManager.draw(Game.getActiveController());
        previous = current;
        requestAnimationFrame(stepAndDraw);
    }

    requestAnimationFrame(stepAndDraw);
}

//************************************************************************************//
// AssetManager
//  Used to store, pre-load, and retrieve game assets such as images and audio.
//
// Properties
//  assets  - Collection of assets managed by this object.
//  type    - Type of AssetManaget. Must be 'image' or 'audio'. Used to instatiate the correct resource objects.
//
// AssetManager(type)
//  Contructor - instantiates an AssetManager object with the given type.
function AssetManager(type) {
    this.assets = [];
    this.type = type;
}

// TODO: test, document
AssetManager.prototype.add = function (newName, src) {
    this.assets.push({ name: newName, source: src, asset: undefined });
}

// TODO: test, document
AssetManager.prototype.getByName = function (name) {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.assets[i].name === name) {
            return this.assets[i].asset;
        }
    }
}

// TODO: test, document
AssetManager.prototype.load = function () {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.type === 'image') {
            var newImg = new Image();
            newImg.src = this.assets[i].source;
            this.assets[i].asset = newImg;
        } else if (this.type === 'audio') {
            // TODO: load sounds and stuff
        }
        
    }
}