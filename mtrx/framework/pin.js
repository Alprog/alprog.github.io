
var pin_radius = 8
var pin_width = 3

class Pin
{
	constructor(getter, setter)
	{
		this.get_position = getter;
		this.set_position = setter;
	}

	drag(mouse_args)
	{
        var plane = {center: new Vector(20, 20, 0), normal: new Vector(0, 0, -1, 0)};
        this.set_position(mouse_args.ray.castToPlane(plane));   
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