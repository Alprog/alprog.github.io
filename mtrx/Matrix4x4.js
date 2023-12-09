
class Matrix4x4
{
	constructor(right, up, forward, translation)
	{
		this[0] = right ?? Vector4.Right();
		this[1] = up ?? Vector4.Up();
		this[2] = forward ?? Vector4.Forward();
		this[3] = translation ?? Vector4.ZeroPoint();
	}
	
	get right() { return this[0] }
	get up() { return this[1] }
	get forward() { return this[2] }
	get translation() { return this[3] }
	
	set right(value) { this[0] = value }
	set up(value) { this[1] = value }
	set forward(value) { this[2] = value }
	set translation(value) { this[3] = value }
	
	static Identity = () => new Matrix4x4(
		new Vector4(1, 0, 0, 0),
		new Vector4(0, 1, 0, 0),
		new Vector4(0, 0, 1, 0),
		new Vector4(0, 0, 0, 1)
	)
	
	static Scaling = (s) => new Matrix4x4(
		new Vector4(s.x, 0, 0, 0),
		new Vector4(0, s.y, 0, 0),
		new Vector4(0, 0, s.z, 0),
		new Vector4(0, 0, 0, 1)
	)
	
	static RotationX_LHS = (a) => new Matrix4x4(
		new Vector4(1, 0, 0, 0),
		new Vector4(0, Math.cos(a), Math.sin(a), 0),
		new Vector4(0, -Math.sin(a), Math.cos(a), 0),
		new Vector4(0, 0, 0, 1)
	)
	
	static RotationX_RHS = (a) => new Matrix4x4(
		new Vector4(1, 0, 0, 0),
		new Vector4(0, Math.cos(a), -Math.sin(a), 0),
		new Vector4(0, Math.sin(a), Math.cos(a), 0),
		new Vector4(0, 0, 0, 1)
	)
	
	static RotationY_LHS = (a) => new Matrix4x4(
		new Vector4(Math.cos(a), 0, -Math.sin(a), 0),
		new Vector4(0, 1, 0, 0),
		new Vector4(Math.sin(a), 0, Math.cos(a), 0),
		new Vector4(0, 0, 0, 1)
	)

	static RotationY_RHS = (a) => new Matrix4x4(
		new Vector4(Math.cos(a), 0, Math.sin(a), 0),
		new Vector4(0, 1, 0, 0),
		new Vector4(-Math.sin(a), 0, Math.cos(a), 0),
		new Vector4(0, 0, 0, 1)
	)

	static RotationZ_LHS = (a) => new Matrix4x4(
		new Vector4(Math.cos(a), Math.sin(a), 0, 0),
		new Vector4(-Math.sin(a), Math.cos(a), 0, 0),
		new Vector4(0, 0, 1, 0),
		new Vector4(0, 0, 0, 1)
	)
	
	static RotationZ_RHS = (a) => new Matrix4x4(
		new Vector4(Math.cos(a), -Math.sin(a), 0, 0),
		new Vector4(Math.sin(a), Math.cos(a), 0, 0),
		new Vector4(0, 0, 1, 0),
		new Vector4(0, 0, 0, 1)
	)
	
	static Translation = (t) => new Matrix4x4(
		new Vector4(1, 0, 0, 0),
		new Vector4(0, 1, 0, 0),
		new Vector4(0, 0, 1, 0),
		new Vector4(t.x, t.y, t.z, 1)
	)
	
	clone()
	{
		return new Matrix4x4(this[0], this[1], this[2], this[3]);
	}
	
	multiply(m)
	{
		this.right.multiply(m);
		this.up.multiply(m);
		this.forward.multiply(m);
		this.translation.multiply(m);
	}
		
	toString()
	{
		return this.right + "<br>" + this.up + "<br>" + this.forward + "<br>" + this.translation;
	}
}