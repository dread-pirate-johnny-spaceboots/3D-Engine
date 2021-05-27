class Vector2 {
    constructor(initX, initY) {
        if (initX instanceof Vector2) {
            this.x = initX.x
            this.y = initX.y
        } else {
            this.x = initX
            this.y = initY
        }
    }

    add(vector2) {
        return new Vector2(this.x + vector2.x, this.y + vector2.y)
    }

    subtract(vector2) {
        return new Vector2(this.x - vector2.x, this.y - vector2.y)
    }

    get not() {
        return new Vector2(-this.x, -this.y)
    }

    scale(scaler) {
        return new Vector2(this.x * scaler, this.y * scaler)
    }

    equals(vector2) {
        return this.x === vector2.x && this.y === vector2.y
    }

    get size() {
        return Math.sqrt( (this.x * this.x) + (this.y * this.y) )
    }

    normalize() {
        if (this.size === 0) { return }

        const scaler = 1 / this.size
        this.x *= scaler
        this.y *= scaler
    }

    static Identity() {
        return new Vector2(0, 0)
    }

    static Normalize(vector2) {
        let vector = new Vector2(vector2)
        vector.normalize()
        return vector
    }

    static Min(v2A, v2B) {
        return new Vector2(
            v2A.x < v2B.x ? v2A.x : v2B.x,
            v2A.y < v2B.y ? v2A.y : v2B.y
        )
    }

    static Max(v2A, v2B) {
        return new Vector2(
            v2A.x > v2B.x ? v2A.x : v2B.x,
            v2A.y > v2B.y ? v2A.y : v2B.y
        )
    }

    static Transform(vector2, transformation) {
        return new Vector2(
            (vector2.x * transformation.matrix[0]) + (vector2.y * transformation.matrix[4]),
            (vector2.x * transformation.matrix[1]) + (vector2.y * transformation.matrix[5]),
        )
    }

    toString() {

    }
}

class Vector3 {
    constructor(x, y, z) {
        if (x instanceof Vector3) {
            this.x = x.x
            this.y = x.y
            this.z = x.z
        } else {
            this.x = x
            this.y = y
            this.z = z
        }
    }

    static Zero() {
        return new Vector3(0, 0, 0)
    }

    static Up() {
        return new Vector3(0, 1, 0)
    }

    static Dot(v1, v2) {
        return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z
    }

    static Cross(v1, v2) {
        return new Vector3(
            v1.y * v2.z - v1.z * v2.y,
            v1.z * v2.x - v1.x * v2.z,
            v1.x * v2.y - v1.y * v2.x
        )
    }

    static Normalize(vector3) {
        const v = new Vector3(vector3)
        v.normalize()

        return v
    }

    static Distance(v1, v2) {
        const dist = Vector3.DistanceSquared(v1, v2)
        return Math.sqrt(dist)
    }

    static DistanceSquared(v1, v2) {
        const x = v1.x - v2.x
        const y = v1.y - v2.y
        const z = v1.z - v2.z

        return (x * x) + (y * y) + (z * z)
    }

    static TransformCoordinates(vector3, transformation) {
        const x = (vector3.x * transformation.matrix[0]) + (vector3.y * transformation.matrix[4]) + (vector3.z * transformation.matrix[8]) + transformation.matrix[12];
        const y = (vector3.x * transformation.matrix[1]) + (vector3.y * transformation.matrix[5]) + (vector3.z * transformation.matrix[9]) + transformation.matrix[13];
        const z = (vector3.x * transformation.matrix[2]) + (vector3.y * transformation.matrix[6]) + (vector3.z * transformation.matrix[10]) + transformation.matrix[14];
        const w = (vector3.x * transformation.matrix[3]) + (vector3.y * transformation.matrix[7]) + (vector3.z * transformation.matrix[11]) + transformation.matrix[15];
        
        return new Vector3(x / w, y / w, z / w);
    }

    static TransformNormal(vector3, transformation) {
        const x = (vector3.x * transformation.matrix[0]) + (vector3.y * transformation.matrix[4]) + (vector3.z * transformation.matrix[8]);
        const y = (vector3.x * transformation.matrix[1]) + (vector3.y * transformation.matrix[5]) + (vector3.z * transformation.matrix[9]);
        const z = (vector3.x * transformation.matrix[2]) + (vector3.y * transformation.matrix[6]) + (vector3.z * transformation.matrix[10]);
        
        return new Vector3(x, y, z);
    }

    add(vector3) {
        return new Vector3(this.x + vector3.x, this.y + vector3.y, this.z + vector3.z)
    }

    subtract(vector3) {
        return new Vector3(this.x - vector3.x, this.y - vector3.y, this.z - vector3.z)
    }

    multiply(vector3) {
        return new Vector3(this.x * vector3.x, this.y * vector3.y, this.z * vector3.z)
    }

    divide(vector3) {
        return new Vector3(this.x / vector3.x, this.y / vector3.y, this.z / vector3.z)
    }

    get not() {
        return new Vector3(-this.x, -this.y, -this.z)
    }

    get size() {
        return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z)
    }

    normalize() {
        if (this.size === 0) { return }

        const scaler = 1 / this.size
        this.x *= scaler;
        this.y *= scaler;
        this.z *= scaler;
    }

    scale(scaler) {
        return new Vector3(this.x * scaler, this.y * scaler, this.z * scaler)
    }

    equals(vector3) {
        return this.x === vector3.x && this.y === vector3.y && this.z === vector3.z
    }
}

class RGBA {
    constructor(r, g, b, a) {
        this.r = r
        this.g = g
        this.b = b
        this.a = a
    }
}

export {
    Vector2,
    Vector3,
    RGBA
}