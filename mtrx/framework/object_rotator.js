
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
        matrix = mult(matrix, Matrix4x4.RotationY_LHS(-x));
        matrix = mult(matrix, Matrix4x4.RotationX_LHS(y));

        this.object.transform = matrix;
	}

	render(renderer)
	{
	}
}