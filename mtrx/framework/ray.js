
class Ray
{
    constructor(origin, direction)
    {
        this.origin = origin;
        this.direction = direction;
    }
 
    toString()
    {
        return "pos: " + this.origin.toString() + "\ndir: " + this.direction.toString();
    }
}