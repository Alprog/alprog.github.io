

var disabled_dot_radius = 1;
var dot_radius = 2;
var pin_radius = 8;
var pin_width = 3;
var dashPattern = [5, 5];
var fontSize = 3;
var lineWidth = 1;

class BasePin
{
    constructor(on_changed, disabled)
    {
        this.on_changed = on_changed;
		this.disabled = disabled;
		this.fields = [];
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

	get_radius()
	{
		if (this.disabled)
			return disabled_dot_radius;

		if (this.hovered)
			return pin_radius;

		return dot_radius;
	}

	get_color()
	{
		if (this.disabled)
			return "gray";

		if (this.dragging)
			return "orange";

		if (this.hovered)
			return "gray";

		return "black";
	}

	renderOffsetBox(renderer, position)
	{
		var p_xyz = position;

		var o = Vector.Zero();

		var p_x = new Vector(position.x, 0, 0);
		var p_y = new Vector(0, position.y, 0); 
		var p_z = new Vector(0, 0, position.z);
		var p_xy = new Vector(position.x, position.y, 0);
		var p_yz = new Vector(0, position.y, position.z); 
		var p_xz = new Vector(position.x, 0, position.z);

		var labelHelper = (value, point) =>
		{
			if (value != 0)
			{
				renderer.drawText(shortText(value), point, fontSize, "black");
			}
		}

		labelHelper(position.x, p_x);
		labelHelper(position.y, p_y);
		
		renderer.setDashes(dashPattern);

		renderer.drawLine(p_x, o, "gray", lineWidth);
		renderer.drawLine(p_y, o, "gray", lineWidth);

		renderer.drawLine(p_x, p_xy, "gray", lineWidth);
		renderer.drawLine(p_y, p_xy, "gray", lineWidth);		

		if (The.CoordinateSystem.is3D() && position.z != 0)
		{		
			labelHelper(position.z, p_z);
			renderer.drawLine(p_z, o, "gray", lineWidth);
			renderer.drawLine(p_y, p_yz, "gray", lineWidth);
			renderer.drawLine(p_z, p_yz, "gray", lineWidth);	
			renderer.drawLine(p_z, p_xz, "gray", lineWidth);
			renderer.drawLine(p_x, p_xz, "gray", lineWidth);
			renderer.drawLine(p_xyz, p_yz, "gray", lineWidth);
			renderer.drawLine(p_xyz, p_xz, "gray", lineWidth);
			renderer.drawLine(p_xyz, p_xy, "gray", lineWidth);
		}

		renderer.setDashes([]);
	}

	render2DDiff(renderer, origin, axis)
	{
		renderer.setDashes(dashPattern);

		var a = origin;
		var b = sum(a, axis);

		var ax = new Vector(a.x, 0, 0);
		var ay = new Vector(0, a.y, 0);
		var bx = new Vector(b.x, 0, 0);
		var by = new Vector(0, b.y, 0);

		renderer.drawLine(ax, bx, "gray", lineWidth);
		renderer.drawLine(ay, by, "gray", lineWidth);

		renderer.drawLine(a, ax, "gray", lineWidth);
		renderer.drawLine(a, ay, "gray", lineWidth);
		renderer.drawLine(b, bx, "gray", lineWidth);
		renderer.drawLine(b, by, "gray", lineWidth);

		renderer.drawText(shortText(axis.x), sum(ax, bx).get_scaled(0.5), fontSize, "black");
		renderer.drawText(shortText(axis.y), sum(ay, by).get_scaled(0.5), fontSize, "black");

		renderer.setDashes([]);
	}

	addXYZFields(vector)
	{
		for (var key in vector.fields)
		{
			if (key != 3)
			{
				this.fields.push(vector.fields[key]);
			}
		}
	}
	
	onHoveredChanged(value)
	{
		for (var field of this.fields)
		{
			field.style.backgroundColor = value ? "yellow" : "";
		}
	}
}