
class Rotator
{
    constructor(camera, lookAt, yaw, pitch, distance)
    {
        this.camera = camera;
        this.lookAt = lookAt;

        this.yaw = yaw ?? 0;
        this.pitch = pitch ?? 0;
        this.distance = distance ?? 10;

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
        this.yaw += mouse_args.delta.x;
        this.pitch += mouse_args.delta.y;

        const limit = Math.PI / 4;
        this.pitch = clamp(this.pitch, -limit, limit);

        this.refreshCamera();
	}

	render(renderer)
	{
	}
}