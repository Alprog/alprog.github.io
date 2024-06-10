
class Animator
{
    constructor(diagram)
    {
        this.diagram = diagram;
        this.isRunning = false;        
    }

    init()
    {
        diagram.sidePanel.createAnimatorButton();
    }

    toggle()
    {
        this.isRunning = !this.isRunning;
    }

    update(deltaTime)
    {
    }
}