
class Grid
{
    get center() { return Vector.HalfPoint() }

    render(renderer)
    {
        renderer.drawLine(Vector.ZeroPoint(), Vector.UnitX(), "red", 5);
        renderer.drawLine(Vector.ZeroPoint(), Vector.UnitY(), "green", 5);
        
        renderer.drawLine(new Vector(1,0,0,1), new Vector(1,1,0,1));
        renderer.drawLine(new Vector(0,1,0,1), new Vector(1,1,0,1));
        
        if (The.CoordinateSystem.is3D())
        {
            renderer.drawLine(Vector.ZeroPoint(), Vector.UnitZ(), "blue", 5);
            
            renderer.drawLine(new Vector(1,0,1,1), new Vector(1,1,1,1));
            renderer.drawLine(new Vector(0,1,1,1), new Vector(1,1,1,1));
            renderer.drawLine(new Vector(0,1,1,1), new Vector(0,0,1,1));
            renderer.drawLine(new Vector(1,0,1,1), new Vector(0,0,1,1));
            renderer.drawLine(new Vector(0,1,0,1), new Vector(0,1,1,1));
            renderer.drawLine(new Vector(1,1,0,1), new Vector(1,1,1,1));
            renderer.drawLine(new Vector(1,0,0,1), new Vector(1,0,1,1));
        }
    }
}
