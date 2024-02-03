
class Diagram
{	
	constructor()
	{
        this.canvas = new Canvas(this);
        this.renderer = new Renderer(this.canvas);

        this.objects = [];
        this.requestRender();
	}

    requestRender()
    {
        requestAnimationFrame(()=>{
            this.update();
            this.render();
        });
    }

    update()
    {
        if (this.onUpdate)
        {
            this.onUpdate();
        }
    }

	render()
	{
		this.canvas.clear();
        this.renderer.setCamera(0, 0, 0);
		for (const object of this.objects) 
        {
            this.renderer.setModelMatrix(object.transform);
            object.render(this.renderer);
        }

        this.requestRender();
	}

    addObject(object)
    {
        this.objects.push(object);
        return object;
    }

    addGrid()
    {
        return this.addObject(new Grid());
    }

    addMesh()
    {
        return this.addObject(new Mesh());
    }

}