
const label_offset = 1.05;

class Grid
{
    constructor(drawLabels)
    {
        this.drawLabels = drawLabels;
    }

    get center() { return Vector.HalfPoint() }

    render(renderer)
    {
        var is3D = The.CoordinateSystem.is3D();

        renderer.drawArrow(Vector.ZeroPoint(), Vector.UnitX(), "red", 4, 10);
        renderer.drawArrow(Vector.ZeroPoint(), Vector.UnitY(), "green", 4, 10);

        renderer.drawLine(new Vector(1,0,0,1), new Vector(1,1,0,1));
        renderer.drawLine(new Vector(0,1,0,1), new Vector(1,1,0,1));
        
        if (is3D)
        {
            renderer.drawArrow(Vector.ZeroPoint(), Vector.UnitZ(), "blue", 4, 10);
            
            renderer.drawLine(new Vector(1,0,1,1), new Vector(1,1,1,1));
            renderer.drawLine(new Vector(0,1,1,1), new Vector(1,1,1,1));
            renderer.drawLine(new Vector(0,1,1,1), new Vector(0,0,1,1));
            renderer.drawLine(new Vector(1,0,1,1), new Vector(0,0,1,1));
            renderer.drawLine(new Vector(0,1,0,1), new Vector(0,1,1,1));
            renderer.drawLine(new Vector(1,1,0,1), new Vector(1,1,1,1));
            renderer.drawLine(new Vector(1,0,0,1), new Vector(1,0,1,1));
        }

        if (this.drawLabels)
        {
            renderer.drawText("0", Vector.One().get_scaled(1-label_offset), 5, "black");
            renderer.drawText("1", Vector.UnitX().get_scaled(label_offset), 5, "black");
            renderer.drawText("1", Vector.UnitY().get_scaled(label_offset), 5, "black");
            if (is3D)
            {
                renderer.drawText("1", Vector.UnitZ().get_scaled(label_offset), 5, "black");
            }
        }
            
    }
}
