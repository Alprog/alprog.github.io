
const axisNames = "XYZ";

const LHS = 0;
const RHS = 1;

var axes_variants = [
    "BDL", "BDR", "BLD", "BLU", "BRD", "BRU", "BUL", "BUR", 
    "DBL", "DBR", "DFL", "DFR", "DLB", "DLF", "DRB", "DRF", 
    "FDL", "FDR", "FLD", "FLU", "FRD", "FRU", "FUL", "FUR", 
    "LBD", "LBU", "LDB", "LDF", "LFD", "LFU", "LUB", "LUF", 
    "RBD", "RBU", "RDB", "RDF", "RFD", "RFU", "RUB", "RUF", 
    "UBL", "UBR", "UFL", "UFR", "ULB", "ULF", "URB", "URF"
];

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
        const axesCode = The.Config.axes;

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