
class Canvas
{
	constructor(name)
	{
		var element = document.getElementById(name ?? "canvas");
		this.size = { x: element.width, y: element.height }
		this.ctx = element.getContext("2d");
		
		this.worldToScreenMtrx = Matrix4x4.Identity();

    this.scale = 1.3
		this.color = "black"
    this.width = 1
    this.mouse = Vector4.ZeroPoint()
  }

  zoom(value)
  {
    this.scale = this.scale * value
  }
	
	set_camera(a, b, c)
	{
		var mtrx = Matrix4x4.Identity();
		
		var scale = this.scale;
		var scaling = Matrix4x4.Scaling({x:scale, y:scale, z: scale});
		
    var lookAt = new Vector4(75, 75, 75, 1);
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
    this.ctx.clearRect(0, 0, this.size.x, this.size.y);
    this.ctx.beginPath();
    this.ctx.fillStyle = "#eeeeee";
    this.ctx.fillRect(0, 0, this.size.x, this.size.y);
  }

	transform_point(p)
	{
		var result = new Vector4(p.x, p.y, p.z, 1);
		result.multiply(this.worldToScreenMtrx);
		return result;
	}

  circle(center, radius, color, width)
  {
    this.ctx.beginPath();

    var alpha = 1 - center.z / 2 / 100
    this.ctx.globalAlpha = Math.max(Math.min(alpha, 1), 0);
    
    this.ctx.arc(center.x, center.y, radius, 0, 2 * Math.PI);
    this.ctx.strokeStyle = color ?? this.color
    this.ctx.lineWidth = width ?? this.width;
    this.ctx.stroke();
  }

	line(p0, p1, color, width)
	{
		p0 = this.transform_point(p0)
		p1 = this.transform_point(p1)
		
		var segments = 20
		
		var step = new Vector4((p1.x - p0.x) / segments, (p1.y - p0.y) / segments, (p1.z - p0.z) / segments, 0);
		p1 = p0.clone()
		p1.add(step)
		
		for (var i = 0; i < segments; i++)
		{			
			this.ctx.beginPath();
			var alpha = 1 - (p0.z + p1.z) / 2 / 100
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
