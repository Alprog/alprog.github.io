
var canvas = new Canvas();
var a = 0;
var b = 0;
var c = 0;

var pin = new Pin(new Vector4(150, 0, 0, 1))

function draw() 
{
	canvas.set_camera(a, b, c);
	
	canvas.clear();
	for (var i = 0; i <= 10; i++)
	{
		canvas.line(new Vector4(0,i*10,0,1), new Vector4(100,i*10,0,1));
		canvas.line(new Vector4(i*10,0,0,1), new Vector4(i*10,100,0,1));		
	}
	canvas.line(new Vector4(0,0,0,1), new Vector4(60,30,0,1), "red", 3);
	canvas.line(new Vector4(60,30,0,1), new Vector4(40,70,0,1), "green", 3);
	canvas.line(new Vector4(40,70,0,1), new Vector4(100,100,0,1), "blue", 3);
	
	canvas.line(Vector4.ZeroPoint(), Vector4.Right().get_scaled(150), "red", 5);
	canvas.line(Vector4.ZeroPoint(), Vector4.Up().get_scaled(150), "green", 5);
	canvas.line(Vector4.ZeroPoint(), Vector4.Forward().get_scaled(150), "blue", 5);
	//canvas.line(Vector4.ZeroPoint(), Vector4.Forward().get_scaled(-1500), "cyan", 5);
		
	canvas.line(new Vector4(150,0,0,1), new Vector4(150,150,0,1));
	canvas.line(new Vector4(0,150,0,1), new Vector4(150,150,0,1));
	canvas.line(new Vector4(150,0,150,1), new Vector4(150,150,150,1));
	canvas.line(new Vector4(0,150,150,1), new Vector4(150,150,150,1));

	canvas.line(new Vector4(0,150,150,1), new Vector4(0,0,150,1));
	canvas.line(new Vector4(150,0,150,1), new Vector4(0,0,150,1));
	
	canvas.line(new Vector4(0,150,0,1), new Vector4(0,150,150,1));
	canvas.line(new Vector4(150,150,0,1), new Vector4(150,150,150,1));
	canvas.line(new Vector4(150,0,0,1), new Vector4(150,0,150,1));

	canvas.drawText('debug text');

    pin.draw(canvas);

	//canvas.line(Vector4.ZeroPoint(), Vector4.One().get_scaled(1500), "black", 1);
	
	requestAnimationFrame(draw);

	//a += 0.001 * 5;
	//b += 0.002 * 5;
	//c += 0.003 * 5;
}

requestAnimationFrame(draw);


