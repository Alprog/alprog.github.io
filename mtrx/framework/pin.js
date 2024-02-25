
var pin_radius = 8
var pin_width = 3

class Pin
{
	constructor(getter, setter, on_changed)
	{
		this.get_position = getter;
		this.set_position = setter;
		this.on_changed = on_changed;
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
        this.set_position(mouse_args.ray.castToPlane(plane));
		this.on_changed();
		this.dragging = true; 
	}

	hover(renderer)
	{
		var position = this.get_position();
		var matrix = renderer.matrix_table.getMatrix(WORLD_SPACE, CANVAS_SPACE);
		var screenPoint = mult(position, matrix);
		screenPoint.homo_normalize();

		var delta = diff(screenPoint, renderer.canvas.mousePosition).get_length2D();
		return delta <= pin_radius;	
	}

	get_color()
	{
		return this.dragging ? "orange" : this.hovered ? "grey" : "black";
	}

	render(renderer)
	{
		var position = this.get_position();
		renderer.drawCircle(position, pin_radius, this.get_color(), pin_width)
		this.dragging = false;
	}
}