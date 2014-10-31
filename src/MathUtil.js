/**
 * For performing various mathematical calculations, trig etc.
 * @constructor
 */
function MathUtil() { }


/**
 * Calculate the distance between two points (x1, y1) and (x2, y2).
 * @param {number} x1 X-coordinate of point 1.
 * @param {number} y1 Y-coordinate of point 1.
 * @param {number} x2 X-coordinate of point 2.
 * @param {number} y2 Y-coordinate of point 2.
 * @return {number} Distance between the two given points.
 */
MathUtil.getPointDistance = function (x1, y1, x2, y2) {
    return Math.sqrt(((x2 - x1) * (x2 - x1)) + ((y2 - y1) * (y2 - y1)));
}


/**
 * Calculate the direction from two points (x1, y1) to (x2, y2).
 * @param {number} x1 X-coordinate of point 1.
 * @param {number} y1 Y-coordinate of point 1.
 * @param {number} x2 X-coordinate of point 2.
 * @param {number} y2 Y-coordinate of point 2.
 * @return {number} Direction from point 1 to point 2.
 */
MathUtil.getPointDirection = function (x1, y1, x2, y2) {
    var direction = ((180 / Math.PI) * Math.atan2(y2 - y1, x2 - x1));
    if (direction > 360) {
        direction -= 360;
    } else if (direction < 0) {
        direction += 360;
    }
    return direction;
}


/**
  * Calculate the x-offset of a point the given length and direction from (0, 0).
  * @param {number} len Length to point.
  * @param {number} dir Direction to point
  * @return {number} X-coorindate of the point in the length and direction.
  */
MathUtil.getLengthDirectionX = function (len, dir) {
    return Math.floor(len * Math.cos(dir * (Math.PI / 180)));
}


/**
  * Calculate the y-offset of a point the given length and direction from (0, 0).
  * @param {number} len Length to point.
  * @param {number} dir Direction to point
  * @return {number} Y-coorindate of the point in the length and direction.
  */
MathUtil.getLengthDirectionY = function (len, dir) {
    return Math.floor(len * Math.sin(dir * (Math.PI / 180)));
}