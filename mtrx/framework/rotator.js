
class Rotator
{
    constructor(camera, lookAt)
    {
        this.camera = camera;
        this.lookAt = lookAt;
        this.offset_direction = coordinateSystem.Backward.direction.clone();
        this.distance = 350;

        this.refreshCamera();
    }

    refreshCamera()
    {
        this.camera.setLookAt(this.lookAt);
        var position = sum(this.lookAt, this.offset_direction.get_scaled(this.distance));
        this.camera.setPosition(position)
    }

    hover()
	{
		return true;
	}

    drag(mouseRay)
	{
        this.mouseRay = mouseRay;
        this.dragging = true;
	}

	render(renderer)
	{
        if (this.hovered && this.dragging)
        {
            this.dragging = false;
            

            var sphere = new Sphere(this.lookAt, 75);
            var intersectPoint = this.mouseRay.castToSphere(sphere);
            if (intersectPoint)
            {
                renderer.drawLine(this.lookAt, intersectPoint, "red", 1);
            }

        }
	}
}