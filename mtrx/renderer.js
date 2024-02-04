
class Renderer
{
    constructor(canvas)
    {
        this.canvas = canvas;

        this.modelMatrix = Matrix4x4.Identity();      // Object -> World
        this.viewMatrix = Matrix4x4.Identity();       // World -> Camera
        this.projectionMatrix = Matrix4x4.Identity(); // Camera -> NDC
        this.screenMatrix = Matrix4x4.Identity();     // NDC -> Canvas

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

    setCamera(a, b, c)
    {
		var height = 500 / this.canvas.scale;
        var aspect = this.canvas.size.x / this.canvas.size.y;
		var width = height * aspect;
		var depth = 1500;

		var lookAt = new Vector(75, 75, 75, 1);
        this.viewMatrix = Matrix4x4.Identity();
		this.viewMatrix.multiply( Matrix4x4.Translation(lookAt.get_scaled(-1)) );
		this.viewMatrix.multiply( Matrix4x4.RotationX_LHS(a) );
		this.viewMatrix.multiply( Matrix4x4.RotationY_LHS(b) );
		this.viewMatrix.multiply( Matrix4x4.RotationZ_LHS(c) );
		this.viewMatrix.multiply( Matrix4x4.Translation(new Vector(0, 0, 500, 1)) );

        

		// Camera -> NDC
		this.projectionMatrix = new Matrix4x4(
			new Vector(2 / width, 0, 0, 0),
			new Vector(0, 2 / height, 0, 0),
			new Vector(0, 0, 1 / depth, 0),
			new Vector(0, 0, 0, 1)
		);

        var a = Math.PI / 4;
        var cot = 1 / Math.tan(a / 2);
		this.projectionMatrix = new Matrix4x4(
			new Vector(cot / aspect, 0, 0, 0),
			new Vector(0, cot, 0, 0),
			new Vector(0, 0, 0, 1),
			new Vector(0, 0, 0, 0)
		);

		// NDC -> Canvas
		this.screenMatrix = mult(
			Matrix4x4.Scaling(new Vector(this.canvas.size.x / 2, -this.canvas.size.y / 2, 1, 1)),
			Matrix4x4.Translation(new Vector(this.canvas.size.x / 2, this.canvas.size.y / 2, 0, 1))
		);

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