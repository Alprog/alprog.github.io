
var diagram = new Diagram();

diagram.addGrid();

var mesh = new Mesh();
mesh.transform = Matrix4x4.Identity();

function helper(matrix)
{
    var a = new Vector4(-50, -50, -50, 1);
    var b = new Vector4(-50, 50, -50, 1);
    var c = new Vector4(50, 50, -50, 1);
    var d = new Vector4(50, -50, -50, 1);

    a = mult(a, matrix);
    b = mult(b, matrix);
    c = mult(c, matrix);
    d = mult(d, matrix);

    mesh.addTriangle(a, b, c);
    mesh.addTriangle(a, c, d);
}

helper(Matrix4x4.Identity());
helper(Matrix4x4.RotationX_LHS(Math.PI / 2));
helper(Matrix4x4.RotationX_LHS(Math.PI));
helper(Matrix4x4.RotationX_LHS(-Math.PI / 2));
helper(Matrix4x4.RotationY_LHS(Math.PI / 2));
helper(Matrix4x4.RotationY_LHS(-Math.PI / 2));

diagram.addObject(mesh);

diagram.onUpdate = () => 
{
    mesh.transform.multiply( Matrix4x4.RotationX_LHS(0.010) );
    mesh.transform.multiply( Matrix4x4.RotationY_LHS(0.005) );
    mesh.transform.multiply( Matrix4x4.RotationZ_LHS(0.003) );
};