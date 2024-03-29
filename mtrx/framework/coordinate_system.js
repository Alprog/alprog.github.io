
const axisNames = "XYZ";

const LHS = 0;
const RHS = 1;

class BaseDirection
{
    constructor(name, axisIndex, axisSign)
    {
        this.directionName = name;
        this.axisIndex = axisIndex;
        this.axisName = axisNames[axisIndex];
        this.axisSign = axisSign;

        this.direction = Vector.Zero();
        this.unit = Vector.ZeroPoint();
        this.direction[axisIndex] = axisSign;
        this.unit[axisIndex] = axisSign;
    }
}

function detectHandness(axesCode)
{
    const leftOrder = "RUF";
    const swaps = { L: "R", D: "U", B: "F" };

    var leftHanded = true;
    var newCode = "";
    for (var i = 0; i < axesCode.length; i++)
    {
        var char = axesCode[i];
        var swapChar = swaps[char];
        newCode += swapChar ?? char;
        if (swapChar)
        {
            leftHanded = !leftHanded;
        }
    }

    if (!(leftOrder + leftOrder).includes(newCode))
    {
        leftHanded = !leftHanded;
    }

    return leftHanded ? LHS : RHS;
}

class CoordinateSystem
{
    constructor()
    {
        const urlParams = new URLSearchParams(window.location.search);
        const axesCode = urlParams.get('axes') ?? "RUF";

        this.handness = detectHandness(axesCode);

        var dirNames = {
            R: ["Right", "Left"],
            L: ["Left", "Right"],
            U: ["Up", "Down"],
            D: ["Down", "Up"],
            F: ["Forward", "Backward"],
            B: ["Backward", "Forward"],
        };

        for (var axisIndex = 0; axisIndex < 3; axisIndex++)
        {
            var names = dirNames[axesCode[axisIndex]];
            var positive = new BaseDirection(names[0], axisIndex, +1);
            var negative = new BaseDirection(names[1], axisIndex, -1);
            positive.opposite = negative;
            negative.opposite = positive;
            this[names[0]] = positive;
            this[names[1]] = negative;
            this[axisNames[axisIndex]] = positive;
            this[axisIndex] = positive;
        }
    }

    isLHS() { return this.handness == LHS; }
    isRHS() { return this.handness == RHS; }
}

coordinateSystem = new CoordinateSystem();

class Basis
{
    constructor()
    {
    }

    tryAutoDetect(a, b, c)
    {
        if (this[a] && this[b])
        {
            this[c] = cross(this[a], this[b]);
            return true;
        }
        return false;
    }

    finish()
    {
        this.tryAutoDetect(0, 1, 2);
        this.tryAutoDetect(1, 2, 0);
        this.tryAutoDetect(2, 0, 1);
    }
}

function createBasis(axisA, axisB, axisC)
{
    var mtrx = Matrix4x4.Identity();
    mtrx[axisA.baseDirection.axisIndex] = axisA;
    mtrx[axisB.baseDirection.axisIndex] = axisB;
    mtrx[axisC.baseDirection.axisIndex] = axisC;

    console.log(mtrx);

    return mtrx.clone();
}

function getBaseAxis(vector, dirName)
{
    var result = vector.clone();
    result.baseDirection = coordinateSystem[dirName];
    if (result.baseDirection.axisSign < 0)
    {
        result.negate();
        result.baseDirection = result.baseDirection.opposite;
    }
    return result;
}

function calc3rdAxis(a, b)
{
    var aIndex = a.baseDirection.axisIndex;
    var bIndex = b.baseDirection.axisIndex;
    var cIndex = 3 - (aIndex + bIndex);

    var delta = bIndex - aIndex;
    var positive = delta == 1 || delta == -2;

    var c = positive ? cross(a, b) : cross(b, a);
    c.baseDirection = coordinateSystem[cIndex];  

    return c;
}