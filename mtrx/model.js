
var diagram = new Diagram();

var model = new Airplane();

model.transform = Matrix4x4.Scaling(Vector.One().get_scaled(20));

diagram.addObject(model);

diagram.addObject(new ObjectRotator(model));


dom_flush();