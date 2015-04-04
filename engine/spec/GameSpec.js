describe('vastengine.Game', function () {
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

    it('Defines a default active Controller', function () {
        expect(vastengine.Game.getActiveController()).toBeDefined();
    });
});
