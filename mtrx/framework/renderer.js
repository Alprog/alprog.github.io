

class Renderer
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.matrix_table = new MatrixTable();
        this.light_direction = new Vector(1,-3,2).get_normalized();

        this.matrix_table.setModelMatrix(Matrix4x4.Identity());
        this.matrix_table.setViewMatrix(Matrix4x4.Identity());
        this.matrix_table.setProjectionMatrix(Matrix4x4.Identity());
        this.refreshPresentMatrix();

        this.commands = [];
    }

    setModelMatrix(matrix)
    {
        this.matrix_table.setModelMatrix(matrix);
    }

    setCamera(camera)
    {
        this.matrix_table.setViewMatrix(camera.getViewMatrix());
        this.matrix_table.setProjectionMatrix(camera.getProjectionMatrix());
    }

    refreshPresentMatrix()
    {
        this.matrix_table.setPresentMatrix(mult(
			Matrix4x4.Scaling(new Vector(this.canvas.size.x / 2, -this.canvas.size.y / 2, 1, 1)),
			Matrix4x4.Translation(new Vector(this.canvas.size.x / 2, this.canvas.size.y / 2, 0, 1))
		));
    }

    makeCloud()
    {
        return new PointCloud( arguments, OBJECT_SPACE, this.matrix_table );
    }

    //----------------------------------------------------
   
    renderObjects(objects, parentMatrix)
    {
        for (const object of objects) 
        {
            var modelMatrix = object.transform ?? Matrix4x4.Identity();
            if (parentMatrix)
            {
                modelMatrix = mult(modelMatrix, parentMatrix);
            }
            this.setModelMatrix(modelMatrix);
            object.render(this);
            if (object.children)
            {
                this.renderObjects(object.children, modelMatrix);
            }
        }
        this.flushCommands();
    }

    schedule(order, command)
    {
        this.commands.push( { order: order, execute: command } );
    }

    flushCommands()
    {
        this.commands.sort( (a, b) => { return a.order - b.order; } );
        for (const command of this.commands)
        {
            command.execute();
        }
        this.commands = [];
    }

    setDashes(pattern)
	{
		this.canvas.ctx.setLineDash( pattern );
	}

    //----------------------------------------------------

    drawLine() { this.drawLineInternal(...cloneElements(arguments)); }
    drawArrow() { this.drawArrowInternal(...cloneElements(arguments)); }
    drawTriangle() { this.drawTriangleInternal(...cloneElements(arguments)); }
    drawCircle() { this.drawCircleInternal(...cloneElements(arguments)); }
    drawText() { this.drawTextInternal(...cloneElements(arguments)); }

    drawLineInternal(p0, p1, color, width)
    {
        this.makeCloud( p0, p1 ).transformTo( CANVAS_SPACE );
        this.canvas.drawLine(p0, p1, color, width);
    }

    drawArrowInternal(p0, p1, color, width, tip_radius)
    {
        this.makeCloud( p0, p1 ).transformTo( CANVAS_SPACE );
        this.canvas.drawLine(p0, p1, color, width);

        if (tip_radius)
        {
            var dir = diff(p1, p0).get_normalized();
            var base = diff(p1, dir.get_scaled(tip_radius));
            var norm = new Vector(-dir.y, dir.x);
            var norm_offset = norm.get_scaled(tip_radius * 0.6);
            var p2 = sum(base, norm_offset);
            var p3 = diff(base, norm_offset);
            this.canvas.drawTriangle(p1, p2, p3, color);     
        }
    }

    drawTriangleInternal(a, b, c, color)
    {
        var cloud = this.makeCloud( a, b, c );
        cloud.transformTo( WORLD_SPACE );

        var ab = diff(b, a);
        var ac = diff(c, a);
        var worldNormal = cross(ab, ac);
        worldNormal.normalize();
        worldNormal.w = 0;

        var k = -dot(worldNormal, this.light_direction);
        color.scale(k);

        cloud.points = [
            cloud.points[0],
            cloud.points[1],
            cloud.points[2],
            worldNormal
        ];

        cloud.transformTo( CLIP_SPACE );     
        var ab = diff(b, a);
        var ac = diff(c, a);
        var normal = cross(ab, ac);

        var isClockwise = normal.z < 0;
        if (isClockwise == The.CoordinateSystem.isLHS())
        {
            cloud.transformTo( CANVAS_SPACE );
            var order = (a.z + b.z + c.z) / 3;
            this.schedule(order, () => {
                this.canvas.drawTriangle(a, b, c, color.toHexString()); 
            });
        }
    }

    drawCircleInternal(center, radius, color, width)
    {
        this.makeCloud( center ).transformTo( CANVAS_SPACE );
        this.canvas.drawCircle(center, radius, color, width);
    }

    drawTextInternal(text, position, size, color)
    {
        this.makeCloud( position ).transformTo( CANVAS_SPACE );
        this.canvas.drawText(text, position, size, color);
    }
}