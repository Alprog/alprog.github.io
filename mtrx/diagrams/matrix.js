

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(0.4, 0.2, 0.4));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(0.2, 0.4));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("a", TRS);


var diagram = new Diagram(true);
diagram.addGrid();
diagram.addObject(new Rotator(diagram.camera, diagram.grid.center));

var matrix_object = new MatrixObject(The.Config.a, "result");
diagram.addObject(matrix_object);

dom_flush();