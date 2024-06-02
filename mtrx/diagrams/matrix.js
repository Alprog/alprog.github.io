

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(2, 1, 1.5));
var rx = Matrix4x4.RotationX_LHS(0);
var ry = Matrix4x4.RotationY_LHS(0);
var rz = Matrix4x4.RotationZ_LHS(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(1, 2));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("m1", TRS);


var diagram = new Diagram(true);
diagram.addObject(new Rotator(diagram.camera, new Vector(2.5, 2.5, 2.5, 1)));
diagram.addGrid();
var matrix_object = new MatrixObject(The.Config.m1);
diagram.addObject(matrix_object);

dom_flush();