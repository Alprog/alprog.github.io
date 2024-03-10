
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
        this.textedit.value = this.vector[this.index];
    }

    save()
    {
        this.vector[this.index] = Number(this.textedit.value);
    }
}

const is_post_multiplication = urlParams.get('mult') == 'post';

class Editor
{
    constructor(matrix_object)
    {
        var classes = "matrix_editor " + (is_post_multiplication ? "column_major" : "row_major");
        
        var editor = get_by_id("side_panel_content").createChildDiv(null, classes);

        this.fields = [];
        var components = "xyzw";
        for (var row = 0; row < 4; row++)
        {
            var field_class = "field_editor_" + components[row];
            var vector = matrix_object[row];
            for (var col = 0; col < 4; col++)
            {
                var field = editor.createChildInput(null, field_class);
                field.binding = new Binding(field, vector, col);
                field.binding.load();
                field.onchange = (e) => e.target.binding.save();
                this.fields.push(field);
            }
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