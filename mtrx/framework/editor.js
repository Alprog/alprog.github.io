
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
    constructor(object, gridName, enabled)
    {
        var grid = get_by_id(gridName);

        this.fields = [];
       
        if (object instanceof Matrix4x4)
        {
            for (var rowIndex = 0; rowIndex < 4; rowIndex++)
            {
                this.createRow(grid, rowIndex, object[rowIndex]);
            }
        }
        else if (object instanceof Vector)
        {
            this.createRow(grid, rowIndex, object);
        }

        editors.push(this);
    }

    createRow(grid, rowIndex, vector)
    {
        var is2D = The.CoordinateSystem.is2D();
        var components = "xyzw";
        var field_classes = "field_editor field_editor_" + components[rowIndex];
        for (var colIndex = 0; colIndex < 4; colIndex++)
        {
            if (is2D && (rowIndex == 2 || colIndex == 2))
                continue;

            var field = grid.createChildInput(null, field_classes);
            field.binding = new Binding(field, vector, colIndex);
            field.binding.load();
            field.onchange = (e) => e.target.binding.save();

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
}