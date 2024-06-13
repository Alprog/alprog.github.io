
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
            this.element.createChildDiv("a", classes);    
        }
        else
        {
            var multiplication_grid = this.element.createChildDiv("multiplication_grid", major);
            multiplication_grid.createChildDiv("info", classes);
            multiplication_grid.createChildDiv("b", classes);
            multiplication_grid.createChildDiv("a", classes);
            multiplication_grid.createChildDiv("result", classes);
        }
    }

    createAnimatorButton(animator)
    {
        var button = this.getControlPanel().createChild("button", "animator_button");
        button.innerHTML = "run";

        button.onclick = () =>
        {
            animator.toggle();
            button.innerHTML = animator.isRunning ? "stop" : "run";
        }
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
}