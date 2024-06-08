

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

The.Config.wrapToObject("v", diagram, "a");
The.Config.wrapToObject("m1", diagram, "b");

var result = mult(The.Config.v, The.Config.m1);
var vM = new VectorObject(result, "result");
diagram.addObject(vM);

diagram.onUpdated = () =>
{
    var result = mult(The.Config.v, The.Config.m1);
    vM.set(result);
    vM.editor.refresh();
};

dom_flush();