﻿/// <reference path="Entity.js" />

var vastengine = vastengine || {};
(function () {
    /**
     * Manages a collection of Entity objects and adjusts the visible view area.
     * @constructor
     */
    vastengine.Controller = function () {
        this.entities = [];
        this.view = { x: 0, y: 0 };

        // methods.
        this.postStep = null;
        this.onTouch = null;
        this.onTouchEnd = null;
    };

    vastengine.Controller.prototype = {

        /**
         * Sets the view position to the given coordinates.
         * @param {number} newX New X-coordinate for the view position (horizontal offset).
         * @param {number} newY New Y-coordinate for the view position (vertical offset)
         */
        setViewPosition: function (newX, newY) {
            this.view.x = newX;
            this.view.y = newY;
        },

        /** 
         * Called by the controller continuously while the game loop is running. Calls all managed entities' own step() functions, then its own postStep() function.
         */
        step: function () {
            this.removeDestroyedEntities();

            for (var i = 0; i < this.entities.length; i++) {

                // apply Entity motion
                if (this.entities[i].speed !== 0) {
                    this.entities[i].x += Math.round((vastengine.MathUtil.getLengthDirectionX(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10));
                    this.entities[i].y += Math.round((vastengine.MathUtil.getLengthDirectionY(this.entities[i].getSpeed(), this.entities[i].getDirection()) / 10));
                }

                if (this.entities[i].step) {
                    this.entities[i].step();
                }
            }

            if (this.postStep) {
                this.postStep();
            }
        },

        /** 
         * Sets the function to call at the end of each game step.
         * @param {function} step() function to be called.
         */
        setPostStep: function (postStepFn) {
            this.postStep = postStepFn;
        },

        /** 
         * Sets the function to call on a touch event.
         * @param {function} onTouchFn Function to call on a touch event.
         */
        setOnTouch: function (onTouchFn) {
            this.onTouch = onTouchFn;
        },

        /** 
         * Sets the function to call on a touch end event.
         * @param {function} onTouchFn Function to call on a touch end event.
         */
        setOnTouchEnd: function (onTouchEndFn) {
            this.onTouchEnd = onTouchEndFn;
        },

        /**
         * Adds an Entity object to the collection of entities managed by this controller.
         * @param 
         */
        addEntity: function (newEnt) {
            this.entities.push(newEnt);
        },

        /**
         * Retrieve the collection of entities managed by this controller.
         * @return {Array.<Entity>} 
         */
        getEntities: function () {
            return this.entities;
        },

        /** 
         * Returns a single managed Entity with the given ID value if it exists (ID values are not enforced to be unique).
         * @return {Entity} The Entity with the given id value, if one exists within the managed collection.
         */
        getEntityById: function (id) {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].id === id) {
                    return this.entities[i];
                }
            }
        },

        /**
         * Retrieves all managed entities with the given type.
         * @param {string} type Find Entity objects with type property that matches.
         * @return {Array.<Entity>} Array of Entities with the given type.
         */
        getEntitiesByType: function (type) {
            var hits = [];
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].type === type) {
                    hits.push(this.entities[i]);
                }
            }
            return hits;
        },

        /**
         * Retrieve all Entity objects at the given position.
         * @param {number} x X-coordinate to check.
         * @param {number} y Y-coordinate to check.
         * @param {string} Optional type to check/filter for. If specified, only Entity objects with this type will be returned.
         * @return {Array.<Entity>} Cllection of Entity objects for which (x, y) falls within its width and height bounds.
         */
        getEntitiesAtPosition: function (x, y, type) {
            var hits = [];
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].onPosition(x, y)) {
                    if (!type || this.entities[i].type === type) {
                        hits.push(this.entities[i]);
                    }
                }
            }
            return hits;
        },

        /**
         * Determines if the given position is free of all managed Entity objects. If the given (x, y) 
         * falls within the (x, y) and (x+w, y+h) of any Entity objects
         * @param {number} x X-coordinate to check.
         * @param {number} y Y-coordinate to check.
         * @param {string} Optional type to check/filter for. If specified, only check for Entity objects with this type.
         */
        isPositionFree: function (x, y, type) {
            for (var i = 0; i < this.entities.length; i++) {
                if (this.entities[i].onPosition(x, y)) {
                    if (!type || type === this.entities[i].type) {
                        return false;
                    }
                }
            }
            return true;
        },

        /**
         * Sorts managed entities in descending order by depth.
         */
        sortEntities: function () {
            this.entities.sort(function (a, b) {
                return -(a.depth - b.depth);
            });
        },

        /** 
         * Removes all managed Entity object where property isDestroyed is true.
         */
        removeDestroyedEntities: function () {
            if (this.entities !== undefined && this.entities.length > 0) {
                this.entities = this.entities.filter(function (entity) {
                    return (!entity || !entity.isDestroyed);
                });
            }
        }
    };
})();