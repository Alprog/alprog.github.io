

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(2, 1, 1.5));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(1, 2));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("a", TRS);

var s = Matrix4x4.Scaling(new Vector(1, 1, 1));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(0);
var t = Matrix4x4.Translation(new Vector(1, 1, 1));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("b", TRS);

var diagram = new Diagram(true);
diagram.addObject(new Rotator(diagram.camera, new Vector(2.5, 2.5, 2.5, 1)));
diagram.addGrid();

The.Config.wrapToObject("a", diagram, "a");
The.Config.wrapToObject("b", diagram, "b");

var result = new MatrixObject(mult(The.Config.a, The.Config.b), "result", false);
diagram.addObject(result);

diagram.onUpdated = () =>
{
    result.set(mult(The.Config.a, The.Config.b));
    result.editor.refresh();
};

dom_flush();