

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(0.4, 0.2, 0.3));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(0.2, 0.4));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("a", TRS);

var s = Matrix4x4.Scaling(new Vector(1, 1, 1));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(0);
var t = Matrix4x4.Translation(new Vector(1.5, 0.2, 0));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("b", TRS);

var diagram = new Diagram();
diagram.createSidePanel();
diagram.addGrid();
diagram.addObject(new CameraController(diagram.camera, new Vector(1.25, 0.5, 0.5), 4.2));


The.Config.wrapToObject("a", diagram, "a");
The.Config.wrapToObject("b", diagram, "b");

var result = new MatrixObject(mult(The.Config.a, The.Config.b), "result", true);
diagram.addObject(result);

diagram.onUpdated = () =>
{
    result.set(mult(The.Config.a, The.Config.b));
    result.editor.refresh();
    result.anchor = The.Config.b.translation;
};

dom_flush();