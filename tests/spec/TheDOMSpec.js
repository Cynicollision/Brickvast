/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/TheDOM.js" />
//************************************************************************************//
// Test suite for TheDOM class
//************************************************************************************//
describe('TheDOM', function () {
    var theDOM, theCanvas;

    beforeEach(function () {
        theCanvas = $("#theCanvas");
        theDOM = new TheDOM();
    })

    it('Uses jQuery to retrieve a valid Canvas element and calling getContext(\'2d\')', function () {
        expect(theCanvas[0].getContext('2d')).toBeDefined();
    });

    it('Can set the background position of the Canvas element in pixels', function () {
        theDOM.setBackgroundPosition(25, 50);
        var css = theCanvas.css('background-position');
        expect(theCanvas.css('background-position')).toEqual('25px 50px');
    })

});

