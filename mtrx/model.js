
var diagram = new Diagram();

var humanoid = new Humanoid();

humanoid.transform = Matrix4x4.Scaling(Vector.One().get_scaled(20));

diagram.addObject(humanoid);

diagram.addObject(new ObjectRotator(humanoid));


dom_flush();