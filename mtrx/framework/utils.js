
function toHex(value)
{
    var value = clamp(value, 0, 1);
    value = Math.floor(value * 255);
    var text = value.toString(16);
    if (text.length == 1)
    {
        text = "0" + text;
    }    
    return text;
}

function rgb(r, g, b)
{
    return "#" + toHex(r) + toHex(g) + toHex(b);
}

function cloneElements(array)
{
    for (var i = 0; i < array.length; i++)
    {
        if (array[i] && array[i].clone)
        {
            array[i] = array[i].clone();
        }
    }
    return array;
}
