
class Label
{
    constructor(text, position, font)
    {
        this.text = text;
        this.position = position;
        this.font = font;
    }

    render(renderer)
    {
        renderer.drawText(this.text, this.position, this.font);
    }
}