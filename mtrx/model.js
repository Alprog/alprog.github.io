
var diagram = new Diagram();

var rootObject = new Mesh();

var model = new Airplane();
model.transform = Matrix4x4.Scaling(Vector.One().get_scaled(10));

var model = new Littleman();
model.transform = Matrix4x4.Scaling(Vector.One().get_scaled(100));


rootObject.children = [
    model,

    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(100), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(100), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(100), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(-100), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(-100), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(-100), "gray", 5),

    new Label("Left", Vector.UnitX().get_scaled(100)),
    new Label("Up", Vector.UnitY().get_scaled(100)),
    new Label("Backward", Vector.UnitZ().get_scaled(100)),
    new Label("Right", Vector.UnitX().get_scaled(-100)),
    new Label("Down", Vector.UnitY().get_scaled(-100)),
    new Label("Forward", Vector.UnitZ().get_scaled(-100))
];

diagram.addObject(rootObject);

diagram.addObject(new ObjectRotator(rootObject));

dom_flush();