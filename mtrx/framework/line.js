
class Line
{
    constructor(p0, p1, color, width, arrow_tip_radius)
    {
        this.p0 = p0;
        this.p1 = p1;
        this.color = color ?? "black";
        this.width = width ?? 1;
        this.arrow_tip_radius = arrow_tip_radius;
    }

    render(renderer)
    {
        renderer.drawArrow(this.p0, this.p1, this.color, this.width, this.arrow_tip_radius);
    }
}