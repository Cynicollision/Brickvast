/// <reference path="Game.js" />
/// <reference path="Canvas.js" />
/// <reference path="Config.js" />

var vastengine = vastengine || {};

/**
 * Used specifically for manipulating directly the main game canvas, i.e. drawing on it.
 * @constructor
 */
 vastengine.Canvas = (function () {
     var canvas, context, backgroundScrollFactor = 1, scaleFactor = 1,
         canvasId = 'vastCanvas', className = 'canvasStyle';

     return {
         /** 
          * build the HTML canvas and insert into the DOM.
          */
         buildCanvas: function () {
             canvas = document.createElement('canvas');
             canvas.id = canvasId;
             canvas.className = className;

             // "wire up" mouse events to be handled by Input class.
             canvas.onmousedown = function (e) {
                 vastengine.Input.onTouch(e);
             };

             canvas.onmouseup = function (e) {
                 vastengine.Input.onTouchEnd(e);
             };

             context = canvas.getContext('2d');
             document.body.appendChild(canvas);
             this.updateCanvasSize();
         },

         /**
          * Updates the size of the canvas according to whether the game is fullscreen or not.
          */
         updateCanvasSize: function () {
             scaleFactor = vastengine.Config.scale;
             if (vastengine.Config.fullScreen) {
                 canvas.width = window.innerWidth;
                 canvas.height = window.innerHeight;
             } else {
                 canvas.width = vastengine.Config.canvasWidth * vastengine.Config.scale;
                 canvas.height = vastengine.Config.canvasHeight * vastengine.Config.scale;
             }
         },

         /**
          * Sets the background-color property of the game canvas.
          * @param {string} color CSS color value.
          */
         setBackgroundColor: function (color) {
             canvas.style.background = color;
         },
     
         /**
          * Sets the background-image property of the game canvas.
          * @param {string} url URL to image resource to use as background image.
          * @param {boolean} Whether to tile the background image or not.
          */
         setBackgroundImage: function (url, tiled) {
             canvas.style.backgroundImage = 'url(' + url + ')';
             if (!tiled) {
                 canvas.style.backgroundRepeat = 'no-repeat';
             }
         },
     
         /**
          * Sets the background-position property of the game canvas.
          * @param {number} x New X-offset from origin.
          * @param {number} y New Y-offset from origin.
          */
         setBackgroundPosition: function (x, y) {
             canvas.style.backgroundPosition = x + 'px ' + y + 'px';
         },
     
         /**
          * Sets the scroll factor (ratio) for the background image. A value of 0 results 
          * in a fixed background and a value of 1 results in the background scrolling 
          * proportionally to the active controller's view position.
          * @param {number} factor Scroll factor (ratio to active controller's view position).
          */
         setScrollFactor: function (factor) {
             backgroundScrollFactor = factor;
         },
     
         /**
          * Retrieves the width of the game canvas.
          * @return {number} Width of the game canvas.
          */
         getCanvasWidth: function () {
             return canvas.width;
         },
     
         /**
          * Retrieve the height of the game canvas.
          * @return {number} Height of the game canvas.
          */
         getCanvasHeight: function () {
             return canvas.height;
         },
     
         /**
          * Sets the width and height of the HTML canvas.
          * @param {number} w New width for the canvas.
          * @param {number} h New height for the canvas.
          */
         setSize: function (w, h) {
             canvas.width = w;
             canvas.height = h;
         },
     
         /**
          * Gets a single scaling ratio of the canvas.
          */
         getScale: function () {
             return scaleFactor;
         },
     
         /**
          * Retrieve the horizontal position of the view.
          * @return {number} X-coordinate of the given Controller object's view property.
          */
         getViewRelativeX: function (controller) {
             if (controller.view !== undefined) {
                 return controller.view.x;
             } else {
                 return 0;
             }
         },
     
         /**
          * Retrieve the vertical position of the view.
          * @return {number} Y-coordinate of the given Controller object's view property.
          */
         getViewRelativeY: function (controller) {
             if (controller.view !== undefined) {
                 return controller.view.y;
             } else {
                 return 0;
             }
         },
     
         /**
          * Draw directly on the canvas, passing a delegate function to call with the Canvas's 2D drawing context.
          * @param {function} Delegate to call, passing the Canvas's 2D drawing context.
          */
         drawElement: function (func) {
             context.save();
             func(context);
             context.restore();
         },
     
         /**
          * Clears the game canvas and draws the given Controller object. Draws the given controller's managed entities relative to its view.
          * @param {Controller} controller Controller object to draw.
          */
         drawController: function (controller) {
             // clear and save the drawing context, then scale.
             context.clearRect(0, 0, canvas.width, canvas.height);
             context.save();
             context.scale(scaleFactor, scaleFactor);
     
             // translate context to account for scaling if scale mode is "from center"
             var translateX = (this.getCanvasWidth() - (this.getCanvasWidth() / scaleFactor)) / 2;
             var translateY = (this.getCanvasHeight() - (this.getCanvasHeight() / scaleFactor)) / 2;
             if (vastengine.Config.scaleCenter) {
                 context.translate(-translateX, -translateY);
             }
     
             // get relative (x,y) to the location of the controller's view.
             var relativeX = this.getViewRelativeX(controller);
             var relativeY = this.getViewRelativeY(controller);
     
             // adjust the background position according to the relative (x, y) of the view.
             this.setBackgroundPosition(-relativeX * backgroundScrollFactor, -relativeY * backgroundScrollFactor);
     
             // draw entities (sorted in reverse order by depth) at their positions relative to the view.
             controller.sortEntities();
             var entities = controller.getEntities();
             for (var i = 0; i < entities.length; i++) {
                 // first call each Entitiy's draw() ...
                 if (entities[i].draw) {
                     entities[i].draw();
                 }
     
                 // ...then draw its Image.
                 if (entities[i]) {
                     var sprite = entities[i].getSprite();
                     if (sprite) {
                         sprite.draw(context, entities[i].x - relativeX, entities[i].y - relativeY);
                     }   
                 }
             }
     
             // restore the drawing context.
             context.restore();
         }
    };
})();