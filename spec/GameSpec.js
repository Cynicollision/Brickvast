/// <reference path="C:\Users\Sean\workspace\Brickvast\src/Game.js" />
//************************************************************************************//
// Test suite for Game class
//************************************************************************************//
describe('Game', function () {
    beforeEach(function () {
        // reset the active controller.
        Game.setActiveController(new Controller());
    });

    afterEach(function () {
        // make sure we don't leave the Game running.
        Game.setActiveController(null);
    });

    it('Defines global objects for managing various resources', function () {
        expect(Game.Images).toBeDefined();
        expect(Game.Audio).toBeDefined();
        expect(Game.Canvas).toBeDefined();
    });

    it('Determines if an active Controller has been assigned', function () {
        Game.setActiveController(null);
        expect(Game.hasActiveControler()).toBeFalsy();
    });
});
