
var v = new Vector4(1, 2, 3, 1);

var m = Matrix4x4.RotationZ_LHS(Math.PI/2);
v.multiply(m);

document.getElementById("output").innerHTML = v.toString();


function draw() 
{
	var canvas = new Canvas();
	canvas.clear();
	canvas.line({x:0,y:0}, {x:100,y:100});
}
draw();