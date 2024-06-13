

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

var pattern = The.CoordinateSystem.is3D() ? "4fr 1fr" : "3fr 1fr";
var property = The.Config.vector == "row" ? "gridTemplateRows" : "gridTemplateColumns";
diagram.sidePanel.grid.style[property] = pattern;

var result = new VectorObject(Vector.Zero(), "result", true);
diagram.addObject(result);

The.Config.wrapToObject("a", diagram, "a");
The.Config.wrapToObject("b", diagram, "b");

var setResultVisible = (visible) =>
{
    result.visible = visible;
    result.editor.grid.style.visibility = visible ? "" : "hidden";
}

setResultVisible(false);

var result_switcher = diagram.sidePanel.createResultCheckBox(setResultVisible);

var animator = diagram.addAnimator();

var a = The.Config.a;
var b = The.Config.b;

function forceHighlightVector(vector)
{
    for (var key in vector.fields)
    {
        vector.fields[key].style.backgroundColor = "";
    }
   
    for (var i = 1; i < arguments.length; i++)
    {
        var field = vector.fields[arguments[i]];
        if (field)
        {
            field.style.backgroundColor = "yellow";
        }
    }        
}

function forceHighlight(vector_component, matrix_axis)
{
    forceHighlightVector(The.Config.a, vector_component);

    var matrix = The.Config.b;
    for (var field of matrix.editor.fields)
    {
        field.style.backgroundColor = "";
    }

    var matrix_vector = matrix[matrix_axis];
    if (matrix_vector)
    {
        forceHighlightVector(matrix_vector, 0, 1, 2);
    }
}

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
    var finalPauseTime = 600;

    animator.addSegment(new CallbackSegment(() => result_switcher.set(false) ));
    if (a.w != 0)
    {
        animator.addSegment(new CallbackSegment(() => forceHighlight(3, "translation") ));
    }
    animator.addSegment(new AnimatedSegment(p0, p1, "magenta", width));
    animator.addSegment(new WaitSegment(pauseTime));
    animator.addSegment(new CallbackSegment(() => forceHighlight(0, "axisX") ));
    animator.addSegment(new AnimatedSegment(p1, p2, "red", width));
    animator.addSegment(new WaitSegment(pauseTime));
    animator.addSegment(new CallbackSegment(() => forceHighlight(1, "axisY") ));
    animator.addSegment(new AnimatedSegment(p2, p3, "green", width));
    
    if (The.CoordinateSystem.is3D())
    {
        animator.addSegment(new WaitSegment(pauseTime));
        animator.addSegment(new CallbackSegment(() => forceHighlight(2, "axisZ") ));
        animator.addSegment(new AnimatedSegment(p3, p4, "blue", width));
    }

    if (a.w == 0)
    {
        var p5 = diff(p4, p1);
        animator.addSegment(new WaitSegment(pauseTime));
        animator.addSegment(new AnimatedSegment(p4, p5, "magenta", width));
    }

    animator.addSegment(new CallbackSegment(() => forceHighlight("none", "none") ));
    animator.addSegment(new CallbackSegment(() => result_switcher.set(true) ));
    animator.addSegment(new WaitSegment(finalPauseTime));
};

diagram.sidePanel.createAnimatorButton(() => {
    animator.toggle();
    forceHighlight("none", "none")
});

diagram.onUpdated = () =>
{
    result.set(mult(The.Config.a, The.Config.b));
    result.editor.refresh();
    result.anchor = The.Config.b.translation;
};

dom_flush();