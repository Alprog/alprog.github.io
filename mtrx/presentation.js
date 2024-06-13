

var slides = [
    // ------------ Intro
    
    '<img src="slides/intro-0.png" class="img_fullscreen"/>',
    '<img src="slides/intro-1.png" class="img_fullscreen"/>',
    '<img src="slides/intro-2.png" class="img_fullscreen"/>',
    '<img src="slides/intro-3.png" class="img_fullscreen"/>',
    '<img src="slides/intro-4.png" class="img_fullscreen"/>',
    '<img src="slides/intro-5.png" class="img_fullscreen"/>',
    '<img src="slides/intro-6.png" class="img_fullscreen"/>',
    '<img src="slides/intro-7.png" class="img_fullscreen"/>',
    '<img src="slides/intro-8.png" class="img_fullscreen"/>',
    '<img src="slides/intro-9.png" class="img_fullscreen"/>',
    '<img src="slides/intro-10.png" class="img_fullscreen"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=promo.js"></iframe>',
    
    // ------------ Basic

    '<iframe class="diagram" title="D1" src="diagram.html?script=world.js"></iframe>',
    '<img src="slides/conventions-slides.png" class="img_fullscreen"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=vector.js&editW=false"></iframe>',
    '<img src="slides/homogeneous.png" class="img_sheet"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=vector.js&editW=true"></iframe>',
    '<img src="slides/anatomy.png" class="img_sheet"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=anatomy.js"></iframe>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=matrix.js"></iframe>',

    // ------------ Multiplication

    '<img src="slides/multiplication.png" class="img_sheet"/>',
    '<img src="slides/mult_0.png" class="img_mult"/>',
    '<img src="slides/mult_1.png" class="img_mult"/>',
    '<img src="slides/mult_2.png" class="img_mult"/>',
    '<img src="slides/mult_3.png" class="img_mult"/>',
    '<img src="slides/mult_4.png" class="img_mult"/>',
    '<img src="slides/mult_5.png" class="img_mult"/>',

    '<img src="slides/sheet_1.png" class="img_sheet"/>',
    '<img src="slides/sheet_2.png" class="img_sheet"/>',
    '<img src="slides/sheet_3.png" class="img_sheet"/>',
    '<img src="slides/sheet_4.png" class="img_sheet"/>',
    '<img src="slides/sheet_5.png" class="img_sheet"/>',
    '<img src="slides/sheet_6.png" class="img_sheet"/>',
    '<img src="slides/sheet_7.png" class="img_sheet"/>',
    '<img src="slides/sheet_8.png" class="img_sheet"/>',
    '<img src="slides/sheet_9.png" class="img_sheet"/>',
    '<img src="slides/sheet_10.png" class="img_sheet"/>',
    '<img src="slides/sheet_11.png" class="img_sheet"/>',
    '<img src="slides/sheet_12.png" class="img_sheet"/>',
    '<img src="slides/sheet_13.png" class="img_sheet"/>',
    '<img src="slides/sheet_14.png" class="img_sheet"/>',
    '<img src="slides/sheet_15.png" class="img_sheet"/>',
    '<img src="slides/sheet_16.png" class="img_sheet"/>',
    '<img src="slides/sheet_17.png" class="img_sheet"/>',
    '<img src="slides/sheet_18.png" class="img_sheet"/>',
    '<img src="slides/sheet_19.png" class="img_sheet"/>',
    
    '<iframe class="diagram" title="D1" src="diagram.html?script=point_mult.js"></iframe>',

    '<img src="slides/sheet_20.png" class="img_sheet"/>',

    '<iframe class="diagram" title="D1" src="diagram.html?script=direction_mult.js"></iframe>',

    '<img src="slides/sheet_21.png" class="img_sheet"/>',
    '<img src="slides/sheet_22.png" class="img_sheet"/>',
    '<img src="slides/sheet_23.png" class="img_sheet"/>',

    '<img src="slides/sheet_24.png" class="img_sheet"/>',
    '<img src="slides/sheet_25.png" class="img_sheet"/>',
    '<img src="slides/sheet_26.png" class="img_sheet"/>',

    '<iframe class="diagram" title="D1" src="diagram.html?script=matrix_mult.js"></iframe>',

     // ------------ Perspective
    '<img src="slides/perspective.png" class="img_sheet"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=perspective.js"></iframe>',

    '<img src="slides/sheet_27.png" class="img_sheet"/>',
    '<img src="slides/sheet_28.png" class="img_sheet"/>',

    '<img src="slides/perspective2.png" class="img_sheet"/>',

    '<img src="slides/associative-0.png" class="img_sheet"/>',
    '<img src="slides/associative-1.png" class="img_sheet"/>',
    '<img src="slides/associative-2.png" class="img_sheet"/>',
    '<img src="slides/associative-3.png" class="img_sheet"/>',
    '<img src="slides/associative-4.png" class="img_sheet"/>',
    '<img src="slides/associative-5.png" class="img_sheet"/>',
    

    '<img src="slides/next.png" class="img_sheet"/>',
];

this.params = {};
var url_search_params = new URLSearchParams(window.location.search);
for (let [key, value] of url_search_params)
{
    this.params[key] = value;
}    

if (params.slides == "conventions")
{
    slides = [
        '<img src="slides/conventions/conventions-0.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-1.png" class="img_fullscreen"/>',
    
        '<img src="slides/conventions/freya.webp"/>',
        '<iframe class="diagram" title="D1" src="diagram.html?script=model.js"></iframe>',
        '<iframe class="diagram" title="D1" src="reality.html"></iframe>',
    
        '<img src="slides/conventions/conventions-2.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-3.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-4.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-5.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-6.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-7.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-8.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-9.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-10.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-11.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-12.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-13.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-14.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-15.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-16.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-17.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-18.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-19.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-20.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-21.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-22.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-23.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-24.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-25.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-26.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-27.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-28.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-29.png" class="img_fullscreen"/>',
        '<img src="slides/conventions/conventions-30.png" class="img_fullscreen"/>'
    ];
}

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
    var html = slides[slider.value];

    var startIndex = html.indexOf('?');
    if ( startIndex >= 0 )
    {
        var endIndex = html.indexOf('"', startIndex);

        var params = html.substring(startIndex, endIndex);
        params = overwriteConventionParameters(params);
        html = html.substring(0, startIndex) + params + html.substring(endIndex);
    }
    
    projector.innerHTML = html;

    var index = Number(slider.value) + 1;
    counter.innerText = index + " of " + slides.length;
} 

onSliderChange();