﻿/// <reference path="C:\Users\Sean\workspace\vastengine\engine\src/Canvas.js" />
describe('CanvasManager', function () {
    var canvasElement;

    beforeEach(function () {
        canvasElement = document.getElementById('vastCanvas');
    });

    afterEach(function () {
        // reset back to zero to not screw up jasimine's UI
        vastengine.Canvas.setSize(0, 0);
    });

    it('Builds the canvas element on the webpage', function () {
        expect(canvasElement).toBeDefined();
    });

    it('Routes mouse input to vastengine.Input', function () {
        spyOn(vastengine.Input, 'onTouch');
        canvasElement.onmousedown();
        expect(vastengine.Input.onTouch).toHaveBeenCalled();
    });

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var testX = 25, testY = 50;

        var ctrl = new $vast.Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = vastengine.Canvas.getViewRelativeX(ctrl);
        var relY = vastengine.Canvas.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    });

    it('Can return the width and height of the game canvas', function () {
        vastengine.Canvas.setSize(500, 300);

        expect(vastengine.Canvas.getCanvasWidth()).toEqual(500);
        expect(vastengine.Canvas.getCanvasHeight()).toEqual(300);
    });
});