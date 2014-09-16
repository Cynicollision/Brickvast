//************************************************************************************//
// Test suite for TheDOM class
//************************************************************************************//
describe('TheDOM', function () {

    it('Uses jQuery to retrieve a valid Canvas element and calling getContext(\'2d\')', function () {
        var theCanvas = $("#theCanvas");
        expect(theCanvas[0].getContext('2d')).toBeDefined();
    })

});

