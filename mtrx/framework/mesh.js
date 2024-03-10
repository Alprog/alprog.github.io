
class Mesh
{
    constructor()
    {
        this.triangles = [];
    }

    addTriangle(a, b, c)
    {
        this.triangles.push({a: a, b: b, c: c});
    }

    addTriangles(a, b, c, d)
    {
        this.addTriangle(a, b, c);
        this.addTriangle(a, c, d);    
    }

    addQuad(matrix)
    {
        matrix = matrix ?? Matrix4x4.Identity();
        this.addTriangles(
            mult(new Vector(-1, -1, -1, 1), matrix),
            mult(new Vector(-1, 1, -1, 1), matrix),
            mult(new Vector(1, 1, -1, 1), matrix),
            mult(new Vector(1, -1, -1, 1), matrix)            
        );
    }

    addCube(matrix)
    {
        matrix = matrix ?? Matrix4x4.Identity();
        this.addQuad(matrix);
        this.addQuad(mult(Matrix4x4.RotationX_LHS(Math.PI / 2), matrix));
        this.addQuad(mult(Matrix4x4.RotationX_LHS(Math.PI), matrix));
        this.addQuad(mult(Matrix4x4.RotationX_LHS(-Math.PI / 2), matrix));
        this.addQuad(mult(Matrix4x4.RotationY_LHS(Math.PI / 2), matrix));
        this.addQuad(mult(Matrix4x4.RotationY_LHS(-Math.PI / 2), matrix));
    }

    render(renderer)
    {
        for (const t of this.triangles)
        {
            renderer.drawTriangle(t.a, t.b, t.c, t.color ?? new Color(1, 0, 0));
        }
    }
}