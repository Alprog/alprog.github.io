
class Canvas
{
	constructor(diagram)
	{
		this.diagram = diagram;

		var element = document.createElement('canvas');
		element.width = 800
		element.height = 450

		element.addEventListener("wheel", (e) => { this.onMouseWheel(e)});
		element.addEventListener("mousemove", (e) => { this.onMouseMove(e)});

		document.body.appendChild(element); 


		this.size = { x: element.width, y: element.height }
		this.ctx = element.getContext("2d");
		
		this.worldToScreenMtrx = Matrix4x4.Identity();

		this.scale = 1;
		this.color = "black";
		this.width = 1;
		this.mouse = Vector.ZeroPoint();
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
		this.mouse = new Vector(event.offsetX, event.offsetY, 0, 1);  
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
