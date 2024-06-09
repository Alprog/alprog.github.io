
class MatrixObject extends Matrix4x4
{
    constructor(matrix, gridName, enabled)
    {
        enabled = enabled ?? true;

        super(matrix[0], matrix[1], matrix[2], matrix[3]);
        this.children = [];
        if (enabled)
        {
            this.addPins();
        }
        this.editor = new Editor(this, gridName, enabled);
    }

    addPins()
    {
        var on_changed = () => this.editor.refresh();

        // translation
        this.children.push(new Pin(
            () => this.translation,
            (v) => this.translation.set(v),
            on_changed
        ));

        this.children.push(new AxisPin(this.axisX, this.axisY, this.axisZ, this.translation, on_changed));
        this.children.push(new AxisPin(this.axisY, this.axisZ, this.axisX, this.translation, on_changed));
        
        if (The.CoordinateSystem.is3D())
        {
            this.children.push(new AxisPin(this.axisZ, this.axisX, this.axisY, this.translation, on_changed));
        }
    }

    render(renderer)
    {
        var origin = this.translation;
        var x = sum(origin, this[0]);
        var y = sum(origin, this[1]);
        var z = sum(origin, this[2]);
        
        var width = 2;
        renderer.drawLine(origin, x, "red", width);
        renderer.drawLine(origin, y, "green", width);
        if (The.CoordinateSystem.is3D())
        {
            renderer.drawLine(origin, z, "blue", width);
        }
        renderer.drawLine(Vector.ZeroPoint(), this.translation, "magenta", width);
   
        width = 0.5;
        var color = "black";
        var xy = sum(origin, this[0], this[1]);
        var yz = sum(origin, this[1], this[2]);
        var xz = sum(origin, this[0], this[2]);
        var xyz = sum(origin, this[0], this[1], this[2]);
        
        renderer.drawLine(x, xy, color, width);
        renderer.drawLine(y, xy, color, width);

        if (The.CoordinateSystem.is3D())
        {
            renderer.drawLine(y, yz, color, width);
            renderer.drawLine(z, yz, color, width);
            renderer.drawLine(x, xz, color, width);
            renderer.drawLine(z, xz, color, width);
            renderer.drawLine(xyz, xy, color, width);
            renderer.drawLine(xyz, yz, color, width);
            renderer.drawLine(xyz, xz, color, width);  
        }
       
    }
}