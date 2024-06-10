
var diagram = new Diagram();

diagram.addGrid(true);
diagram.addObject(new CameraController(diagram.camera, diagram.grid.center));


dom_flush(); 