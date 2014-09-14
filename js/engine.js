//************************************************************************************//
// Class: MathUtil
//  For performing various mathematical calculations, trig etc.
function MathUtil() { }

// MathUtil.getPointDistance(x1, y1, x2, y2)
//  Returns the distance between two points ((x1, y1), (x2, y2))
MathUtil.getPointDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
}

// MathUtil.getPointDirection
/// Returns the direction from two points (x1, y1) to (x2, y2)
MathUtil.getPointDirection = function (x1, y1, x2, y2) {
    return ((180 / Math.PI) * Math.atan2(y2 - y1, x2 - x1));
}

// TODO: test, document
MathUtil.getLengthDirectionX = function (len, dir) {
    return Math.floor(len * Math.cos(dir * (Math.PI / 180)));
}

// TODO: test, document
MathUtil.getLengthDirectionY = function (len, dir) {
    return Math.floor(len * Math.sin(dir * (Math.PI / 180)));
}


//************************************************************************************//
// Class: TheDOM
//  For interacting directly with the DOM.
function TheDOM() { }
TheDOM.CanvasContext = $('#theCanvas')[0];
TheDOM.Canvas = $('#theCanvas');
TheDOM.Canvas.click(function (e) {
    if (Game.getActiveController() !== undefined) {
        Game.getActiveController().click(e);
    }
});



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
//  Sets the background-color property of the main game canvas to newColor.
CanvasManager.prototype.setBackgroundColor = function(color) {
    TheDOM.Canvas.css('background', color);
}

// setBackgroundImage(newImage, tiled)
//  Sets the background-image property of the main canvas to the given image url amd tiled or not.
CanvasManager.prototype.setBackgroundImage = function (url, tiled) {
    TheDOM.Canvas.css('background-image', 'url(' + url + ')');

    if (!tiled) {
        TheDOM.Canvas.css('background-repeat', 'no-repeat');
    }
    
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
        // call the Entity object's draw method
        entities[i].draw();

        var img = entities[i].getImage();
        if (img !== undefined) {
            this.context.drawImage(img, entities[i].x - relativeX, entities[i].y - relativeY);
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
//  view        - Coordinates to adjust the "view" of the game (relative origin of top-left corner)
//
// Controller()
//  Constructor
function Controller() {
    this.entities = [];
    this.view = { x: 0, y: 0 }
}


// click(clickEvent)
//  Calls click() on any managed Entity object's that were clicked on.
Controller.prototype.click = function (e) {
    var clickX = e.pageX;
    var clickY = e.pageY;

    for (var i = 0; i < this.entities.length; i++) {
        var ent = this.entities[i];
        if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
            ent.click(e);
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
            this.entities[i].x += (MathUtil.getLengthDirectionX(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10);
            this.entities[i].y += (MathUtil.getLengthDirectionY(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10);
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
    this.entities = this.entities.filter(function (entity) {
        return !entity.isDestroyed;
    });
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

// click()
//  Called by the managing Controller object if e's coordinates are within this Entity's bounding area
Entity.prototype.click = function (e) {
    // to be overridden in instantiation to define on-click behavior
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
    if (this.direction > 180) {
        return this.direction - 360;
    } else {
        return this.direction;
    }
}

Entity.prototype.setDirection= function (newDir) {
    this.direction = newDir;
}

Entity.prototype.setSize = function (newWidth, newHeight) {
    this.width = newWidth;
    this.height = newHeight;
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
        throw "No active controller set!";
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