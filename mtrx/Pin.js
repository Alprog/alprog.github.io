
var pin_radius = 8
var pin_width = 3

class Pin
{
  constructor(point)
  {
    this.point = point
  }

  draw(canvas)
  {
    var point = canvas.transform_point(this.point);

    var delta = diff(point, canvas.mouse).get_length2D();
    var hovered = delta <= pin_radius;

    canvas.circle(point, pin_radius, hovered ? "orange" : "black", pin_width)
  }
}
