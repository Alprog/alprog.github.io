
class Color
{
    constructor(r, g, b)
    {
        this.r = r;
        this.g = g;
        this.b = b;
    }

    scale(k)
    {
        this.r *= k;
        this.g *= k;
        this.b *= k;
    }

	clone()
	{
		return new Color(this.r, this.g, this.b);
	}

    toHexString()
    {
        return "#" + toHex(this.r) + toHex(this.g) + toHex(this.b);
    }
}