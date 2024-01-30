
class Line
{
    constructor(p0, p1, color, width)
    {
        this.p0 = p0;
        this.p1 = p1;
        this.color = color ?? "black";
        this.width = width ?? 1;
    }

    draw(canvas)
    {
        canvas.line(this.p0, this.p1, this.color, this.width)
    }
}