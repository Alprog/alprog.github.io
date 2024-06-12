
class Animator
{
    constructor(diagram)
    {
        this.diagram = diagram;
        this.isEnabled = false;
        this.segments = [];

        diagram.sidePanel.createAnimatorButton(this);
    }

    toggle()
    {
        if (this.isEnabled)
        {
            this.stop();
        }
        else
        {
            this.restart();
        }
    }

    restart()
    {
        this.stop();
        this.isEnabled = true;
    }

    stop()
    {
        for (var segment of this.segments)
        {
            segment.time = 0;
        }
        this.isEnded = false;
        this.isEnabled = false;
    }

    addSegment(segment)
    {
        this.segments.push(segment);
    }

    update(deltaTime)
    {
        if (this.isEnabled)
        {
            for (var segment of this.segments)
            {
                deltaTime = segment.update(deltaTime);
                if (deltaTime == 0)
                {
                    return;
                }
            }
            this.isEnded = true;
        }
    }

    render()
    {
        if (this.isEnabled)
        {
            for (var segment of this.segments)
            {
                if (segment.time > 0)
                {
                    segment.render();
                }
            }            
        }
    }
}