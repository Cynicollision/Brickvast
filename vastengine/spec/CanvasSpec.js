/// <reference path="C:\Users\Sean\workspace\vastengine\src/Canvas.js" />
//************************************************************************************//
// Test suite for Canvas class
//************************************************************************************//
describe('Canvas', function () {
    var testCanvas;
    beforeEach(function () {
        testCanvas = new $vast.Canvas();
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

    it('Can store default canvas context settings and then restore them.', function () {
        var context = testCanvas.getDrawingContext();

        // store defaults
        testCanvas.setContextDefaults();

        var orig_context_shadowBlur = context.shadowBlur;
        var orig_context_font = context.font;
        var orig_context_textBaseline = context.textBaseline;
        var orig_context_globalAlpha = context.globalAlpha;

        // change some properties
        context.shadowBlur = 123;
        context.font = '21pt yolo';
        context.textBaseline = 'bottom';
        context.globalAlpha = 0.6;

        // reset
        testCanvas.resetContext();

        expect(context.shadowBlur).toEqual(orig_context_shadowBlur);
        expect(context.font).toEqual(orig_context_font);
        expect(context.textBaseline).toEqual(orig_context_textBaseline);
        expect(context.globalAlpha).toEqual(orig_context_globalAlpha);
    });
});