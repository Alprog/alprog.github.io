
class Renderer
{
    constructor(canvas)
    {
        this.canvas = canvas;

        this.modelMatrix = Matrix4x4.Identity();      // Object -> World
        this.viewMatrix = Matrix4x4.Identity();       // World -> Camera
        this.projectionMatrix = Matrix4x4.Identity(); // Camera -> NDC

		// NDC -> Canvas
		this.screenMatrix = mult(
			Matrix4x4.Scaling(new Vector(this.canvas.size.x / 2, -this.canvas.size.y / 2, 1, 1)),
			Matrix4x4.Translation(new Vector(this.canvas.size.x / 2, this.canvas.size.y / 2, 0, 1))
		);

        this.refreshTransform();
    }

    refreshTransform()
    {
        this.objectToNDCMatrix = mult(
            this.modelMatrix, 
            this.viewMatrix,
            this.projectionMatrix,
        );

        this.objectToCanvasMatrix = mult(
            this.modelMatrix, 
            this.viewMatrix,
            this.projectionMatrix,
            this.screenMatrix
        );
    }

    setModelMatrix(matrix)
    {
        this.modelMatrix = matrix ?? Matrix4x4.Identity();
        this.refreshTransform();
    }

    setCamera(camera)
    {
        this.viewMatrix = camera.getViewMatrix();
        this.projectionMatrix = camera.projectionMatrix;
        this.refreshTransform();
    }

    toWorldSpace(p)
	{
		var result = new Vector(p.x, p.y, p.z, 1);
		result.multiply(this.modelMatrix);
        result.homo_normalize();
		return result;
	}

    toNDCSpace(p)
	{
		var result = new Vector(p.x, p.y, p.z, 1);
		result.multiply(this.objectToNDCMatrix);
        result.homo_normalize();
		return result;
	}

	toCanvasSpace(p)
	{
		var result = new Vector(p.x, p.y, p.z, 1);
		result.multiply(this.objectToCanvasMatrix);
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