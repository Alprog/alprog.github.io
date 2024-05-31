
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
            if (key == "m1" || key == "m2")
            {
                this[key] = this.deserialize_matrix( this[key] );
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

        return new Matrix4x4(
            new Vector( arr[0], arr[1], arr[2], arr[3]),
            new Vector( arr[4], arr[5], arr[6], arr[7]),
            new Vector( arr[8], arr[9], arr[10], arr[11]),
            new Vector( arr[12], arr[13], arr[14], arr[15]),
        );
    }
}