//************************************************************************************//
// Class: MathUtil
//  For performing various mathematical calculations, trig etc.
function MathUtil() { }

// MathUtil.getPointDistance(x1, y1, x2, y2)
//  Returns the distance between two points ((x1, y1), (x2, y2))
MathUtil.getPointDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
}

// MathUtil.getPointDirection(x1, y1, x2, y2)
/// Returns the direction from two points (x1, y1) to (x2, y2)
MathUtil.getPointDirection = function (x1, y1, x2, y2) {
    var direction = ((180 / Math.PI) * Math.atan2(y2 - y1, x2 - x1));
    if (direction > 360) {
        direction -= 360;
    } else if (direction < 0) {
        direction += 360;
    }
    return direction;
}

// MathUtil.getLengthDirectionX(length, direction)
//  Returns the x-offset of a point the given length and direction from (0, 0).
MathUtil.getLengthDirectionX = function (len, dir) {
    return Math.floor(len * Math.cos(dir * (Math.PI / 180)));
}

// MathUtil.getLengthDirectionY(length, direction)
//  Returns the y-offset of a point the given length and direction from (0, 0).
MathUtil.getLengthDirectionY = function (len, dir) {
    return Math.floor(len * Math.sin(dir * (Math.PI / 180)));
}