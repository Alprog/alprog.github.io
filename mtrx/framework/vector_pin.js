

class VectorPin extends BasePin
{
	constructor(vector, on_changed, disabled)
	{
		super(on_changed, disabled);
		this.vector = vector;
	}

	get_position()
	{
		return this.vector;
	}

	set_position(position)
	{
		this.vector.x = position.x;
		this.vector.y = position.y;
		this.vector.z = position.z;
	}

	get_drag_plane(direction)
	{
		var axes = [Vector.UnitX(), Vector.UnitY(), Vector.UnitZ()];
		var axis = getBestElement(axes, (axis) => Math.abs(dot(axis, direction)));
		return {center: this.get_position(), normal: axis};
	}

	//--------------------------------------

	drag(mouse_args)
	{
        var plane = this.get_drag_plane(mouse_args.ray.direction);
		var point = mouse_args.ray.castToPlane(plane);
		point.w = 0;
        this.set_position(point);
		this.on_changed();
		this.dragging = true; 
	}

	render(renderer)
	{
		var position = this.get_position();
		renderer.drawCircle(position, this.get_radius(), this.get_color(), pin_width);

		if (this.hovered)
		{
			this.renderOffsetBox(renderer, position);
		}

		this.dragging = false;
	}
}