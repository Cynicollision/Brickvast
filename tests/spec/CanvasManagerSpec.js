/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/CanvasManager.js" />
/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/TheDOM.js" />
//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//
describe('CanvasManager', function () {
    var canvasManager;

    beforeEach(function () {
        canvasManager = new CanvasManager();
    })

    it('Retrieves and stores a local this.context from the TheDOM class (used for drawing primitives)', function () {
        expect(canvasManager.getDrawingContext()).toBeDefined();
    }),

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var testX = 25, testY = 50;

        var ctrl = new Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = canvasManager.getViewRelativeX(ctrl);
        var relY = canvasManager.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    })

    it('Can return the width and height of the game canvas', function () {
        var dom = new TheDOM();
        dom.canvas[0].width = 500;
        dom.canvas[0].height = 300;

        expect(canvasManager.getCanvasWidth()).toEqual(500);
        expect(canvasManager.getCanvasHeight()).toEqual(300);

        // reset back to zero to not screw up jasimine's UI
        dom.canvas[0].width = 0;
        dom.canvas[0].height = 0;
    })
});