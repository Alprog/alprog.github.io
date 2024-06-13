

The.Defaults.set("a", new Vector(0.2, 0.4, 0.6, 1));

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

var animator = diagram.addAnimator();

var a = The.Config.a;
var b = The.Config.b;

animator.rebuild = () =>
{
    var p0 = Vector.ZeroPoint();
    var p1 = b.translation;
    p1.homo_normalize();
    var p2 = sum(p1, b.axisX.get_scaled(a.x));
    var p3 = sum(p2, b.axisY.get_scaled(a.y));
    var p4 = sum(p3, b.axisZ.get_scaled(a.z));
    var width = 3;
    var pauseTime = 400;

    animator.addSegment(new AnimatedSegment(p0, p1, "magenta", width));
    animator.addSegment(new WaitSegment(pauseTime));
    animator.addSegment(new AnimatedSegment(p1, p2, "red", width));
    animator.addSegment(new WaitSegment(pauseTime));
    animator.addSegment(new AnimatedSegment(p2, p3, "green", width));
    
    if (The.CoordinateSystem.is3D())
    {
        animator.addSegment(new WaitSegment(pauseTime));
        animator.addSegment(new AnimatedSegment(p3, p4, "blue", width));
    }

    if (a.w == 0)
    {
        var p5 = diff(p4, p1);
        animator.addSegment(new WaitSegment(pauseTime));
        animator.addSegment(new AnimatedSegment(p4, p5, "magenta", width));
    }

    animator.addSegment(new WaitSegment(pauseTime));
};

diagram.onUpdated = () =>
{
    result.set(mult(The.Config.a, The.Config.b));
    result.editor.refresh();
    result.anchor = The.Config.b.translation;

    var visible = !animator.isRunning() || animator.isOnLastSegment();
    result.visible = visible;
};

dom_flush();