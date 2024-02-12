

class Renderer
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.matrix_table = new MatrixTable();

        this.matrix_table.setModelMatrix(Matrix4x4.Identity());
        this.matrix_table.setViewMatrix(Matrix4x4.Identity());
        this.matrix_table.setProjectionMatrix(Matrix4x4.Identity());
        this.refreshPresentMatrix();
    }

    setModelMatrix(matrix)
    {
        this.matrix_table.setModelMatrix(matrix ?? Matrix4x4.Identity());
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

    drawLine() { this.drawLineInternal(...cloneElements(arguments)); }
    drawTriangle() { this.drawTriangleInternal(...cloneElements(arguments)); }
    drawCircle() { this.drawCircleInternal(...cloneElements(arguments)); }

    drawLineInternal(p0, p1, color, width)
    {
        this.makeCloud( p0, p1 ).transformTo( CANVAS_SPACE );
        this.canvas.drawLine(p0, p1, color, width);
    }

    drawTriangleInternal(a, b, c, color)
    {
        var cloud = this.makeCloud( a, b, c );
        cloud.transformTo( WORLD_SPACE );

        var ab = diff(b, a);
        var ac = diff(c, a);
        var worldNormal = cross(ab, ac);
        worldNormal.normalize();
        color = rgb(worldNormal.x, worldNormal.y, worldNormal.z)

        cloud.transformTo( CLIP_SPACE );
        var ab = diff(b, a);
        var ac = diff(c, a);
        var normal = cross(ab, ac);
        if (normal.z <= 0)
        {
            cloud.transformTo( CANVAS_SPACE );
            this.canvas.drawTriangle(a, b, c, color);
        }
    }

    drawCircleInternal(center, radius, color, width)
    {
        this.makeCloud( center ).transformTo( CANVAS_SPACE );
        this.canvas.drawCircle(center, radius, color, width);
    }
}