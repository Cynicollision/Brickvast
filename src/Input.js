
var vastengine = vastengine || {};

/**
 * Abstracts click and touch event handling, adjusting for scaling and type of event.
 * @constructor
 */
vastengine.Input = function () {
    this.currentTouchX = -1; // TODO: implement these.
    this.currentTouchY = -1;
};


/**
 * Enumeration of touch input event types.
 */
vastengine.InputEventType = {
    TOUCH_START: 0,
    TOUCH_END: 1
};


/**
 * Called at the beginning of a touch event.
 * @param {object} e Event object.
 */
vastengine.Input.onTouch = function (e) {
    this.onTouchEvent(vastengine.InputEventType.TOUCH_START, e.pageX, e.pageY);
};


/**
 * Called when a touch event ends (un-touch).
 * @param {object} e Event object.
 */
vastengine.Input.onTouchEnd = function (e) {
    this.onTouchEvent(vastengine.InputEventType.TOUCH_END, e.pageX, e.pageY);
};


/**
 * Call the correct onTouch or onTouchEnd method for the active Dialog or Controller 
 * object and any of its managed Entity objects.
 * @param {InputEventType} eventType Determines whether to call onTouch or onTouchEnd.
 * @param {number} actualX X-coordinate of the touch event after un-scaling.
 * @param {number} actualY Y-coordinate of the touch event after un-scaling.
 */
vastengine.Input.onTouchEvent = function (eventType, actualX, actualY) {
    var ctrl = vastengine.Game.getActiveController();
    var scale = vastengine.Game.Canvas.getScale();
    
    // adjust for scale
    var clickX = (actualX / scale);
    var clickY = (actualY / scale);

    if (vastengine.Game.activeDialog) {
        if (eventType === vastengine.InputEventType.TOUCH_START) {
            vastengine.Game.activeDialog.onTouch(clickX, clickY);
        }
    } else {
        if (ctrl) {
            // adjust for view's coordinates
            if (eventType === vastengine.InputEventType.TOUCH_START && ctrl.onTouch) {
                ctrl.onTouch(clickX + ctrl.view.x, clickY + ctrl.view.y);
            } else if (ctrl.onTouchEnd) {
                ctrl.onTouchEnd(clickX + ctrl.view.x, clickY + ctrl.view.y);
            }
        }
    }


    if (vastengine.Game.running) {
        // call onTouch for each of the active Controller's Entity collection.
        var entities = ctrl.getEntities();
        for (var i = 0; i < entities.length; i++) {
            var ent = entities[i];
            if (ent.width > 0 && ent.height > 0) {
                if ((clickX > ent.x) && (clickY > ent.y) && (clickX < ent.x + ent.width) && (clickY < ent.y + ent.height)) {
                    if (eventType === vastengine.InputEventType.TOUCH_START && ent.onTouch) {
                        ent.onTouch(clickX, clickY);
                    } else if (ent.onTouchEnd) {
                        ent.onTouchEnd(clickX, clickY);
                    }
                }
            }
        }
    }
};
