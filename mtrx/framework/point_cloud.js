
class PointCloud
{
    constructor( points, space, matrix_table )
    {
        this.points = points;
        this.space = space;
        this.matrix_table = matrix_table;
    }

    transformTo(space)
    {
        var matrix = this.matrix_table.getMatrix(this.space, space);
        for (const point of this.points)
        {
            point.multiply(matrix);
            point.homo_normalize();
        }
        this.space = space;
    }
}