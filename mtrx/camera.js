
class Camera
{
    constructor(position, lookAt, aspect, FOV)
    {
        this.position = position ?? new Vector(0, 0, -1);
        this.lookAt = lookAt ?? Vector.ZeroPoint();
        this.aspect = aspect ?? 1;
        this.setFov(FOV ?? Math.PI / 4);
    }

    getViewMatrix()
    {
        var offset = this.position.get_scaled(-1);
        var offsetMtrx = Matrix4x4.Translation(offset);

        var forward = diff(this.lookAt, this.position);
        forward.normalize();
        var right = cross(Vector.Up(), forward);
        var up = cross(forward, right);
        var orientationMtrx = new Matrix4x4(right, up, forward, Vector.ZeroPoint());
        orientationMtrx.transpose();
    
        return mult(offsetMtrx, orientationMtrx);
    }

    setFov(vFOV)
    {
        var scaleY = 1 / Math.tan(vFOV / 2);
        var scaleX = scaleY / this.aspect;
		this.projectionMatrix = new Matrix4x4(
			new Vector(scaleX, 0, 0, 0),
			new Vector(0, scaleY, 0, 0),
			new Vector(0, 0, 0, 1),
			new Vector(0, 0, 0, 0)
		);
    }

    setOrtho(height)
    {
		var width = height * aspect;
		var depth = 1500;
		this.projectionMatrix = new Matrix4x4(
			new Vector(2 / width, 0, 0, 0),
			new Vector(0, 2 / height, 0, 0),
			new Vector(0, 0, 1 / depth, 0),
			new Vector(0, 0, 0, 1)
		);
    }
}