
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
        for (const t of this.triangles)
        {
            renderer.drawTriangle(t.p0, t.p1, t.p2, t.color);
        }
    }
}