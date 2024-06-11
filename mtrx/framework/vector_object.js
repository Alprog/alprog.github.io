
class VectorObject extends Vector
{
    constructor(vector, gridName, disabled)
    {
        super(vector[0], vector[1], vector[2], vector[3]);
        this.children = [];
        if (!disabled)
        {
            this.addPins();
        }
        this.editor = new Editor(this, gridName, disabled);
    }

    addPins()
    {
        var on_changed = () => this.editor.refresh();
        this.children.push(new VectorPin(this, on_changed));
    }

    render(renderer)
    {
        var anchor = this.anchor ?? Vector.ZeroPoint();
        var width = 2;
        var tip_radius = 10;

        if (this.w == 0)
        {
            var endPoint = sum(anchor, this);
            renderer.drawLine(anchor, endPoint, "gray", width);

            renderer.drawArrow(Vector.ZeroPoint(), this, "black", width, tip_radius); 
        }
        else
        {
            renderer.drawLine(anchor, this, "black", width);    
        }

    }
}