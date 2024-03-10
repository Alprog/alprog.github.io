
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

function getBestElement(array, functor)
{
    var best_element = null;
    var best_value = 0;
    for (var element of array)
    {
        var value = functor(element);
        if (value > best_value)
        {
            best_value = value;
            best_element = element;
        }
    }
    return best_element;
}