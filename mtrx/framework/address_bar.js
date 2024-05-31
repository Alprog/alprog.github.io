
class AddressBar
{
    constructor()
    {
        this.params = {};

        var url_search_params = new URLSearchParams(window.location.search);
        for (let [key, value] of url_search_params)
        {
            this.params[key] = value;
        }    
    }

    force_param(key, value)
    {
        this.params[key] = value;
        this.update_url();
    }

    sync_with_config()
    {
        var changed = false;
        for (var key in The.Config)
        {
            var value = The.Config[key];
            value = value.serialize ? value.serialize() : value;
            if (!this.params[key] && value == The.Defaults[key])
            {
                continue;
            }            
            
            if (this.params[key] != value)
            {
                this.params[key] = value;
                changed = true;
            }
        }
        if (changed)
        {
            this.update_url();
        }
    }

    update_url()
    {
        var url = "diagram.html";
        var delimiter = "?";
        for (const key in this.params)
        {
            url += delimiter + key + "=" + this.params[key];
            delimiter = "&";    
        }
        if (url != this.url)
        {
            window.history.replaceState(null, "Title", url);
            this.url = url;
        }
    }
}