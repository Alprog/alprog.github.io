
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
    constructor(matrix_object, gridName)
    {
        var is2D = The.CoordinateSystem.is2D();
        var grid = get_by_id(gridName);

        this.fields = [];
        var components = "xyzw";
        for (var row = 0; row < 4; row++)
        {
            var field_classes = "field_editor field_editor_" + components[row];
            var vector = matrix_object[row];
            for (var col = 0; col < 4; col++)
            {
                if (is2D && (row == 2 || col == 2))
                    continue;

                var field = grid.createChildInput(null, field_classes);
                field.binding = new Binding(field, vector, col);
                field.binding.load();
                field.onchange = (e) => e.target.binding.save();

                this.fields.push(field);
            }
        }

        editors.push(this);
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