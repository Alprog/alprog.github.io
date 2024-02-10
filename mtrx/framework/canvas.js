
class Canvas
{
	constructor(diagram)
	{
		this.diagram = diagram;

		var element = document.createElement('canvas');

		element.addEventListener("wheel", (e) => { this.onMouseWheel(e)});
		element.addEventListener("mousemove", (e) => { this.onMouseMove(e)});
		element.addEventListener("mousedown", (e) => { this.pressed = true; });
		element.addEventListener("mouseup", (e) => { this.pressed = false; });
		element.addEventListener("mouseout", (e) => { this.pressed = false; });
		this.element = element;

		document.getElementById("canvas_panel").appendChild(element);

		this.refreshSize();
		

		this.ctx = element.getContext("2d");
		
		this.worldToScreenMtrx = Matrix4x4.Identity();

		this.scale = 1;
		this.color = "black";
		this.width = 1;
		this.mousePosition = Vector.ZeroPoint();
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

	drawText(text)
	{
		this.ctx.color = "black"
		this.ctx.font = "12px serif";
		this.ctx.fillText(text, 0, 12);
	}


}
