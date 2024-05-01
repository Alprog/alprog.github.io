
class Label
{
    constructor(text, position)
    {
        this.text = text;
        this.position = position;
    }

    render(renderer)
    {
        renderer.drawText(this.text, this.position);
    }
}