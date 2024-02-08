
var diagram = new Diagram();

diagram.addGrid();

class Custom
{
	render(renderer)
	{
        var mousePoint = renderer.canvas.mouse.clone();
        var matrix = renderer.matrix_table.getMatrix(CANVAS_SPACE, CAMERA_SPACE);
        mousePoint.multiply(matrix);
        console.log(mousePoint);

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
    }
}

diagram.objects.push(new Custom());

diagram.objects.push(new Pin(new Vector(150, 0, 0, 1)));