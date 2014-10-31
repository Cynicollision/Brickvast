/// <reference path="C:\Users\Sean\workspace\Brickvast\src/Entity.js" />

//************************************************************************************//
// Test suite for Entity class
//************************************************************************************//
describe('Entity', function () {
    var testEntity;

    beforeEach(function () {
        testEntity = new Entity();
        testEntity.setPosition(50, 50);
        testEntity.setSize(50, 50);
    });

    it('Can detect a collision with another Entity by comparing their bounding areas', function () {
        var otherEntity = new Entity();
        otherEntity.setPosition(75, 75)
        otherEntity.setSize(60, 60);

        expect(testEntity.checkCollision(otherEntity)).toBeTruthy();

        otherEntity.setPosition(101, 101);

        expect(testEntity.checkCollision(otherEntity)).toBeFalsy();
    });
});