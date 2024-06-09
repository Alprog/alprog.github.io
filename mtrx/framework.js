
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

loadStyle("diagram_styles.css");

loadScript("framework/animator.js");
loadScript("framework/address_bar.js");
loadScript("framework/axis_pin.js");
loadScript("framework/camera.js");
loadScript("framework/camera_controller.js");
loadScript("framework/canvas.js");
loadScript("framework/color.js");
loadScript("framework/config.js");
loadScript("framework/coordinate_system.js");
loadScript("framework/defaults.js");
loadScript("framework/diagram.js");
loadScript("framework/dom_utils.js");
loadScript("framework/editor.js");
loadScript("framework/grid.js");
loadScript("framework/label.js");
loadScript("framework/line.js");
loadScript("framework/material.js");
loadScript("framework/math.js");
loadScript("framework/matrix.js");
loadScript("framework/matrix_object.js");
loadScript("framework/matrix_table.js");
loadScript("framework/mesh.js");
loadScript("framework/mode.js");
loadScript("framework/object_rotator.js");
loadScript("framework/pin.js");
loadScript("framework/point_cloud.js");
loadScript("framework/ray.js");
loadScript("framework/renderer.js");
loadScript("framework/side_panel.js");
loadScript("framework/sphere.js");
loadScript("framework/vector.js");
loadScript("framework/vector_object.js");
loadScript("framework/utils.js");

loadScript("framework/the.js");

loadScript("models/littleman.js");
loadScript("models/airplane.js");

const urlParams = new URLSearchParams(window.location.search);
const script = urlParams.get('script');
loadScript('diagrams/' + script);