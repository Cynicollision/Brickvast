//************************************************************************************//
// AssetManager
//  Dictionary used to store, pre-load, and retrieve game assets such as images and audio.
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
    if (type != 'image' && type != 'audio') {
        throw 'Invalid asset type "' + type + '"';
    }
}

// add(newId, src)
//  Adds a new asset with the given ID (used for retrieval) and relative source file location.
AssetManager.prototype.add = function (newId, src) {
    this.assets.push({ id: newId, source: src, asset: undefined });
}

// getById(id)
//  Returns the asset with the given ID if it exists.
AssetManager.prototype.getById = function (id) {
    for (var i = 0; i < this.assets.length; i++) {
        if (this.assets[i].id === id) {
            return this.assets[i].asset;
        }
    }
}

// load()
//  Instantiates all managed assets from their sources at once.
//  Relies on this AssetManager object being correctly instantiated with a valid type.
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