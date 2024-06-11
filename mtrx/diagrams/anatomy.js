


var diagram = new Diagram();
diagram.createSidePanel("single");
diagram.main_panel.createChildDiv("canvas_panel");

var matrix = new Matrix4x4(
    new Vector("Xx", "Xy", "Xz", 0),
    new Vector("Yx", "Yy", "Yz", 0),
    new Vector("Zx", "Zy", "Zz", 0),
    new Vector("Tx", "Ty", "Tz", 1)
);

new MatrixObject(matrix, "a");

dom_flush();