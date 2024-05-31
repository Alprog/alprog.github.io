
var diagram = new Diagram();

var axes = urlParams.get('axes');

diagram.addObject(new Rotator(diagram.camera, Vector.One().get_scaled(75)));
diagram.addGrid();

var a = 0;
var b = 0;

class Custom
{
	render(renderer)
	{
        renderer.drawLine(new Vector(150,0,0,1), new Vector(150,150,0,1));
        renderer.drawLine(new Vector(0,150,0,1), new Vector(150,150,0,1));
        renderer.drawLine(new Vector(150,0,150,1), new Vector(150,150,150,1));
        renderer.drawLine(new Vector(0,150,150,1), new Vector(150,150,150,1));
    
        renderer.drawLine(new Vector(0,150,150,1), new Vector(0,0,150,1));
        renderer.drawLine(new Vector(150,0,150,1), new Vector(0,0,150,1));
        
        renderer.drawLine(new Vector(0,150,0,1), new Vector(0,150,150,1));
        renderer.drawLine(new Vector(150,150,0,1), new Vector(150,150,150,1));
        renderer.drawLine(new Vector(150,0,0,1), new Vector(150,0,150,1));
    
        renderer.drawText(axes, new Vector(75,75,75,1));
    }
}

diagram.objects.push(new Custom());

dom_flush();