
var diagram = new Diagram();

diagram.camera = new Camera(
    sum(The.CoordinateSystem.Forward.unit.get_scaled(9)),
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
model.transform = mult(Matrix4x4.Scaling(Vector.One().get_scaled(3)), matrix);

rootObject.children = [
    model,

    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(3), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(3), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(3), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(-3), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(-3), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(-3), "gray", 5),

    new Label("Left", The.CoordinateSystem.Left.unit.get_scaled(3)),
    new Label("Up",The.CoordinateSystem.Up.unit.get_scaled(3)),
    new Label("Backward", The.CoordinateSystem.Backward.unit.get_scaled(3)),
    new Label("Right", The.CoordinateSystem.Right.unit.get_scaled(3)),
    new Label("Down", The.CoordinateSystem.Down.unit.get_scaled(3)),
    new Label("Forward", The.CoordinateSystem.Forward.unit.get_scaled(3))
];

diagram.addObject(rootObject);

diagram.addObject(new ObjectRotator(rootObject));

dom_flush();