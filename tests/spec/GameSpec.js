//************************************************************************************//
// Test suite for Game class
//************************************************************************************//
describe('Game', function () {
    it('Defines global objects for managing various resources', function () {
        expect(Game.Assets).toBeDefined();
        expect(Game.Assets.Images).toBeDefined();
        expect(Game.Assets.Audio).toBeDefined();
        expect(Game.CanvasManager).toBeDefined();
    });
});
