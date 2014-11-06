
var vastengine = vastengine || {};

/**
 * Abstracts click and touch event handling, adjusting for scaling and type of event.
 * @constructor
 */
vastengine.Input = function () {
    this.currentTouchX = -1; // TODO: implement these.
    this.currentTouchY = -1;
};

// TODO: document rest of file
// e.button 0 = left, 1 = middle, 2 = right.
vastengine.InputEventType = {
    touchStart: 0,
    touchEnd: 1
};


vastengine.Input.prototype.onTouch = function (e) {
    this.onTouchEvent(vastengine.InputEventType.touchStart, e.pageX, e.pageY);
};


vastengine.Input.prototype.onTouchEnd = function (e) {
    this.onTouchEvent(vastengine.InputEventType.touchEnd, e.pageX, e.pageY);
};


vastengine.Input.prototype.onTouchEvent = function (eventType, actualX, actualY) {
    var ctrl = vastengine.Game.getActiveController();
    var scale = vastengine.Game.Canvas.getScale();
    

    // adjust for scale and the view's coordinates.
    var clickX = (actualX / scale) + ctrl.view.x;
    var clickY = (actualY / scale) + ctrl.view.y;

    // call the active Controller's onTouch
    if (ctrl.onTouch) {
        ctrl.onTouch(clickX, clickY);
    }

    if (vastengine.Game.running) {
        // call onTouch for each of the active Controller's Entity collection.
        var entities = ctrl.getEntities();
        for (var i = 0; i < entities.length; i++) {
            var ent = entities[i];
            if (ent.width > 0 && ent.height > 0) {
                if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
                    if (ent.onTouch) {
                        ent.onTouch(clickX, clickY);
                    }
                }
            }
        }
    } else if (vastengine.Game.activeDialog) {
        vastengine.Game.activeDialog.onTouch(clickX, clickY);
    }
    
};
