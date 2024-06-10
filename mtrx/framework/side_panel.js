
class SidePanel
{
    constructor(diagram)
    {
        this.diagram = diagram;
        this.element = diagram.main_panel.createChildDiv("side_panel");
        this.createControlPanel();
        this.createMultiplicationGrid();
    }

    createControlPanel()
    {
        this.control_panel = this.element.createChildDiv("control_panel");
    }

    createMultiplicationGrid()
    {
        var is2D = The.CoordinateSystem.is2D();
        var major = The.Config.vector == 'column' ? "column_major" : "row_major";
        var dimenstions = is2D ? "grid3x3" : "grid4x4";
        
        var multiplication_grid = this.element.createChildDiv("multiplication_grid", major);

        var classes = `matrix_editor ${major} ${dimenstions}`;
        multiplication_grid.createChildDiv("info", classes);
        multiplication_grid.createChildDiv("b", classes);
        multiplication_grid.createChildDiv("a", classes);
        multiplication_grid.createChildDiv("result", classes);
    }

    createAnimatorButton()
    {
        var button = this.control_panel.createChild("button", "animator_button");
        button.innerHTML = "run";

        button.onclick = () =>
        {
            var animator = this.diagram.animator;
            animator.toggle();
            button.innerHTML = animator.isRunning ? "stop" : "run";
        }
    }
}