
The.AddressBar.force_param("axes", "RUF")

var matrix = new Matrix4x4();
var s = Matrix4x4.Scaling(new Vector(0.4, 0.2, 0.4));
var rx = Matrix4x4.RotationX(0);
var ry = Matrix4x4.RotationY(0);
var rz = Matrix4x4.RotationZ(Math.PI / 6);
var t = Matrix4x4.Translation(new Vector(0.2, 0.4));
var TRS = mult(s, rx, ry, rz, t);
The.Defaults.set("a", TRS);


var diagram = new Diagram();
diagram.createSidePanel();

diagram.addGrid();
diagram.addObject(new CameraController(diagram.camera, diagram.grid.center));

var matrix_object = new MatrixObject(The.Config.a, "result");
diagram.addObject(matrix_object);

var airplane = new Airplane();
var man = new Littleman();

diagram.addObject(airplane);
diagram.addObject(man);

var a = The.CoordinateSystem.Right.unit.get_scaled(1)
var b = The.CoordinateSystem.Down.unit.get_scaled(3)
var c = The.CoordinateSystem.Forward.unit.get_scaled(2);
diagram.renderer.light_direction = sum(a, b, c).get_normalized();

var convert = The.CoordinateSystem.getConvertionMatrix("RUB");
var a = 0;

diagram.onUpdated = () =>
{
    a = a + 0.02;

    var s = Matrix4x4.Scaling(Vector.One().get_scaled(0.03));
    var t1 = Matrix4x4.Translation(new Vector(0.5, 0, 0));
    var r = Matrix4x4.RotationY(-a);
    var t2 = Matrix4x4.Translation(new Vector(0.5, 0.5, 0.5));
    airplane.transform = mult(convert, s, t1, r, t2);

    var s = Matrix4x4.Scaling(Vector.One().get_scaled(0.3));
    var r1 = Matrix4x4.RotationX(a);
    var r2 = Matrix4x4.RotationZ(a);
    var t = Matrix4x4.Translation(new Vector(0.5, 0.5, 0.5));
    man.transform = mult(convert, s, r1, r2, t);
};

dom_flush();