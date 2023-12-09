
class Canvas
{
	constructor(name)
	{
		var element = document.getElementById(name ?? "canvas");
		this.size = { x: element.width, y: element.height }
		this.ctx = element.getContext("2d");
		
		this.worldToScreenMtrx = Matrix4x4.Identity();
		
		this.color = "black"
		this.width = 1
	}
	
	set_camera(a, b, c)
	{
		var mtrx = Matrix4x4.Identity();
		
		var scale = 0.13;
		var scaling = Matrix4x4.Scaling({x:scale, y:scale, z: scale});
		
		var lookAt = new Vector4(500, 500, 0, 1);
		lookAt.negate();
		var translation = Matrix4x4.Translation(lookAt);
		
		var rotation = Matrix4x4.RotationX_LHS(a);
		rotation.multiply( Matrix4x4.RotationY_LHS(b) );
		rotation.multiply( Matrix4x4.RotationZ_LHS(c) );
		
		var toCanvas = mult(
			Matrix4x4.Scaling(new Vector4(1, -1, 1, 1)),
			Matrix4x4.Translation(new Vector4(this.size.x / 2, this.size.y / 2, 0, 1))			
		);
		
		this.worldToScreenMtrx = mult(translation, scaling, rotation, toCanvas);
	}
	
	clear()
	{
		this.ctx.clearRect(0, 0, this.size.x, this.size.y );	
	}
	
	transform_point(p)
	{
		var result = new Vector4(p.x, p.y, p.z, 1);
		result.multiply(this.worldToScreenMtrx);
		return result;
	}
	
	line(p0, p1, color, width)
	{
		p0 = this.transform_point(p0)
		p1 = this.transform_point(p1)
		
		var step = new Vector4((p1.x - p0.x) / 10, (p1.y - p0.y) / 10, (p1.z - p0.z) / 10, 0);
		p1 = p0.clone()
		p1.add(step)
		
		for (var i = 0; i < 10; i++)
		{			
			this.ctx.beginPath();
			var alpha = 1 - (p0.z + p1.z) / 2 / 50
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
}