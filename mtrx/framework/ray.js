
class Ray
{
    constructor(origin, direction)
    {
        this.origin = origin;
        this.direction = direction;
    }
 
    castToPlane(plane)
    {
        var d = -dot(this.direction, plane.normal);
        if (d != 0)
        {
            var delta = diff(this.origin, plane.center);
            var distanceToPlane = dot(delta, plane.normal);
            var rayLength = distanceToPlane / d;
            return sum(this.origin, this.direction.get_scaled(rayLength));
        }
    }

    toString()
    {
        return "pos: " + this.origin.toString() + "\ndir: " + this.direction.toString();
    }
}