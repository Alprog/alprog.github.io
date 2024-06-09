
var diagram = new Diagram();

diagram.camera = new Camera(
    The.CoordinateSystem.Backward.unit.get_scaled(3),
    Vector.ZeroPoint(),
    Math.PI / 4,
    diagram.canvas.getAspect()
);

var a = The.CoordinateSystem.Right.unit.get_scaled(1)
var b = The.CoordinateSystem.Down.unit.get_scaled(3)
var c = The.CoordinateSystem.Forward.unit.get_scaled(2);
diagram.renderer.light_direction = sum(a, b, c).get_normalized();

var rootObject = new Mesh();

var model = new Airplane();
var model = new Littleman();

var matrix = The.CoordinateSystem.getConvertionMatrix("RUB");
model.transform = mult(Matrix4x4.Scaling(Vector.One()), matrix);

var tip_radius = 20;
var font = "24px serif";

rootObject.children = [
    model,

    new Line(Vector.ZeroPoint(), Vector.UnitX(), "gray", 5, tip_radius),
    new Line(Vector.ZeroPoint(), Vector.UnitY(), "gray", 5, tip_radius),
    new Line(Vector.ZeroPoint(), Vector.UnitZ(), "gray", 5, tip_radius),
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(-1), "gray", 5, tip_radius),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(-1), "gray", 5, tip_radius),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(-1), "gray", 5, tip_radius),

    new Label("Left", The.CoordinateSystem.Left.unit, font),
    new Label("Up",The.CoordinateSystem.Up.unit, font),
    new Label("Backward", The.CoordinateSystem.Backward.unit, font),
    new Label("Right", The.CoordinateSystem.Right.unit, font),
    new Label("Down", The.CoordinateSystem.Down.unit, font),
    new Label("Forward", The.CoordinateSystem.Forward.unit, font)
];

rootObject.transform = Matrix4x4.Rotation(The.CoordinateSystem.Up, Math.PI);

diagram.addObject(rootObject);

diagram.addObject(new ObjectRotator(rootObject));

dom_flush();