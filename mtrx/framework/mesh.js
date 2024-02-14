
class Mesh
{
    constructor()
    {
        this.triangles = [];
    }

    addTriangle(p0, p1, p2)
    {
        this.triangles.push({p0: p0, p1: p1, p2: p2});
    }

    render(renderer)
    {
        var index = 0;
        for (const t of this.triangles)
        {
            var center = sum(t.p0, t.p1, t.p2).get_scaled(1/3);
            var ab = diff(t.p1, t.p0);
            var ac = diff(t.p2, t.p0);
            var normal = cross(ab, ac).get_normalized();
            var end = sum(center, normal.get_scaled(30));

            renderer.drawTriangle(t.p0, t.p1, t.p2, t.color);
            //renderer.drawLine(center, end);    

            index++;
        }
    }
}