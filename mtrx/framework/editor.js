
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

class Editor
{
    constructor(matrix_object)
    {
        var editor = document.createElement('div');
        editor.setAttribute("class", "matrix_editor");

        this.fields = [];
        var components = "xyzw";
        for (var row = 0; row < 4; row++)
        {
            var field_class = "field_editor_" + components[row];
            var vector = matrix_object[row];
            for (var col = 0; col < 4; col++)
            {
                var field = document.createElement('input');
                field.setAttribute("class", field_class);
                field.binding = new Binding(field, vector, col);
                field.binding.load();
                field.onchange = (e) => e.target.binding.save();
                editor.appendChild(field);
                this.fields.push(field);
            }
        }

		document.getElementById("side_panel").appendChild(editor);
    }

    refresh()
    {
        for (var field of this.fields)
        {
            field.binding.load();
        }
    }    
}