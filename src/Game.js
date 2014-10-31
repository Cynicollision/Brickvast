/**
 * This file contains defintions for both the Game and AssetManager classes.
 * @author Sean Normoyle
 */

/**
 * Dictionary-style class used to store, pre-load, and retrieve game assets (images and audio).
 * @param {string} type The type of asset to manage, either "image" or "audio".
 * @constructor
 */
function AssetManager(type) {
    this.assets = [];
    this.type = type;
    if (type != 'image' && type != 'audio') {
        throw 'Invalid asset type "' + type + '"';
    }
}


/**
 * Adds a new asset with the given ID (used for retrieval) and relative source file location.
 * @param {string} newId ID value to assign to the new asset.
 * @param {string} src Path to the asset's image or audio resource, including the file name.
 */
AssetManager.prototype.add = function (newId, src) {
    this.assets.push({ id: newId, source: src, asset: undefined });
}


/**
 * Retrieves the asset (actual Image or Audio object) with the given ID.
 * @param {string} id ID value to look up asset with.
 * @return {object} Image or Audio object assigned to the given ID.
 */
AssetManager.prototype.getById = function (id) {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.assets[i].id === id) {
            return this.assets[i].asset;
        }
    }
}


/**
 * Instantiates all managed assets from their sources at once. Relies on this AssetManager object being correctly instantiated with a valid type.
 */
AssetManager.prototype.load = function () {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.type === 'image') {
            this.assets[i].asset = new Image();
        } else if (this.type === 'audio') {
            this.assets[i].asset = new Audio(this.assets[i].source);
        }

        this.assets[i].asset.src = this.assets[i].source;
    }
}


/**
 * Manages game-level components such as the currently running Controller object, routing input, and accessing assets through AssetManager instances.
 * @constructor
 */
function Game() {
    this.activeController;
}

Game = function () { }
Game.Images = new AssetManager('image');
Game.Audio = new AssetManager('audio');
Game.Canvas = new Canvas();


/** 
 * Sets the running Controller to the given Controller object.
 */
Game.setActiveController = function (newActiveController) {
    this.activeController = newActiveController;
}


/** 
 * Returns the running Controller
 */
Game.getActiveController = function () {
    return this.activeController;
}


/**
 * Determines whether a Controller object has been assigned as the active controller.
 * @return {boolean} True if an active controller exists.
 */
Game.hasActiveControler = function () {
    if (this.activeController) {
        return this.activeController.view !== undefined;
    }
    return false;
}


/**
 * Get the current timestamp (e.g. 87.134....)
 * @return {number} The current timestamp
 */
Game.getTimestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
}


/**
 * The main game loop. Keeps the game running at a fixed FPS.
 */
Game.run = function () {
    var stepSize = 1 / 60; // TODO: load from "global game settings" (whatever those end up being)
    var offset = 0;
    var previous = Game.getTimestamp()

    function stepAndDraw() {
        var current = Game.getTimestamp();
        offset += (Math.min(1, (current - previous) / 1000));

        // still step during the offset (time difference between frames)
        while (offset > stepSize) {
            if (Game.hasActiveControler()) {
                Game.getActiveController().step(stepSize);
            }
            
            offset -= stepSize;
        }

        // draw
        if (Game.hasActiveControler()) {
            Game.Canvas.draw(Game.getActiveController());
        }
        
        previous = current;
        requestAnimationFrame(stepAndDraw);
    }

    requestAnimationFrame(stepAndDraw);
}