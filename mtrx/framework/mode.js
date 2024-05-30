
class Mode
{
    constructor()
    {
        const axis = The.Config.get('axes')
        this.rhs = axis == 'r';
    }

    isLHS()
    {
        return !this.rhs;
    }

    isRHS()
    {
        return this.rhs;
    }
}