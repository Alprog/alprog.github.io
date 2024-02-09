
var pin_radius = 8
var pin_width = 3

class Pin
{
	constructor(position)
	{
		this.position = new Vector(0, 0, 0, 1);
	}

	render(renderer)
	{
		var matrix = renderer.matrix_table.getMatrix(WORLD_SPACE, CANVAS_SPACE);
		var screenPoint = mult(this.position, matrix);
		screenPoint.homo_normalize();

		var delta = diff(screenPoint, renderer.canvas.mousePosition).get_length2D();
		var hovered = delta <= pin_radius;

		renderer.drawLine(Vector.ZeroPoint(), this.position);
		renderer.drawCircle(this.position, pin_radius, hovered ? "orange" : "black", pin_width)
	}
}