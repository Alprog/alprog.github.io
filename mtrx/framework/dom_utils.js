
var append_stack = [];
var elements = {};

function dom_flush()
{
    for (var i = append_stack.length - 1; i >= 0; i--)
    {
        var pair = append_stack[i];
        pair.parent.appendChild(pair.child);
    }
    append_stack = [];
}

function createElement(tag, id, classes, parent)
{
    var element = document.createElement(tag);
    add_children_helpers(element);
    if (id)
    {
        element.id = id;
        elements[id] = element;
    }
    if (classes)
    {
        element.setAttribute("class", classes);
    }
    append_stack.push({parent: parent, child: element});
    return element;
}

function createChild(tag, id, classes)
{
    return createElement(tag, id, classes, this);
}

function createChildDiv(id, classes)
{
    return createElement('div', id, classes, this);
}

function createChildInput(id, classes)
{
    return createElement('input', id, classes, this);
}

function add_children_helpers(element)
{
    element.createChild = createChild;
    element.createChildDiv = createChildDiv;
    element.createChildInput = createChildInput;
}

function get_by_id(id)
{
    var result = elements[id] ?? document.getElementById(id);
    if (!result.createChild)
    {
        add_children_helpers(result);
    }
    return result;
}

add_children_helpers(document.body);