
class SidePanel
{
    constructor(diagram, layout)
    {
        this.diagram = diagram;
        this.element = diagram.main_panel.createChildDiv("side_panel");

        this.createGrid(layout == "single");
    }

    getControlPanel()
    {
        if (!this.control_panel)
        {
            this.control_panel = this.element.createChildDiv("control_panel");
        }
        return this.control_panel;
    }

    createGrid(single)
    {
        var is2D = The.CoordinateSystem.is2D();
        var major = The.Config.vector == 'column' ? "column_major" : "row_major";
        var dimenstions = is2D ? "grid3x3" : "grid4x4";
        var classes = `matrix_editor ${major} ${dimenstions}`;

        if (single)
        {
            this.grid = this.element.createChildDiv("single_grid", major);
            this.grid.createChildDiv("a", classes);    
        }
        else
        {
            this.grid = this.element.createChildDiv("multiplication_grid", major);
            this.grid.createChildDiv("info", classes);
            this.grid.createChildDiv("b", classes);
            this.grid.createChildDiv("a", classes);
            this.grid.createChildDiv("result", classes);
        }
    }

    createAnimatorButton(callback)
    {
        var button = this.getControlPanel().createChild("button", "animator_button");
        button.innerHTML = "toggle animation";
        button.onclick = callback;
    }

    createWSlider(vector)
    {
        var slider = this.getControlPanel().createChildInput("w_slider");
        slider.type = "range";
        slider.value = 0;
        slider.min = -1;
        slider.max = 0.9;
        slider.step = 0.01;

        var field = vector.fields[3];
        var max = 10;

        slider.oninput = () => {
            var k = Number(slider.value);
            var value = k < 0 ? (k + 1) : (1 + k * max);
            vector.w = Number(value);
            field.binding.load();
        };
    
        field.oninput = (e) => {
            e.target.binding.save();

            var k = vector.w;
            var value = k < 1 ? (k - 1) : ( k - 1 ) / max;
            slider.value = value;
        };
    }

    createResultCheckBox(callback)
    {
        var label = this.getControlPanel().createChild("label");       
        label.style.width = "150px";

        var switcher = label.createChildInput();
        switcher.type = "checkbox";

        var a = label.createChild("a");
        a.innerHTML = "Show&nbspresult";

        switcher.onchange = (e) => {
            callback(switcher.checked)
        };

        switcher.set = (value) => {
            switcher.checked = value;
            callback(value);
        };
        
        return switcher;
    }
}