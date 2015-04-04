describe('vastengine.MathUtil', function () {
    it('Calculates the distance between points (x1, y1) and (x2, y2)', function () {
        var d, x1, y1, x2, y2;

        x1 = 0;
        y1 = -50;
        x2 = 0;
        y2 = 100;

        d = $vast.MathUtil.getPointDistance(x1, y1, x2, y2);
        expect(d).toEqual(150);

        x1 = 5;
        y1 = 6;
        x2 = -7;
        y2 = 11;

        d = $vast.MathUtil.getPointDistance(x1, y1, x2, y2);
        expect(d).toEqual(13);
    });

    it('Calculates the direction from two points (x1, y1) to (x2, y2)', function () {
        var d, x1, y1, x2, y2;

        // east
        x1 = 0; y1 = 0; x2 = 50; y2 = 0;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(0);

        // southeast
        x1 = 0; y1 = 0; x2 = 50; y2 = 50;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(45);

        // south
        x1 = 0; y1 = 0; x2 = 0; y2 = 50;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(90);

        // southwest
        x1 = 0; y1 = 0; x2 = -50; y2 = 50;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(135);

        // west
        x1 = 0; y1 = 0; x2 = -50; y2 = 0;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(180);

        // northwest
        x1 = 0; y1 = 0; x2 = -50; y2 = -50;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(225);

        // north
        x1 = 0; y1 = 0; x2 = 0; y2 = -50;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(270);

        // northeast
        x1 = 0; y1 = 0; x2 = 50; y2 = -50;
        d = $vast.MathUtil.getPointDirection(x1, y1, x2, y2);
        expect(d).toEqual(315);
    });
});