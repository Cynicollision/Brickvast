/// <reference path="C:\Users\Sean\workspace\vastengine\engine\src/Canvas.js" />
describe('vastengine.Canvas', function () {
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

    it('Can toggle visibility of the canvas element on the page off/on.', function () {
        vastengine.Canvas.setVisible(false);
        expect(vastengine.Canvas.visible).toBeFalsy();
        expect(canvasElement.style.display).toEqual('none');

        vastengine.Canvas.setVisible(true);
        expect(vastengine.Canvas.visible).toBeTruthy();
        expect(canvasElement.style.display).toEqual('block');
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

        expect(vastengine.Canvas.getWidth()).toEqual(500);
        expect(vastengine.Canvas.getHeight()).toEqual(300);
    });

    it('Draws the active Controller\'s entities, then calls its draw() if it is defined', function () {
        var testCtrl = new vastengine.Controller();
        testCtrl.draw = function () { };
        vastengine.Game.setActiveController(testCtrl);

        var ctrl = vastengine.Game.getActiveController();
        spyOn(ctrl, 'drawEntities');
        spyOn(ctrl, 'draw');

        vastengine.Canvas.draw();
        expect(ctrl.drawEntities).toHaveBeenCalled();
        expect(ctrl.draw).toHaveBeenCalled();
    });
});