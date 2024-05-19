

var slides = document.getElementsByClassName("slide");
var currentSlide = slides[0];
currentSlide.style.display = "flex";

var slider = document.getElementById("slider");
slider.max = slides.length - 1;

var counter = document.getElementById("counter");

document.addEventListener("wheel", (e) => { onMouseWheel(e)});
slider.addEventListener("change", (e) => { onSliderChange()});

function onMouseWheel(e)
{
    var delta = e.deltaY > 0 ? 1 : -1;
    slider.value = Number(slider.value) + delta;
    onSliderChange();
}

function onSliderChange()
{
    currentSlide.style.display = "none";
    currentSlide = slides[slider.value];
    currentSlide.style.display = "flex";

    var diagram = currentSlide.querySelector('.diagram');
    if (diagram)
    {
        diagram.src += '';
    }

    refreshCounter();
}

function refreshCounter()
{
    var index = Number(slider.value) + 1;
    counter.innerText = index + " of " + slides.length; 
}

refreshCounter();