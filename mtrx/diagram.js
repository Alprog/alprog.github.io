
class Diagram
{	
	constructor()
	{
        this.canvas = new Canvas(this);
        this.camera = new Camera();
        this.renderer = new Renderer(this.canvas);
        this.objects = [];
        this.onUpdated = null;

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
        if (this.onUpdated)
        {
            this.onUpdated();
        }
    }

	render()
	{
        this.a = (this.a ?? 0) + 0.01;
		this.canvas.clear();
        this.renderer.setCamera(this.a, 0, 0);
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