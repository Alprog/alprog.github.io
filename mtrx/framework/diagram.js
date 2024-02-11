
class Diagram
{	
	constructor()
	{
        this.canvas = new Canvas(this);
                
        this.camera = new Camera(
            new Vector(75, 75, -300),
            new Vector(75, 75, 75),
            Math.PI / 4,
            this.canvas.getAspect()
        );

        //this.camera.setOrthoSize(250);

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

    calcMouseRay()
    {
        var mousePosition = this.canvas.mousePosition;
        var matrix = this.renderer.matrix_table.getMatrix(CANVAS_SPACE, WORLD_SPACE);
        var product = mult(mousePosition, matrix);
        if (product.w == 0)
        {
            var direction = product.get_normalized();
            return new Ray(this.camera.position, direction);
        }
        else
        {
            var direction = this.camera.getViewDirection();
            return new Ray(product, direction);
        }
    }

    update()
    {
        if (this.canvas.refreshSize())
        {
            this.camera.setAspect(this.canvas.getAspect());
            this.renderer.refreshPresentMatrix();
        }
        this.mouseRay = this.calcMouseRay();
        if (this.onUpdated)
        {
            this.onUpdated();
        }
    }

	render()
	{
		this.canvas.clear();
        this.renderer.setCamera(this.camera);
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