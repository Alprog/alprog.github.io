
class CameraController
{
    constructor(camera, lookAt, yaw, pitch, distance)
    {
        this.camera = camera;
        this.lookAt = lookAt;

        this.yaw = yaw ?? 0;
        this.pitch = pitch ?? 0;
        this.distance = distance ?? 2;

        this.refreshCamera();
    }

    refreshCamera()
    {
        var up = Math.sin(this.pitch);        
        var k = Math.cos(this.pitch);        
        var forward = Math.cos(this.yaw) * k;
        var right = Math.sin(this.yaw) * k;
             
        var direction = sum(
            Vector.Right().get_scaled(right),
            Vector.Up().get_scaled(up),
            Vector.Forward().get_scaled(forward)
        );

        this.camera.setLookAt(this.lookAt);
        var position = diff(this.lookAt, direction.get_scaled(this.distance));
        this.camera.setPosition(position)
    }

    hover()
	{
		return true;
	}

    drag(mouse_args)
	{
        var isPanning = The.CoordinateSystem.is2D() || mouse_args.button != 0;
        if (isPanning)
        {
            this.panning(mouse_args);
        }
        else
        {
            this.rotation(mouse_args);
        }        
	}

    panning(mouse_args)
    {
        /*var normal = this.camera.getForward().get_scaled(-1);
        var plane = {center: this.lookAt, normal: normal };
        var point = mouse_args.ray.castToPlane(plane);
        this.lookAt = point;*/

        var forward = this.camera.getForward();
        var right = cross(The.CoordinateSystem.Up.direction, forward);
        right.normalize();
        var up = cross(forward, right);

        var dx = right.get_scaled(-mouse_args.delta.x);
        var dy = up.get_scaled(-mouse_args.delta.y);

        this.lookAt = sum(this.lookAt, dx, dy);

        this.refreshCamera();
    }

    rotation(mouse_args)
    {
        this.yaw += mouse_args.delta.x;
        this.pitch += mouse_args.delta.y;
        const limit = Math.PI / 4;
        this.pitch = clamp(this.pitch, -limit, limit);
        this.refreshCamera();
    }

	render(renderer)
	{
	}

    onMouseWheel(event)
    {
        var zoomStep = 1.1;
		var zoomValue = event.deltaY > 0 ? zoomStep : 1 / zoomStep;
        this.distance *= zoomValue;
        this.refreshCamera();
        return true;
    }
}