
var diagram = new Diagram();

diagram.addGrid();
diagram.addObject(new CameraController(diagram.camera, diagram.grid.center));

class Custom
{
	render(renderer)
	{   
        renderer.drawText(The.Config.axes, diagram.grid.center, 15);
    }
}

diagram.objects.push(new Custom());

dom_flush(); 