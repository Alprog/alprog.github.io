
class Mesh
{
    constructor()
    {
        this.vertices = [];
        this.faces = [];
    }

    addTriangle(a, b, c)
    {
        this.addFace(a, b, c);
    }

    addFace(a, b, c, d)
    {
        var i = this.vertices.length;
        if (d)
        {
            this.vertices.push(a, b, c, d);
            this.faces.push([i, i + 1, i + 2, i + 3]);    
        }
        else
        {
            this.vertices.push(a, b, c);
            this.faces.push([i, i + 1, i + 2]);   
        }
    }

    addQuad(matrix)
    {
        matrix = matrix ?? Matrix4x4.Identity();
        this.addFace(
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
        for (const f of this.faces)
        {
            var a = this.vertices[f[0]];
            var b = this.vertices[f[1]];
            var c = this.vertices[f[2]];
            var d = this.vertices[f[3]];
            renderer.drawTriangle(a, b, c, new Color(1, 0, 0));
            if (d)
            {
                renderer.drawTriangle(a, c, d, new Color(1, 0, 0));
            }
        }
    }
}