
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

    castToSphere(sphere)
    {
        var toCenter = diff(sphere.center, this.origin);       
        var wayToNormal = dot(toCenter, this.direction);
        var normalPoint = sum(this.origin, this.direction.get_scaled(wayToNormal));
        var distance = diff(sphere.center, normalPoint).get_length();
        if (distance <= sphere.radius)
        {
            var sin = distance / sphere.radius;
            var cos = Math.sqrt(1 - sin * sin);
            var depth = Math.abs(cos * sphere.radius);
            var wayToIntersect = wayToNormal - depth;
            return sum(this.origin, this.direction.get_scaled(wayToIntersect));
        }
    }

    toString()
    {
        return "pos: " + this.origin.toString() + "\ndir: " + this.direction.toString();
    }
}