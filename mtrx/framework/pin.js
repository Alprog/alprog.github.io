
var pin_radius = 8
var pin_width = 3

class Pin
{
	constructor(point)
	{
	}

	render(renderer)
	{
		var point = new Vector(0, 0, 0, 1);
		var delta = diff(point, renderer.canvas.mousePosition).get_length2D();
		var hovered = delta <= pin_radius;

		renderer.drawCircle(point, pin_radius, hovered ? "orange" : "black", pin_width)
	}
}