
function loadScript(path)
{
	var script = document.createElement('script');
	script.src = path;
	document.head.appendChild(script); 
}

function loadStyle(path)
{
	var style = document.createElement('link');
	style.rel = "stylesheet";
	style.href = path;
	document.head.appendChild(style); 
}

document.body.onload = function()
{
	loadStyle("https://alprog.github.io/mtrx/style.css")

	loadScript("https://alprog.github.io/mtrx/vector4.js")
	loadScript("https://alprog.github.io/mtrx/matrix4x4.js")
	loadScript("https://alprog.github.io/mtrx/math.js")
	loadScript("https://alprog.github.io/mtrx/canvas.js")
	loadScript("https://alprog.github.io/mtrx/pin.js")
	loadScript("https://alprog.github.io/mtrx/diagram.js")

	const urlParams = new URLSearchParams(window.location.search);
	const script = urlParams.get('script')
	loadScript('./' + script)
}

