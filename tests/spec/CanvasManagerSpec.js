/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/CanvasManager.js" />
//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//
describe('CanvasManager', function () {

    it('Retrieves and stores a local this.context from the TheDOM class', function () {
        var cm = new CanvasManager();
        expect(cm.context).toBeDefined();
    }),

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var cm = new CanvasManager();
        var testX = 25, testY = 50;

        var ctrl = new Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = cm.getViewRelativeX(ctrl);
        var relY = cm.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    })

});