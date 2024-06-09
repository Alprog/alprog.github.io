
var diagram = new Diagram();

var axes = urlParams.get('axes');

diagram.addGrid();
diagram.addObject(new Rotator(diagram.camera, diagram.grid.center));


var a = 0;
var b = 0;

class Custom
{
	render(renderer)
	{   
        renderer.drawText(axes, diagram.grid.center);
    }
}

diagram.objects.push(new Custom());

dom_flush();