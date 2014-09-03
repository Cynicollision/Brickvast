//************************************************************************************//
// Test suite for TheDOM class
//************************************************************************************//

describe('TheDOM: can find the main canvas', function () {
    it('uses jQuery to retrieve a valid Canvas element and calling getContext(\'2d\')', function () {
        var theCanvas = $("#theCanvas");

        // assert
        expect(theCanvas[0].getContext('2d')).toBeDefined();
    })
});