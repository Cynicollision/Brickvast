/// <reference path="C:\Users\Sean\workspace\vastengine\engine\src/namespace.js" />
describe('vastengine.Sprite', function () {
    var mockImage, mockCanvasContext;
    
    beforeEach(function () {
        mockImage = {
            width: 0,
            height: 0
        };

        mockCanvasContext = {
            drawImage: function (img, x, y) {

            }
        };
    });

    it('Sprite.fromImage creates a Sprite object from a given image, setting the frame width and height to match the image\'s by default', function () {
        mockImage.width = 64;
        mockImage.height = 80;
        var newSprite = vastengine.Sprite.fromImage(mockImage);

        expect(newSprite.width).toEqual(mockImage.width);
        expect(newSprite.height).toEqual(mockImage.height);
    });

    it('Sprite.fromImage errors if the given image is undefined', function () {
        spyOn(vastengine.Game, 'setError');
        vastengine.Sprite.fromImage(undefined);
        expect(vastengine.Game.setError).toHaveBeenCalledWith(vastengine.Error.undefinedImageForSprite);
    });

    it('Sprite.fromImage errors if width or height are less than zero', function () {
        spyOn(vastengine.Game, 'setError');
        vastengine.Sprite.fromImage(mockImage, 10, 0);
        expect(vastengine.Game.setError).toHaveBeenCalledWith(vastengine.Error.invalidDimensionsForSprite);
    });

    it('Sprite.fromImage builds an array of frame numbers based on the given start and end frames', function () {
        var newSprite = vastengine.Sprite.fromImage(mockImage, 1, 1, 1, 3);
        expect(newSprite.frames.length).toEqual(3);
        expect(newSprite.frames[0]).toEqual(1);
        expect(newSprite.frames[1]).toEqual(2);
        expect(newSprite.frames[2]).toEqual(3);
    });
});