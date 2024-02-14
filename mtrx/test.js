

var selector = document.getElementById("selector");

selector.addEventListener("change", (e) => {

    var diagrams = document.getElementsByClassName("diagram");
    for (const diagram of diagrams)
    {
        var url = "diagram.html?script=diagram1.js";
        url += "&axes=" + selector.value;
        diagram.src = url;
    }
});