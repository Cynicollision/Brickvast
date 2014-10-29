/// <reference path="C:\Users\Sean\workspace\Brickvast\js/engine/AssetManager.js" />
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
