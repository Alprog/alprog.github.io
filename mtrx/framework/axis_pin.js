
var pin_radius = 8
var pin_width = 3

class AxisPin
{
	constructor(axisA, axisB, axisC, translation, on_changed)
	{
		this.axisA = axisA; // editable
		this.axisB = axisB;
		this.axisC = axisC;
		this.translation = translation;
		this.on_changed = on_changed;
	}

	get_drag_plane(direction)
	{
		var axes = [this.axisB, this.axisC];
		var axis = getBestElement(axes, (axis) => Math.abs(dot(axis.get_normalized(), direction)));
		this.normal_axis = axis;
		return {center: this.get_position(), normal: axis.get_normalized()};
	}

	normalize()
	{
		if (this.normal_axis == this.axisC)
		{
			var length = this.axisB.get_length();
			var dir = cross(this.axisC.get_normalized(), this.axisA.get_normalized());
			this.axisB.set(dir.get_scaled(length));
		}
		else
		{
			var length = this.axisC.get_length();
			var dir = cross(this.axisA.get_normalized(), this.axisB.get_normalized());
			this.axisC.set(dir.get_scaled(length));
		}
	}

	drag(mouse_args)
	{
		if (!this.prev_dragging)
		{
			this.dragging_plane = this.get_drag_plane(mouse_args.ray.direction);
		}
		
		if (this.normal_axis == this.axisA)
			return;

		var point = mouse_args.ray.castToPlane(this.dragging_plane);
		point.w = 0;
        this.axisA.set(diff(point, this.translation));
		this.normalize();
		this.on_changed();
		this.dragging = true; 
	}

	get_position()
	{
		return sum(this.translation, this.axisA);
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
		renderer.drawCircle(position, pin_radius, this.get_color(), pin_width);
		if (this.dragging)
		{
			if (this.normal_axis != this.axisA)
			{
				renderer.drawLine(this.translation, sum(this.translation, this.normal_axis), "black", 5)

				/*var second_axis = this.normal_axis == this.axisB ? this.axisC : this.axisB;
				var p0 = this.translation;
				var p1 = sum(this.translation, this.axisA);
				var p2 = sum(this.translation, second_axis);
				var p3 = sum(this.translation, this.axisA, second_axis);
				renderer.drawLine(p0, p3, "black", 1);
				renderer.drawLine(p1, p2, "black", 1);*/
			}
		}
		this.prev_dragging = this.dragging;
		this.dragging = false;
	}
}