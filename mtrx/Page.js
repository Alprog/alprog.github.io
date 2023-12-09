
var v = new Vector4(1, 2, 3, 1);

var m = Matrix4x4.RotationZ_LHS(Math.PI/2);
v.multiply(m);

var canvas = new Canvas();
var a = 0;
var b = 0;
var c = 0;

function draw() 
{
	canvas.set_camera(a, b, c);
	
	canvas.clear();
	for (var i = 0; i <= 10; i++)
	{
		canvas.line(new Vector4(0,i*100,0,1), new Vector4(1000,i*100,0,1));
		canvas.line(new Vector4(i*100,0,0,1), new Vector4(i*100,1000,0,1));		
	}
	canvas.line(new Vector4(0,0,0,1), new Vector4(600,300,0,1), "red", 3);
	canvas.line(new Vector4(600,300,0,1), new Vector4(400,700,0,1), "green", 3);
	canvas.line(new Vector4(400,700,0,1), new Vector4(1000,1000,0,1), "blue", 3);
	
	canvas.line(Vector4.ZeroPoint(), Vector4.Right().get_scaled(1500), "red", 5);
	canvas.line(Vector4.ZeroPoint(), Vector4.Up().get_scaled(1500), "green", 5);
	canvas.line(Vector4.ZeroPoint(), Vector4.Forward().get_scaled(1500), "blue", 5);
	//canvas.line(Vector4.ZeroPoint(), Vector4.Forward().get_scaled(-1500), "cyan", 5);
		
	canvas.line(new Vector4(1500,0,0,1), new Vector4(1500,1500,0,1));
	canvas.line(new Vector4(0,1500,0,1), new Vector4(1500,1500,0,1));
	canvas.line(new Vector4(1500,0,1500,1), new Vector4(1500,1500,1500,1));
	canvas.line(new Vector4(0,1500,1500,1), new Vector4(1500,1500,1500,1));

	canvas.line(new Vector4(0,1500,1500,1), new Vector4(0,0,1500,1));
	canvas.line(new Vector4(1500,0,1500,1), new Vector4(0,0,1500,1));
	
	canvas.line(new Vector4(0,1500,0,1), new Vector4(0,1500,1500,1));
	canvas.line(new Vector4(1500,1500,0,1), new Vector4(1500,1500,1500,1));
	canvas.line(new Vector4(1500,0,0,1), new Vector4(1500,0,1500,1));
		
	//canvas.line(Vector4.ZeroPoint(), Vector4.One().get_scaled(1500), "black", 1);
	
	requestAnimationFrame(draw);
	
	a += 0.001 * 5;
	b += 0.002 * 5;
	c += 0.003 * 5;
}

requestAnimationFrame(draw);