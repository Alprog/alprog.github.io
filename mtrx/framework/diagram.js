
class Diagram
{	
	constructor(has_side_panel)
	{
        var main_panel = document.body.createChildDiv("main_panel");
        
        if (has_side_panel)
        {
            var side_panel = main_panel.createChildDiv("side_panel");
            

            var is2D = The.CoordinateSystem.is2D();
            var major = The.Config.vector == 'column' ? "column_major" : "row_major";
            var dimenstions = is2D ? "grid3x3" : "grid4x4";
            
            var side_panel_content = side_panel.createChildDiv("side_panel_content", major);

            var classes = `matrix_editor ${major} ${dimenstions}`;
            side_panel_content.createChildDiv("info", classes);
            side_panel_content.createChildDiv("b", classes);
            side_panel_content.createChildDiv("a", classes);
            side_panel_content.createChildDiv("result", classes);
        }
        
        var canvas_panel = main_panel.createChildDiv("canvas_panel");

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
        requestAnimationFrame(()=>{
            this.update();
            this.render();
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

    update()
    {
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
            }
            this.hovered_object = object;
            if (this.hovered_object)
            {
                this.hovered_object.hovered = true;
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

        var mouse_args = {
            ray: this.calcMouseRay(),
            delta: diff(this.mouseClipPos, prevClipPos)
        };

        if (this.canvas.pressed)
        {
            if (this.hovered_object)
            {
                this.hovered_object.drag(mouse_args);
            }
        }
        else
        {
            var object = this.mouse_pick(this.objects);
            this.hover(object);        
        }
    }

	render()
	{
		this.canvas.clear();
        this.renderer.setCamera(this.camera);
		this.renderer.renderObjects(this.objects);
        this.requestRender();
	}

    addObject(object)
    {
        this.objects.push(object);
        return object;
    }

    addGrid()
    {
        this.grid = new Grid();
        return this.addObject(this.grid);
    }

    addMesh()
    {
        return this.addObject(new Mesh());
    }
}
