
var pin_radius = 8
var pin_width = 3

class Pin
{
  constructor(point)
  {
    this.point = point
  }

  render(renderer)
  {
    var point = canvas.transform_point(this.point);

    var delta = diff(point, canvas.mouse).get_length2D();
    var hovered = delta <= pin_radius;

    renderer.canvas.circle(point, pin_radius, hovered ? "orange" : "black", pin_width)
  }
}
