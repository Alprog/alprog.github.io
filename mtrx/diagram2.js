
var diagram = new Diagram();

diagram.objects.push(new Line(Vector4.ZeroPoint(), Vector4.Right().get_scaled(150), "red", 5));
diagram.objects.push(new Line(Vector4.ZeroPoint(), Vector4.Up().get_scaled(150), "green", 5));
diagram.objects.push(new Line(Vector4.ZeroPoint(), Vector4.Forward().get_scaled(150), "blue", 5));