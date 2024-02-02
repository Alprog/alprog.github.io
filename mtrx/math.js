
function sum(a, b, c, d)
{
	var result = a.clone();
	result.add(b);
	if (c) result.add(c);
	if (d) result.add(d);	
	return result;
}

function diff(a, b)
{
    var result = a.clone();
    result.sub(b);
    return result;
}

function mult(a, b, c, d)
{
    var result = a.clone();
    result.multiply(b);
    if (c) result.multiply(c);
    if (d) result.multiply(d);
    return result;
}

function mult_vm(v, m)
{
    var v0 = m[0].get_scaled(v[0]);
    var v1 = m[1].get_scaled(v[1]);
    var v2 = m[2].get_scaled(v[2]);
    var v3 = m[3].get_scaled(v[3]);
    return sum(v0, v1, v2, v3);
}

function cross(a, b)
{
    var z = a.x * b.y - a.y * b.x; // XY
    var x = a.y * b.z - a.z * b.y; // YZ
    var y = a.z * b.x - a.x * b.z; // ZX
    return Vector4.new(-x, -y, -z, 1); // LHS
}