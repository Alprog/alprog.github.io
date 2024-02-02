
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
            new Line(Vector4.ZeroPoint(), Vector4.Right().get_scaled(150), "red", 5),
            new Line(Vector4.ZeroPoint(), Vector4.Up().get_scaled(150), "green", 5),
            new Line(Vector4.ZeroPoint(), Vector4.Forward().get_scaled(150), "blue", 5)
        ];
    }

    draw(canvas)
    {
        for (const line of this.lines)
        {
            line.draw(canvas);
        }
    }
}