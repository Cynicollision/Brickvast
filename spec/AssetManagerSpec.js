/// <reference path="C:\Users\Sean\workspace\vastengine\src/AssetManager.js" />
//************************************************************************************//
// Test suite for AssetManager class
//************************************************************************************//
describe('AssetManager', function () {
    var imageManager;
    var audioManager;

    beforeEach(function () {
        imageManager = new vastengine.AssetManager(vastengine.AssetType.IMAGE);
        imageManager.add('testImage1', 'fake/resource.png');

        audioManager = new vastengine.AssetManager(vastengine.AssetType.AUDIO);
        audioManager.add('testSound1', 'fake/sound.mp3');
    });

    it('Throws an error if instantiated with an invalid AssetType.', function () {
        var invalidCreation = function () {
            new vastengine.AssetManager('invalid');
        };

        expect(invalidCreation).toThrow();
    });

    it('Can add and retrieve assets by id.', function () {   
        var getImage = function () {
            imageManager.getById('testImage1');
        };

        var getAudio = function () {
            audioManager.getById('testSound1');
        };
        
        expect(getImage).not.toThrow();
        expect(getAudio).not.toThrow();
    });

    it('Throws an error if retrieving by asset ID fails.', function () {
        var getImage = function () {
            imageManager.getById('tstImage1');
        };

        expect(getImage).toThrow();
    });

    it('Defines each asset when loading.', function () {
        var imageAsset = imageManager.getById('testImage1');
        var audioAsset = audioManager.getById('testSound1');
        expect(imageAsset).not.toBeDefined();
        expect(audioAsset).not.toBeDefined();

        // do loading
        imageManager.load();
        audioManager.load();

        imageAsset = imageManager.getById('testImage1');
        audioAsset = audioManager.getById('testSound1');
        expect(imageAsset).toBeDefined();
        expect(audioAsset).toBeDefined();
    });
});