//************************************************************************************//
// Test suite for CanvasManager class
//************************************************************************************//

/*
describe('Class: name of test', function () {
    it('does stuff', function () {
        // code + https://github.com/pivotal/jasmine/wiki/Matchers
        expect(returned_type).toEqual("testEntity");
    });
});

*/


describe('CanvasManager: Can find the drawing context', function () {
    it('Retrieves and stores a local this.context from the TheDOM class', function () {
        var cm = new CanvasManager();

        // assert
        expect(cm).toBeDefined();
    });
});
