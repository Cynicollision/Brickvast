/// <reference path="C:\Users\Sean\workspace\vastengine\src/Game.js" />

//************************************************************************************//
// Test suite for Game class
//************************************************************************************//
describe('Game', function () {
    beforeEach(function () {
        // reset the active controller and call init().
        vastengine.Game.init();
        vastengine.Game.setActiveController(new vastengine.Controller());
    });

    afterEach(function () {
        // make sure we don't leave the Game running.
        vastengine.Game.setActiveController(null);

        // don't break Jasmine's UI.
        vastengine.Canvas.setCanvasSize(0, 0);
    });

    it('Defines global objects for managing various resources', function () {
        expect(vastengine.Images).toBeDefined();
        expect(vastengine.Audio).toBeDefined();
        expect(vastengine.Canvas).toBeDefined();
    });

    it('Determines if an active Controller has been assigned', function () {
        vastengine.Game.setActiveController(new vastengine.Controller());
        expect(vastengine.Game.getActiveController()).toBeTruthy();
        vastengine.Game.setActiveController(null);
        expect(vastengine.Game.getActiveController()).toBeFalsy();
    });
});
