
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

loadScript("framework/vector.js")
loadScript("framework/matrix.js")
loadScript("framework/math.js")
loadScript("framework/canvas.js")
loadScript("framework/camera.js")
loadScript("framework/renderer.js")
loadScript("framework/pin.js")
loadScript("framework/diagram.js")
loadScript("framework/line.js")
loadScript("framework/ray.js")
loadScript("framework/grid.js")
loadScript("framework/mesh.js")

const urlParams = new URLSearchParams(window.location.search);
const script = urlParams.get('script')
loadScript(script)


