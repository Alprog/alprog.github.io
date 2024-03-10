
var diagram = new Diagram();

diagram.addObject(new Rotator(diagram.camera, Vector.ZeroPoint()));

var mesh = new Mesh();
var S = Matrix4x4.Scaling(Vector.One().get_scaled(20));
var T = Matrix4x4.Translation(new Vector(0, 20, 0));
var matrix = mult(S, T);
mesh.addCube(matrix);
diagram.addObject(mesh);

var mesh = new Mesh();
var S = Matrix4x4.Scaling(Vector.One().get_scaled(20));
var T = Matrix4x4.Translation(new Vector(0, -20, 0));
var matrix = mult(S, T);
mesh.addCube(matrix);
diagram.addObject(mesh);
dom_flush();