

The.Defaults.set("a", new Vector(0.2, 0.4, 0.6, 0));

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

var result = new VectorObject(Vector.Zero(), "result", true);
diagram.addObject(result);

The.Config.wrapToObject("a", diagram, "a");
The.Config.wrapToObject("b", diagram, "b");


diagram.onUpdated = () =>
{
    result.set(mult(The.Config.a, The.Config.b));
    result.editor.refresh();
    result.anchor = The.Config.b.translation;
};

var animator = diagram.addAnimator();

dom_flush();