

The.Defaults.set("a", new Vector(0.2, 0.4, 0.6, 1));

var s = Matrix4x4.Scaling(new Vector(0.2, 0.2, 0.2));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(0);
var t = Matrix4x4.Translation(new Vector(0.2, 0.2, 0.2));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("b", TRS);

var diagram = new Diagram(true);
diagram.addGrid();
diagram.addObject(new Rotator(diagram.camera, diagram.grid.center));

The.Config.wrapToObject("a", diagram, "a");
The.Config.wrapToObject("b", diagram, "b");

var result = new VectorObject(mult(The.Config.a, The.Config.b), "result", true);
diagram.addObject(result);

diagram.onUpdated = () =>
{
    result.set(mult(The.Config.a, The.Config.b));
    result.editor.refresh();
    result.anchor = The.Config.b.translation;
};

dom_flush();