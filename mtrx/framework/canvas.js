
class Canvas
{
	constructor(diagram)
	{
		this.diagram = diagram;

		var element = get_by_id("canvas_panel").createChild('canvas');

		element.addEventListener("wheel", (e) => { this.onMouseWheel(e)});
		element.addEventListener("mousemove", (e) => { this.onMouseMove(e)});
		element.addEventListener("mousedown", (e) => { this.onMouseDown(e); });
		element.addEventListener("mouseup", (e) => { this.setPressed(false); });
		element.addEventListener("mouseout", (e) => { this.setPressed(false); });
		element.addEventListener('contextmenu', event => event.preventDefault());
		this.element = element;

		this.refreshSize();	

		this.ctx = element.getContext("2d");
		
		this.worldToScreenMtrx = Matrix4x4.Identity();

		this.color = "black";
		this.width = 1;
		this.mousePosition = Vector.ZeroPoint();
	}

	setPressed(pressed, button)
	{
		this.pressed = pressed;
		this.button = button;
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
		if (this.diagram.onMouseWheel(event))
		{
			event.preventDefault();
			event.stopPropagation();	
		}
	}

	onMouseDown(event)
	{
		this.setPressed(true, event.button);
	}

	onMouseMove(event)
	{
		this.mousePosition = new Vector(event.offsetX, event.offsetY, 0, 1);
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

	drawText(text, startPoint, size, color)
	{
		size = size ?? 4;
		size = Math.round(this.element.offsetHeight * size / 100);

		this.ctx.fillStyle = color ?? "black"
		this.ctx.font = size + "px serif";
		this.ctx.textAlign = "center";
		this.ctx.textBaseline = 'middle';
		this.ctx.fillText(text, startPoint.x, startPoint.y);
	}
}
