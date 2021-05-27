import { Vector3 } from "./vector"

class Matrix {
    constructor(v1a, v1b, v1c, v1d, v2a, v2b, v2c, v2d, v3a, v3b, v3c, v3d, v4a, v4b, v4c, v4d) {
        const values = [v1a, v1b, v1c, v1d, v2a, v2b, v2c, v2d, v3a, v3b, v3c, v3d, v4a, v4b, v4c, v4d]
        
        if (v1a instanceof Matrix) {
            this.matrix = [
                v1a.matrix[0],  v1a.matrix[1],  v1a.matrix[2],  v1a.matrix[3], 
                v1a.matrix[4],  v1a.matrix[5],  v1a.matrix[6],  v1a.matrix[7],
                v1a.matrix[8],  v1a.matrix[9],  v1a.matrix[10], v1a.matrix[11],
                v1a.matrix[12], v1a.matrix[13], v1a.matrix[14], v1a.matrix[15]   
            ]
        } else {
            this.matrix = !values.includes(undefined) ? values : []        
        }
    }

    static Identity() {
        return new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1)
    }

    static Zero() {
        return new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0)
    }

    static RotationX(angle) {
        const rotation = Matrix.Zero()
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)
        
        rotation.matrix[0]  = 1;
        rotation.matrix[15] = 1;
        rotation.matrix[5]  = cos;
        rotation.matrix[10] = cos;
        rotation.matrix[9]  = -sin;
        rotation.matrix[6]  = sin;
        
        return rotation;
    }

    static RotationY(angle) {
        const rotation = Matrix.Zero()
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)

        rotation.matrix[5]  = 1;
        rotation.matrix[15] = 1;
        rotation.matrix[0]  = cos;
        rotation.matrix[2]  = -sin;
        rotation.matrix[8]  = sin;
        rotation.matrix[10] = cos;

        return rotation;
    }

    static RotationZ(angle) {
        const rotation = Matrix.Zero()
        const sin = Math.sin(angle)
        const cos = Math.cos(angle)

        rotation.matrix[10] = 1;
        rotation.matrix[15] = 1;
        rotation.matrix[0]  = cos;
        rotation.matrix[1]  = sin;
        rotation.matrix[4]  = -sin;
        rotation.matrix[5]  = cos;

        return rotation;
    }

    static RotationAxis(axis, angle) {
        const sin = Math.sin(-angle)
        const cos = Math.cos(-angle)
        const cos1 = 1 - cos
        axis.normalize()

        const rotation = Matrix.Zero()
        rotation.matrix[0]  = (axis.x * axis.x) * cos1 + cos
        rotation.matrix[1]  = (axis.x * axis.y) * cos1 - (axis.z * sin)
        rotation.matrix[2]  = (axis.x * axis.z) * cos1 + (axis.y * sin)
        rotation.matrix[3]  = 0.0
        rotation.matrix[4]  = (axis.y * axis.x) * cos1 + (axis.z * sin)
        rotation.matrix[5]  = (axis.y * axis.y) * cos1 + cos
        rotation.matrix[6]  = (axis.y * axis.z) * cos1 - (axis.x * sin)
        rotation.matrix[7]  = 0.0
        rotation.matrix[8]  = (axis.z * axis.x) * cos1 - (axis.y * sin)
        rotation.matrix[9]  = (axis.z * axis.y) * cos1 + (axis.x * sin)
        rotation.matrix[10] = (axis.z * axis.z) * cos1 + cos
        rotation.matrix[11] = 0.0
        rotation.matrix[15] = 1.0

        return rotation
    }

    static RotationYawPitchRoll(yaw, pitch, roll) {
        const rotYaw   = Matrix.RotationY(yaw)
        const rotPitch = Matrix.RotationX(pitch)
        const rotRoll  = Matrix.RotationZ(roll)

        return rotRoll.multiply(rotPitch.multiply(rotYaw))
    }

    static Scaler(x, y, z) {
        const scaler = Matrix.Zero()
        scaler.matrix[0] = x
        scaler.matrix[5] = y
        scaler.matrix[10] = z
        scaler.matrix[15] = 1

        return scaler
    }

    static Translation(x, y, z) {
        const translation = Matrix.Identity()
        translation.matrix[12] = x
        translation.matrix[13] = y
        translation.matrix[14] = z

        return translation
    }

    static LookAtLH(eye, target, up) {
        const zAxis = target.subtract(eye)
        zAxis.normalize()

        const xAxis = Vector3.Cross(up, zAxis)
        xAxis.normalize()

        const yAxis = Vector3.Cross(zAxis, xAxis)
        yAxis.normalize()

        const eyeX = -Vector3.Dot(xAxis, eye)
        const eyeY = -Vector3.Dot(yAxis, eye)
        const eyeZ = -Vector3.Dot(zAxis, eye)

        return new Matrix(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, eyeX, eyeY, eyeZ, 1)
    }

    static PerspectiveLH(width, height, zNear, zFar) {
        const m = Matrix.Zero()
        m.matrix[0]  = (2 * zNear) /  width
        m.matrix[1]  = m.matrix[2] = m.matrix[3] = 0.0
        m.matrix[5]  = (2.0 * zNear) / height
        m.matrix[4]  = m.matrix[6] = m.matrix[7] = 0.0
        m.matrix[10] = -zFar / (zNear - zFar)
        m.matrix[8]  = m.matrix[9] = 0.0
        m.matrix[11] = 1.0
        m.matrix[12] = m.matrix[13] = m.matrix[15] = 0.0
        m.matrix[14] = (zNear * zFar) / (zNear - zFar)

        return m
    }

    static PerspectiveForLH(fov, aspect, zNear, zFar) {
        const m = Matrix.Zero()
        const tan = 1 / (Math.tan(fov * .5))
        m.matrix[0]  = tan / aspect
        m.matrix[1]  = m.matrix[2] = m.matrix[3] = 0.0
        m.matrix[5]  = tan
        m.matrix[4]  = m.matrix[6] = m.matrix[7] = 0.0
        m.matrix[8]  = m.matrix[9] = 0.0
        m.matrix[10] = -zFar / (zNear - zFar)
        m.matrix[11] = 1.0
        m.matrix[12] = m.matrix[13] = m.matrix[15] = 0.0
        m.matrix[14] = (zNear * zFar) / (zNear - zFar)

        return m
    }

    static Transpose(matrix) {
        const m = new Matrix()
        m.matrix[0] = matrix.matrix[0]
        m.matrix[1] = matrix.matrix[4]
        m.matrix[2] = matrix.matrix[8]
        m.matrix[3] = matrix.matrix[12]
        m.matrix[4] = matrix.matrix[1]
        m.matrix[5] = matrix.matrix[5]
        m.matrix[6] = matrix.matrix[9]
        m.matrix[7] = matrix.matrix[13]
        m.matrix[8] = matrix.matrix[2]
        m.matrix[9] = matrix.matrix[6]
        m.matrix[10] = matrix.matrix[10]
        m.matrix[11] = matrix.matrix[14]
        m.matrix[12] = matrix.matrix[3]
        m.matrix[13] = matrix.matrix[7]
        m.matrix[14] = matrix.matrix[11]
        m.matrix[15] = matrix.matrix[15]

        return m
    }

    isIdentity() {
        if (this.matrix[0] != 1 || this.matrix[5] != 1 || this.matrix[10] != 1 || this.matrix[15] != 1) {
            return false;
        }

        if(this.matrix[12] != 0 || this.matrix[13] != 0 || this.matrix[14] != 0 || this.matrix[4] != 0 || this.matrix[6] != 0 || this.matrix[7] != 0 || this.matrix[8] != 0 || this.matrix[9] != 0 || this.matrix[11] != 0 || this.matrix[12] != 0 || this.matrix[13] != 0 || this.matrix[14] != 0) {
            return false;
        }

        return true;
    }

    multiply(matrix) {
        const m = new Matrix()
        m.matrix[0]  = this.matrix[0]  * matrix.matrix[0] + this.matrix[1]  * matrix.matrix[4] + this.matrix[2]  * matrix.matrix[8]  + this.matrix[3]  * matrix.matrix[12]
        m.matrix[1]  = this.matrix[0]  * matrix.matrix[1] + this.matrix[1]  * matrix.matrix[5] + this.matrix[2]  * matrix.matrix[9]  + this.matrix[3]  * matrix.matrix[13]
        m.matrix[2]  = this.matrix[0]  * matrix.matrix[2] + this.matrix[1]  * matrix.matrix[6] + this.matrix[2]  * matrix.matrix[10] + this.matrix[3]  * matrix.matrix[14]
        m.matrix[3]  = this.matrix[0]  * matrix.matrix[3] + this.matrix[1]  * matrix.matrix[7] + this.matrix[2]  * matrix.matrix[11] + this.matrix[3]  * matrix.matrix[15]
        m.matrix[4]  = this.matrix[4]  * matrix.matrix[0] + this.matrix[5]  * matrix.matrix[4] + this.matrix[6]  * matrix.matrix[8]  + this.matrix[7]  * matrix.matrix[12]
        m.matrix[5]  = this.matrix[4]  * matrix.matrix[1] + this.matrix[5]  * matrix.matrix[5] + this.matrix[6]  * matrix.matrix[9]  + this.matrix[7]  * matrix.matrix[13]
        m.matrix[6]  = this.matrix[4]  * matrix.matrix[2] + this.matrix[5]  * matrix.matrix[6] + this.matrix[6]  * matrix.matrix[10] + this.matrix[7]  * matrix.matrix[14]
        m.matrix[7]  = this.matrix[4]  * matrix.matrix[3] + this.matrix[5]  * matrix.matrix[7] + this.matrix[6]  * matrix.matrix[11] + this.matrix[7]  * matrix.matrix[15]
        m.matrix[8]  = this.matrix[8]  * matrix.matrix[0] + this.matrix[9]  * matrix.matrix[4] + this.matrix[10] * matrix.matrix[8]  + this.matrix[11] * matrix.matrix[12]
        m.matrix[9]  = this.matrix[8]  * matrix.matrix[1] + this.matrix[9]  * matrix.matrix[5] + this.matrix[10] * matrix.matrix[9]  + this.matrix[11] * matrix.matrix[13]
        m.matrix[10] = this.matrix[8]  * matrix.matrix[2] + this.matrix[9]  * matrix.matrix[6] + this.matrix[10] * matrix.matrix[10] + this.matrix[11] * matrix.matrix[14]
        m.matrix[11] = this.matrix[8]  * matrix.matrix[3] + this.matrix[9]  * matrix.matrix[7] + this.matrix[10] * matrix.matrix[11] + this.matrix[11] * matrix.matrix[15]
        m.matrix[12] = this.matrix[12] * matrix.matrix[0] + this.matrix[13] * matrix.matrix[4] + this.matrix[14] * matrix.matrix[8]  + this.matrix[15] * matrix.matrix[12]
        m.matrix[13] = this.matrix[12] * matrix.matrix[1] + this.matrix[13] * matrix.matrix[5] + this.matrix[14] * matrix.matrix[9]  + this.matrix[15] * matrix.matrix[13]
        m.matrix[14] = this.matrix[12] * matrix.matrix[2] + this.matrix[13] * matrix.matrix[6] + this.matrix[14] * matrix.matrix[10] + this.matrix[15] * matrix.matrix[14]
        m.matrix[15] = this.matrix[12] * matrix.matrix[3] + this.matrix[13] * matrix.matrix[7] + this.matrix[14] * matrix.matrix[11] + this.matrix[15] * matrix.matrix[15]

        return m
    }

    equal(matrix) {
        return (
            this.matrix[0]  === matrix.matrix[0] && 
            this.matrix[1]  === matrix.matrix[1] && 
            this.matrix[2]  === matrix.matrix[2] && 
            this.matrix[3]  === matrix.matrix[3] && 
            this.matrix[4]  === matrix.matrix[4] && 
            this.matrix[5]  === matrix.matrix[5] && 
            this.matrix[6]  === matrix.matrix[6] && 
            this.matrix[7]  === matrix.matrix[7] && 
            this.matrix[8]  === matrix.matrix[8] && 
            this.matrix[9]  === matrix.matrix[9] && 
            this.matrix[10] === matrix.matrix[10] && 
            this.matrix[11] === matrix.matrix[11] && 
            this.matrix[12] === matrix.matrix[12] && 
            this.matrix[13] === matrix.matrix[13] && 
            this.matrix[14] === matrix.matrix[14] && 
            this.matrix[15] === matrix.matrix[15]
        )
    }

    determinant() {
        const d1 = (this.matrix[10] * this.matrix[15]) - (this.matrix[11] * this.matrix[14])
        const d2 = (this.matrix[9]  * this.matrix[15]) - (this.matrix[11] * this.matrix[13])
        const d3 = (this.matrix[9]  * this.matrix[14]) - (this.matrix[10] * this.matrix[13])
        const d4 = (this.matrix[8]  * this.matrix[15]) - (this.matrix[11] * this.matrix[12])
        const d5 = (this.matrix[8]  * this.matrix[14]) - (this.matrix[10] * this.matrix[12])
        const d6 = (this.matrix[8]  * this.matrix[13]) - (this.matrix[9]  * this.matrix[12])

        return ((((this.matrix[0] * (((this.matrix[5] * d1) - (this.matrix[6] * d2)) + (this.matrix[7] * d3))) - (this.matrix[1] * (((this.matrix[4] * d1) - (this.matrix[6] * d4)) + (this.matrix[7] * d5)))) + (this.matrix[2] * (((this.matrix[4] * d2) - (this.matrix[5] * d4)) + (this.matrix[7] * d6)))) - (this.matrix[3] * (((this.matrix[4] * d3) - (this.matrix[5] * d5)) + (this.matrix[6] * d6))))
    }

    invert() {
        const i1 = this.matrix[0]
        const i2 = this.matrix[1]
        const i3 = this.matrix[2]
        const i4 = this.matrix[3]
        const i5 = this.matrix[4]
        const i6 = this.matrix[5]
        const i7 = this.matrix[6]
        const i8 = this.matrix[7]
        const i9 = this.matrix[8]
        const i10 = this.matrix[9]
        const i11 = this.matrix[10]
        const i12 = this.matrix[11]
        const i13 = this.matrix[12]
        const i14 = this.matrix[13]
        const i15 = this.matrix[14]
        const i16 = this.matrix[15]
        const i17 = (i11 * i16) - (i12 * i15)
        const i18 = (i10 * i16) - (i12 * i14)
        const i19 = (i10 * i15) - (i11 * i14)
        const i20 = (i9 * i16) - (i12 * i13)
        const i21 = (i9 * i15) - (i11 * i13)
        const i22 = (i9 * i14) - (i10 * i13)
        const i23 = ((i6 * i17) - (i7 * i18)) + (i8 * i19)
        const i24 = -(((i5 * i17) - (i7 * i20)) + (i8 * i21))
        const i25 = ((i5 * i18) - (i6 * i20)) + (i8 * i22)
        const i26 = -(((i5 * i19) - (i6 * i21)) + (i7 * i22))
        const i27 = 1.0 / ((((i1 * i23) + (i2 * i24)) + (i3 * i25)) + (i4 * i26))
        const i28 = (i7 * i16) - (i8 * i15)
        const i29 = (i6 * i16) - (i8 * i14)
        const i30 = (i6 * i15) - (i7 * i14)
        const i31 = (i5 * i16) - (i8 * i13)
        const i32 = (i5 * i15) - (i7 * i13)
        const i33 = (i5 * i14) - (i6 * i13)
        const i34 = (i7 * i12) - (i8 * i11)
        const i35 = (i6 * i12) - (i8 * i10)
        const i36 = (i6 * i11) - (i7 * i10)
        const i37 = (i5 * i12) - (i8 * i9)
        const i38 = (i5 * i11) - (i7 * i9)
        const i39 = (i5 * i10) - (i6 * i9)

        this.matrix[0]  = i23 * i27
        this.matrix[4]  = i24 * i27
        this.matrix[8]  = i25 * i27
        this.matrix[12] = i26 * i27
        this.matrix[1]  = -(((i2 * i17) - (i3 * i18)) + (i4 * i19)) * i27
        this.matrix[5]  =  (((i1 * i17) - (i3 * i20)) + (i4 * i21)) * i27
        this.matrix[9]  = -(((i1 * i18) - (i2 * i20)) + (i4 * i22)) * i27
        this.matrix[13] =  (((i1 * i19) - (i2 * i21)) + (i3 * i22)) * i27
        this.matrix[2]  =  (((i2 * i28) - (i3 * i29)) + (i4 * i30)) * i27
        this.matrix[6]  = -(((i1 * i28) - (i3 * i31)) + (i4 * i32)) * i27
        this.matrix[10] =  (((i1 * i29) - (i2 * i31)) + (i4 * i33)) * i27
        this.matrix[14] = -(((i1 * i30) - (i2 * i32)) + (i3 * i33)) * i27
        this.matrix[3]  = -(((i2 * i34) - (i3 * i35)) + (i4 * i36)) * i27
        this.matrix[7]  =  (((i1 * i34) - (i3 * i37)) + (i4 * i38)) * i27
        this.matrix[11] = -(((i1 * i35) - (i2 * i37)) + (i4 * i39)) * i27
        this.matrix[15] =  (((i1 * i36) - (i2 * i38)) + (i3 * i39)) * i27
    }
}

export default Matrix