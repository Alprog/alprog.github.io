
class Mode
{
    constructor()
    {
        const urlParams = new URLSearchParams(window.location.search);
        const axis = urlParams.get('axis')
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

mode = new Mode();