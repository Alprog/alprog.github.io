
class Grid
{
    render(renderer)
    {
        renderer.drawLine(Vector.ZeroPoint(), Vector.UnitX().get_scaled(5), "red", 5);
        renderer.drawLine(Vector.ZeroPoint(), Vector.UnitY().get_scaled(5), "green", 5);
        
        renderer.drawLine(new Vector(5,0,0,1), new Vector(5,5,0,1));
        renderer.drawLine(new Vector(0,5,0,1), new Vector(5,5,0,1));
        
        if (The.CoordinateSystem.is3D())
        {
            renderer.drawLine(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(5), "blue", 5);
            
            renderer.drawLine(new Vector(5,0,5,1), new Vector(5,5,5,1));
            renderer.drawLine(new Vector(0,5,5,1), new Vector(5,5,5,1));
            renderer.drawLine(new Vector(0,5,5,1), new Vector(0,0,5,1));
            renderer.drawLine(new Vector(5,0,5,1), new Vector(0,0,5,1));
            renderer.drawLine(new Vector(0,5,0,1), new Vector(0,5,5,1));
            renderer.drawLine(new Vector(5,5,0,1), new Vector(5,5,5,1));
            renderer.drawLine(new Vector(5,0,0,1), new Vector(5,0,5,1));
        }
    }
}
