
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
            new Line(Vector.ZeroPoint(), Vector.RightPoint().get_scaled(150), "red", 5),
            new Line(Vector.ZeroPoint(), Vector.UpPoint().get_scaled(150), "green", 5),
            new Line(Vector.ZeroPoint(), Vector.ForwardPoint().get_scaled(150), "blue", 5)
        ];
    }

    render(renderer)
    {
        for (const line of this.lines)
        {
            line.render(renderer);
        }
    }
}