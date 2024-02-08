
class Line
{
    constructor(p0, p1, color, width)
    {
        this.p0 = p0;
        this.p1 = p1;
        this.color = color ?? "black";
        this.width = width ?? 1;
    }

    render(renderer)
    {
        renderer.drawLine(this.p0.clone(), this.p1.clone(), this.color, this.width);
    }
}