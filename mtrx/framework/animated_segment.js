
class AnimatedSegment
{
    constructor(diagram)
    {
        this.time = 0;
        this.fullTime = 1000;
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

    render()
    {
        console.log(this.time);
    }   
}