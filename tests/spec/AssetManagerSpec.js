/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/AssetManager.js" />

/*
describe('Class: name of test', function () {
    it('does stuff', function () {
        // code + https://github.com/pivotal/jasmine/wiki/Matchers
        expect(returned_type).toEqual("testEntity");
    });
});

*/


//************************************************************************************//
// Test suite for AssetManager class
//************************************************************************************//
describe('AssetManager', function () {
    var testAssetManager;

    beforeEach(function () {
        testAssetManager = new AssetManager('image');
    });

    it('Adds and retrieves resources by ID value', function () {
        testAssetManager.add('testAsset', 'src/tile.png');
        var asset = testAssetManager.getById('testAsset');
        expect(testAssetManager.assets[0].id).toEqual('testAsset');
        expect(testAssetManager.assets[0].source).toEqual('src/tile.png');
        expect(asset).not.toBeDefined();
    });

});
