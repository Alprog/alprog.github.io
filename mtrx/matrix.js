
var diagram = new Diagram();

diagram.addObject(new Rotator(diagram.camera, new Vector(75, 75, 75, 1)));

diagram.addGrid();

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(50, 20, 30));
var rx = Matrix4x4.RotationX_LHS(0);
var ry = Matrix4x4.RotationY_LHS(0);
var rz = Matrix4x4.RotationZ_LHS(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(50, 70));
var TRS = mult(s, rx, ry, rz, t);

var matrix_object = new MatrixObject(TRS);
diagram.addObject(matrix_object);