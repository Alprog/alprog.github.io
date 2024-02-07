
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
            new Line(Vector.ZeroPoint(), Vector.Right().get_scaled(150), "red", 5),
            new Line(Vector.ZeroPoint(), Vector.Up().get_scaled(150), "green", 5),
            new Line(Vector.ZeroPoint(), Vector.Forward().get_scaled(150), "blue", 5)
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