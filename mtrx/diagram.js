
class Diagram
{	
	constructor()
	{
        this.initCanvas();
        this.objects = [];
        this.requestRender();
	}

    initCanvas()
    {
        this.canvas = new Canvas(this);
        this.canvas.set_camera(0, 0, 0);
    }

    requestRender()
    {
        requestAnimationFrame(()=>{this.render()});
    }

	render()
	{
		this.canvas.clear();
		for (const object of this.objects) 
        {
            object.draw(this.canvas);
        }

        this.requestRender();
	}
}