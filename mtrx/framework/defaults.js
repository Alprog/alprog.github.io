
class Defaults
{
    constructor()
    {
        this.lang = "en";
        this.axes = "RUF";
        this.mult = "pre";
        this.set("m1", Matrix4x4.Identity());
        this.set("m2", Matrix4x4.Identity());
    }

    set(key, value)
    {
        this[key] = value.serialize ? value.serialize() : value;
    }
}