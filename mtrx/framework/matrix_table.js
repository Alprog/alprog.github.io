
const OBJECT_SPACE = 0;
const WORLD_SPACE = 1;
const CAMERA_SPACE = 2;
const CLIP_SPACE = 3;
const CANVAS_SPACE = 4;

const SPACE_COUNT = 5;
const TABLE_SIZE = SPACE_COUNT * SPACE_COUNT;

var ClearMaps =
[
    // Model
    0b0_10000 << 20 |
    0b0_01111 << 15 |
    0b0_01111 << 10 |
    0b0_01111 << 5 |
    0b0_01111,

    // View
    0b0_11000 << 20 |
    0b0_11000 << 15 |
    0b0_00111 << 10 |
    0b0_00111 << 5 |
    0b0_00111,

    // Projection
    0b0_11100 << 20 |
    0b0_11100 << 15 |
    0b0_11100 << 10 |
    0b0_00011 << 5 |
    0b0_00011,

    // Present
    0b0_11110 << 20 |
    0b0_11110 << 15 |
    0b0_11110 << 10 |
    0b0_11110 << 5 |
    0b0_00001
]

class MatrixTable
{
    constructor()
    {
        this.readyMask = 0;
    }

    setModelMatrix(matrix) { this.setBaseMatrix(OBJECT_SPACE, WORLD_SPACE, matrix); }
    setViewMatrix(matrix) { this.setBaseMatrix(WORLD_SPACE, CAMERA_SPACE, matrix); }
    setProjectionMatrix(matrix) { this.setBaseMatrix(CAMERA_SPACE, CLIP_SPACE, matrix); }
    setPresentMatrix(matrix) { this.setBaseMatrix(CLIP_SPACE, CANVAS_SPACE, matrix); }

    getMatrix(spaceFrom, spaceTo)
    {
        var index = this.getIndex(spaceFrom, spaceTo);
        var bitFlag = 1 << index;
        if ((this.readyMask & bitFlag) == 0)
        {
            this[index] = this.calcMatrix(spaceFrom, spaceTo);
            this.readyMask |= bitFlag;
        }

        return this[index];
    }

    //-----------------

    calcMatrix(spaceFrom, spaceTo)
    {
        var step = spaceTo - spaceFrom;

        if (step >= 2)
        {
            var a = this.getMatrix(spaceFrom, spaceFrom + 1);
            var b = this.getMatrix(spaceFrom + 1, spaceTo);
            return mult(a, b);
        }

        if (step < 0)
        {
            return this.getMatrix(spaceTo, spaceFrom).get_inverse();
        }
    }

    setBaseMatrix(spaceFrom, spaceTo, matrix)
    {
        var index = this.getIndex(spaceFrom, spaceTo);
        if (this[index] != matrix)
        {
            this.readyMask &= ClearMaps[spaceFrom];
            this[index] = matrix;        
            this.readyMask |= 1 << index;    
        }
    }

    getIndex(spaceFrom, spaceTo)
    {
        return TABLE_SIZE - 1 - spaceFrom * SPACE_COUNT - spaceTo;
    }
}