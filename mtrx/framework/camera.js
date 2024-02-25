
class Camera
{
    constructor(position, lookAt, vFov, aspect)
    {
        this.setPosition(position ?? new Vector(0, 0, -1));
        this.setLookAt(lookAt ?? Vector.ZeroPoint());
        this.setFov(vFov ?? Math.PI / 4);
        this.setAspect(aspect ?? 1);
    }

    getViewDirection()
    {
        return diff(this.lookAt, this.position).get_normalized();
    }

    setPosition(position)
    {
        if (!this.position || !this.position.equals(position))
        {
            this.position = position;
            this.viewMatrix = null;
        }
    }

    setLookAt(lookAt)
    {
        if (!this.lookAt || !this.lookAt.equals(lookAt))
        {
            this.lookAt = lookAt;
            this.viewMatrix = null;
        }
    }

    setFov(vFov)
    {
        if (this.vFov != vFov)
        {
            this.vFov = vFov;
            this.orthoSize = null;
            this.projectionMatrix = null;
        }
    }

    setOrthoSize(orthoSize)
    {
        if (this.orthoSize != orthoSize)
        {
            this.orthoSize = orthoSize;
            this.vFov = null;
            this.projectionMatrix = null;
        }
    }

    setAspect(aspect)
    {
        if (this.aspect != aspect)
        {
            this.aspect = aspect;
            this.projectionMatrix = null;
        }
    }

    setOrtho(height)
    {
		var width = height * this.aspect;
		var depth = 1500;
		
    }

    getViewDirection()
    {
        var direction = diff(this.lookAt, this.position);
        direction.normalize();
        return direction;
    }

    getViewMatrix()
    {
        if (!this.viewMatrix)
        {
            var offset = this.position.get_scaled(-1);
            var offsetMtrx = Matrix4x4.Translation(offset);
    
            var forward = diff(this.lookAt, this.position);
            forward.normalize();

            if (coordinateSystem.isRHS())
            {
                forward.negate();
            }

            // var axisA = getBaseAxis(forward, 'Forward');
            // var axisB = getBaseAxis(coordinateSystem.Up.direction, 'Up');
            // var axisC = calc3rdAxis(axisA, axisB);
            // axisC.normalize();
            // axisB = calc3rdAxis(axisA, axisC);
            // var orientationMtrx = createBasis(axisA, axisB, axisC);
            
            var right = cross(coordinateSystem.Up.direction, forward);
            right.normalize();
            var up = cross(forward, right);
            var orientationMtrx = new Matrix4x4(right, up, forward, Vector.ZeroPoint());
            orientationMtrx.transpose();
        
            this.viewMatrix = mult(offsetMtrx, orientationMtrx);
        }

        return this.viewMatrix;
    }

    getProjectionMatrix()
    {
        if (!this.projectionMatrix)
        {
            if (this.vFov)
            {
                var scaleY = 1 / Math.tan(this.vFov / 2);
                var scaleX = scaleY / this.aspect;
                var k = coordinateSystem.isRHS() ? -1 : +1;
                this.projectionMatrix = new Matrix4x4(
                    new Vector(scaleX, 0, 0, 0),
                    new Vector(0, scaleY, 0, 0),
                    new Vector(0, 0, 0, k),
                    new Vector(0, 0, 1, 0)
                );
            }
            else
            {
                var height = this.orthoSize;
                var width = height * this.aspect;
                var depth = 1500;
                var k = coordinateSystem.isRHS() ? -1 : +1;
                this.projectionMatrix = new Matrix4x4(
                    new Vector(2 / width, 0, 0, 0),
                    new Vector(0, 2 / height, 0, 0),
                    new Vector(0, 0, -1 / depth, 0),
                    new Vector(0, 0, 0, 1)
                );
            }
        }

        return this.projectionMatrix;
    }
}