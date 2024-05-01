
var diagram = new Diagram();

var model = new Airplane();
model.transform = Matrix4x4.Scaling(Vector.One().get_scaled(10));


model.children = [
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(10), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(10), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(10), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(-10), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(-10), "gray", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(-10), "gray", 5),

    new Label("Left", Vector.UnitX().get_scaled(10)),
    new Label("Up", Vector.UnitY().get_scaled(10)),
    new Label("Backward", Vector.UnitZ().get_scaled(10)),
    new Label("Right", Vector.UnitX().get_scaled(-10)),
    new Label("Down", Vector.UnitY().get_scaled(-10)),
    new Label("Forward", Vector.UnitZ().get_scaled(-10))
];

diagram.addObject(model);

diagram.addObject(new ObjectRotator(model));

dom_flush();