describe('vastengine.Entity', function () {
    var testEntity;

    beforeEach(function () {
        testEntity = new vastengine.Entity();
        testEntity.setPosition(50, 50);
        testEntity.setSize(50, 50);
    });

    it('Can detect a collision with another Entity by comparing their bounding areas.', function () {
        var otherEntity = new vastengine.Entity();
        otherEntity.setPosition(75, 75);
        otherEntity.setSize(60, 60);
        expect(testEntity.checkCollision(otherEntity)).toBeTruthy();
        otherEntity.setPosition(101, 101);
        expect(testEntity.checkCollision(otherEntity)).toBeFalsy();
    });

    it('Can determine if a given position (coordinates) fall within its bounds.', function () {
        expect(testEntity.onPosition(81, 82)).toBeTruthy();
        expect(testEntity.onPosition(48, 49)).toBeFalsy();
        testEntity.setPosition(400, 400);
        testEntity.setSize(15, 20);
        expect(testEntity.onPosition(414, 419)).toBeTruthy();
    });

    it('Can have its absolute position set', function () {
        testEntity.setPosition(390, 421);
        expect(testEntity.x).toEqual(390);
        expect(testEntity.y).toEqual(421);
    });

    it('Can have its size (bounding box) set', function () {
        testEntity.setSize(354, 298);
        expect(testEntity.width).toEqual(354);
        expect(testEntity.height).toEqual(298);
    });

    it('Can set its size to match the size of its Sprite', function () {
        testEntity.sprite = new vastengine.Sprite(null, 43, 102, []);
        testEntity.setSizeFromSprite();
        expect(testEntity.width).toEqual(43);
        expect(testEntity.height).toEqual(102);
    });

    it('Can be destroyed from the game', function () {
        expect(testEntity.isDestroyed).toBeFalsy();
        testEntity.destroy();
        expect(testEntity.isDestroyed).toBeTruthy();
    });

    it('Draws its Sprite if one is defined', function () {
        var testSprite = new vastengine.Sprite();
        testEntity.sprite = testSprite;
        spyOn(testSprite, 'draw');
        testEntity.drawSprite();
        expect(testSprite.draw).toHaveBeenCalled();
    });
});