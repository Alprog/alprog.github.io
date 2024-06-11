

class Pin extends BasePin
{
	constructor(getter, setter, on_changed)
	{
		super(on_changed);
		this.get_position = getter;
		this.set_position = setter;
	}

	get_drag_plane(direction)
	{
		var axes = [Vector.UnitX(), Vector.UnitY(), Vector.UnitZ()];
		var axis = getBestElement(axes, (axis) => Math.abs(dot(axis, direction)));
		return {center: this.get_position(), normal: axis};
	}

	drag(mouse_args)
	{
        var plane = this.get_drag_plane(mouse_args.ray.direction);
		var point = mouse_args.ray.castToPlane(plane);
		if (plane.center.w == 0)
		{
			point.w = 0;
		}
        this.set_position(point);
		this.on_changed();
		this.dragging = true; 
	}

	render(renderer)
	{
		var position = this.get_position();
		
		var radius = this.hovered ? pin_radius : dot_radius;
		renderer.drawCircle(position, radius, this.get_color(), pin_width);

		if (this.hovered)
		{
			var projected = position.clone();
			projected.y = 0; 
			renderer.drawLine(position, projected, "gray", 1);
			renderer.drawText(shortText(position.x), projected, 2);

			var projected = position.clone();
			projected.x = 0; 
			renderer.drawLine(position, projected, "gray", 1);
			renderer.drawText(shortText(position.y), projected, 2);
		}

		this.dragging = false;
	}
}