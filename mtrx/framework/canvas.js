
class Canvas
{
	constructor(diagram)
	{
		this.diagram = diagram;

		var element = get_by_id("canvas_panel").createChild('canvas');

		element.addEventListener("wheel", (e) => { this.onMouseWheel(e)});
		element.addEventListener("mousemove", (e) => { this.onMouseMove(e)});
		element.addEventListener("mousedown", (e) => { this.setPressed(true); });
		element.addEventListener("mouseup", (e) => { this.setPressed(false); });
		element.addEventListener("mouseout", (e) => { this.setPressed(false); });
		this.element = element;

		
		this.refreshSize();
		

		this.ctx = element.getContext("2d");
		
		this.worldToScreenMtrx = Matrix4x4.Identity();

		this.scale = 1;
		this.color = "black";
		this.width = 1;
		this.mousePosition = Vector.ZeroPoint();
	}

	setPressed(pressed)
	{
		this.pressed = pressed;
		this.element.style = pressed ? "cursor:grab" : "";
	}

	refreshSize()
	{
		this.size = { x: this.element.offsetWidth, y: this.element.offsetHeight }
		if (this.element.width != this.size.x || this.element.height != this.size.y)
		{
			this.element.width = this.size.x;
			this.element.height = this.size.y;
			return true;
		}
		return false;
	}

	getAspect()
	{
		return this.size.x / this.size.y;
	}

	onMouseWheel(event)
	{
		var zoomStep = 1.1;
		var zoomValue = event.deltaY > 0 ? 1 / zoomStep : zoomStep;
		this.zoom(zoomValue);
		event.preventDefault();
		event.stopPropagation();
		return false
	}

	onMouseMove(event)
	{
		this.mousePosition = new Vector(event.offsetX, event.offsetY, 0, 1);
	}

	zoom(value)
	{
		this.scale = this.scale * value;
	}

	clear()
	{
		this.ctx.clearRect(0, 0, this.size.x, this.size.y);
	}

	drawLine(p0, p1, color, width)
	{
		this.ctx.beginPath();
		this.ctx.moveTo(p0.x, p0.y);
		this.ctx.lineTo(p1.x, p1.y);
		this.ctx.strokeStyle = color ?? this.color
		this.ctx.lineWidth = width ?? this.width;
		this.ctx.stroke();
	}

	drawTriangle(p0, p1, p2, color)
	{
		this.ctx.fillStyle = color
		this.ctx.beginPath();
		this.ctx.moveTo(p0.x, p0.y);
		this.ctx.lineTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.closePath();
		this.ctx.fill();
	}

	drawCircle(center, radius, color, width)
	{
		this.ctx.beginPath();
		this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		this.ctx.strokeStyle = color ?? this.color
		this.ctx.lineWidth = width ?? this.width;
		this.ctx.stroke();
	}

	drawText(text, startPoint)
	{
		this.ctx.fillStyle = "black"
		this.ctx.font = "16px serif";
		this.ctx.fillText(text, startPoint.x, startPoint.y);
	}

}
