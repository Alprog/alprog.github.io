

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(2, 1, 1.5));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(1, 2));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("m1", TRS);

var s = Matrix4x4.Scaling(new Vector(1, 1, 1));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(0);
var t = Matrix4x4.Translation(new Vector(1, 1, 1));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("m2", TRS);

var diagram = new Diagram(true);
diagram.addObject(new Rotator(diagram.camera, new Vector(2.5, 2.5, 2.5, 1)));
diagram.addGrid();

diagram.addObject(new MatrixObject(The.Config.m1, "a"));
diagram.addObject(new MatrixObject(The.Config.m2, "b"));

var m3 = mult(The.Config.m1, The.Config.m2);
diagram.addObject(new MatrixObject(m3, "result"));

this.onUpdated = () =>
{

};

dom_flush();