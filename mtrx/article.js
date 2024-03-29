

var axes_selector = document.getElementById("axes_selector");
var mult_selector = document.getElementById("mult_selector");

function onConventionChange(e)
{
    var diagrams = document.getElementsByClassName("diagram");
    for (const diagram of diagrams)
    {
        var url = "diagram.html?script=matrix.js";
        url += "&axes=" + axes_selector.value;
        url += "&mult=" + mult_selector.value;
        diagram.src = url;
    }
}

axes_selector.addEventListener("change", onConventionChange);
mult_selector.addEventListener("change", onConventionChange);