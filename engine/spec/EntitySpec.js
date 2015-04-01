describe('Entity', function () {
    var testEntity;

    beforeEach(function () {
        testEntity = new $vast.Entity();
        testEntity.setPosition(50, 50);
        testEntity.setSize(50, 50);
    });

    it('Can detect a collision with another Entity by comparing their bounding areas.', function () {
        var otherEntity = new $vast.Entity();
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
});