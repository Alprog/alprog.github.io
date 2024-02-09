
var diagram = new Diagram();

diagram.addGrid();

var mesh = new Mesh();
mesh.transform = Matrix4x4.Identity();

function helper(matrix)
{
    var a = new Vector(-30, -30, -30, 1);
    var b = new Vector(-30, 30, -30, 1);
    var c = new Vector(30, 30, -30, 1);
    var d = new Vector(30, -30, -30, 1);

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

var s = Matrix4x4.Scaling(new Vector(50, 20, 30));
var rx = Matrix4x4.RotationX_LHS(0);
var ry = Matrix4x4.RotationY_LHS(0);
var rz = Matrix4x4.RotationZ_LHS(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(50, 70));
var TRS = mult(s, rx, ry, rz, t);
console.log(TRS)
//diagram.addObject(mesh);
diagram.addObject(new MatrixObject(TRS));
//mesh.transform.multiply( Matrix4x4.Translation(new Vector(75, 75, 75)) );

diagram.onUpdated = () => 
{
    mesh.transform.premultiply( Matrix4x4.RotationX_LHS(0.010) );
    mesh.transform.premultiply( Matrix4x4.RotationY_LHS(0.005) );
    mesh.transform.premultiply( Matrix4x4.RotationZ_LHS(0.003) );
};
