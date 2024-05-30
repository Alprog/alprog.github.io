
class Config
{
    constructor()
    {
        this.defaults = {
            lang: "en",
            axis: "RUF",
            mult: "pre"
        };

        this.params = {};
        this.current = {};

        var url_params = new URLSearchParams(window.location.search);
        for (let [key, value] of url_params)
        {
            this.params[key] = value;
            this.current[key] = value;
        }

        this.update();
    }

    get(key)
    {
        return this.current[key] ?? this.defaults[key];
    }

    set_default(key, value)
    {
        this.defaults[key] = value;
    }

    force_default(key, value)
    {
        this.defaults[key] = value;
        this.current[key] = value;
    }

    update()
    {
        var url = "diagram.html";
        var delimiter = "?";
        for (const key in this.current)
        {
            var value = this.current[key];
            if (value)
            {
                if (value != this.defaults[key] || this.params[key])
                {
                    url += delimiter + key + "=" + value;
                    delimiter = "&";    
                }
            }
        }
        if (url != this.url)
        {
            window.history.replaceState(null, "Title", url);
            this.url = url;
        }
    }

}