
class AnimatedSegment
{
    constructor(startPoint, endPoint, color, width)
    {
        this.time = 0;
        this.animationTime = 1000;
        this.pauseTime = 400;
        this.fullTime = this.animationTime + this.pauseTime;
    
        this.startPoint = startPoint;
        this.endPoint = endPoint;
        this.color = color;
        this.width = width;
    }

    update(deltaTime)
    {
        if (this.time >= this.fullTime)
        {
            return deltaTime;
        }

        this.time = this.time + deltaTime;
        if (this.time > this.fullTime)
        {
            var timeLeft = this.time - this.fullTime;
            this.time = this.fullTime;
            return timeLeft;
        }

        return 0;
    }

    render(renderer)
    {
        var lerpK = min(1, this.time / this.animationTime);

        var endPoint = lerp(this.startPoint, this.endPoint, lerpK);

        var tip_radius = min(1, lerpK / 0.5) * 10;
        renderer.drawArrow(this.startPoint, endPoint, this.color, this.width, tip_radius);
    }   
}