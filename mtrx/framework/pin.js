
var pin_radius = 8
var pin_width = 3

class Pin
{
	constructor(diagram, position)
	{
		this.position = new Vector(0, 0, 0, 1);
	}

	drag(mouseRay)
	{
        var plane = {center: new Vector(20, 20, 0), normal: new Vector(0, 0, -1, 0)};
        this.position = mouseRay.castToPlane(plane);   
		this.dragging = true; 
	}

	check_hover(renderer)
	{
		var matrix = renderer.matrix_table.getMatrix(WORLD_SPACE, CANVAS_SPACE);
		var screenPoint = mult(this.position, matrix);
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
		renderer.drawLine(Vector.ZeroPoint(), this.position);
		renderer.drawCircle(this.position, pin_radius, this.get_color(), pin_width)
		this.dragging = false;
	}
}