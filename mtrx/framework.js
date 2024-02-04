
function loadScript(path)
{
	var script = document.createElement('script');
	script.async = false;
	script.src = path;
	document.head.appendChild(script); 
}

function loadStyle(path)
{
	var style = document.createElement('link');
	style.async = false;
	style.rel = "stylesheet";
	style.href = path;
	document.head.appendChild(style); 
}

loadStyle("style.css")

loadScript("Vector.js")
loadScript("matrix.js")
loadScript("math.js")
loadScript("canvas.js")
loadScript("camera.js")
loadScript("renderer.js")
loadScript("pin.js")
loadScript("diagram.js")
loadScript("line.js")
loadScript("ray.js")
loadScript("grid.js")
loadScript("mesh.js")

const urlParams = new URLSearchParams(window.location.search);
const script = urlParams.get('script')
loadScript(script)


