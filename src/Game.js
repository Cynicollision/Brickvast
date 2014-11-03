var vastengine = vastengine || {};
var $vast = vastengine;

/**
 * This file contains defintions for both the Game and AssetManager classes.
 * @author Sean Normoyle
 */

var AssetType = {
    IMAGE: 'image',
    AUDIO: 'audio'
};

/**
 * Dictionary-style class used to store, pre-load, and retrieve game assets (images and audio).
 * @param {string} type The type of asset to manage, either "image" or "audio".
 * @constructor
 */
vastengine.AssetManager = function (type) {
    this.assets = [];
    this.type = type;
    if (type != AssetType.IMAGE && type != AssetType.AUDIO) {
        throw 'Invalid asset type "' + type + '"';
    }
};


/**
 * Adds a new asset with the given ID (used for retrieval) and relative source file location.
 * @param {string} newId ID value to assign to the new asset.
 * @param {string} src Path to the asset's image or audio resource, including the file name.
 */
vastengine.AssetManager.prototype.add = function (newId, src) {
    this.assets.push({ id: newId, source: src, asset: undefined });
};


/**
 * Retrieves the asset (actual Image or Audio object) with the given ID.
 * @param {string} id ID value to look up asset with.
 * @return {object} Image or Audio object assigned to the given ID.
 */
vastengine.AssetManager.prototype.getById = function (id) {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.assets[i].id === id) {
            return this.assets[i].asset;
        }
    }
};


/**
 * Instantiates all managed assets from their sources at once. Relies on this AssetManager object being correctly instantiated with a valid type.
 */
vastengine.AssetManager.prototype.load = function () {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.type === AssetType.IMAGE) {
            this.assets[i].asset = new Image();
        } else if (this.type === AssetType.AUDIO) {
            this.assets[i].asset = new Audio(this.assets[i].source);
        }

        this.assets[i].asset.src = this.assets[i].source;
    }
};


/**
 * Manages game-level components such as the currently running Controller object, routing input, and accessing assets through AssetManager instances.
 * @constructor
 */
vastengine.Game = function() {
    this.activeController = null;
};


/**
 * Game-level constants. Intended to be overridden as the first step of game setup (or use these defaults).
 */
vastengine.Game.Config = {
    fps: 60
};


/**
 * For accessing the actual HTML canvas, used to draw things.
 */
vastengine.Game.Canvas = new vastengine.Canvas();


/**
 * AssetManager utility classes for managing game resources.
 */
vastengine.Game.Images = new vastengine.AssetManager(AssetType.IMAGE);
vastengine.Game.Audio = new vastengine.AssetManager(AssetType.AUDIO);


/** 
 * Sets the running Controller to the given Controller object.
 */
vastengine.Game.setActiveController = function (newActiveController) {
    this.activeController = newActiveController;
};


/** 
 * Returns the running Controller
 */
vastengine.Game.getActiveController = function () {
    return this.activeController;
};


/**
 * Determines whether a Controller object has been assigned as the active controller.
 * @return {boolean} True if an active controller exists.
 */
vastengine.Game.hasActiveControler = function () {
    if (this.activeController) {
        return this.activeController.view !== undefined;
    }
    return false;
};


/**
 * Get the current timestamp (e.g. 87.134....)
 * @return {number} The current timestamp
 */
vastengine.Game.getTimestamp = function () {
    return window.performance && window.performance.now ? window.performance.now() : new Date().getTime();
};


/**
 * The main game loop. Keeps the game running at a fixed FPS.
 */
vastengine.Game.run = function () {
    var fps = vastengine.Game.Config.fps;
    var stepSize = 1 / fps;
    var offset = 0;
    var previous = vastengine.Game.getTimestamp();

    function stepAndDraw() {
        var current = vastengine.Game.getTimestamp();
        offset += (Math.min(1, (current - previous) / 1000));

        // still step during the offset (time difference between frames)
        while (offset > stepSize) {
            if (vastengine.Game.hasActiveControler()) {
                vastengine.Game.getActiveController().step(stepSize);
            }
            
            offset -= stepSize;
        }

        // draw
        if (vastengine.Game.hasActiveControler()) {
            vastengine.Game.Canvas.draw(vastengine.Game.getActiveController());
        }
        
        previous = current;
        requestAnimationFrame(stepAndDraw);
    }

    requestAnimationFrame(stepAndDraw);
};
