
var vastengine = vastengine || {};
(function () {


    /**
     * Dictionary-style class used to store, pre-load, and retrieve game assets (images and audio).
     * @param {string} type The type of asset to manage, either "image" or "audio".
     * @constructor
     */
    vastengine.AssetManager = function (type) {
        this.assets = [];
        this.type = type;
        if (type != vastengine.AssetType.IMAGE && type != vastengine.AssetType.AUDIO) {
            throw 'Invalid asset type "' + type + '"';
        }
    };


    /**
     * Enumeration of asset types.
     */
    vastengine.AssetType = {
        IMAGE: 'image',
        AUDIO: 'audio'
    };

    vastengine.AssetManager.prototype = {

        /**
         * Adds a new asset with the given ID (used for retrieval) and relative source file location.
         * @param {string} newId ID value to assign to the new asset.
         * @param {string} src Path to the asset's image or audio resource, including the file name.
         */
        add: function (newId, src) {
            this.assets.push({ id: newId, source: src, asset: undefined });
        },


        /**
         * Retrieves the asset (actual Image or Audio object) with the given ID.
         * @param {string} id ID value to look up asset with.
         * @return {object} Image or Audio object assigned to the given ID.
         */
        getById: function (id) {
            for (var i = 0; i < this.assets.length; i++) {
                if (this.assets[i].id === id) {
                    return this.assets[i].asset;
                }
            }

            throw "No asset exists with the given ID value.";
        },


        /**
         * Instantiates all managed assets from their sources at once. Relies on this AssetManager object being correctly instantiated with a valid type.
         */
        // TODO: add callback?
        load: function () {
            for (var i = 0; i < this.assets.length; i++) {
                if (this.type === vastengine.AssetType.IMAGE) {
                    this.assets[i].asset = new Image();
                } else if (this.type === vastengine.AssetType.AUDIO) {
                    this.assets[i].asset = new Audio(this.assets[i].source);
                }

                this.assets[i].asset.src = this.assets[i].source;
            }
        }
    };
})();