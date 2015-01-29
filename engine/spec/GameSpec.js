/// <reference path="C:\Users\Sean\workspace\vastengine\src/Game.js" />

//************************************************************************************//
// Test suite for Game class
//************************************************************************************//
describe('Game', function () {
    beforeEach(function () {
        // reset the active controller and call init().
        $vast.Game.init();
        $vast.Game.setActiveController(new $vast.Controller());
    });

    afterEach(function () {
        // make sure we don't leave the Game running.
        $vast.Game.setActiveController(null);

        // don't break Jasmine's UI.
        $vast.Game.Canvas.setCanvasSize(0, 0);
    });

    it('Defines global objects for managing various resources', function () {
        expect($vast.Game.Images).toBeDefined();
        expect($vast.Game.Audio).toBeDefined();
        expect($vast.Game.Canvas).toBeDefined();
    });

    it('Has a Config object with default values for each item', function () {
        expect($vast.Game.Config).toBeDefined();
        expect($vast.Game.Config.fps).toBeGreaterThan(0);
    });

    it('Determines if an active Controller has been assigned', function () {
        $vast.Game.setActiveController(null);
        expect($vast.Game.hasActiveControler()).toBeFalsy();
    });
});
