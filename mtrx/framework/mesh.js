
class Mesh
{
    constructor()
    {
        this.vertices = [];
        this.materials = [];
        this.faces = [];
    }

    setMaterial(material)
    {
        this.colors.push(material);
    }

    addTriangle(a, b, c)
    {
        this.addFace(a, b, c);
    }

    addFace(a, b, c, d)
    {
        var i = this.vertices.length;
        var material_index = this.materials.length - 1;
        if (d)
        {
            this.vertices.push(a, b, c, d);
            this.faces.push([material_index, i, i + 1, i + 2, i + 3]);    
        }
        else
        {
            this.vertices.push(a, b, c);
            this.faces.push([material_index, i, i + 1, i + 2]);   
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
        this.addQuad(mult(Matrix4x4.RotationX(Math.PI / 2), matrix));
        this.addQuad(mult(Matrix4x4.RotationX(Math.PI), matrix));
        this.addQuad(mult(Matrix4x4.RotationX(-Math.PI / 2), matrix));
        this.addQuad(mult(Matrix4x4.RotationY(Math.PI / 2), matrix));
        this.addQuad(mult(Matrix4x4.RotationY(-Math.PI / 2), matrix));
    }

    render(renderer)
    {
        var isLHS = The.CoordinateSystem.isLHS();
        for (const face of this.faces)
        {
            var material = this.materials[face[0]] ?? Material.Default();
            var a = this.vertices[face[1]];
            for (var i = 3; i < face.length; i++)
            {
                var b = this.vertices[face[i - 1]];
                var c = this.vertices[face[i]];
                if (isLHS)
                {
                    renderer.drawTriangle(a, c, b, material.diffuse);
                }
                else
                {
                    renderer.drawTriangle(a, b, c, material.diffuse);
                }
            }
        }
    }
}
