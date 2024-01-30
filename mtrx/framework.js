
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
	loadStyle("./style.css")

	loadScript("./vector4.js")
	loadScript("./matrix4x4.js")
	loadScript("./math.js")
	loadScript("./canvas.js")
	loadScript("./pin.js")
	loadScript("./diagram.js")

	const urlParams = new URLSearchParams(window.location.search);
	const script = urlParams.get('script')
	loadScript('./' + script)
}

