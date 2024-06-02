
var diagram = new Diagram();

var axes = urlParams.get('axes');

diagram.addObject(new Rotator(diagram.camera, new Vector(2.5,2.5,2.5,0)));
diagram.addGrid();

var a = 0;
var b = 0;

class Custom
{
	render(renderer)
	{   
        renderer.drawText(axes, new Vector(2.5,2.5,2.5,1));
    }
}

diagram.objects.push(new Custom());

dom_flush();