/// <reference path="C:\Users\Sean\workspace\vastengine\src/Game.js" />
/// <reference path="C:\Users\Sean\workspace\vastengine\src/Input.js" />
/// <reference path="C:\Users\Sean\workspace\vastengine\src/Controller.js" />
/**
 * Test suite for the Input class.
 */
describe('Input', function () {
    var eventX = 25;
    var eventY = 50;

    var testController;
    var mockEvent;
    beforeEach(function () {
        testController = new $vast.Controller();
        mockEvent = { pageX: eventX, pageY: eventY };
        
        spyOn(testController, 'onTouch');
        spyOn(testController, 'onTouchEnd');

        $vast.Game.init();
        $vast.Game.setActiveController(testController);
    });

    it('Calls the onTouch method of the active Controller object.', function () {
        
        $vast.Input.onTouch(mockEvent);
        
        expect(testController.onTouch).toHaveBeenCalled();
        expect(testController.onTouchEnd).not.toHaveBeenCalled();
    });

    it('Calls the onTouchEnd method of the active Controller object.', function () {

        $vast.Input.onTouchEnd(mockEvent);

        expect(testController.onTouch).not.toHaveBeenCalled();
        expect(testController.onTouchEnd).toHaveBeenCalled();
    });

    it('Correctly un-scales the clicked coordinates.', function () {
        // simulate scaled touch coordinates.
        var scale = vastengine.Game.Canvas.getScale();
        
        
        var translateX = (window.innerWidth - (vastengine.Game.Canvas.getCanvasWidth() / scale)) / 2;
        var translateY = (window.innerHeight - (vastengine.Game.Canvas.getCanvasHeight() / scale)) / 2;

        // TODO: this needs to be updated to work when scaleFromCenter = true...
        var scaleFromCenter = true;
        if (scaleFromCenter) {
            mockEvent.pageX -= translateX;
            mockEvent.pageY -= translateY;
        }


        mockEvent.pageX *= scale;
        mockEvent.pageY *= scale;

        $vast.Input.onTouch(mockEvent);

        // expect Input.onTouchEnd to have scaled the coordinates back to the real position in the game.
        expect(testController.onTouch).toHaveBeenCalledWith(eventX, eventY);
    });
});