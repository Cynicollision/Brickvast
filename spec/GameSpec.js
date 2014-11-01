/// <reference path="C:\Users\Sean\workspace\Brickvast\src/Game.js" />
//************************************************************************************//
// Test suite for Game class
//************************************************************************************//
describe('Game', function () {
    beforeEach(function () {
        // reset the active controller.
        $vast.Game.setActiveController(new $vast.Controller());
    });

    afterEach(function () {
        // make sure we don't leave the Game running.
        $vast.Game.setActiveController(null);
    });

    it('Defines global objects for managing various resources', function () {
        expect($vast.Game.Images).toBeDefined();
        expect($vast.Game.Audio).toBeDefined();
        expect($vast.Game.Canvas).toBeDefined();
    });

    it('Determines if an active Controller has been assigned', function () {
        $vast.Game.setActiveController(null);
        expect($vast.Game.hasActiveControler()).toBeFalsy();
    });
});
