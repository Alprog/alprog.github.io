
class VectorObject extends Vector
{
    constructor(vector, gridName, enabled)
    {
        enabled = enabled ?? true;

        super(vector[0], vector[1], vector[2], vector[3]);
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
        
        this.children.push(new Pin(
            () => this,
            (v) => this.set(v),
            on_changed
        ));
    }

    render(renderer)
    {
        var origin = Vector.ZeroPoint();
        var width = 2;
        renderer.drawLine(origin, this, "black", width);       
    }
}