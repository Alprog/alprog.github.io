

var dot_radius = 2;
var pin_radius = 8;
var pin_width = 3;

class BasePin
{
    constructor(on_changed)
    {
        this.on_changed = on_changed;
    }

    hover(renderer)
	{
		var point = this.get_position().as_point();		
		var matrix = renderer.matrix_table.getMatrix(WORLD_SPACE, CANVAS_SPACE);
		var screenPoint = mult(point, matrix);
		screenPoint.homo_normalize();

		var delta = diff(screenPoint, renderer.canvas.mousePosition).get_length2D();
		return delta <= pin_radius;	
	}

	get_color()
	{
		return this.dragging ? "orange" : this.hovered ? "grey" : "black";
	}
}