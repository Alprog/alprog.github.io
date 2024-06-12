
class Diagram
{	
	constructor(layout)
	{
        this.main_panel = document.body.createChildDiv("main_panel");

        var canvas_panel = this.createCanvasPanel();

        this.canvas = new Canvas(this);

        this.camera = new Camera(
            new Vector(0, 0, -350),
            Vector.ZeroPoint(),
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
        this.prevTimeStamp = 0;
        requestAnimationFrame((timeStamp)=>{
            var deltaTime = timeStamp - this.prevTimeStamp;
            this.update(deltaTime);
            this.render();
            this.prevTimeStamp = timeStamp;
            The.AddressBar.sync_with_config();
        });
    }

    calcMouseClipPos()
    {
        var mousePosition = this.canvas.mousePosition;
        var matrix = this.renderer.matrix_table.getMatrix(CANVAS_SPACE, CLIP_SPACE);
        return mult(mousePosition, matrix);
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

    update(deltaTime)
    {
        if (this.animator)
        {
            this.animator.update(deltaTime);
        }

        if (this.canvas.refreshSize())
        {
            for (var editor of editors)
            {
                editor.ajust_size();
            }

            this.camera.setAspect(this.canvas.getAspect());
            this.renderer.refreshPresentMatrix();
        }

        this.processInput();

        if (this.onUpdated)
        {
            this.onUpdated();
        }
    }

    hover(object)
    {
        if (this.hovered_object != object)
        {
            if (this.hovered_object)
            {
                this.hovered_object.hovered = false;
                if (this.hovered_object.onHoveredChanged)
                {
                    this.hovered_object.onHoveredChanged(false);
                }
            }
            this.hovered_object = object;
            if (this.hovered_object)
            {
                this.hovered_object.hovered = true;
                if (this.hovered_object.onHoveredChanged)
                {
                    this.hovered_object.onHoveredChanged(true);
                }
            }
        }
    }

    mouse_pick(objects)
    {
        for (var i = objects.length - 1; i >= 0; i--)
        {
            var object = objects[i];
            var picked = object.children && this.mouse_pick(object.children);
            if (picked)
            {
                return picked;
            }           
            if (object.hover && object.hover(this.renderer))
            {
                return object;
            }
        }
        return null;
    }

    processInput()
    {
        var prevClipPos = this.mouseClipPos ?? Vector.Zero();
        this.mouseClipPos = this.calcMouseClipPos();

        if (this.canvas.pressed)
        {
            if (this.hovered_object)
            {
                var mouse_args = {
                    ray: this.calcMouseRay(),
                    delta: diff(this.mouseClipPos, prevClipPos),
                    button: this.canvas.button
                };

                this.hovered_object.drag(mouse_args);
            }
        }
        else
        {
            var object = this.mouse_pick(this.objects);
            this.hover(object);        
        }
    }

    onMouseWheel(event)
    {
        for (var child of this.objects)
        {
            if (child.onMouseWheel && child.onMouseWheel(event))
            {
                return true;
            }
        }
    }

	render()
	{
		this.canvas.clear();
        this.renderer.setCamera(this.camera);
		this.renderer.renderObjects(this.objects);
        if (this.animator)
        {
            this.animator.render();
        }
        this.requestRender();
	}

    createSidePanel(layout)
    {
        this.sidePanel = new SidePanel(this, layout);
        return this.sidePanel;
    }

    addObject(object)
    {
        this.objects.push(object);
        return object;
    }

    addGrid(drawLabels)
    {
        this.grid = new Grid(drawLabels);
        return this.addObject(this.grid);
    }

    addMesh()
    {
        return this.addObject(new Mesh());
    }

    createAnimator()
    {
        this.animator = new Animator(this);
        this.addObject(this.animator);
        return this.animator;
    }

    createCanvasPanel()
    {
        return this.main_panel.createChildDiv("canvas_panel");
    }
}
