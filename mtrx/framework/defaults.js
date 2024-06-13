
class Defaults
{
    constructor()
    {
        this.lang = "en";
        this.axes = "RUF";
        this.vector = "row";
        this.editW = "true";
        this.set("a", Matrix4x4.Identity());
        this.set("b", Matrix4x4.Identity());
    };

    set(key, value)
    {        
        this[key] = value.serialize ? value.serialize() : value;
    }
}