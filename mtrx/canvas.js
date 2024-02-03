
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

		this.scale = 1
		this.color = "black"
		this.width = 1
		this.mouse = Vector4.ZeroPoint()
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
		this.mouse = new Vector4(event.offsetX, event.offsetY, 0, 1);  
	}

	zoom(value)
	{
		this.scale = this.scale * value;
	}

	clear()
	{
		this.ctx.clearRect(0, 0, this.size.x, this.size.y);
	}

	drawCircle(center, radius, color, width)
	{
		this.ctx.beginPath();

		var alpha = 1 - center.z / 2
		this.ctx.globalAlpha = Math.max(Math.min(alpha, 1), 0);

		this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
		this.ctx.strokeStyle = color ?? this.color
		this.ctx.lineWidth = width ?? this.width;
		this.ctx.stroke();
	}

	drawLine(p0, p1, color, width)
	{
		var segments = 20

		var step = new Vector4((p1.x - p0.x) / segments, (p1.y - p0.y) / segments, (p1.z - p0.z) / segments, 0);
		p1 = p0.clone()
		p1.add(step)

		for (var i = 0; i < segments; i++)
		{			
			this.ctx.beginPath();
			var alpha = 1 - (p0.z + p1.z) / 2
			this.ctx.globalAlpha = Math.max(Math.min(alpha, 1), 0);
			this.ctx.moveTo(p0.x, p0.y);
			this.ctx.lineTo(p1.x, p1.y);
			this.ctx.strokeStyle = color ?? this.color
			this.ctx.lineWidth = width ?? this.width;
			this.ctx.stroke();
			p0.add(step)
			p1.add(step)
		}
	}

	drawText(text)
	{
		this.ctx.globalAlpha = 1
		this.ctx.color = "black"
		this.ctx.font = "12px serif";
		this.ctx.fillText(text, 0, 12);
	}

	drawTriangle(p0, p1, p2, color)
	{
		this.ctx.globalAlpha = 1
		this.ctx.fillStyle = color
		this.ctx.beginPath();
		this.ctx.moveTo(p0.x, p0.y);
		this.ctx.lineTo(p1.x, p1.y);
		this.ctx.lineTo(p2.x, p2.y);
		this.ctx.closePath();
		this.ctx.fill();
	}
}
