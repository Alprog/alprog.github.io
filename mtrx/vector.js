
class Vector
{	
	constructor(x, y, z, w)
	{
		this.x = x ?? 0;
		this.y = y ?? 0;
		this.z = z ?? 0;
		this.w = w ?? 1;
	}

	get x() { return this[0] }
	get y() { return this[1] }
	get z() { return this[2] }
	get w() { return this[3] }

	set x(value) { this[0] = value }
	set y(value) { this[1] = value }
	set z(value) { this[2] = value }
	set w(value) { this[3] = value }

	static Zero = () => new Vector(0, 0, 0, 0)
	static One = () => new Vector(1, 1, 1, 1)

	static Right = () => new Vector(1, 0, 0, 0)
	static Up = () => new Vector(0, 1, 0, 0)
	static Forward = () => new Vector(0, 0, 1, 0)
	static ZeroPoint = () => new Vector(0, 0, 0, 1)

    get_length()
    {
		return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
    }

    get_length2D()
    {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

	clone()
	{
		return new Vector(this.x, this.y, this.z, this.w);
	}

	without_column(index)
	{
		switch(index)
		{
			case 0:
				return [/*-x-*/ this.y, this.z, this.w];
			case 1:
				return [this.x, /*-y-*/ this.z, this.w];
			case 2:
				return [this.x, this.y, /*-z-*/ this.w];
			case 3:
				return [this.x, this.y, this.z /*-w-*/];
		}
	}
	
	set(v)
	{
		this.x = v.x;
		this.y = v.y;
		this.z = v.z;
		this.w = v.w;
	}
	
	add(v)
	{
		this.x += v.x;
		this.y += v.y;
		this.z += v.z;
    }

    sub(v)
    {
		this.x -= v.x;
		this.y -= v.y;
		this.z -= v.z;
    }
	
    scale(k, scale_w)
    {
	    this.x *= k;
	    this.y *= k;
	    this.z *= k;
		if (scale_w)
		{
			this.w *= k;
		}
    }
		
	normalize()
	{
		var length = this.get_length();
		this.x /= length;
	    this.y /= length;
	    this.z /= length;
	}

	homo_normalize()
	{
		this.x /= this.w;
		this.y /= this.w;
		this.z /= this.w;
		this.w /= this.w;
	}

    negate()
    {
	    this.scale(-1);
    }
	
    get_scaled(k)
    {
	    var result = this.clone();
	    result.scale(k);
	    return result;
    }
	
	multiply(m)
	{
		var v = this.clone();
		this[0] = v.x * m.right[0] + v.y * m.up[0] + v.z * m.forward[0] + v.w * m.translation[0];
		this[1] = v.x * m.right[1] + v.y * m.up[1] + v.z * m.forward[1] + v.w * m.translation[1];
		this[2] = v.x * m.right[2] + v.y * m.up[2] + v.z * m.forward[2] + v.w * m.translation[2];
		this[3] = v.x * m.right[3] + v.y * m.up[3] + v.z * m.forward[3] + v.w * m.translation[3];
	}

	toString()
	{
		return this.x + ", " + this.y + ", " + this.z + ", " + this.w;
	}
}
