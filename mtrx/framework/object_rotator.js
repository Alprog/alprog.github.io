
class ObjectRotator
{
	constructor(object)
	{
		this.object = object;
	}

	hover()
	{
		return true;
	}

	drag(mouse_args)
	{
		var matrix = this.object.transform ?? Matrix4x4.Identity();

		var x = mouse_args.delta.x * 2;
		var y = mouse_args.delta.y * 2;
		
		var isLHS = The.CoordinateSystem.isLHS();
		
		var axisA = isLHS ? The.CoordinateSystem.Down : The.CoordinateSystem.Up;
		var axisB = isLHS ? The.CoordinateSystem.Right : The.CoordinateSystem.Left;

		matrix = mult(matrix, Matrix4x4.Rotation(axisA, x));
		matrix = mult(matrix, Matrix4x4.Rotation(axisB, y));

		this.object.transform = matrix;
	}

	render(renderer)
	{
	}
}
