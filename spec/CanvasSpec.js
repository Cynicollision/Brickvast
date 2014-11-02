﻿/// <reference path="C:\Users\Sean\workspace\Brickvast\src/Canvas.js" />
//************************************************************************************//
// Test suite for Canvas class
//************************************************************************************//
describe('Canvas', function () {
    var canvasManager;

    beforeEach(function () {
        canvasManager = new $vast.Canvas();
    })

    it('Retrieves a valid drawing context (used for drawing primitives)', function () {
        expect(canvasManager.getDrawingContext()).toBeDefined();
    });

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var testX = 25, testY = 50;

        var ctrl = new $vast.Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = canvasManager.getViewRelativeX(ctrl);
        var relY = canvasManager.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    });

    it('Can return the width and height of the game canvas', function () {
        canvasManager.canvas.width = 500;
        canvasManager.canvas.height = 300;

        expect(canvasManager.getCanvasWidth()).toEqual(500);
        expect(canvasManager.getCanvasHeight()).toEqual(300);

        // reset back to zero to not screw up jasimine's UI
        canvasManager.canvas.width = 0;
        canvasManager.canvas.height = 0;
    });

    it('Can set the background position of the Canvas element in pixels', function () {
        canvasManager.setBackgroundPosition(25, 50);
        var css = canvasManager.canvas.style.backgroundPosition;
        expect(canvasManager.canvas.style.backgroundPosition).toEqual('25px 50px');
    });
});