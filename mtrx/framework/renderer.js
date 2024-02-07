
class Renderer
{
    constructor(canvas)
    {
        this.canvas = canvas;
        this.matrix_table = new MatrixTable();

        this.matrix_table.setModelMatrix(Matrix4x4.Identity());
        this.matrix_table.setViewMatrix(Matrix4x4.Identity());
        this.matrix_table.setProjectionMatrix(Matrix4x4.Identity());

        this.matrix_table.setPresentMatrix(mult(
			Matrix4x4.Scaling(new Vector(this.canvas.size.x / 2, -this.canvas.size.y / 2, 1, 1)),
			Matrix4x4.Translation(new Vector(this.canvas.size.x / 2, this.canvas.size.y / 2, 0, 1))
		));
    }

    setModelMatrix(matrix)
    {
        this.matrix_table.setModelMatrix(matrix ?? Matrix4x4.Identity());
    }

    setCamera(camera)
    {
        this.matrix_table.setViewMatrix(camera.viewMatrix);
        this.matrix_table.setProjectionMatrix(camera.projectionMatrix);
    }

    toWorldSpace(p)
	{
		var result = new Vector(p.x, p.y, p.z, 1);
		result.multiply(this.matrix_table.getMatrix(OBJECT_SPACE, WORLD_SPACE));
        result.homo_normalize();
		return result;
	}

    toNDCSpace(p)
	{
		var result = new Vector(p.x, p.y, p.z, 1);
		result.multiply(this.matrix_table.getMatrix(OBJECT_SPACE, CLIP_SPACE));
        result.homo_normalize();
		return result;
	}

	toCanvasSpace(p)
	{
		var result = new Vector(p.x, p.y, p.z, 1);
		result.multiply(this.matrix_table.getMatrix(OBJECT_SPACE, CANVAS_SPACE));
        result.homo_normalize();
		return result;
	}

    //----------------------------------------------------

    drawLine(p0, p1, color, width)
    {
        p0 = this.toCanvasSpace(p0);
        p1 = this.toCanvasSpace(p1);
        this.canvas.drawLine(p0, p1, color, width);
    }

    drawTriangle(p0, p1, p2, color)
    {
        var a = this.toWorldSpace(p0);
        var b = this.toWorldSpace(p1);
        var c = this.toWorldSpace(p2);
        var ab = diff(b, a);
        var ac = diff(c, a);
        var normal = cross(ab, ac);
        normal.normalize();

        color = rgb(normal.x, normal.y, normal.z)

        var a = this.toNDCSpace(p0);
        var b = this.toNDCSpace(p1);
        var c = this.toNDCSpace(p2);
        var ab = diff(b, a);
        var ac = diff(c, a);
        var normal = cross(ab, ac);

        if (normal.z <= 0)
        {
            p0 = this.toCanvasSpace(p0);
            p1 = this.toCanvasSpace(p1);
            p2 = this.toCanvasSpace(p2);
            this.canvas.drawTriangle(p0, p1, p2, color);
        }
    }

    drawCircle(center, radius, color, width)
    {
        var center = this.toCanvasSpace(center);
        this.canvas.drawCircle(center, radius, color, width);
    }
}