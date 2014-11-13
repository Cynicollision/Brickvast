/// <reference path="C:\Users\Sean\workspace\vastengine\src/Game.js" />
/// <reference path="C:\Users\Sean\workspace\vastengine\src/Input.js" />
/// <reference path="C:\Users\Sean\workspace\vastengine\src/Controller.js" />
/**
 * Test suite for the Input class.
 */
describe('Input', function () {
    var testController;
    var mockEvent;
    beforeEach(function () {
        testController = new $vast.Controller();
        mockEvent = { pageX: 25, pageY: 50 };
        
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
});