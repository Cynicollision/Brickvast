//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//
describe('CanvasManager', function () {
    var testCanvas;
    beforeEach(function () {
        testCanvas = new $vast.CanvasManager();
    });

    it('Retrieves a valid drawing context (used for drawing primitives)', function () {
        expect(testCanvas.getDrawingContext()).toBeDefined();
    });

    it('Finds the correct relative (x,y) of the View of the given Controller', function () {
        var testX = 25, testY = 50;

        var ctrl = new $vast.Controller();
        ctrl.view.x = testX;
        ctrl.view.y = testY;

        var relX = testCanvas.getViewRelativeX(ctrl);
        var relY = testCanvas.getViewRelativeY(ctrl);

        expect(relX).toEqual(testX);
        expect(relY).toEqual(testY);
    });

    it('Can return the width and height of the game canvas', function () {
        testCanvas.canvas.width = 500;
        testCanvas.canvas.height = 300;

        expect(testCanvas.getCanvasWidth()).toEqual(500);
        expect(testCanvas.getCanvasHeight()).toEqual(300);

        // reset back to zero to not screw up jasimine's UI
        testCanvas.canvas.width = 0;
        testCanvas.canvas.height = 0;
    });

    it('Can set the background position of the Canvas element in pixels', function () {
        testCanvas.setBackgroundPosition(25, 50);
        var css = testCanvas.canvas.style.backgroundPosition;
        expect(testCanvas.canvas.style.backgroundPosition).toEqual('25px 50px');
    });
});