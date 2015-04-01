describe('Game', function () {
    beforeEach(function () {
        // reset the active controller.
        vastengine.Game.setActiveController(new vastengine.Controller());
    });

    afterEach(function () {
        // make sure we don't leave the Game running.
        vastengine.Game.setActiveController(null);

        // don't break Jasmine's UI.
        vastengine.Canvas.setSize(0, 0);
    });

    it('Defines vastengine.GameState enumeration, and Canvas, Images, and Audio modules', function () {
        expect(vastengine.GameState).toBeDefined();
        expect(vastengine.Canvas).toBeDefined();
        expect(vastengine.Images).toBeDefined();
        expect(vastengine.Audio).toBeDefined();
    });

    it('Determines if an active Controller has been assigned', function () {
        vastengine.Game.setActiveController(new vastengine.Controller());
        expect(vastengine.Game.getActiveController()).toBeTruthy();
        vastengine.Game.setActiveController(null);
        expect(vastengine.Game.getActiveController()).toBeFalsy();
    });
});
