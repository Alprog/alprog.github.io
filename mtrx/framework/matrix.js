
class Matrix3x3
{
	determinant()
	{
		var a = this[0][0];
		var b = this[0][1];
		var c = this[0][2];
		var d = this[1][0];
		var e = this[1][1];
		var f = this[1][2];
		var g = this[2][0];
		var h = this[2][1];
		var i = this[2][2];
		return a*e*i + b*f*g + c*d*h - c*e*g - b*d*i - a*f*h;
	}
}

class Matrix4x4
{
	constructor(axisX, axisY, axisZ, translation)
	{
		this[0] = axisX ?? Vector.DirectionX();
		this[1] = axisY ?? Vector.DirectionY();
		this[2] = axisZ ?? Vector.DirectionZ();
		this[3] = translation ?? Vector.ZeroPoint();
	}
	
	get axisX() { return this[0] }
	get axisY() { return this[1] }
	get axisZ() { return this[2] }
	get translation() { return this[3] }
	
	set axisX(value) { this[0] = value }
	set axisY(value) { this[1] = value }
	set axisZ(value) { this[2] = value }
	set translation(value) { this[3] = value }
	
	static Identity = () => new Matrix4x4(
		new Vector(1, 0, 0, 0),
		new Vector(0, 1, 0, 0),
		new Vector(0, 0, 1, 0),
		new Vector(0, 0, 0, 1)
	)
	
	static Scaling = (s) => new Matrix4x4(
		new Vector(s.x, 0, 0, 0),
		new Vector(0, s.y, 0, 0),
		new Vector(0, 0, s.z, 0),
		new Vector(0, 0, 0, 1)
	)
	
	static RotationX = (a) => new Matrix4x4(
		new Vector(1, 0, 0, 0),
		new Vector(0, Math.cos(a), Math.sin(a), 0),
		new Vector(0, -Math.sin(a), Math.cos(a), 0),
		new Vector(0, 0, 0, 1)
	)
	
	static RotationY = (a) => new Matrix4x4(
		new Vector(Math.cos(a), 0, -Math.sin(a), 0),
		new Vector(0, 1, 0, 0),
		new Vector(Math.sin(a), 0, Math.cos(a), 0),
		new Vector(0, 0, 0, 1)
	)

	static RotationZ = (a) => new Matrix4x4(
		new Vector(Math.cos(a), Math.sin(a), 0, 0),
		new Vector(-Math.sin(a), Math.cos(a), 0, 0),
		new Vector(0, 0, 1, 0),
		new Vector(0, 0, 0, 1)
	)

	static Rotation(direction, a)
	{
		a *= direction.axisSign;
		var funcName = "Rotation" + direction.axisName;
			return Matrix4x4[funcName](a); 
	}

	static Translation = (t) => new Matrix4x4(
		new Vector(1, 0, 0, 0),
		new Vector(0, 1, 0, 0),
		new Vector(0, 0, 1, 0),
		new Vector(t.x, t.y, t.z, 1)
	)

	set(m)
	{
		this.axisX.set(m.axisX);
		this.axisY.set(m.axisY);
		this.axisZ.set(m.axisZ);
		this.translation.set(m.translation);
	}

	set_column(index, vector)
	{
		this[0][index] = vector[0];
		this[1][index] = vector[1];
		this[2][index] = vector[2];
		this[3][index] = vector[3];
	}
	
	clone()
	{
		return new Matrix4x4(
			this[0].clone(),
			this[1].clone(),
			this[2].clone(),
			this[3].clone()
		);
	}
	
	multiply(m)
	{
    	this.axisX.multiply(m);
		this.axisY.multiply(m);
		this.axisZ.multiply(m);
		this.translation.multiply(m);
	}

	premultiply(m)
	{
		var m = mult(m, this);
		this[0] = m[0];
		this[1] = m[1];
		this[2] = m[2];
		this[3] = m[3];
	}
		
	toString()
	{
		return this.axisX + "<br>" + this.axisY + "<br>" + this.axisZ + "<br>" + this.translation;
	}

	scale(k)
	{
		for (var row = 0; row < 4; row++)
		{
			this[row].scale(k, true);
		}
	}

	transpose()
	{
		var old = this.clone();
		for (var row = 0; row < 4; row++)
		{
			for (var col = 0; col < 4; col++)
			{
				this[row][col] = old[col][row];
			}
		}
	}

	get_inverse()
	{
		var mtrx = this.get_adjugate();
		var det = 0;
		for (var i = 0; i < 4; i++)
		{
			det += this[0][i] * mtrx[i][0];
		}
		mtrx.scale(1 / det);
		return mtrx;
	}

	get_adjugate()
	{
		var adj = new Matrix4x4();
		for (var row = 0; row < 4; row++)
		{
			for (var col = 0; col < 4; col++)
			{
				var det = this.get_minor_matrix(row, col).determinant();
				var sign = (row + col) % 2 ? -1 : 1;
				adj[col][row] = det * sign;
			}
		}
		return adj;
	}

	get_minor_matrix(except_row, except_col)
	{
		var minor_mtrx = new Matrix3x3();
		var index = 0;
		for (var row = 0; row < 4; row++)
		{
			if (row != except_row)
			{
				minor_mtrx[index++] = this[row].without_column(except_col);
			}
		}
		return minor_mtrx;
	}

	equals(m)
	{
		for (var row = 0; row < 4; row++)
		{
			if (!this[row].equals(m[row]))
			{
				return false;
			}
		}

		return true;
	}

	serialize()
	{
		return this.axisX.serialize() + "," + this.axisY.serialize() + "," +
		       this.axisZ.serialize() + "," + this.translation.serialize();
	}
}
