/// <reference path="Game.js" />
var vastengine = vastengine || {};

vastengine.Config = {

    _properties: {
        'game_speed': 60,
        'scale_center': false
    },

    setProperty: function (name, value) {
        if (this._properties[name] !== undefined) {
            this._properties[name] = value;
        } else {
            vastengine.Game.setError('Unknown property: ' + name);
        }
    },

    getProperty: function (name) {
        return this._properties[name];
    }
};