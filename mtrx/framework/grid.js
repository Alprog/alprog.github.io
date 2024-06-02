
class Grid
{
    constructor()
    {
        this.buildLines();
    }

    buildLines()
    {
        // axis
        this.lines = [
            new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(5), "red", 5),
            new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(5), "green", 5),
            new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(5), "blue", 5)
        ];
    }

    render(renderer)
    {
        for (const line of this.lines)
        {
            line.render(renderer);
        }

        renderer.drawLine(new Vector(5,0,0,1), new Vector(5,5,0,1));
        renderer.drawLine(new Vector(0,5,0,1), new Vector(5,5,0,1));
        renderer.drawLine(new Vector(5,0,5,1), new Vector(5,5,5,1));
        renderer.drawLine(new Vector(0,5,5,1), new Vector(5,5,5,1));
    
        renderer.drawLine(new Vector(0,5,5,1), new Vector(0,0,5,1));
        renderer.drawLine(new Vector(5,0,5,1), new Vector(0,0,5,1));
        
        renderer.drawLine(new Vector(0,5,0,1), new Vector(0,5,5,1));
        renderer.drawLine(new Vector(5,5,0,1), new Vector(5,5,5,1));
        renderer.drawLine(new Vector(5,0,0,1), new Vector(5,0,5,1));
    }
}
