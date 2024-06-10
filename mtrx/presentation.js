

var slides = [
    '<img src="slides/slide-0.png" class="img_fullscreen"/>',
    '<img src="slides/slide-1.png" class="img_fullscreen"/>',
    '<img src="slides/slide-2.png" class="img_fullscreen"/>',
    '<img src="slides/slide-3.png" class="img_fullscreen"/>',
    '<img src="slides/slide-4.png" class="img_fullscreen"/>',
    '<img src="slides/slide-5.png" class="img_fullscreen"/>',
    '<img src="slides/slide-6.png" class="img_fullscreen"/>',
    '<img src="slides/slide-7.png" class="img_fullscreen"/>',
    '<img src="slides/slide-8.png" class="img_fullscreen"/>',
    '<img src="slides/slide-9.png" class="img_fullscreen"/>',

    '<iframe class="diagram" title="D1" src="diagram.html?script=promo.js"></iframe>',
    
    '<img src="slides/slide-10.png" class="img_fullscreen"/>',
    '<img src="slides/slide-11.png" class="img_fullscreen"/>',

    '<img src="slides/mult_0.png" class="img_mult"/>',
    '<img src="slides/mult_1.png" class="img_mult"/>',
    '<img src="slides/mult_2.png" class="img_mult"/>',
    '<img src="slides/mult_3.png" class="img_mult"/>',
    '<img src="slides/mult_4.png" class="img_mult"/>',


    '<img src="slides/slide-12.png" class="img_fullscreen"/>',
    '<img src="slides/slide-13.png" class="img_fullscreen"/>',
    '<img src="slides/slide-14.png" class="img_fullscreen"/>',

    '<img src="freya.webp"/>',
    '<iframe class="diagram" title="D1" src="diagram.html?script=model.js"></iframe>',
    '<iframe class="diagram" title="D1" src="reality.html"></iframe>',


    '<img src="slides/slide-15.png" class="img_fullscreen"/>',
    '<img src="slides/slide-16.png" class="img_fullscreen"/>',
    '<img src="slides/slide-17.png" class="img_fullscreen"/>',
    '<img src="slides/slide-18.png" class="img_fullscreen"/>',
    '<img src="slides/slide-19.png" class="img_fullscreen"/>',
    '<img src="slides/slide-20.png" class="img_fullscreen"/>',
    '<img src="slides/slide-21.png" class="img_fullscreen"/>',
    '<img src="slides/slide-22.png" class="img_fullscreen"/>',
    '<img src="slides/slide-23.png" class="img_fullscreen"/>',
    '<img src="slides/slide-24.png" class="img_fullscreen"/>',
    '<img src="slides/slide-25.png" class="img_fullscreen"/>',
    '<img src="slides/slide-26.png" class="img_fullscreen"/>',
    '<img src="slides/slide-27.png" class="img_fullscreen"/>',
    '<img src="slides/slide-28.png" class="img_fullscreen"/>',
    '<img src="slides/slide-29.png" class="img_fullscreen"/>',
    '<img src="slides/slide-30.png" class="img_fullscreen"/>',
    '<img src="slides/slide-31.png" class="img_fullscreen"/>',
    '<img src="slides/slide-32.png" class="img_fullscreen"/>',
    '<img src="slides/slide-33.png" class="img_fullscreen"/>',
    '<img src="slides/slide-34.png" class="img_fullscreen"/>',
    '<img src="slides/slide-35.png" class="img_fullscreen"/>',
    '<img src="slides/slide-36.png" class="img_fullscreen"/>',
    '<img src="slides/slide-37.png" class="img_fullscreen"/>',
    '<img src="slides/slide-38.png" class="img_fullscreen"/>',
    '<img src="slides/slide-39.png" class="img_fullscreen"/>',
    '<img src="slides/slide-40.png" class="img_fullscreen"/>',
    '<img src="slides/slide-41.png" class="img_fullscreen"/>',
    '<img src="slides/slide-42.png" class="img_fullscreen"/>',
    '<img src="slides/slide-43.png" class="img_fullscreen"/>',
    '<img src="slides/slide-44.png" class="img_fullscreen"/>',
    '<img src="slides/slide-45.png" class="img_fullscreen"/>',
    
    '<iframe class="diagram" title="D1" src="diagram.html?script=matrix.js"></iframe>',

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

    '<iframe class="diagram" title="D1" src="diagram.html?script=matrix_mult.js"></iframe>',

    '<img src="slides/slide-46.png" class="img_fullscreen"/>',
    '<img src="slides/slide-47.png" class="img_fullscreen"/>',
    '<img src="slides/slide-48.png" class="img_fullscreen"/>',
    '<img src="slides/slide-49.png" class="img_fullscreen"/>',
    '<img src="slides/slide-50.png" class="img_fullscreen"/>',
    '<img src="slides/slide-51.png" class="img_fullscreen"/>',
    '<img src="slides/slide-52.png" class="img_fullscreen"/>',
    '<img src="slides/slide-53.png" class="img_fullscreen"/>',
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