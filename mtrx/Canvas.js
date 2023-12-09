
class Canvas
{
	constructor(name)
	{
		var element = document.getElementById(name ?? "canvas");
		this.size = { x: element.width, y: element.height }
		this.ctx = element.getContext("2d");
		
		this.color = "black"
		this.width = 1
	}
	
	clear()
	{
		this.ctx.clearRect(0, 0, this.size.x, this.size.y );	
	}
	
	line(p0, p1, color, width)
	{
		this.ctx.beginPath();
		this.ctx.moveTo(p0.x, p0.y);
		this.ctx.lineTo(p1.x, p1.y);
		this.ctx.strokeStyle = color ?? this.color
		this.ctx.lineWidth = width ?? this.width;
		this.ctx.stroke();
	}
}