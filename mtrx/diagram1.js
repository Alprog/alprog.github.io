
var diagram = new Diagram();

diagram.addGrid();

var pin = new Pin(new Vector(150, 0, 0, 1));

var a = 0;
var b = 0;

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
        b = b + 0.01;

        var center = new Vector(75, 75, 75);
        var back = coordinateSystem.Backward.unit.get_scaled(375 * Math.cos(a));
        var right = coordinateSystem.Right.unit.get_scaled(375 * Math.sin(a));

        var pos = sum(center, back, right);
        diagram.camera.setPosition(pos)
    }
}

diagram.objects.push(new Custom());
diagram.objects.push(pin);

/*console.log(detectAxis('Forward'));
console.log(detectAxis('Backward'));
console.log(detectAxis('Left'));
console.log(detectAxis('Right'));
console.log(detectAxis('Up'));
console.log(detectAxis('Down'));*/