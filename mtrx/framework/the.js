
class The
{
    static get Defaults()
    {
        if (!this.defaults)
        {
            this.defaults = new Defaults();
        }
        return this.defaults;
    }

    static get Config()
    {
        if (!this.config)
        {
            this.config = new Config();
        }
        return this.config;
    }

    static get CoordinateSystem()
    {
        if (!this.coordinateSystem)
        {
            this.coordinateSystem = new CoordinateSystem();
        }
        return this.coordinateSystem;
    }

    static get AddressBar()
    {
        if (!this.addressBar)
        {
            this.addressBar = new AddressBar();
        }
        return this.addressBar;
    }
}