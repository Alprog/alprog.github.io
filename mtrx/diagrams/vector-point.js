
The.Defaults.set("a", new Vector(0.6, 0.4, 0, 1));

var diagram = new Diagram();

diagram.addGrid();
diagram.addObject(new CameraController(diagram.camera, diagram.grid.center));

diagram.createSidePanel("single");

The.Config.wrapToObject("a", diagram);

dom_flush(); 