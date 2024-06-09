
class Config
{
    constructor()
    {
        for (var key in The.Defaults)
        {
            this[key] = The.Defaults[key];
        }

        for (var key in The.AddressBar.params)
        {
            this[key] = The.AddressBar.params[key];
        }

        for (var key in this)
        {
            if (key == "a" || key == "b")
            {
                this[key] = this.deserialize_matrix( this[key] );
                if (this.axes.length == 2)
                {
                    this[key].make2D();
                }
            }
        }
    }

    deserialize_matrix(text)
    {
        var arr = text.split(',');
        for (var i = 0; i < arr.length; i++)
        {
            arr[i] = Number(arr[i]);
        }

        if (arr.length == 16)
        {
            return new Matrix4x4(
                new Vector( arr[0], arr[1], arr[2], arr[3]),
                new Vector( arr[4], arr[5], arr[6], arr[7]),
                new Vector( arr[8], arr[9], arr[10], arr[11]),
                new Vector( arr[12], arr[13], arr[14], arr[15]),
            );    
        }

        if (arr.length == 9)
        {
            return new Matrix4x4(
                new Vector( arr[0], arr[1], 0, arr[2]),
                new Vector( arr[3], arr[4], 0, arr[5]),
                new Vector( 0, 0, 0, 0),
                new Vector( arr[6], arr[7], 0, arr[9])
            );
        }

        if (arr.length == 4)
        {
            return new Vector( arr[0], arr[1], arr[2], arr[3]);
        }

        if (arr.length == 3)
        {
            return new Vector( arr[0], arr[1], 0, arr[2]);
        }

        return Matrix4x4.Identity();
    }

    wrapToObject(key, diagram, gridName)
    {
        if (this[key] instanceof Matrix4x4)
        {
            this[key] = new MatrixObject(this[key], gridName);
        }
        else if (this[key] instanceof Vector)
        {
            this[key] = new VectorObject(this[key], gridName);
        }
        diagram.addObject(this[key]);
    }
}