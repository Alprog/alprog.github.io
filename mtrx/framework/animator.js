
class Animator
{
    constructor(diagram)
    {
        this.diagram = diagram;
        this.isEnabled = false;
        this.segments = [];

        diagram.sidePanel.createAnimatorButton(this);
    }

    isRunning()
    {
        return this.segments.length > 0;
    }

    isOnLastSegment()
    {
        var lastIndex = this.segments.length - 1;
        if (lastIndex >= 0)
        {
            return this.segments[lastIndex].time > 0;
        }
    }

    toggle()
    {
        if (this.isRunning())
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
        this.rebuild();
    }

    stop()
    {
        this.segments = [];
    }

    rebuild()
    {
    }

    addSegment(segment)
    {
        this.segments.push(segment);
    }

    update(deltaTime)
    {
        for (var segment of this.segments)
        {
            deltaTime = segment.update(deltaTime);
            if (deltaTime == 0)
            {
                return;
            }
        }
        this.stop();
    }

    render(renderer)
    {
        for (var segment of this.segments)
        {
            if (segment.time > 0)
            {
                segment.render(renderer);
            }
        }
    }
}