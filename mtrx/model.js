
var diagram = new Diagram();

var model = new Airplane();
model.transform = Matrix4x4.Scaling(Vector.One().get_scaled(10));


model.children = [
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(10), "black", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(10), "black", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(10), "black", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitX().get_scaled(-10), "black", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitY().get_scaled(-10), "black", 5),
    new Line(Vector.ZeroPoint(), Vector.UnitZ().get_scaled(-10), "black", 5)
];

diagram.addObject(model);

diagram.addObject(new ObjectRotator(model));

dom_flush();