
class Binding
{
    constructor(textedit, vector, index)
    {
        this.textedit = textedit;
        this.vector = vector;
        this.index = index;
    }

    load()
    {
        var text = this.vector[this.index].toString();
        if (text.length > 5)
        {
            text = text.substring(0, 5);
        }
        if (this.textedit.value != text)
        {
            this.textedit.value = text;
            this.ajust_size();    
        }
    }

    save()
    {
        this.vector[this.index] = Number(this.textedit.value);
        this.ajust_size();
    }

    ajust_size()
    {
        var font_aspect = 7 / 4; 
        var char_count = max(this.textedit.value.length, 4);

        var size = this.textedit.offsetWidth * font_aspect / char_count;
        if (size == 0)
        {
            return;
        }
        this.textedit.style.fontSize = size + "px";
    }
}

var editors = [];

class Editor
{
    constructor(object, gridName, disabled)
    {
        var grid = get_by_id(gridName);

        this.fields = [];
       
        if (object instanceof Matrix4x4)
        {
            var components = [ "XXXx", "YYYy", "ZZZz", "WWWw" ];
            for (var majorIndex of this.getIndicies())
            {
                this.createRow(grid, object[majorIndex], components[majorIndex]);
            }
        }
        else if (object instanceof Vector)
        {
            this.createRow(grid, object, "XYZW");
        }

        if (disabled)
        {
            for (var field of this.fields)
            {
                field.disabled = true;
            }
        }

        editors.push(this);
    }

    createRow(grid, vector, components)
    {
        for (var minorIndex of this.getIndicies())
        {
            var component = components[minorIndex];
            var lowerCaseComponent = component.toLowerCase();
            var field_classes = "field_editor field_editor_" + lowerCaseComponent;
            var field = grid.createChildInput(null, field_classes);
            field.binding = new Binding(field, vector, minorIndex);
            field.binding.load();
            field.onchange = (e) => e.target.binding.save();
            if (component == lowerCaseComponent)
            {
                field.disabled = true;
            }
            this.fields.push(field);
        }
    }

    ajust_size()
    {
        for (var field of this.fields)
        {
            field.binding.ajust_size();
        }
    }

    refresh()
    {
        for (var field of this.fields)
        {
            field.binding.load();
        }
    } 
    
    getIndicies()
    {
        if (The.CoordinateSystem.is2D())
        {
            return [0, 1, /* 2, */ 3];
        }
        else
        {
            return [0, 1, 2, 3];
        }
    }
}