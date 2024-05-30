
class The
{
    static get CoordinateSystem()
    {
        if (!this.coordinateSystem)
        {
            this.coordinateSystem = new CoordinateSystem();
        }
        return this.coordinateSystem;
    }

    static get Config()
    {
        if (!this.config)
        {
            this.config = new Config();
        }
        return this.config;
    }
}