﻿using System.Globalization;

namespace ObjToMtrxMesh
{
    public struct Vector3
    {
        public float x;
        public float y;
        public float z;

        public Vector3(float x, float y, float z)
        {
            this.x = x;
            this.y = y;
            this.z = z;
        }

        public new string ToString()
        {
            return string.Format(CultureInfo.InvariantCulture, "new Vector({0}, {1}, {2})", x, y, z);
        }
    };
}
