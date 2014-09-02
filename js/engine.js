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
//  canvas  - The "main" canvas to manipulate.
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

    var entities = controller.getEntities();

    // draw entities
    // TODO: sort by depth
    for (var i = 0; i < entities.length; i++) {
        var img = entities[i].getImage();
        if (img !== undefined) {
            this.context.drawImage(img, entities[i].x, entities[i].y);
        }
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
//  Contructor - instantiates a Entity object with the given type value.
function Entity(type) {
    this.x = 0;
    this.y = 0;
    this.depth = 0;
    this.type = type;
    this.id = undefined;
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

// setId(newId)
//  Sets the id property to the given value. Can be used for unique retrieval later.
Entity.prototype.setId = function (newId) {
    this.id = newId;
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
function Game() { }

Game.Assets = function () { }
Game.Assets.Images = new AssetManager("image");
Game.Assets.Audio = new AssetManager("audio");
Game.CanvasManager = new CanvasManager();
Game.ActiveController;

// Game.getTimestamp()
//  Returns the current timestamp (e.g. 87.134....)
Game.getTimestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}

// Game.run()
//  The main game loop. Keeps the game running at a fixed FPS.
Game.run = function () {
    var step = 1 / 60; // TODO: constant or from "global game settings"?
    var offset = 0;
    var current;
    previous = Game.getTimestamp()
    
    function frame() {
        current = Game.getTimestamp();
        offset += (Math.min(1, (current - previous) / 1000));

        while (offset > step) {
            Game.ActiveController.step(step);
            offset -= step;
        }

        Game.CanvasManager.draw(Game.ActiveController);
        previous = current;
        requestAnimationFrame(frame);
    }

    requestAnimationFrame(frame);
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

AssetManager.prototype.add = function (newName, src) {
    this.assets.push({ name: newName, source: src, asset: undefined });
}

AssetManager.prototype.getByName = function (name) {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.assets[i].name === name) {
            return this.assets[i].asset;
        }
    }
}

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