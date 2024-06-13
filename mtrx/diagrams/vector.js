
The.Defaults.set("a", new Vector(0.6, 0.4, 0, 1));

var diagram = new Diagram();

diagram.addGrid();
diagram.addObject(new CameraController(diagram.camera, diagram.grid.center));

diagram.createSidePanel("single");

if (The.Config.vector == "column")
{
    diagram.sidePanel.grid.style.margin = "0 30%";
}

The.Config.wrapToObject("a", diagram);

if (The.Config.editW == "true")
{
    diagram.sidePanel.createWSlider(The.Config.a);
}

dom_flush(); 