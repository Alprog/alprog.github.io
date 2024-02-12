
var diagram = new Diagram();

diagram.addGrid();

var pin = new Pin(new Vector(150, 0, 0, 1));

var a = -Math.PI / 2;

class Custom
{
	render(renderer)
	{
        if (diagram.canvas.pressed)
        {
            var plane = {center: new Vector(20, 20, 0), normal: new Vector(0, 0, -1, 0)};
            pin.position = diagram.mouseRay.castToPlane(plane);    
        }

		for (var i = 0; i <= 10; i++)
        {
            renderer.drawLine(new Vector(0,i*10,0,1), new Vector(100,i*10,0,1));
            renderer.drawLine(new Vector(i*10,0,0,1), new Vector(i*10,100,0,1));		
        }
        renderer.drawLine(new Vector(0,0,0,1), new Vector(60,30,0,1), "red", 3);
        renderer.drawLine(new Vector(60,30,0,1), new Vector(40,70,0,1), "green", 3);
        renderer.drawLine(new Vector(40,70,0,1), new Vector(100,100,0,1), "blue", 3);
        
        renderer.drawLine(new Vector(150,0,0,1), new Vector(150,150,0,1));
        renderer.drawLine(new Vector(0,150,0,1), new Vector(150,150,0,1));
        renderer.drawLine(new Vector(150,0,150,1), new Vector(150,150,150,1));
        renderer.drawLine(new Vector(0,150,150,1), new Vector(150,150,150,1));
    
        renderer.drawLine(new Vector(0,150,150,1), new Vector(0,0,150,1));
        renderer.drawLine(new Vector(150,0,150,1), new Vector(0,0,150,1));
        
        renderer.drawLine(new Vector(0,150,0,1), new Vector(0,150,150,1));
        renderer.drawLine(new Vector(150,150,0,1), new Vector(150,150,150,1));
        renderer.drawLine(new Vector(150,0,0,1), new Vector(150,0,150,1));

        a = a + 0.01;
        var pos = new Vector(75, Math.cos(a)*375+75, Math.sin(a)*375+75);
        diagram.camera.setPosition(pos)
    }
}

diagram.objects.push(new Custom());
diagram.objects.push(pin);