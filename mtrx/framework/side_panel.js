
class SidePanel
{
    constructor(diagram)
    {
        this.diagram = diagram;

        var main_panel = diagram.main_panel;
        var side_panel = main_panel.createChildDiv("side_panel");
            
        var control_panel = side_panel.createChildDiv("control_panel");
        {
            var button = control_panel.createChild("button", "animator_button");
            button.innerHTML = "animator";
        }


        var is2D = The.CoordinateSystem.is2D();
        var major = The.Config.vector == 'column' ? "column_major" : "row_major";
        var dimenstions = is2D ? "grid3x3" : "grid4x4";
        
        var multiplication_grid = side_panel.createChildDiv("multiplication_grid", major);

        var classes = `matrix_editor ${major} ${dimenstions}`;
        multiplication_grid.createChildDiv("info", classes);
        multiplication_grid.createChildDiv("b", classes);
        multiplication_grid.createChildDiv("a", classes);
        multiplication_grid.createChildDiv("result", classes);
    }
}