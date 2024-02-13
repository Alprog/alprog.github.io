
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

loadStyle("diagram_styles.css")

loadScript("framework/vector.js")
loadScript("framework/matrix.js")
loadScript("framework/matrix_object.js")
loadScript("framework/math.js")
loadScript("framework/canvas.js")
loadScript("framework/camera.js")
loadScript("framework/matrix_table.js")
loadScript("framework/point_cloud.js")
loadScript("framework/renderer.js")
loadScript("framework/pin.js")
loadScript("framework/diagram.js")
loadScript("framework/line.js")
loadScript("framework/ray.js")
loadScript("framework/grid.js")
loadScript("framework/mesh.js")
loadScript("framework/utils.js")
loadScript("framework/mode.js")
loadScript("framework/axes.js")

const urlParams = new URLSearchParams(window.location.search);
const script = urlParams.get('script')
loadScript(script)