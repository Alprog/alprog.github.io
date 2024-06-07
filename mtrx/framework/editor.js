
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
    constructor(matrix_object)
    {
        var major = The.Config.vector == 'column' ? "column_major" : "row_major";
        var dimenstions = The.CoordinateSystem.is2D() ? "2d" : "3d";
        var classes = `matrix_editor ${major} ${dimenstions}`;
        
        var editor = get_by_id("side_panel_content").createChildDiv(null, classes);
        var editor = get_by_id("side_panel_content").createChildDiv(null, classes);
        var editor = get_by_id("side_panel_content").createChildDiv(null, classes);
        var editor = get_by_id("side_panel_content").createChildDiv(null, classes);

        this.fields = [];
        var components = "xyzw";
        for (var row = 0; row < 4; row++)
        {
            var field_classes = "field_editor field_editor_" + components[row];
            var vector = matrix_object[row];
            for (var col = 0; col < 4; col++)
            {
                var field = editor.createChildInput(null, field_classes);
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