

class VectorPin extends BasePin
{
	constructor(vector, on_changed, disabled)
	{
		super(on_changed, disabled);
		this.vector = vector;
		this.addXYZFields(this.vector);
	}

	get_position()
	{
		var position = this.vector.clone();
		position.homo_normalize();
		return position;
	}

	set_position(position)
	{
		var factor = this.vector.w == 0 ? 1 : this.vector.w;
		this.vector.x = position.x * factor;
		this.vector.y = position.y * factor;
		this.vector.z = position.z * factor;
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