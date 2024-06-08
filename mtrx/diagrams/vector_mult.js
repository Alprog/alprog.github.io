

The.Defaults.set("v", new Vector(1, 2, 3, 1));

var s = Matrix4x4.Scaling(new Vector(1, 1, 1));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(0);
var t = Matrix4x4.Translation(new Vector(1, 1, 1));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("m1", TRS);

var diagram = new Diagram(true);
diagram.addObject(new Rotator(diagram.camera, new Vector(2.5, 2.5, 2.5, 1)));
diagram.addGrid();

diagram.addObject(new VectorObject(The.Config.v, "a"));
diagram.addObject(new MatrixObject(The.Config.m1, "b"));

var result = mult(The.Config.v, The.Config.m1);
diagram.addObject(new VectorObject(result, "result"));

this.onUpdated = () =>
{

};

dom_flush();