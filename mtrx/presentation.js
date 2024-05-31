

var slides = [
    '<img src="slides/title.png" class="fullscreen"/>',
    '<img src="slides/intro_001.png" class="fullscreen"/>',
    '<img src="slides/intro_002.png" class="fullscreen"/>',
    '<img src="slides/intro_003.png" class="fullscreen"/>',
    '<img src="slides/intro_004.png" class="fullscreen"/>',
    '<img src="slides/intro_005.png" class="fullscreen"/>',
    '<img src="slides/intro_006.png" class="fullscreen"/>',
    '<img src="slides/intro_007.png" class="fullscreen"/>',
    '<img src="slides/intro_008.png" class="fullscreen"/>',
    '<img src="slides/mult_0.png"/>',
    '<img src="slides/mult_1.png"/>',
    '<img src="slides/mult_2.png"/>',
    '<img src="slides/mult_3.png"/>',
    '<img src="slides/mult_4.png"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=matrix.js"></iframe>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=model.js"></iframe>',
    '<img src="freya.webp"/>',
    '<iframe class="diagram" title="D1" src="reality.html"></iframe>',
    '<img src="slides/sheet_1.png"/>',
    '<img src="slides/sheet_2.png"/>',
    '<img src="slides/sheet_3.png"/>',
    '<img src="slides/sheet_4.png"/>',
    '<img src="slides/sheet_5.png"/>',
    '<img src="slides/sheet_6.png"/>',
    '<img src="slides/sheet_7.png"/>',
    '<img src="slides/sheet_8.png"/>',
    '<img src="slides/sheet_9.png"/>',
    '<img src="slides/sheet_10.png"/>',
    '<img src="slides/sheet_11.png"/>',
    '<img src="slides/sheet_12.png"/>',
    '<img src="slides/sheet_13.png"/>',
    '<img src="slides/sheet_14.png"/>',
    '<img src="slides/sheet_15.png"/>',
    '<img src="slides/sheet_16.png"/>',
    '<img src="slides/sheet_17.png"/>',
    '<img src="slides/sheet_18.png"/>',
    '<img src="slides/sheet_19.png"/>',
    '<img src="slides/sheet_20.png"/>',
    '<img src="slides/sheet_21.png"/>',
    '<img src="slides/sheet_22.png"/>',
    '<img src="slides/sheet_23.png"/>'
];

var currentSlide = 0;

var projector = document.getElementById("projector");
var slider = document.getElementById("slider");
slider.max = slides.length - 1;

var counter = document.getElementById("counter");

var refresh_button = document.getElementById("refresh_button");

document.addEventListener("wheel", (e) => { onMouseWheel(e)});
slider.addEventListener("change", () => { onSliderChange()});
refresh_button.addEventListener("mousedown", () => { onSliderChange()});

function onMouseWheel(e)
{
    var delta = e.deltaY > 0 ? 1 : -1;
    slider.value = Number(slider.value) + delta;
    onSliderChange();
}

function onSliderChange()
{
    projector.innerHTML = slides[slider.value];

    var index = Number(slider.value) + 1;
    counter.innerText = index + " of " + slides.length; 
} 

onSliderChange();