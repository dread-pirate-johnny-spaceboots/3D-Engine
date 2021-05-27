
class Camera {
  constructor(initialLoc, initialTarget) {
    this.location = initialLoc;
    this.target = initialTarget;
  }

}

class Vector2 {
  constructor(initX, initY) {
    if (initX instanceof Vector2) {
      this.x = initX.x;
      this.y = initX.y;
    } else {
      this.x = initX;
      this.y = initY;
    }
  }

  add(vector2) {
    return new Vector2(this.x + vector2.x, this.y + vector2.y);
  }

  subtract(vector2) {
    return new Vector2(this.x - vector2.x, this.y - vector2.y);
  }

  get not() {
    return new Vector2(-this.x, -this.y);
  }

  scale(scaler) {
    return new Vector2(this.x * scaler, this.y * scaler);
  }

  equals(vector2) {
    return this.x === vector2.x && this.y === vector2.y;
  }

  get size() {
    return Math.sqrt(this.x * this.x + this.y * this.y);
  }

  normalize() {
    if (this.size === 0) {
      return;
    }

    const scaler = 1 / this.size;
    this.x *= scaler;
    this.y *= scaler;
  }

  static Identity() {
    return new Vector2(0, 0);
  }

  static Normalize(vector2) {
    let vector = new Vector2(vector2);
    vector.normalize();
    return vector;
  }

  static Min(v2A, v2B) {
    return new Vector2(v2A.x < v2B.x ? v2A.x : v2B.x, v2A.y < v2B.y ? v2A.y : v2B.y);
  }

  static Max(v2A, v2B) {
    return new Vector2(v2A.x > v2B.x ? v2A.x : v2B.x, v2A.y > v2B.y ? v2A.y : v2B.y);
  }

  static Transform(vector2, transformation) {
    return new Vector2(vector2.x * transformation.matrix[0] + vector2.y * transformation.matrix[4], vector2.x * transformation.matrix[1] + vector2.y * transformation.matrix[5]);
  }

  toString() {}

}

class Vector3 {
  constructor(x, y, z) {
    if (x instanceof Vector3) {
      this.x = x.x;
      this.y = x.y;
      this.z = x.z;
    } else {
      this.x = x;
      this.y = y;
      this.z = z;
    }
  }

  static Zero() {
    return new Vector3(0, 0, 0);
  }

  static Up() {
    return new Vector3(0, 1, 0);
  }

  static Dot(v1, v2) {
    return v1.x * v2.x + v1.y * v2.y + v1.z * v2.z;
  }

  static Cross(v1, v2) {
    return new Vector3(v1.y * v2.z - v1.z * v2.y, v1.z * v2.x - v1.x * v2.z, v1.x * v2.y - v1.y * v2.x);
  }

  static Normalize(vector3) {
    const v = new Vector3(vector3);
    v.normalize();
    return v;
  }

  static Distance(v1, v2) {
    const dist = Vector3.DistanceSquared(v1, v2);
    return Math.sqrt(dist);
  }

  static DistanceSquared(v1, v2) {
    const x = v1.x - v2.x;
    const y = v1.y - v2.y;
    const z = v1.z - v2.z;
    return x * x + y * y + z * z;
  }

  static TransformCoordinates(vector3, transformation) {
    const x = vector3.x * transformation.matrix[0] + vector3.y * transformation.matrix[4] + vector3.z * transformation.matrix[8] + transformation.matrix[12];
    const y = vector3.x * transformation.matrix[1] + vector3.y * transformation.matrix[5] + vector3.z * transformation.matrix[9] + transformation.matrix[13];
    const z = vector3.x * transformation.matrix[2] + vector3.y * transformation.matrix[6] + vector3.z * transformation.matrix[10] + transformation.matrix[14];
    const w = vector3.x * transformation.matrix[3] + vector3.y * transformation.matrix[7] + vector3.z * transformation.matrix[11] + transformation.matrix[15];
    return new Vector3(x / w, y / w, z / w);
  }

  static TransformNormal(vector3, transformation) {
    const x = vector3.x * transformation.matrix[0] + vector3.y * transformation.matrix[4] + vector3.z * transformation.matrix[8];
    const y = vector3.x * transformation.matrix[1] + vector3.y * transformation.matrix[5] + vector3.z * transformation.matrix[9];
    const z = vector3.x * transformation.matrix[2] + vector3.y * transformation.matrix[6] + vector3.z * transformation.matrix[10];
    return new Vector3(x, y, z);
  }

  add(vector3) {
    return new Vector3(this.x + vector3.x, this.y + vector3.y, this.z + vector3.z);
  }

  subtract(vector3) {
    return new Vector3(this.x - vector3.x, this.y - vector3.y, this.z - vector3.z);
  }

  multiply(vector3) {
    return new Vector3(this.x * vector3.x, this.y * vector3.y, this.z * vector3.z);
  }

  divide(vector3) {
    return new Vector3(this.x / vector3.x, this.y / vector3.y, this.z / vector3.z);
  }

  get not() {
    return new Vector3(-this.x, -this.y, -this.z);
  }

  get size() {
    return Math.sqrt(this.x * this.x + this.y * this.y + this.z * this.z);
  }

  normalize() {
    if (this.size === 0) {
      return;
    }

    const scaler = 1 / this.size;
    this.x *= scaler;
    this.y *= scaler;
    this.z *= scaler;
  }

  scale(scaler) {
    return new Vector3(this.x * scaler, this.y * scaler, this.z * scaler);
  }

  equals(vector3) {
    return this.x === vector3.x && this.y === vector3.y && this.z === vector3.z;
  }

}

class RGBA {
  constructor(r, g, b, a) {
    this.r = r;
    this.g = g;
    this.b = b;
    this.a = a;
  }

}

class Matrix {
  constructor(v1a, v1b, v1c, v1d, v2a, v2b, v2c, v2d, v3a, v3b, v3c, v3d, v4a, v4b, v4c, v4d) {
    const values = [v1a, v1b, v1c, v1d, v2a, v2b, v2c, v2d, v3a, v3b, v3c, v3d, v4a, v4b, v4c, v4d];

    if (v1a instanceof Matrix) {
      this.matrix = [v1a.matrix[0], v1a.matrix[1], v1a.matrix[2], v1a.matrix[3], v1a.matrix[4], v1a.matrix[5], v1a.matrix[6], v1a.matrix[7], v1a.matrix[8], v1a.matrix[9], v1a.matrix[10], v1a.matrix[11], v1a.matrix[12], v1a.matrix[13], v1a.matrix[14], v1a.matrix[15]];
    } else {
      this.matrix = !values.includes(undefined) ? values : [];
    }
  }

  static Identity() {
    return new Matrix(1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1);
  }

  static Zero() {
    return new Matrix(0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0);
  }

  static RotationX(angle) {
    const rotation = Matrix.Zero();
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    rotation.matrix[0] = 1;
    rotation.matrix[15] = 1;
    rotation.matrix[5] = cos;
    rotation.matrix[10] = cos;
    rotation.matrix[9] = -sin;
    rotation.matrix[6] = sin;
    return rotation;
  }

  static RotationY(angle) {
    const rotation = Matrix.Zero();
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    rotation.matrix[5] = 1;
    rotation.matrix[15] = 1;
    rotation.matrix[0] = cos;
    rotation.matrix[2] = -sin;
    rotation.matrix[8] = sin;
    rotation.matrix[10] = cos;
    return rotation;
  }

  static RotationZ(angle) {
    const rotation = Matrix.Zero();
    const sin = Math.sin(angle);
    const cos = Math.cos(angle);
    rotation.matrix[10] = 1;
    rotation.matrix[15] = 1;
    rotation.matrix[0] = cos;
    rotation.matrix[1] = sin;
    rotation.matrix[4] = -sin;
    rotation.matrix[5] = cos;
    return rotation;
  }

  static RotationAxis(axis, angle) {
    const sin = Math.sin(-angle);
    const cos = Math.cos(-angle);
    const cos1 = 1 - cos;
    axis.normalize();
    const rotation = Matrix.Zero();
    rotation.matrix[0] = axis.x * axis.x * cos1 + cos;
    rotation.matrix[1] = axis.x * axis.y * cos1 - axis.z * sin;
    rotation.matrix[2] = axis.x * axis.z * cos1 + axis.y * sin;
    rotation.matrix[3] = 0.0;
    rotation.matrix[4] = axis.y * axis.x * cos1 + axis.z * sin;
    rotation.matrix[5] = axis.y * axis.y * cos1 + cos;
    rotation.matrix[6] = axis.y * axis.z * cos1 - axis.x * sin;
    rotation.matrix[7] = 0.0;
    rotation.matrix[8] = axis.z * axis.x * cos1 - axis.y * sin;
    rotation.matrix[9] = axis.z * axis.y * cos1 + axis.x * sin;
    rotation.matrix[10] = axis.z * axis.z * cos1 + cos;
    rotation.matrix[11] = 0.0;
    rotation.matrix[15] = 1.0;
    return rotation;
  }

  static RotationYawPitchRoll(yaw, pitch, roll) {
    const rotYaw = Matrix.RotationY(yaw);
    const rotPitch = Matrix.RotationX(pitch);
    const rotRoll = Matrix.RotationZ(roll);
    return rotRoll.multiply(rotPitch.multiply(rotYaw));
  }

  static Scaler(x, y, z) {
    const scaler = Matrix.Zero();
    scaler.matrix[0] = x;
    scaler.matrix[5] = y;
    scaler.matrix[10] = z;
    scaler.matrix[15] = 1;
    return scaler;
  }

  static Translation(x, y, z) {
    const translation = Matrix.Identity();
    translation.matrix[12] = x;
    translation.matrix[13] = y;
    translation.matrix[14] = z;
    return translation;
  }

  static LookAtLH(eye, target, up) {
    const zAxis = target.subtract(eye);
    zAxis.normalize();
    const xAxis = Vector3.Cross(up, zAxis);
    xAxis.normalize();
    const yAxis = Vector3.Cross(zAxis, xAxis);
    yAxis.normalize();
    const eyeX = -Vector3.Dot(xAxis, eye);
    const eyeY = -Vector3.Dot(yAxis, eye);
    const eyeZ = -Vector3.Dot(zAxis, eye);
    return new Matrix(xAxis.x, yAxis.x, zAxis.x, 0, xAxis.y, yAxis.y, zAxis.y, 0, xAxis.z, yAxis.z, zAxis.z, 0, eyeX, eyeY, eyeZ, 1);
  }

  static PerspectiveLH(width, height, zNear, zFar) {
    const m = Matrix.Zero();
    m.matrix[0] = 2 * zNear / width;
    m.matrix[1] = m.matrix[2] = m.matrix[3] = 0.0;
    m.matrix[5] = 2.0 * zNear / height;
    m.matrix[4] = m.matrix[6] = m.matrix[7] = 0.0;
    m.matrix[10] = -zFar / (zNear - zFar);
    m.matrix[8] = m.matrix[9] = 0.0;
    m.matrix[11] = 1.0;
    m.matrix[12] = m.matrix[13] = m.matrix[15] = 0.0;
    m.matrix[14] = zNear * zFar / (zNear - zFar);
    return m;
  }

  static PerspectiveForLH(fov, aspect, zNear, zFar) {
    const m = Matrix.Zero();
    const tan = 1 / Math.tan(fov * .5);
    m.matrix[0] = tan / aspect;
    m.matrix[1] = m.matrix[2] = m.matrix[3] = 0.0;
    m.matrix[5] = tan;
    m.matrix[4] = m.matrix[6] = m.matrix[7] = 0.0;
    m.matrix[8] = m.matrix[9] = 0.0;
    m.matrix[10] = -zFar / (zNear - zFar);
    m.matrix[11] = 1.0;
    m.matrix[12] = m.matrix[13] = m.matrix[15] = 0.0;
    m.matrix[14] = zNear * zFar / (zNear - zFar);
    return m;
  }

  static Transpose(matrix) {
    const m = new Matrix();
    m.matrix[0] = matrix.matrix[0];
    m.matrix[1] = matrix.matrix[4];
    m.matrix[2] = matrix.matrix[8];
    m.matrix[3] = matrix.matrix[12];
    m.matrix[4] = matrix.matrix[1];
    m.matrix[5] = matrix.matrix[5];
    m.matrix[6] = matrix.matrix[9];
    m.matrix[7] = matrix.matrix[13];
    m.matrix[8] = matrix.matrix[2];
    m.matrix[9] = matrix.matrix[6];
    m.matrix[10] = matrix.matrix[10];
    m.matrix[11] = matrix.matrix[14];
    m.matrix[12] = matrix.matrix[3];
    m.matrix[13] = matrix.matrix[7];
    m.matrix[14] = matrix.matrix[11];
    m.matrix[15] = matrix.matrix[15];
    return m;
  }

  isIdentity() {
    if (this.matrix[0] != 1 || this.matrix[5] != 1 || this.matrix[10] != 1 || this.matrix[15] != 1) {
      return false;
    }

    if (this.matrix[12] != 0 || this.matrix[13] != 0 || this.matrix[14] != 0 || this.matrix[4] != 0 || this.matrix[6] != 0 || this.matrix[7] != 0 || this.matrix[8] != 0 || this.matrix[9] != 0 || this.matrix[11] != 0 || this.matrix[12] != 0 || this.matrix[13] != 0 || this.matrix[14] != 0) {
      return false;
    }

    return true;
  }

  multiply(matrix) {
    const m = new Matrix();
    m.matrix[0] = this.matrix[0] * matrix.matrix[0] + this.matrix[1] * matrix.matrix[4] + this.matrix[2] * matrix.matrix[8] + this.matrix[3] * matrix.matrix[12];
    m.matrix[1] = this.matrix[0] * matrix.matrix[1] + this.matrix[1] * matrix.matrix[5] + this.matrix[2] * matrix.matrix[9] + this.matrix[3] * matrix.matrix[13];
    m.matrix[2] = this.matrix[0] * matrix.matrix[2] + this.matrix[1] * matrix.matrix[6] + this.matrix[2] * matrix.matrix[10] + this.matrix[3] * matrix.matrix[14];
    m.matrix[3] = this.matrix[0] * matrix.matrix[3] + this.matrix[1] * matrix.matrix[7] + this.matrix[2] * matrix.matrix[11] + this.matrix[3] * matrix.matrix[15];
    m.matrix[4] = this.matrix[4] * matrix.matrix[0] + this.matrix[5] * matrix.matrix[4] + this.matrix[6] * matrix.matrix[8] + this.matrix[7] * matrix.matrix[12];
    m.matrix[5] = this.matrix[4] * matrix.matrix[1] + this.matrix[5] * matrix.matrix[5] + this.matrix[6] * matrix.matrix[9] + this.matrix[7] * matrix.matrix[13];
    m.matrix[6] = this.matrix[4] * matrix.matrix[2] + this.matrix[5] * matrix.matrix[6] + this.matrix[6] * matrix.matrix[10] + this.matrix[7] * matrix.matrix[14];
    m.matrix[7] = this.matrix[4] * matrix.matrix[3] + this.matrix[5] * matrix.matrix[7] + this.matrix[6] * matrix.matrix[11] + this.matrix[7] * matrix.matrix[15];
    m.matrix[8] = this.matrix[8] * matrix.matrix[0] + this.matrix[9] * matrix.matrix[4] + this.matrix[10] * matrix.matrix[8] + this.matrix[11] * matrix.matrix[12];
    m.matrix[9] = this.matrix[8] * matrix.matrix[1] + this.matrix[9] * matrix.matrix[5] + this.matrix[10] * matrix.matrix[9] + this.matrix[11] * matrix.matrix[13];
    m.matrix[10] = this.matrix[8] * matrix.matrix[2] + this.matrix[9] * matrix.matrix[6] + this.matrix[10] * matrix.matrix[10] + this.matrix[11] * matrix.matrix[14];
    m.matrix[11] = this.matrix[8] * matrix.matrix[3] + this.matrix[9] * matrix.matrix[7] + this.matrix[10] * matrix.matrix[11] + this.matrix[11] * matrix.matrix[15];
    m.matrix[12] = this.matrix[12] * matrix.matrix[0] + this.matrix[13] * matrix.matrix[4] + this.matrix[14] * matrix.matrix[8] + this.matrix[15] * matrix.matrix[12];
    m.matrix[13] = this.matrix[12] * matrix.matrix[1] + this.matrix[13] * matrix.matrix[5] + this.matrix[14] * matrix.matrix[9] + this.matrix[15] * matrix.matrix[13];
    m.matrix[14] = this.matrix[12] * matrix.matrix[2] + this.matrix[13] * matrix.matrix[6] + this.matrix[14] * matrix.matrix[10] + this.matrix[15] * matrix.matrix[14];
    m.matrix[15] = this.matrix[12] * matrix.matrix[3] + this.matrix[13] * matrix.matrix[7] + this.matrix[14] * matrix.matrix[11] + this.matrix[15] * matrix.matrix[15];
    return m;
  }

  equal(matrix) {
    return this.matrix[0] === matrix.matrix[0] && this.matrix[1] === matrix.matrix[1] && this.matrix[2] === matrix.matrix[2] && this.matrix[3] === matrix.matrix[3] && this.matrix[4] === matrix.matrix[4] && this.matrix[5] === matrix.matrix[5] && this.matrix[6] === matrix.matrix[6] && this.matrix[7] === matrix.matrix[7] && this.matrix[8] === matrix.matrix[8] && this.matrix[9] === matrix.matrix[9] && this.matrix[10] === matrix.matrix[10] && this.matrix[11] === matrix.matrix[11] && this.matrix[12] === matrix.matrix[12] && this.matrix[13] === matrix.matrix[13] && this.matrix[14] === matrix.matrix[14] && this.matrix[15] === matrix.matrix[15];
  }

  determinant() {
    const d1 = this.matrix[10] * this.matrix[15] - this.matrix[11] * this.matrix[14];
    const d2 = this.matrix[9] * this.matrix[15] - this.matrix[11] * this.matrix[13];
    const d3 = this.matrix[9] * this.matrix[14] - this.matrix[10] * this.matrix[13];
    const d4 = this.matrix[8] * this.matrix[15] - this.matrix[11] * this.matrix[12];
    const d5 = this.matrix[8] * this.matrix[14] - this.matrix[10] * this.matrix[12];
    const d6 = this.matrix[8] * this.matrix[13] - this.matrix[9] * this.matrix[12];
    return this.matrix[0] * (this.matrix[5] * d1 - this.matrix[6] * d2 + this.matrix[7] * d3) - this.matrix[1] * (this.matrix[4] * d1 - this.matrix[6] * d4 + this.matrix[7] * d5) + this.matrix[2] * (this.matrix[4] * d2 - this.matrix[5] * d4 + this.matrix[7] * d6) - this.matrix[3] * (this.matrix[4] * d3 - this.matrix[5] * d5 + this.matrix[6] * d6);
  }

  invert() {
    const i1 = this.matrix[0];
    const i2 = this.matrix[1];
    const i3 = this.matrix[2];
    const i4 = this.matrix[3];
    const i5 = this.matrix[4];
    const i6 = this.matrix[5];
    const i7 = this.matrix[6];
    const i8 = this.matrix[7];
    const i9 = this.matrix[8];
    const i10 = this.matrix[9];
    const i11 = this.matrix[10];
    const i12 = this.matrix[11];
    const i13 = this.matrix[12];
    const i14 = this.matrix[13];
    const i15 = this.matrix[14];
    const i16 = this.matrix[15];
    const i17 = i11 * i16 - i12 * i15;
    const i18 = i10 * i16 - i12 * i14;
    const i19 = i10 * i15 - i11 * i14;
    const i20 = i9 * i16 - i12 * i13;
    const i21 = i9 * i15 - i11 * i13;
    const i22 = i9 * i14 - i10 * i13;
    const i23 = i6 * i17 - i7 * i18 + i8 * i19;
    const i24 = -(i5 * i17 - i7 * i20 + i8 * i21);
    const i25 = i5 * i18 - i6 * i20 + i8 * i22;
    const i26 = -(i5 * i19 - i6 * i21 + i7 * i22);
    const i27 = 1.0 / (i1 * i23 + i2 * i24 + i3 * i25 + i4 * i26);
    const i28 = i7 * i16 - i8 * i15;
    const i29 = i6 * i16 - i8 * i14;
    const i30 = i6 * i15 - i7 * i14;
    const i31 = i5 * i16 - i8 * i13;
    const i32 = i5 * i15 - i7 * i13;
    const i33 = i5 * i14 - i6 * i13;
    const i34 = i7 * i12 - i8 * i11;
    const i35 = i6 * i12 - i8 * i10;
    const i36 = i6 * i11 - i7 * i10;
    const i37 = i5 * i12 - i8 * i9;
    const i38 = i5 * i11 - i7 * i9;
    const i39 = i5 * i10 - i6 * i9;
    this.matrix[0] = i23 * i27;
    this.matrix[4] = i24 * i27;
    this.matrix[8] = i25 * i27;
    this.matrix[12] = i26 * i27;
    this.matrix[1] = -(i2 * i17 - i3 * i18 + i4 * i19) * i27;
    this.matrix[5] = (i1 * i17 - i3 * i20 + i4 * i21) * i27;
    this.matrix[9] = -(i1 * i18 - i2 * i20 + i4 * i22) * i27;
    this.matrix[13] = (i1 * i19 - i2 * i21 + i3 * i22) * i27;
    this.matrix[2] = (i2 * i28 - i3 * i29 + i4 * i30) * i27;
    this.matrix[6] = -(i1 * i28 - i3 * i31 + i4 * i32) * i27;
    this.matrix[10] = (i1 * i29 - i2 * i31 + i4 * i33) * i27;
    this.matrix[14] = -(i1 * i30 - i2 * i32 + i3 * i33) * i27;
    this.matrix[3] = -(i2 * i34 - i3 * i35 + i4 * i36) * i27;
    this.matrix[7] = (i1 * i34 - i3 * i37 + i4 * i38) * i27;
    this.matrix[11] = -(i1 * i35 - i2 * i37 + i4 * i39) * i27;
    this.matrix[15] = (i1 * i36 - i2 * i38 + i3 * i39) * i27;
  }

}

class Viewport {
  constructor(canvas) {
    this.canvas = canvas;
    this.context = this.canvas.getContext('2d');
    this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  clear() {
    this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height);
  }

  flush() {
    this.context.putImageData(this.buffer, 0, 0);
  }

  plotPixel(x, y, color) {
    const index = ((x >> 0) + (y >> 0) * this.canvas.width) * 4; // 4 pixel data array entries per color [r,g,b,a]

    this.buffer.data[index] = color.r * 255;
    this.buffer.data[index + 1] = color.g * 255;
    this.buffer.data[index + 2] = color.b * 255;
    this.buffer.data[index + 3] = color.a * 255;
  }

  project2D(vector3, transformationMatrix) {
    const w = this.canvas.width;
    const h = this.canvas.height;
    const point = Vector3.TransformCoordinates(vector3, transformationMatrix);
    const x = point.x * w + w / 2 >> 0;
    const y = point.y * h + h / 2 >> 0;
    return new Vector2(x, y);
  }

  render(camera, meshes) {
    const viewMatrix = Matrix.LookAtLH(camera.location, camera.target, Vector3.Up());
    const projMatrix = Matrix.PerspectiveForLH(0.78, this.canvas.width / this.canvas.height, 0.01, 1.0);

    for (const mesh of meshes) {
      if (mesh == undefined) {
        continue;
      } // meshes on actors can be loaded async, if its not there yet just continue


      const worldMatrix = Matrix.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z).multiply(Matrix.Translation(mesh.location.x, mesh.location.y, mesh.location.z));
      const transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projMatrix);

      for (const face of mesh.faces) {
        const vertexA = mesh.verticies[face.a];
        const vertexB = mesh.verticies[face.b];
        const vertexC = mesh.verticies[face.c];
        const pixelA = this.project2D(vertexA, transformMatrix);
        const pixelB = this.project2D(vertexB, transformMatrix);
        const pixelC = this.project2D(vertexC, transformMatrix);
        this.drawLine(pixelA, pixelB);
        this.drawLine(pixelB, pixelC);
        this.drawLine(pixelC, pixelA);
      }
    }
  }

  drawVertex(vector3) {
    if (vector3.x >= 0 && vector3.y >= 0 && vector3.x < this.canvas.width && vector3.y < this.canvas.height) {
      this.plotPixel(vector3.x, vector3.y, new RGBA(1, 0, 0, 1));
    }
  }

  drawLine(v3Start, v3End) {
    // Bresenham's line algo
    let x0 = v3Start.x | 0;
    let y0 = v3Start.y | 0;
    const x1 = v3End.x | 0;
    const y1 = v3End.y | 0;
    const dx = Math.abs(x1 - x0);
    const dy = Math.abs(y1 - y0);
    const sx = x0 < x1 ? 1 : -1;
    const sy = y0 < y1 ? 1 : -1;
    let err = dx - dy;

    while (true) {
      this.plotPixel(x0, y0, new RGBA(1, 0, 0, 1));
      if (x0 == x1 && y0 == y1) break;
      const dblErr = err * 2;

      if (dblErr > -dy) {
        err -= dy;
        x0 += sx;
      }

      if (dblErr < dx) {
        err += dx;
        y0 += sy;
      }
    }
  }

}

class Engine {
  constructor() {
    //this.meshes = []
    this.scene = null;
    this.camera = null;
    this.canvas = null;
    this.viewport = null;
    this.started = null;
    this.lastframe = null;
    this.draw = this.draw.bind(this);
  }

  init(canvas) {
    this.canvas = canvas;
    this.viewport = new Viewport(this.canvas);
    this.camera = new Camera(Vector3.Zero(), Vector3.Zero());
    this.camera.location = new Vector3(0, 0, 10);
    this.camera.target = new Vector3(0, 0, 0);
    requestAnimationFrame(this.draw);
    this.canvas.dispatchEvent(new CustomEvent("GameEngineInitialized"));
  }

  setScene(scene) {
    this.scene = scene;
    requestAnimationFrame(this.draw);
  }

  draw(timestamp) {
    if (!this.scene) {
      return;
    }

    if (!this.started) {
      this.started = timestamp;
      this.lastframe = timestamp;
    }

    timestamp - this.started;
    const deltaT = timestamp - this.lastframe;
    const actorMeshes = this.scene.actors.map(actor => actor.mesh);
    this.scene.tick(deltaT);
    this.viewport.clear();
    this.viewport.render(this.camera, [...this.scene.meshes, ...actorMeshes]);
    this.viewport.flush();
    this.lastframe = timestamp;
    requestAnimationFrame(this.draw);
  }

}

class Scene {
  constructor() {
    this.actors = [];
    this.meshes = [];
  }

  addActor(actor) {
    this.actors.push(actor);
  }

  addMesh(mesh) {
    this.meshes.push(mesh);
  }

  tick(deltaTime) {
    // override in child class if you need to, but be sure to call super(deltaTime)!      
    for (const actor of this.actors) {
      actor.tick(deltaTime);
    }
  }

}

class Mesh {
  constructor(name, totalVerticies, totalFaces) {
    this.name = name;
    this.verticies = new Array(totalVerticies);
    this.faces = new Array(totalFaces);
    this.rotation = Vector3.Zero();
    this.location = Vector3.Zero();
    this.initialized = true;
  }

}

class Face {
  constructor(a, b, c) {
    this.a = a;
    this.b = b;
    this.c = c;
  }

}

class Actor {
  constructor(mesh) {
    this.mesh = mesh;
  }

  tick(deltaTime) {// override in child class
  }

}

function assert$2(condition, message) {
  if (!condition) {
    throw new Error(message || 'loader assertion failed.');
  }
}

function _typeof(obj) {
  "@babel/helpers - typeof";

  if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
    _typeof = function _typeof(obj) {
      return typeof obj;
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
    };
  }

  return _typeof(obj);
}

var globals$1 = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document
};
var global_$1 = globals$1.global || globals$1.self || globals$1.window;
var isBrowser$1 = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== 'object' || String(process) !== '[object process]' || process.browser;
var isWorker = typeof importScripts === 'function';
var matches$1 = typeof process !== 'undefined' && process.version && process.version.match(/v([0-9]*)/);
var nodeVersion = matches$1 && parseFloat(matches$1[1]) || 0;

function _defineProperty(obj, key, value) {
  if (key in obj) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
  } else {
    obj[key] = value;
  }

  return obj;
}

function createCommonjsModule(fn, module) {
	return module = { exports: {} }, fn(module, module.exports), module.exports;
}

var runtime_1 = createCommonjsModule(function (module) {
/**
 * Copyright (c) 2014-present, Facebook, Inc.
 *
 * This source code is licensed under the MIT license found in the
 * LICENSE file in the root directory of this source tree.
 */

var runtime = (function (exports) {

  var Op = Object.prototype;
  var hasOwn = Op.hasOwnProperty;
  var undefined$1; // More compressible than void 0.
  var $Symbol = typeof Symbol === "function" ? Symbol : {};
  var iteratorSymbol = $Symbol.iterator || "@@iterator";
  var asyncIteratorSymbol = $Symbol.asyncIterator || "@@asyncIterator";
  var toStringTagSymbol = $Symbol.toStringTag || "@@toStringTag";

  function define(obj, key, value) {
    Object.defineProperty(obj, key, {
      value: value,
      enumerable: true,
      configurable: true,
      writable: true
    });
    return obj[key];
  }
  try {
    // IE 8 has a broken Object.defineProperty that only works on DOM objects.
    define({}, "");
  } catch (err) {
    define = function(obj, key, value) {
      return obj[key] = value;
    };
  }

  function wrap(innerFn, outerFn, self, tryLocsList) {
    // If outerFn provided and outerFn.prototype is a Generator, then outerFn.prototype instanceof Generator.
    var protoGenerator = outerFn && outerFn.prototype instanceof Generator ? outerFn : Generator;
    var generator = Object.create(protoGenerator.prototype);
    var context = new Context(tryLocsList || []);

    // The ._invoke method unifies the implementations of the .next,
    // .throw, and .return methods.
    generator._invoke = makeInvokeMethod(innerFn, self, context);

    return generator;
  }
  exports.wrap = wrap;

  // Try/catch helper to minimize deoptimizations. Returns a completion
  // record like context.tryEntries[i].completion. This interface could
  // have been (and was previously) designed to take a closure to be
  // invoked without arguments, but in all the cases we care about we
  // already have an existing method we want to call, so there's no need
  // to create a new function object. We can even get away with assuming
  // the method takes exactly one argument, since that happens to be true
  // in every case, so we don't have to touch the arguments object. The
  // only additional allocation required is the completion record, which
  // has a stable shape and so hopefully should be cheap to allocate.
  function tryCatch(fn, obj, arg) {
    try {
      return { type: "normal", arg: fn.call(obj, arg) };
    } catch (err) {
      return { type: "throw", arg: err };
    }
  }

  var GenStateSuspendedStart = "suspendedStart";
  var GenStateSuspendedYield = "suspendedYield";
  var GenStateExecuting = "executing";
  var GenStateCompleted = "completed";

  // Returning this object from the innerFn has the same effect as
  // breaking out of the dispatch switch statement.
  var ContinueSentinel = {};

  // Dummy constructor functions that we use as the .constructor and
  // .constructor.prototype properties for functions that return Generator
  // objects. For full spec compliance, you may wish to configure your
  // minifier not to mangle the names of these two functions.
  function Generator() {}
  function GeneratorFunction() {}
  function GeneratorFunctionPrototype() {}

  // This is a polyfill for %IteratorPrototype% for environments that
  // don't natively support it.
  var IteratorPrototype = {};
  IteratorPrototype[iteratorSymbol] = function () {
    return this;
  };

  var getProto = Object.getPrototypeOf;
  var NativeIteratorPrototype = getProto && getProto(getProto(values([])));
  if (NativeIteratorPrototype &&
      NativeIteratorPrototype !== Op &&
      hasOwn.call(NativeIteratorPrototype, iteratorSymbol)) {
    // This environment has a native %IteratorPrototype%; use it instead
    // of the polyfill.
    IteratorPrototype = NativeIteratorPrototype;
  }

  var Gp = GeneratorFunctionPrototype.prototype =
    Generator.prototype = Object.create(IteratorPrototype);
  GeneratorFunction.prototype = Gp.constructor = GeneratorFunctionPrototype;
  GeneratorFunctionPrototype.constructor = GeneratorFunction;
  GeneratorFunction.displayName = define(
    GeneratorFunctionPrototype,
    toStringTagSymbol,
    "GeneratorFunction"
  );

  // Helper for defining the .next, .throw, and .return methods of the
  // Iterator interface in terms of a single ._invoke method.
  function defineIteratorMethods(prototype) {
    ["next", "throw", "return"].forEach(function(method) {
      define(prototype, method, function(arg) {
        return this._invoke(method, arg);
      });
    });
  }

  exports.isGeneratorFunction = function(genFun) {
    var ctor = typeof genFun === "function" && genFun.constructor;
    return ctor
      ? ctor === GeneratorFunction ||
        // For the native GeneratorFunction constructor, the best we can
        // do is to check its .name property.
        (ctor.displayName || ctor.name) === "GeneratorFunction"
      : false;
  };

  exports.mark = function(genFun) {
    if (Object.setPrototypeOf) {
      Object.setPrototypeOf(genFun, GeneratorFunctionPrototype);
    } else {
      genFun.__proto__ = GeneratorFunctionPrototype;
      define(genFun, toStringTagSymbol, "GeneratorFunction");
    }
    genFun.prototype = Object.create(Gp);
    return genFun;
  };

  // Within the body of any async function, `await x` is transformed to
  // `yield regeneratorRuntime.awrap(x)`, so that the runtime can test
  // `hasOwn.call(value, "__await")` to determine if the yielded value is
  // meant to be awaited.
  exports.awrap = function(arg) {
    return { __await: arg };
  };

  function AsyncIterator(generator, PromiseImpl) {
    function invoke(method, arg, resolve, reject) {
      var record = tryCatch(generator[method], generator, arg);
      if (record.type === "throw") {
        reject(record.arg);
      } else {
        var result = record.arg;
        var value = result.value;
        if (value &&
            typeof value === "object" &&
            hasOwn.call(value, "__await")) {
          return PromiseImpl.resolve(value.__await).then(function(value) {
            invoke("next", value, resolve, reject);
          }, function(err) {
            invoke("throw", err, resolve, reject);
          });
        }

        return PromiseImpl.resolve(value).then(function(unwrapped) {
          // When a yielded Promise is resolved, its final value becomes
          // the .value of the Promise<{value,done}> result for the
          // current iteration.
          result.value = unwrapped;
          resolve(result);
        }, function(error) {
          // If a rejected Promise was yielded, throw the rejection back
          // into the async generator function so it can be handled there.
          return invoke("throw", error, resolve, reject);
        });
      }
    }

    var previousPromise;

    function enqueue(method, arg) {
      function callInvokeWithMethodAndArg() {
        return new PromiseImpl(function(resolve, reject) {
          invoke(method, arg, resolve, reject);
        });
      }

      return previousPromise =
        // If enqueue has been called before, then we want to wait until
        // all previous Promises have been resolved before calling invoke,
        // so that results are always delivered in the correct order. If
        // enqueue has not been called before, then it is important to
        // call invoke immediately, without waiting on a callback to fire,
        // so that the async generator function has the opportunity to do
        // any necessary setup in a predictable way. This predictability
        // is why the Promise constructor synchronously invokes its
        // executor callback, and why async functions synchronously
        // execute code before the first await. Since we implement simple
        // async functions in terms of async generators, it is especially
        // important to get this right, even though it requires care.
        previousPromise ? previousPromise.then(
          callInvokeWithMethodAndArg,
          // Avoid propagating failures to Promises returned by later
          // invocations of the iterator.
          callInvokeWithMethodAndArg
        ) : callInvokeWithMethodAndArg();
    }

    // Define the unified helper method that is used to implement .next,
    // .throw, and .return (see defineIteratorMethods).
    this._invoke = enqueue;
  }

  defineIteratorMethods(AsyncIterator.prototype);
  AsyncIterator.prototype[asyncIteratorSymbol] = function () {
    return this;
  };
  exports.AsyncIterator = AsyncIterator;

  // Note that simple async functions are implemented on top of
  // AsyncIterator objects; they just return a Promise for the value of
  // the final result produced by the iterator.
  exports.async = function(innerFn, outerFn, self, tryLocsList, PromiseImpl) {
    if (PromiseImpl === void 0) PromiseImpl = Promise;

    var iter = new AsyncIterator(
      wrap(innerFn, outerFn, self, tryLocsList),
      PromiseImpl
    );

    return exports.isGeneratorFunction(outerFn)
      ? iter // If outerFn is a generator, return the full iterator.
      : iter.next().then(function(result) {
          return result.done ? result.value : iter.next();
        });
  };

  function makeInvokeMethod(innerFn, self, context) {
    var state = GenStateSuspendedStart;

    return function invoke(method, arg) {
      if (state === GenStateExecuting) {
        throw new Error("Generator is already running");
      }

      if (state === GenStateCompleted) {
        if (method === "throw") {
          throw arg;
        }

        // Be forgiving, per 25.3.3.3.3 of the spec:
        // https://people.mozilla.org/~jorendorff/es6-draft.html#sec-generatorresume
        return doneResult();
      }

      context.method = method;
      context.arg = arg;

      while (true) {
        var delegate = context.delegate;
        if (delegate) {
          var delegateResult = maybeInvokeDelegate(delegate, context);
          if (delegateResult) {
            if (delegateResult === ContinueSentinel) continue;
            return delegateResult;
          }
        }

        if (context.method === "next") {
          // Setting context._sent for legacy support of Babel's
          // function.sent implementation.
          context.sent = context._sent = context.arg;

        } else if (context.method === "throw") {
          if (state === GenStateSuspendedStart) {
            state = GenStateCompleted;
            throw context.arg;
          }

          context.dispatchException(context.arg);

        } else if (context.method === "return") {
          context.abrupt("return", context.arg);
        }

        state = GenStateExecuting;

        var record = tryCatch(innerFn, self, context);
        if (record.type === "normal") {
          // If an exception is thrown from innerFn, we leave state ===
          // GenStateExecuting and loop back for another invocation.
          state = context.done
            ? GenStateCompleted
            : GenStateSuspendedYield;

          if (record.arg === ContinueSentinel) {
            continue;
          }

          return {
            value: record.arg,
            done: context.done
          };

        } else if (record.type === "throw") {
          state = GenStateCompleted;
          // Dispatch the exception by looping back around to the
          // context.dispatchException(context.arg) call above.
          context.method = "throw";
          context.arg = record.arg;
        }
      }
    };
  }

  // Call delegate.iterator[context.method](context.arg) and handle the
  // result, either by returning a { value, done } result from the
  // delegate iterator, or by modifying context.method and context.arg,
  // setting context.delegate to null, and returning the ContinueSentinel.
  function maybeInvokeDelegate(delegate, context) {
    var method = delegate.iterator[context.method];
    if (method === undefined$1) {
      // A .throw or .return when the delegate iterator has no .throw
      // method always terminates the yield* loop.
      context.delegate = null;

      if (context.method === "throw") {
        // Note: ["return"] must be used for ES3 parsing compatibility.
        if (delegate.iterator["return"]) {
          // If the delegate iterator has a return method, give it a
          // chance to clean up.
          context.method = "return";
          context.arg = undefined$1;
          maybeInvokeDelegate(delegate, context);

          if (context.method === "throw") {
            // If maybeInvokeDelegate(context) changed context.method from
            // "return" to "throw", let that override the TypeError below.
            return ContinueSentinel;
          }
        }

        context.method = "throw";
        context.arg = new TypeError(
          "The iterator does not provide a 'throw' method");
      }

      return ContinueSentinel;
    }

    var record = tryCatch(method, delegate.iterator, context.arg);

    if (record.type === "throw") {
      context.method = "throw";
      context.arg = record.arg;
      context.delegate = null;
      return ContinueSentinel;
    }

    var info = record.arg;

    if (! info) {
      context.method = "throw";
      context.arg = new TypeError("iterator result is not an object");
      context.delegate = null;
      return ContinueSentinel;
    }

    if (info.done) {
      // Assign the result of the finished delegate to the temporary
      // variable specified by delegate.resultName (see delegateYield).
      context[delegate.resultName] = info.value;

      // Resume execution at the desired location (see delegateYield).
      context.next = delegate.nextLoc;

      // If context.method was "throw" but the delegate handled the
      // exception, let the outer generator proceed normally. If
      // context.method was "next", forget context.arg since it has been
      // "consumed" by the delegate iterator. If context.method was
      // "return", allow the original .return call to continue in the
      // outer generator.
      if (context.method !== "return") {
        context.method = "next";
        context.arg = undefined$1;
      }

    } else {
      // Re-yield the result returned by the delegate method.
      return info;
    }

    // The delegate iterator is finished, so forget it and continue with
    // the outer generator.
    context.delegate = null;
    return ContinueSentinel;
  }

  // Define Generator.prototype.{next,throw,return} in terms of the
  // unified ._invoke helper method.
  defineIteratorMethods(Gp);

  define(Gp, toStringTagSymbol, "Generator");

  // A Generator should always return itself as the iterator object when the
  // @@iterator function is called on it. Some browsers' implementations of the
  // iterator prototype chain incorrectly implement this, causing the Generator
  // object to not be returned from this call. This ensures that doesn't happen.
  // See https://github.com/facebook/regenerator/issues/274 for more details.
  Gp[iteratorSymbol] = function() {
    return this;
  };

  Gp.toString = function() {
    return "[object Generator]";
  };

  function pushTryEntry(locs) {
    var entry = { tryLoc: locs[0] };

    if (1 in locs) {
      entry.catchLoc = locs[1];
    }

    if (2 in locs) {
      entry.finallyLoc = locs[2];
      entry.afterLoc = locs[3];
    }

    this.tryEntries.push(entry);
  }

  function resetTryEntry(entry) {
    var record = entry.completion || {};
    record.type = "normal";
    delete record.arg;
    entry.completion = record;
  }

  function Context(tryLocsList) {
    // The root entry object (effectively a try statement without a catch
    // or a finally block) gives us a place to store values thrown from
    // locations where there is no enclosing try statement.
    this.tryEntries = [{ tryLoc: "root" }];
    tryLocsList.forEach(pushTryEntry, this);
    this.reset(true);
  }

  exports.keys = function(object) {
    var keys = [];
    for (var key in object) {
      keys.push(key);
    }
    keys.reverse();

    // Rather than returning an object with a next method, we keep
    // things simple and return the next function itself.
    return function next() {
      while (keys.length) {
        var key = keys.pop();
        if (key in object) {
          next.value = key;
          next.done = false;
          return next;
        }
      }

      // To avoid creating an additional object, we just hang the .value
      // and .done properties off the next function object itself. This
      // also ensures that the minifier will not anonymize the function.
      next.done = true;
      return next;
    };
  };

  function values(iterable) {
    if (iterable) {
      var iteratorMethod = iterable[iteratorSymbol];
      if (iteratorMethod) {
        return iteratorMethod.call(iterable);
      }

      if (typeof iterable.next === "function") {
        return iterable;
      }

      if (!isNaN(iterable.length)) {
        var i = -1, next = function next() {
          while (++i < iterable.length) {
            if (hasOwn.call(iterable, i)) {
              next.value = iterable[i];
              next.done = false;
              return next;
            }
          }

          next.value = undefined$1;
          next.done = true;

          return next;
        };

        return next.next = next;
      }
    }

    // Return an iterator with no values.
    return { next: doneResult };
  }
  exports.values = values;

  function doneResult() {
    return { value: undefined$1, done: true };
  }

  Context.prototype = {
    constructor: Context,

    reset: function(skipTempReset) {
      this.prev = 0;
      this.next = 0;
      // Resetting context._sent for legacy support of Babel's
      // function.sent implementation.
      this.sent = this._sent = undefined$1;
      this.done = false;
      this.delegate = null;

      this.method = "next";
      this.arg = undefined$1;

      this.tryEntries.forEach(resetTryEntry);

      if (!skipTempReset) {
        for (var name in this) {
          // Not sure about the optimal order of these conditions:
          if (name.charAt(0) === "t" &&
              hasOwn.call(this, name) &&
              !isNaN(+name.slice(1))) {
            this[name] = undefined$1;
          }
        }
      }
    },

    stop: function() {
      this.done = true;

      var rootEntry = this.tryEntries[0];
      var rootRecord = rootEntry.completion;
      if (rootRecord.type === "throw") {
        throw rootRecord.arg;
      }

      return this.rval;
    },

    dispatchException: function(exception) {
      if (this.done) {
        throw exception;
      }

      var context = this;
      function handle(loc, caught) {
        record.type = "throw";
        record.arg = exception;
        context.next = loc;

        if (caught) {
          // If the dispatched exception was caught by a catch block,
          // then let that catch block handle the exception normally.
          context.method = "next";
          context.arg = undefined$1;
        }

        return !! caught;
      }

      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        var record = entry.completion;

        if (entry.tryLoc === "root") {
          // Exception thrown outside of any try block that could handle
          // it, so set the completion value of the entire function to
          // throw the exception.
          return handle("end");
        }

        if (entry.tryLoc <= this.prev) {
          var hasCatch = hasOwn.call(entry, "catchLoc");
          var hasFinally = hasOwn.call(entry, "finallyLoc");

          if (hasCatch && hasFinally) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            } else if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else if (hasCatch) {
            if (this.prev < entry.catchLoc) {
              return handle(entry.catchLoc, true);
            }

          } else if (hasFinally) {
            if (this.prev < entry.finallyLoc) {
              return handle(entry.finallyLoc);
            }

          } else {
            throw new Error("try statement without catch or finally");
          }
        }
      }
    },

    abrupt: function(type, arg) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc <= this.prev &&
            hasOwn.call(entry, "finallyLoc") &&
            this.prev < entry.finallyLoc) {
          var finallyEntry = entry;
          break;
        }
      }

      if (finallyEntry &&
          (type === "break" ||
           type === "continue") &&
          finallyEntry.tryLoc <= arg &&
          arg <= finallyEntry.finallyLoc) {
        // Ignore the finally entry if control is not jumping to a
        // location outside the try/catch block.
        finallyEntry = null;
      }

      var record = finallyEntry ? finallyEntry.completion : {};
      record.type = type;
      record.arg = arg;

      if (finallyEntry) {
        this.method = "next";
        this.next = finallyEntry.finallyLoc;
        return ContinueSentinel;
      }

      return this.complete(record);
    },

    complete: function(record, afterLoc) {
      if (record.type === "throw") {
        throw record.arg;
      }

      if (record.type === "break" ||
          record.type === "continue") {
        this.next = record.arg;
      } else if (record.type === "return") {
        this.rval = this.arg = record.arg;
        this.method = "return";
        this.next = "end";
      } else if (record.type === "normal" && afterLoc) {
        this.next = afterLoc;
      }

      return ContinueSentinel;
    },

    finish: function(finallyLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.finallyLoc === finallyLoc) {
          this.complete(entry.completion, entry.afterLoc);
          resetTryEntry(entry);
          return ContinueSentinel;
        }
      }
    },

    "catch": function(tryLoc) {
      for (var i = this.tryEntries.length - 1; i >= 0; --i) {
        var entry = this.tryEntries[i];
        if (entry.tryLoc === tryLoc) {
          var record = entry.completion;
          if (record.type === "throw") {
            var thrown = record.arg;
            resetTryEntry(entry);
          }
          return thrown;
        }
      }

      // The context.catch method must only be called with a location
      // argument that corresponds to a known catch block.
      throw new Error("illegal catch attempt");
    },

    delegateYield: function(iterable, resultName, nextLoc) {
      this.delegate = {
        iterator: values(iterable),
        resultName: resultName,
        nextLoc: nextLoc
      };

      if (this.method === "next") {
        // Deliberately forget the last sent value so that we don't
        // accidentally pass it on to the delegate.
        this.arg = undefined$1;
      }

      return ContinueSentinel;
    }
  };

  // Regardless of whether this script is executing as a CommonJS module
  // or not, return the runtime object so that we can declare the variable
  // regeneratorRuntime in the outer scope, which allows this module to be
  // injected easily by `bin/regenerator --include-runtime script.js`.
  return exports;

}(
  // If this script is executing as a CommonJS module, use module.exports
  // as the regeneratorRuntime namespace. Otherwise create a new empty
  // object. Either way, the resulting object will be used to initialize
  // the regeneratorRuntime variable at the top of this file.
  module.exports 
));

try {
  regeneratorRuntime = runtime;
} catch (accidentalStrictMode) {
  // This module should not be running in strict mode, so the above
  // assignment should always work unless something is misconfigured. Just
  // in case runtime.js accidentally runs in strict mode, we can escape
  // strict mode using a global Function call. This could conceivably fail
  // if a Content Security Policy forbids using Function, but in that case
  // the proper solution is to fix the accidental strict mode problem. If
  // you've misconfigured your bundler to force strict mode and applied a
  // CSP to forbid Function, and you're not willing to fix either of those
  // problems, please detail your unique predicament in a GitHub issue.
  Function("r", "regeneratorRuntime = r")(runtime);
}
});

var regenerator = runtime_1;

function asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
  try {
    var info = gen[key](arg);
    var value = info.value;
  } catch (error) {
    reject(error);
    return;
  }

  if (info.done) {
    resolve(value);
  } else {
    Promise.resolve(value).then(_next, _throw);
  }
}

function _asyncToGenerator(fn) {
  return function () {
    var self = this,
        args = arguments;
    return new Promise(function (resolve, reject) {
      var gen = fn.apply(self, args);

      function _next(value) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
      }

      function _throw(err) {
        asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
      }

      _next(undefined);
    });
  };
}

function getTransferList(object) {
  var recursive = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : true;
  var transfers = arguments.length > 2 ? arguments[2] : undefined;
  var transfersSet = transfers || new Set();

  if (!object) ; else if (isTransferable(object)) {
    transfersSet.add(object);
  } else if (isTransferable(object.buffer)) {
    transfersSet.add(object.buffer);
  } else if (ArrayBuffer.isView(object)) ; else if (recursive && _typeof(object) === 'object') {
    for (var key in object) {
      getTransferList(object[key], recursive, transfersSet);
    }
  }

  return transfers === undefined ? Array.from(transfersSet) : [];
}

function isTransferable(object) {
  if (!object) {
    return false;
  }

  if (object instanceof ArrayBuffer) {
    return true;
  }

  if (typeof MessagePort !== 'undefined' && object instanceof MessagePort) {
    return true;
  }

  if (typeof ImageBitmap !== 'undefined' && object instanceof ImageBitmap) {
    return true;
  }

  if (typeof OffscreenCanvas !== 'undefined' && object instanceof OffscreenCanvas) {
    return true;
  }

  return false;
}

var VERSION$5 = "2.3.13" ;
function validateLoaderVersion(loader) {
  var coreVersion = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : VERSION$5;
  assert$2(loader, 'no loader provided');
  var loaderVersion = loader.version;

  if (!coreVersion || !loaderVersion) {
    return;
  }

  coreVersion = parseVersion(coreVersion);
  loaderVersion = parseVersion(loaderVersion);
}

function parseVersion(version) {
  var parts = version.split('.').map(Number);
  return {
    major: parts[0],
    minor: parts[1]
  };
}

function _AwaitValue(value) {
  this.wrapped = value;
}

function _awaitAsyncGenerator(value) {
  return new _AwaitValue(value);
}

function AsyncGenerator(gen) {
  var front, back;

  function send(key, arg) {
    return new Promise(function (resolve, reject) {
      var request = {
        key: key,
        arg: arg,
        resolve: resolve,
        reject: reject,
        next: null
      };

      if (back) {
        back = back.next = request;
      } else {
        front = back = request;
        resume(key, arg);
      }
    });
  }

  function resume(key, arg) {
    try {
      var result = gen[key](arg);
      var value = result.value;
      var wrappedAwait = value instanceof _AwaitValue;
      Promise.resolve(wrappedAwait ? value.wrapped : value).then(function (arg) {
        if (wrappedAwait) {
          resume(key === "return" ? "return" : "next", arg);
          return;
        }

        settle(result.done ? "return" : "normal", arg);
      }, function (err) {
        resume("throw", err);
      });
    } catch (err) {
      settle("throw", err);
    }
  }

  function settle(type, value) {
    switch (type) {
      case "return":
        front.resolve({
          value: value,
          done: true
        });
        break;

      case "throw":
        front.reject(value);
        break;

      default:
        front.resolve({
          value: value,
          done: false
        });
        break;
    }

    front = front.next;

    if (front) {
      resume(front.key, front.arg);
    } else {
      back = null;
    }
  }

  this._invoke = send;

  if (typeof gen["return"] !== "function") {
    this["return"] = undefined;
  }
}

AsyncGenerator.prototype[typeof Symbol === "function" && Symbol.asyncIterator || "@@asyncIterator"] = function () {
  return this;
};

AsyncGenerator.prototype.next = function (arg) {
  return this._invoke("next", arg);
};

AsyncGenerator.prototype["throw"] = function (arg) {
  return this._invoke("throw", arg);
};

AsyncGenerator.prototype["return"] = function (arg) {
  return this._invoke("return", arg);
};

function _wrapAsyncGenerator(fn) {
  return function () {
    return new AsyncGenerator(fn.apply(this, arguments));
  };
}

function _asyncIterator(iterable) {
  var method;

  if (typeof Symbol !== "undefined") {
    if (Symbol.asyncIterator) method = iterable[Symbol.asyncIterator];
    if (method == null && Symbol.iterator) method = iterable[Symbol.iterator];
  }

  if (method == null) method = iterable["@@asyncIterator"];
  if (method == null) method = iterable["@@iterator"];
  if (method == null) throw new TypeError("Object is not async iterable");
  return method.call(iterable);
}

function _classCallCheck(instance, Constructor) {
  if (!(instance instanceof Constructor)) {
    throw new TypeError("Cannot call a class as a function");
  }
}

function _defineProperties(target, props) {
  for (var i = 0; i < props.length; i++) {
    var descriptor = props[i];
    descriptor.enumerable = descriptor.enumerable || false;
    descriptor.configurable = true;
    if ("value" in descriptor) descriptor.writable = true;
    Object.defineProperty(target, descriptor.key, descriptor);
  }
}

function _createClass(Constructor, protoProps, staticProps) {
  if (protoProps) _defineProperties(Constructor.prototype, protoProps);
  if (staticProps) _defineProperties(Constructor, staticProps);
  return Constructor;
}

var workerURLCache = new Map();
function getWorkerURL(workerSource) {
  assert$2(typeof workerSource === 'string', 'worker source');

  if (workerSource.startsWith('url(') && workerSource.endsWith(')')) {
    var workerUrl = workerSource.match(/^url\((.*)\)$/)[1];

    if (workerUrl && !workerUrl.startsWith('http')) {
      return workerUrl;
    }

    workerSource = buildScript(workerUrl);
  }

  var workerURL = workerURLCache.get(workerSource);

  if (!workerURL) {
    var blob = new Blob([workerSource], {
      type: 'application/javascript'
    });
    workerURL = URL.createObjectURL(blob);
    workerURLCache.set(workerSource, workerURL);
  }

  return workerURL;
}

function buildScript(workerUrl) {
  return "try {\n  importScripts('".concat(workerUrl, "');\n} catch (error) {\n  console.error(error);\n}");
}

var count = 0;

function defaultOnMessage(_ref) {
  var data = _ref.data,
      resolve = _ref.resolve;
  resolve(data);
}

var WorkerThread = function () {
  function WorkerThread(_ref2) {
    var source = _ref2.source,
        _ref2$name = _ref2.name,
        name = _ref2$name === void 0 ? "web-worker-".concat(count++) : _ref2$name,
        onMessage = _ref2.onMessage;

    _classCallCheck(this, WorkerThread);

    var url = getWorkerURL(source);
    this.worker = new Worker(url, {
      name: name
    });
    this.name = name;
    this.onMessage = onMessage || defaultOnMessage;
  }

  _createClass(WorkerThread, [{
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(regenerator.mark(function _callee(data) {
        var _this = this;

        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                return _context.abrupt("return", new Promise(function (resolve, reject) {
                  _this.worker.onmessage = function (event) {
                    _this.onMessage({
                      worker: _this.worker,
                      data: event.data,
                      resolve: resolve,
                      reject: reject
                    });
                  };

                  _this.worker.onerror = function (error) {
                    var message = "".concat(_this.name, ": WorkerThread.process() failed");

                    if (error.message) {
                      message += " ".concat(error.message, " ").concat(error.filename, ":").concat(error.lineno, ":").concat(error.colno);
                    }

                    var betterError = new Error(message);
                    console.error(error);
                    reject(betterError);
                  };

                  var transferList = getTransferList(data);

                  _this.worker.postMessage(data, transferList);
                }));

              case 1:
              case "end":
                return _context.stop();
            }
          }
        }, _callee);
      }));

      function process(_x) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: "destroy",
    value: function destroy() {
      this.worker.terminate();
      this.worker = null;
    }
  }]);

  return WorkerThread;
}();

var WorkerPool = function () {
  function WorkerPool(_ref) {
    var source = _ref.source,
        _ref$name = _ref.name,
        name = _ref$name === void 0 ? 'unnamed' : _ref$name,
        _ref$maxConcurrency = _ref.maxConcurrency,
        maxConcurrency = _ref$maxConcurrency === void 0 ? 1 : _ref$maxConcurrency,
        onMessage = _ref.onMessage,
        _ref$onDebug = _ref.onDebug,
        onDebug = _ref$onDebug === void 0 ? function () {} : _ref$onDebug,
        _ref$reuseWorkers = _ref.reuseWorkers,
        reuseWorkers = _ref$reuseWorkers === void 0 ? true : _ref$reuseWorkers;

    _classCallCheck(this, WorkerPool);

    this.source = source;
    this.name = name;
    this.maxConcurrency = maxConcurrency;
    this.onMessage = onMessage;
    this.onDebug = onDebug;
    this.jobQueue = [];
    this.idleQueue = [];
    this.count = 0;
    this.isDestroyed = false;
    this.reuseWorkers = reuseWorkers;
  }

  _createClass(WorkerPool, [{
    key: "destroy",
    value: function destroy() {
      this.idleQueue.forEach(function (worker) {
        return worker.destroy();
      });
      this.isDestroyed = true;
    }
  }, {
    key: "process",
    value: function process(data, jobName) {
      var _this = this;

      return new Promise(function (resolve, reject) {
        _this.jobQueue.push({
          data: data,
          jobName: jobName,
          resolve: resolve,
          reject: reject
        });

        _this._startQueuedJob();
      });
    }
  }, {
    key: "_startQueuedJob",
    value: function () {
      var _startQueuedJob2 = _asyncToGenerator(regenerator.mark(function _callee() {
        var worker, job;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                if (this.jobQueue.length) {
                  _context.next = 2;
                  break;
                }

                return _context.abrupt("return");

              case 2:
                worker = this._getAvailableWorker();

                if (worker) {
                  _context.next = 5;
                  break;
                }

                return _context.abrupt("return");

              case 5:
                job = this.jobQueue.shift();
                this.onDebug({
                  message: 'processing',
                  worker: worker.name,
                  job: job.jobName,
                  backlog: this.jobQueue.length
                });
                _context.prev = 7;
                _context.t0 = job;
                _context.next = 11;
                return worker.process(job.data);

              case 11:
                _context.t1 = _context.sent;

                _context.t0.resolve.call(_context.t0, _context.t1);

                _context.next = 18;
                break;

              case 15:
                _context.prev = 15;
                _context.t2 = _context["catch"](7);
                job.reject(_context.t2);

              case 18:
                _context.prev = 18;

                this._onWorkerDone(worker);

                return _context.finish(18);

              case 21:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this, [[7, 15, 18, 21]]);
      }));

      function _startQueuedJob() {
        return _startQueuedJob2.apply(this, arguments);
      }

      return _startQueuedJob;
    }()
  }, {
    key: "_onWorkerDone",
    value: function _onWorkerDone(worker) {
      if (this.isDestroyed) {
        worker.destroy();
        return;
      }

      if (this.reuseWorkers) {
        this.idleQueue.push(worker);
      } else {
        worker.destroy();
        this.count--;
      }

      this._startQueuedJob();
    }
  }, {
    key: "_getAvailableWorker",
    value: function _getAvailableWorker() {
      if (this.idleQueue.length > 0) {
        return this.idleQueue.shift();
      }

      if (this.count < this.maxConcurrency) {
        this.count++;
        var name = "".concat(this.name.toLowerCase(), " (#").concat(this.count, " of ").concat(this.maxConcurrency, ")");
        return new WorkerThread({
          source: this.source,
          onMessage: this.onMessage,
          name: name
        });
      }

      return null;
    }
  }]);

  return WorkerPool;
}();

var DEFAULT_MAX_CONCURRENCY = 5;

var WorkerFarm = function () {
  _createClass(WorkerFarm, null, [{
    key: "isSupported",
    value: function isSupported() {
      return typeof Worker !== 'undefined';
    }
  }]);

  function WorkerFarm(_ref) {
    var _ref$maxConcurrency = _ref.maxConcurrency,
        maxConcurrency = _ref$maxConcurrency === void 0 ? DEFAULT_MAX_CONCURRENCY : _ref$maxConcurrency,
        _ref$onMessage = _ref.onMessage,
        onMessage = _ref$onMessage === void 0 ? null : _ref$onMessage,
        _ref$onDebug = _ref.onDebug,
        onDebug = _ref$onDebug === void 0 ? function () {} : _ref$onDebug,
        _ref$reuseWorkers = _ref.reuseWorkers,
        reuseWorkers = _ref$reuseWorkers === void 0 ? true : _ref$reuseWorkers;

    _classCallCheck(this, WorkerFarm);

    this.maxConcurrency = maxConcurrency;
    this.onMessage = onMessage;
    this.onDebug = onDebug;
    this.workerPools = new Map();
    this.reuseWorkers = reuseWorkers;
  }

  _createClass(WorkerFarm, [{
    key: "setProps",
    value: function setProps(props) {
      if ('maxConcurrency' in props) {
        this.maxConcurrency = props.maxConcurrency;
      }

      if ('onDebug' in props) {
        this.onDebug = props.onDebug;
      }

      if ('reuseWorkers' in props) {
        this.reuseWorkers = props.reuseWorkers;
      }
    }
  }, {
    key: "destroy",
    value: function destroy() {
      this.workerPools.forEach(function (workerPool) {
        return workerPool.destroy();
      });
    }
  }, {
    key: "process",
    value: function () {
      var _process = _asyncToGenerator(regenerator.mark(function _callee(workerSource, workerName, data) {
        var workerPool;
        return regenerator.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                workerPool = this._getWorkerPool(workerSource, workerName);
                return _context.abrupt("return", workerPool.process(data));

              case 2:
              case "end":
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function process(_x, _x2, _x3) {
        return _process.apply(this, arguments);
      }

      return process;
    }()
  }, {
    key: "_getWorkerPool",
    value: function _getWorkerPool(workerSource, workerName) {
      var workerPool = this.workerPools.get(workerName);

      if (!workerPool) {
        workerPool = new WorkerPool({
          source: workerSource,
          name: workerName,
          onMessage: onWorkerMessage$1.bind(null, this.onMessage),
          maxConcurrency: this.maxConcurrency,
          onDebug: this.onDebug,
          reuseWorkers: this.reuseWorkers
        });
        this.workerPools.set(workerName, workerPool);
      }

      return workerPool;
    }
  }]);

  return WorkerFarm;
}();

function onWorkerMessage$1(onMessage, _ref2) {
  var worker = _ref2.worker,
      data = _ref2.data,
      resolve = _ref2.resolve,
      reject = _ref2.reject;

  if (onMessage) {
    onMessage({
      worker: worker,
      data: data,
      resolve: resolve,
      reject: reject
    });
    return;
  }

  switch (data.type) {
    case 'done':
      resolve(data.result);
      break;

    case 'error':
      reject(data.message);
      break;
  }
}

function ownKeys$a(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$a(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$a(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$a(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function requireFromFile(filename) {
  if (filename.startsWith('http')) {
    throw new Error("require from remote script not supported in Node.js: ".concat(filename));
  }

  if (!filename.startsWith('/')) {
    filename = "".concat(process.cwd(), "/").concat(filename);
  }

  return require(filename);
}
function requireFromString(code) {
  var filename = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : '';
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

  if (_typeof(filename) === 'object') {
    options = filename;
    filename = '';
  }

  options = _objectSpread$a({
    appendPaths: [],
    prependPaths: []
  }, options);

  if (typeof code !== 'string') {
    throw new Error("code must be a string, not ".concat(_typeof(code)));
  }

  var paths = Module._nodeModulePaths(path.dirname(filename));

  var parent = module.parent;
  var newModule = new Module(filename, parent);
  newModule.filename = filename;
  newModule.paths = [].concat(options.prependPaths).concat(paths).concat(options.appendPaths);

  newModule._compile(code, filename);

  if (parent && parent.children) {
    parent.children.splice(parent.children.indexOf(newModule), 1);
  }

  return newModule.exports;
}

var VERSION$4 = "2.3.13" ;
var loadLibraryPromises = {};
function loadLibrary(_x) {
  return _loadLibrary.apply(this, arguments);
}

function _loadLibrary() {
  _loadLibrary = _asyncToGenerator(regenerator.mark(function _callee(libraryUrl) {
    var moduleName,
        options,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            moduleName = _args.length > 1 && _args[1] !== undefined ? _args[1] : null;
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};

            if (moduleName) {
              libraryUrl = getLibraryUrl(libraryUrl, moduleName, options);
            }

            loadLibraryPromises[libraryUrl] = loadLibraryPromises[libraryUrl] || loadLibraryFromFile(libraryUrl);
            _context.next = 6;
            return loadLibraryPromises[libraryUrl];

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadLibrary.apply(this, arguments);
}

function getLibraryUrl(library, moduleName, options) {
  var modules = options.modules || {};

  if (modules[library]) {
    return modules[library];
  }

  if (!isBrowser$1) {
    return "modules/".concat(moduleName, "/dist/libs/").concat(library);
  }

  if (options.CDN) {
    assert$2(options.CDN.startsWith('http'));
    return "".concat(options.CDN, "/").concat(moduleName, "@").concat(VERSION$4, "/dist/libs/").concat(library);
  }

  if (isWorker) {
    return "../src/libs/".concat(library);
  }

  return "modules/".concat(moduleName, "/src/libs/").concat(library);
}

function loadLibraryFromFile(_x2) {
  return _loadLibraryFromFile.apply(this, arguments);
}

function _loadLibraryFromFile() {
  _loadLibraryFromFile = _asyncToGenerator(regenerator.mark(function _callee2(libraryUrl) {
    var _response, response, scriptSource;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (!libraryUrl.endsWith('wasm')) {
              _context2.next = 7;
              break;
            }

            _context2.next = 3;
            return fetch(libraryUrl);

          case 3:
            _response = _context2.sent;
            _context2.next = 6;
            return _response.arrayBuffer();

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 7:
            if (isBrowser$1) {
              _context2.next = 9;
              break;
            }

            return _context2.abrupt("return", requireFromFile && requireFromFile(libraryUrl));

          case 9:
            if (!isWorker) {
              _context2.next = 11;
              break;
            }

            return _context2.abrupt("return", importScripts(libraryUrl));

          case 11:
            _context2.next = 13;
            return fetch(libraryUrl);

          case 13:
            response = _context2.sent;
            _context2.next = 16;
            return response.text();

          case 16:
            scriptSource = _context2.sent;
            return _context2.abrupt("return", loadLibraryFromString(scriptSource, libraryUrl));

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadLibraryFromFile.apply(this, arguments);
}

function loadLibraryFromString(scriptSource, id) {
  if (!isBrowser$1) {
    return requireFromString && requireFromString(scriptSource, id);
  }

  if (isWorker) {
    eval.call(global_$1, scriptSource);
    return null;
  }

  var script = document.createElement('script');
  script.id = id;

  try {
    script.appendChild(document.createTextNode(scriptSource));
  } catch (e) {
    script.text = scriptSource;
  }

  document.body.appendChild(script);
  return null;
}

function getFirstCharacters$1(data) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  if (typeof data === 'string') {
    return data.slice(0, length);
  } else if (ArrayBuffer.isView(data)) {
    return getMagicString$2(data.buffer, data.byteOffset, length);
  } else if (data instanceof ArrayBuffer) {
    var byteOffset = 0;
    return getMagicString$2(data, byteOffset, length);
  }

  return '';
}
function getMagicString$2(arrayBuffer, byteOffset, length) {
  if (arrayBuffer.byteLength <= byteOffset + length) {
    return '';
  }

  var dataView = new DataView(arrayBuffer);
  var magic = '';

  for (var i = 0; i < length; i++) {
    magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
  }

  return magic;
}

function parseJSON(string) {
  try {
    return JSON.parse(string);
  } catch (_) {
    throw new Error("Failed to parse JSON from data starting with \"".concat(getFirstCharacters$1(string), "\""));
  }
}

function toArrayBuffer$1(buffer) {
  if (Buffer.isBuffer(buffer)) {
    var typedArray = new Uint8Array(buffer);
    return typedArray.buffer;
  }

  return buffer;
}

function _createForOfIteratorHelper$8(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$9(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$9(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$9(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$9(o, minLen); }

function _arrayLikeToArray$9(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function toArrayBuffer(data) {
  if (toArrayBuffer$1) {
    data = toArrayBuffer$1(data);
  }

  if (data instanceof ArrayBuffer) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return data.buffer;
  }

  if (typeof data === 'string') {
    var text = data;
    var uint8Array = new TextEncoder().encode(text);
    return uint8Array.buffer;
  }

  if (data && _typeof(data) === 'object' && data._toArrayBuffer) {
    return data._toArrayBuffer();
  }

  return assert$2(false);
}
function compareArrayBuffers(arrayBuffer1, arrayBuffer2, byteLength) {
  byteLength = byteLength || arrayBuffer1.byteLength;

  if (arrayBuffer1.byteLength < byteLength || arrayBuffer2.byteLength < byteLength) {
    return false;
  }

  var array1 = new Uint8Array(arrayBuffer1);
  var array2 = new Uint8Array(arrayBuffer2);

  for (var i = 0; i < array1.length; ++i) {
    if (array1[i] !== array2[i]) {
      return false;
    }
  }

  return true;
}
function concatenateArrayBuffers() {
  for (var _len = arguments.length, sources = new Array(_len), _key = 0; _key < _len; _key++) {
    sources[_key] = arguments[_key];
  }

  var sourceArrays = sources.map(function (source2) {
    return source2 instanceof ArrayBuffer ? new Uint8Array(source2) : source2;
  });
  var byteLength = sourceArrays.reduce(function (length, typedArray) {
    return length + typedArray.byteLength;
  }, 0);
  var result = new Uint8Array(byteLength);
  var offset = 0;

  var _iterator = _createForOfIteratorHelper$8(sourceArrays),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var sourceArray = _step.value;
      result.set(sourceArray, offset);
      offset += sourceArray.byteLength;
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  return result.buffer;
}
function sliceArrayBuffer(arrayBuffer, byteOffset, byteLength) {
  var subArray = byteLength !== undefined ? new Uint8Array(arrayBuffer).subarray(byteOffset, byteOffset + byteLength) : new Uint8Array(arrayBuffer).subarray(byteOffset);
  var arrayCopy = new Uint8Array(subArray);
  return arrayCopy.buffer;
}

function padTo4Bytes(byteLength) {
  return byteLength + 3 & ~3;
}
function getZeroOffsetArrayBuffer(arrayBuffer, byteOffset, byteLength) {
  return sliceArrayBuffer(arrayBuffer, byteOffset, byteLength);
}
function copyToArray(source, target, targetOffset) {
  var sourceArray;

  if (source instanceof ArrayBuffer) {
    sourceArray = new Uint8Array(source);
  } else {
    var srcByteOffset = source.byteOffset;
    var srcByteLength = source.byteLength;
    sourceArray = new Uint8Array(source.buffer, srcByteOffset, srcByteLength);
  }

  target.set(sourceArray, targetOffset);
  return targetOffset + padTo4Bytes(sourceArray.byteLength);
}

var pathPrefix = '';
var fileAliases = {};
function resolvePath(filename) {
  for (var alias in fileAliases) {
    if (filename.startsWith(alias)) {
      var replacement = fileAliases[alias];
      filename = filename.replace(alias, replacement);
    }
  }

  if (!filename.startsWith('http://') && !filename.startsWith('https://')) {
    filename = "".concat(pathPrefix).concat(filename);
  }

  return filename;
}

function concatenateChunksAsync(_x3) {
  return _concatenateChunksAsync.apply(this, arguments);
}

function _concatenateChunksAsync() {
  _concatenateChunksAsync = _asyncToGenerator(regenerator.mark(function _callee2(asyncIterator) {
    var arrayBuffers, strings, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            arrayBuffers = [];
            strings = [];
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context2.prev = 4;
            _iterator = _asyncIterator(asyncIterator);

          case 6:
            _context2.next = 8;
            return _iterator.next();

          case 8:
            _step = _context2.sent;
            _iteratorNormalCompletion = _step.done;
            _context2.next = 12;
            return _step.value;

          case 12:
            _value = _context2.sent;

            if (_iteratorNormalCompletion) {
              _context2.next = 19;
              break;
            }

            chunk = _value;

            if (typeof chunk === 'string') {
              strings.push(chunk);
            } else {
              arrayBuffers.push(chunk);
            }

          case 16:
            _iteratorNormalCompletion = true;
            _context2.next = 6;
            break;

          case 19:
            _context2.next = 25;
            break;

          case 21:
            _context2.prev = 21;
            _context2.t0 = _context2["catch"](4);
            _didIteratorError = true;
            _iteratorError = _context2.t0;

          case 25:
            _context2.prev = 25;
            _context2.prev = 26;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context2.next = 30;
              break;
            }

            _context2.next = 30;
            return _iterator["return"]();

          case 30:
            _context2.prev = 30;

            if (!_didIteratorError) {
              _context2.next = 33;
              break;
            }

            throw _iteratorError;

          case 33:
            return _context2.finish(30);

          case 34:
            return _context2.finish(25);

          case 35:
            if (!(strings.length > 0)) {
              _context2.next = 38;
              break;
            }

            assert$2(arrayBuffers.length === 0);
            return _context2.abrupt("return", strings.join(''));

          case 38:
            return _context2.abrupt("return", concatenateArrayBuffers.apply(void 0, arrayBuffers));

          case 39:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[4, 21, 25, 35], [26,, 30, 34]]);
  }));
  return _concatenateChunksAsync.apply(this, arguments);
}

function _arrayLikeToArray$8(arr, len) {
  if (len == null || len > arr.length) len = arr.length;

  for (var i = 0, arr2 = new Array(len); i < len; i++) {
    arr2[i] = arr[i];
  }

  return arr2;
}

function _arrayWithoutHoles(arr) {
  if (Array.isArray(arr)) return _arrayLikeToArray$8(arr);
}

function _iterableToArray(iter) {
  if (typeof Symbol !== "undefined" && iter[Symbol.iterator] != null || iter["@@iterator"] != null) return Array.from(iter);
}

function _unsupportedIterableToArray$8(o, minLen) {
  if (!o) return;
  if (typeof o === "string") return _arrayLikeToArray$8(o, minLen);
  var n = Object.prototype.toString.call(o).slice(8, -1);
  if (n === "Object" && o.constructor) n = o.constructor.name;
  if (n === "Map" || n === "Set") return Array.from(o);
  if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$8(o, minLen);
}

function _nonIterableSpread() {
  throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _toConsumableArray(arr) {
  return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray$8(arr) || _nonIterableSpread();
}

function getMeshBoundingBox(attributes) {
  if (!attributes || !attributes.POSITION) {
    return null;
  }

  var minX = Infinity;
  var minY = Infinity;
  var minZ = Infinity;
  var maxX = -Infinity;
  var maxY = -Infinity;
  var maxZ = -Infinity;
  var positions = attributes.POSITION.value;
  var len = positions && positions.length;

  if (!len) {
    return null;
  }

  for (var i = 0; i < len; i += 3) {
    var x = positions[i];
    var y = positions[i + 1];
    var z = positions[i + 2];
    minX = x < minX ? x : minX;
    minY = y < minY ? y : minY;
    minZ = z < minZ ? z : minZ;
    maxX = x > maxX ? x : maxX;
    maxY = y > maxY ? y : maxY;
    maxZ = z > maxZ ? z : maxZ;
  }

  return [[minX, minY, minZ], [maxX, maxY, maxZ]];
}

var isBoolean = function isBoolean(x) {
  return typeof x === 'boolean';
};

var isFunction = function isFunction(x) {
  return typeof x === 'function';
};

var isObject = function isObject(x) {
  return x !== null && _typeof(x) === 'object';
};
var isPureObject = function isPureObject(x) {
  return isObject(x) && x.constructor === {}.constructor;
};
var isIterable = function isIterable(x) {
  return x && typeof x[Symbol.iterator] === 'function';
};
var isAsyncIterable = function isAsyncIterable(x) {
  return x && typeof x[Symbol.asyncIterator] === 'function';
};
var isResponse = function isResponse(x) {
  return typeof Response !== 'undefined' && x instanceof Response || x && x.arrayBuffer && x.text && x.json;
};
var isBlob = function isBlob(x) {
  return typeof Blob !== 'undefined' && x instanceof Blob;
};
var isReadableDOMStream = function isReadableDOMStream(x) {
  return typeof ReadableStream !== 'undefined' && x instanceof ReadableStream || isObject(x) && isFunction(x.tee) && isFunction(x.cancel) && isFunction(x.getReader);
};
var isBuffer = function isBuffer(x) {
  return x && _typeof(x) === 'object' && x.isBuffer;
};
var isReadableNodeStream = function isReadableNodeStream(x) {
  return isObject(x) && isFunction(x.read) && isFunction(x.pipe) && isBoolean(x.readable);
};
var isReadableStream = function isReadableStream(x) {
  return isReadableDOMStream(x) || isReadableNodeStream(x);
};

var DATA_URL_PATTERN = /^data:([-\w.]+\/[-\w.+]+)(;|,)/;
var MIME_TYPE_PATTERN = /^([-\w.]+\/[-\w.+]+)/;
function parseMIMEType(mimeString) {
  if (typeof mimeString !== 'string') {
    return '';
  }

  var matches = mimeString.match(MIME_TYPE_PATTERN);

  if (matches) {
    return matches[1];
  }

  return mimeString;
}
function parseMIMETypeFromURL(dataUrl) {
  if (typeof dataUrl !== 'string') {
    return '';
  }

  var matches = dataUrl.match(DATA_URL_PATTERN);

  if (matches) {
    return matches[1];
  }

  return '';
}

var QUERY_STRING_PATTERN = /\?.*/;
function getResourceUrlAndType(resource) {
  if (isResponse(resource)) {
    var contentType = parseMIMEType(resource.headers.get('content-type'));
    var urlType = parseMIMETypeFromURL(resource.url);
    return {
      url: stripQueryString(resource.url || ''),
      type: contentType || urlType || null
    };
  }

  if (isBlob(resource)) {
    return {
      url: stripQueryString(resource.name || ''),
      type: resource.type || ''
    };
  }

  if (typeof resource === 'string') {
    return {
      url: stripQueryString(resource),
      type: parseMIMETypeFromURL(resource)
    };
  }

  return {
    url: '',
    type: ''
  };
}
function getResourceContentLength(resource) {
  if (isResponse(resource)) {
    return resource.headers['content-length'] || -1;
  }

  if (isBlob(resource)) {
    return resource.size;
  }

  if (typeof resource === 'string') {
    return resource.length;
  }

  if (resource instanceof ArrayBuffer) {
    return resource.byteLength;
  }

  if (ArrayBuffer.isView(resource)) {
    return resource.byteLength;
  }

  return -1;
}

function stripQueryString(url) {
  return url.replace(QUERY_STRING_PATTERN, '');
}

function makeResponse(_x) {
  return _makeResponse.apply(this, arguments);
}

function _makeResponse() {
  _makeResponse = _asyncToGenerator(regenerator.mark(function _callee(resource) {
    var headers, contentLength, _getResourceUrlAndTyp, url, type, initialDataUrl, response;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isResponse(resource)) {
              _context.next = 2;
              break;
            }

            return _context.abrupt("return", resource);

          case 2:
            headers = {};
            contentLength = getResourceContentLength(resource);

            if (contentLength >= 0) {
              headers['content-length'] = String(contentLength);
            }

            _getResourceUrlAndTyp = getResourceUrlAndType(resource), url = _getResourceUrlAndTyp.url, type = _getResourceUrlAndTyp.type;

            if (type) {
              headers['content-type'] = type;
            }

            _context.next = 9;
            return getInitialDataUrl(resource);

          case 9:
            initialDataUrl = _context.sent;

            if (initialDataUrl) {
              headers['x-first-bytes'] = initialDataUrl;
            }

            if (typeof resource === 'string') {
              resource = new TextEncoder().encode(resource);
            }

            response = new Response(resource, {
              headers: headers
            });
            Object.defineProperty(response, 'url', {
              value: url
            });
            return _context.abrupt("return", response);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeResponse.apply(this, arguments);
}

function checkResponse(_x2) {
  return _checkResponse.apply(this, arguments);
}

function _checkResponse() {
  _checkResponse = _asyncToGenerator(regenerator.mark(function _callee2(response) {
    var message;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (response.ok) {
              _context2.next = 5;
              break;
            }

            _context2.next = 3;
            return getResponseError(response);

          case 3:
            message = _context2.sent;
            throw new Error(message);

          case 5:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _checkResponse.apply(this, arguments);
}

function getResponseError(_x3) {
  return _getResponseError.apply(this, arguments);
}

function _getResponseError() {
  _getResponseError = _asyncToGenerator(regenerator.mark(function _callee3(response) {
    var message, contentType, text;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            message = "Failed to fetch resource ".concat(response.url, " (").concat(response.status, "): ");
            _context3.prev = 1;
            contentType = response.headers.get('Content-Type');
            text = response.statusText;

            if (!contentType.includes('application/json')) {
              _context3.next = 11;
              break;
            }

            _context3.t0 = text;
            _context3.t1 = " ";
            _context3.next = 9;
            return response.text();

          case 9:
            _context3.t2 = _context3.sent;
            text = _context3.t0 += _context3.t1.concat.call(_context3.t1, _context3.t2);

          case 11:
            message += text;
            message = message.length > 60 ? "".concat(message.slice(60), "...") : message;
            _context3.next = 17;
            break;

          case 15:
            _context3.prev = 15;
            _context3.t3 = _context3["catch"](1);

          case 17:
            return _context3.abrupt("return", message);

          case 18:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3, null, [[1, 15]]);
  }));
  return _getResponseError.apply(this, arguments);
}

function getInitialDataUrl(_x4) {
  return _getInitialDataUrl.apply(this, arguments);
}

function _getInitialDataUrl() {
  _getInitialDataUrl = _asyncToGenerator(regenerator.mark(function _callee4(resource) {
    var INITIAL_DATA_LENGTH, blobSlice, slice, base64;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            INITIAL_DATA_LENGTH = 5;

            if (!(typeof resource === 'string')) {
              _context4.next = 3;
              break;
            }

            return _context4.abrupt("return", "data:,".concat(resource.slice(0, INITIAL_DATA_LENGTH)));

          case 3:
            if (!(resource instanceof Blob)) {
              _context4.next = 8;
              break;
            }

            blobSlice = resource.slice(0, 5);
            _context4.next = 7;
            return new Promise(function (resolve) {
              var reader = new FileReader();

              reader.onload = function (event) {
                return resolve(event.target && event.target.result);
              };

              reader.readAsDataURL(blobSlice);
            });

          case 7:
            return _context4.abrupt("return", _context4.sent);

          case 8:
            if (!(resource instanceof ArrayBuffer)) {
              _context4.next = 12;
              break;
            }

            slice = resource.slice(0, INITIAL_DATA_LENGTH);
            base64 = arrayBufferToBase64(slice);
            return _context4.abrupt("return", "data:base64,".concat(base64));

          case 12:
            return _context4.abrupt("return", null);

          case 13:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _getInitialDataUrl.apply(this, arguments);
}

function arrayBufferToBase64(buffer) {
  var binary = '';
  var bytes = new Uint8Array(buffer);

  for (var i = 0; i < bytes.byteLength; i++) {
    binary += String.fromCharCode(bytes[i]);
  }

  return btoa(binary);
}

function getErrorMessageFromResponse(_x) {
  return _getErrorMessageFromResponse.apply(this, arguments);
}

function _getErrorMessageFromResponse() {
  _getErrorMessageFromResponse = _asyncToGenerator(regenerator.mark(function _callee(response) {
    var message, contentType;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            message = "Failed to fetch resource ".concat(response.url, " (").concat(response.status, "): ");
            _context.prev = 1;
            contentType = response.headers.get('Content-Type');

            if (!contentType.includes('application/json')) {
              _context.next = 10;
              break;
            }

            _context.t0 = message;
            _context.next = 7;
            return response.text();

          case 7:
            message = _context.t0 += _context.sent;
            _context.next = 11;
            break;

          case 10:
            message += response.statusText;

          case 11:
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t1 = _context["catch"](1);
            return _context.abrupt("return", message);

          case 16:
            return _context.abrupt("return", message);

          case 17:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[1, 13]]);
  }));
  return _getErrorMessageFromResponse.apply(this, arguments);
}

function fetchFile(_x) {
  return _fetchFile.apply(this, arguments);
}

function _fetchFile() {
  _fetchFile = _asyncToGenerator(regenerator.mark(function _callee(url) {
    var options,
        response,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};

            if (!(typeof url !== 'string')) {
              _context.next = 5;
              break;
            }

            _context.next = 4;
            return makeResponse(url);

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
            url = resolvePath(url);
            _context.next = 8;
            return fetch(url, options);

          case 8:
            response = _context.sent;

            if (!(!response.ok && options["throws"])) {
              _context.next = 15;
              break;
            }

            _context.t0 = Error;
            _context.next = 13;
            return getErrorMessageFromResponse(response);

          case 13:
            _context.t1 = _context.sent;
            throw new _context.t0(_context.t1);

          case 15:
            return _context.abrupt("return", response);

          case 16:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _fetchFile.apply(this, arguments);
}

var NullLog = function () {
  function NullLog() {
    _classCallCheck(this, NullLog);
  }

  _createClass(NullLog, [{
    key: "log",
    value: function log() {
      return function (_) {};
    }
  }, {
    key: "info",
    value: function info() {
      return function (_) {};
    }
  }, {
    key: "warn",
    value: function warn() {
      return function (_) {};
    }
  }, {
    key: "error",
    value: function error() {
      return function (_) {};
    }
  }]);

  return NullLog;
}();
var ConsoleLog = function () {
  function ConsoleLog() {
    _classCallCheck(this, ConsoleLog);

    this.console = console;
  }

  _createClass(ConsoleLog, [{
    key: "log",
    value: function log() {
      var _this$console$log;

      for (var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++) {
        args[_key] = arguments[_key];
      }

      return (_this$console$log = this.console.log).bind.apply(_this$console$log, [this.console].concat(args));
    }
  }, {
    key: "info",
    value: function info() {
      var _this$console$info;

      for (var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++) {
        args[_key2] = arguments[_key2];
      }

      return (_this$console$info = this.console.info).bind.apply(_this$console$info, [this.console].concat(args));
    }
  }, {
    key: "warn",
    value: function warn() {
      var _this$console$warn;

      for (var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++) {
        args[_key3] = arguments[_key3];
      }

      return (_this$console$warn = this.console.warn).bind.apply(_this$console$warn, [this.console].concat(args));
    }
  }, {
    key: "error",
    value: function error() {
      var _this$console$error;

      for (var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++) {
        args[_key4] = arguments[_key4];
      }

      return (_this$console$error = this.console.error).bind.apply(_this$console$error, [this.console].concat(args));
    }
  }]);

  return ConsoleLog;
}();

function _createForOfIteratorHelper$7(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$7(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$7(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$7(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$7(o, minLen); }

function _arrayLikeToArray$7(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }

function ownKeys$9(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$9(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$9(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$9(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var DEFAULT_LOADER_OPTIONS = {
  baseUri: '',
  fetch: null,
  CDN: 'https://unpkg.com/@loaders.gl',
  worker: true,
  log: new ConsoleLog(),
  metadata: false,
  transforms: [],
  reuseWorkers: true
};
var DEPRECATED_LOADER_OPTIONS = {
  dataType: '(no longer used)',
  method: 'fetch.method',
  headers: 'fetch.headers',
  body: 'fetch.body',
  mode: 'fetch.mode',
  credentials: 'fetch.credentials',
  cache: 'fetch.cache',
  redirect: 'fetch.redirect',
  referrer: 'fetch.referrer',
  referrerPolicy: 'fetch.referrerPolicy',
  integrity: 'fetch.integrity',
  keepalive: 'fetch.keepalive',
  signal: 'fetch.signal'
};
var getGlobalLoaderState = function getGlobalLoaderState() {
  global_$1.loaders = global_$1.loaders || {};
  var loaders = global_$1.loaders;
  loaders._state = loaders._state || {};
  return loaders._state;
};

var getGlobalLoaderOptions = function getGlobalLoaderOptions() {
  var state = getGlobalLoaderState();
  state.globalOptions = state.globalOptions || _objectSpread$9({}, DEFAULT_LOADER_OPTIONS);
  return state.globalOptions;
};
function normalizeOptions(options, loader, loaders, url) {
  loaders = loaders || [];
  loaders = Array.isArray(loaders) ? loaders : [loaders];
  validateOptions(options, loaders);
  return normalizeOptionsInternal(loader, options, url);
}
function getFetchFunction(options, context) {
  var globalOptions = getGlobalLoaderOptions();
  var fetch = options.fetch || globalOptions.fetch;

  if (typeof fetch === 'function') {
    return fetch;
  }

  if (isObject(fetch)) {
    return function (url) {
      return fetchFile(url, fetch);
    };
  }

  if (context && context.fetch) {
    return context.fetch;
  }

  return function (url) {
    return fetchFile(url, options);
  };
}

function validateOptions(options, loaders) {
  var log = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : console;
  validateOptionsObject(options, null, log, DEFAULT_LOADER_OPTIONS, DEPRECATED_LOADER_OPTIONS, loaders);

  var _iterator = _createForOfIteratorHelper$7(loaders),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var loader = _step.value;
      var idOptions = options && options[loader.id] || {};
      var loaderOptions = loader.options && loader.options[loader.id] || {};
      var deprecatedOptions = loader.defaultOptions && loader.defaultOptions[loader.id] || {};
      validateOptionsObject(idOptions, loader.id, log, loaderOptions, deprecatedOptions, loaders);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function validateOptionsObject(options, id, log, defaultOptions, deprecatedOptions, loaders) {
  var loaderName = id || 'Top level';
  var prefix = id ? "".concat(id, ".") : '';

  for (var key in options) {
    var isSubOptions = !id && isObject(options[key]);

    if (!(key in defaultOptions)) {
      if (key in deprecatedOptions) {
        log.warn("".concat(loaderName, " loader option '").concat(prefix).concat(key, "' deprecated, use '").concat(deprecatedOptions[key], "'"));
      } else if (!isSubOptions) {
        var suggestion = findSimilarOption(key, loaders);
        log.warn("".concat(loaderName, " loader option '").concat(prefix).concat(key, "' not recognized. ").concat(suggestion));
      }
    }
  }
}

function findSimilarOption(optionKey, loaders) {
  var lowerCaseOptionKey = optionKey.toLowerCase();
  var bestSuggestion = '';

  var _iterator2 = _createForOfIteratorHelper$7(loaders),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var loader = _step2.value;

      for (var key in loader.options) {
        if (optionKey === key) {
          return "Did you mean '".concat(loader.id, ".").concat(key, "'?");
        }

        var lowerCaseKey = key.toLowerCase();
        var isPartialMatch = lowerCaseOptionKey.startsWith(lowerCaseKey) || lowerCaseKey.startsWith(lowerCaseOptionKey);

        if (isPartialMatch) {
          bestSuggestion = bestSuggestion || "Did you mean '".concat(loader.id, ".").concat(key, "'?");
        }
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return bestSuggestion;
}

function normalizeOptionsInternal(loader, options, url) {
  var loaderDefaultOptions = loader.options || {};

  var mergedOptions = _objectSpread$9({}, loaderDefaultOptions);

  if (mergedOptions.log === null) {
    mergedOptions.log = new NullLog();
  }

  mergeNestedFields(mergedOptions, getGlobalLoaderOptions());
  mergeNestedFields(mergedOptions, options);
  addUrlOptions(mergedOptions, url);
  return mergedOptions;
}

function mergeNestedFields(mergedOptions, options) {
  for (var key in options) {
    if (key in options) {
      var value = options[key];

      if (isPureObject(value) && isPureObject(mergedOptions[key])) {
        mergedOptions[key] = _objectSpread$9(_objectSpread$9({}, mergedOptions[key]), options[key]);
      } else {
        mergedOptions[key] = options[key];
      }
    }
  }
}

function addUrlOptions(options, url) {
  if (url && !options.baseUri) {
    options.baseUri = url;
  }
}

function ownKeys$8(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$8(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$8(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$8(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function isLoaderObject(loader) {
  if (!loader) {
    return false;
  }

  if (Array.isArray(loader)) {
    loader = loader[0];
  }

  var hasParser = loader.parseTextSync || loader.parseSync || loader.parse || loader.parseStream || loader.parseInBatches;
  var loaderOptions = loader.options && loader.options[loader.id];
  hasParser = hasParser || loaderOptions && loaderOptions.workerUrl;
  return hasParser;
}
function normalizeLoader(loader) {
  assert$2(loader, 'null loader');
  assert$2(isLoaderObject(loader), 'invalid loader');
  var options;

  if (Array.isArray(loader)) {
    options = loader[1];
    loader = loader[0];
    loader = _objectSpread$8(_objectSpread$8({}, loader), {}, {
      options: _objectSpread$8(_objectSpread$8({}, loader.options), options)
    });
  }

  if (loader.extension) {
    loader.extensions = loader.extensions || loader.extension;
    delete loader.extension;
  }

  if (!Array.isArray(loader.extensions)) {
    loader.extensions = [loader.extensions];
  }

  assert$2(loader.extensions && loader.extensions.length > 0 && loader.extensions[0]);

  if (loader.parseTextSync || loader.parseText) {
    loader.text = true;
  }

  if (!loader.text) {
    loader.binary = true;
  }

  return loader;
}

var getGlobalLoaderRegistry = function getGlobalLoaderRegistry() {
  var state = getGlobalLoaderState();
  state.loaderRegistry = state.loaderRegistry || [];
  return state.loaderRegistry;
};
function getRegisteredLoaders() {
  return getGlobalLoaderRegistry();
}

var _marked$2 = regenerator.mark(makeStringIterator);

function makeStringIterator(string) {
  var options,
      _options$chunkSize,
      chunkSize,
      offset,
      textEncoder,
      chunkLength,
      chunk,
      _args = arguments;

  return regenerator.wrap(function makeStringIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _options$chunkSize = options.chunkSize, chunkSize = _options$chunkSize === void 0 ? 256 * 1024 : _options$chunkSize;
          offset = 0;
          textEncoder = new TextEncoder();

        case 4:
          if (!(offset < string.length)) {
            _context.next = 12;
            break;
          }

          chunkLength = Math.min(string.length - offset, chunkSize);
          chunk = string.slice(offset, offset + chunkLength);
          offset += chunkLength;
          _context.next = 10;
          return textEncoder.encode(chunk);

        case 10:
          _context.next = 4;
          break;

        case 12:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$2);
}

var _marked$1 = regenerator.mark(makeArrayBufferIterator);

function makeArrayBufferIterator(arrayBuffer) {
  var options,
      _options$chunkSize,
      chunkSize,
      byteOffset,
      chunkByteLength,
      chunk,
      sourceArray,
      chunkArray,
      _args = arguments;

  return regenerator.wrap(function makeArrayBufferIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
          _options$chunkSize = options.chunkSize, chunkSize = _options$chunkSize === void 0 ? 256 * 1024 : _options$chunkSize;
          byteOffset = 0;

        case 3:
          if (!(byteOffset < arrayBuffer.byteLength)) {
            _context.next = 14;
            break;
          }

          chunkByteLength = Math.min(arrayBuffer.byteLength - byteOffset, chunkSize);
          chunk = new ArrayBuffer(chunkByteLength);
          sourceArray = new Uint8Array(arrayBuffer, byteOffset, chunkByteLength);
          chunkArray = new Uint8Array(chunk);
          chunkArray.set(sourceArray);
          byteOffset += chunkByteLength;
          _context.next = 12;
          return chunk;

        case 12:
          _context.next = 3;
          break;

        case 14:
        case "end":
          return _context.stop();
      }
    }
  }, _marked$1);
}

var DEFAULT_CHUNK_SIZE = 1024 * 1024;
function makeBlobIterator(_x) {
  return _makeBlobIterator.apply(this, arguments);
}

function _makeBlobIterator() {
  _makeBlobIterator = _wrapAsyncGenerator(regenerator.mark(function _callee(file) {
    var options,
        chunkSize,
        offset,
        end,
        chunk,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            chunkSize = options.chunkSize || DEFAULT_CHUNK_SIZE;
            offset = 0;

          case 3:
            if (!(offset < file.size)) {
              _context.next = 13;
              break;
            }

            end = offset + chunkSize;
            _context.next = 7;
            return _awaitAsyncGenerator(readFileSlice(file, offset, end));

          case 7:
            chunk = _context.sent;
            offset = end;
            _context.next = 11;
            return chunk;

          case 11:
            _context.next = 3;
            break;

          case 13:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _makeBlobIterator.apply(this, arguments);
}

function readFileSlice(_x2, _x3, _x4) {
  return _readFileSlice.apply(this, arguments);
}

function _readFileSlice() {
  _readFileSlice = _asyncToGenerator(regenerator.mark(function _callee2(file, offset, end) {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            _context2.next = 2;
            return new Promise(function (resolve, reject) {
              var slice = file.slice(offset, end);
              var fileReader = new FileReader();

              fileReader.onload = function (event) {
                return resolve(event.target && event.target.result);
              };

              fileReader.onerror = function (error) {
                return reject(error);
              };

              fileReader.readAsArrayBuffer(slice);
            });

          case 2:
            return _context2.abrupt("return", _context2.sent);

          case 3:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _readFileSlice.apply(this, arguments);
}

function makeStreamIterator(stream) {
  if (isBrowser$1 || nodeVersion >= 10) {
    if (typeof stream[Symbol.asyncIterator] === 'function') {
      return makeToArrayBufferIterator(stream);
    }

    if (typeof stream.getIterator === 'function') {
      return stream.getIterator();
    }
  }

  return isBrowser$1 ? makeBrowserStreamIterator(stream) : makeNodeStreamIterator(stream);
}

function makeToArrayBufferIterator(_x) {
  return _makeToArrayBufferIterator.apply(this, arguments);
}

function _makeToArrayBufferIterator() {
  _makeToArrayBufferIterator = _wrapAsyncGenerator(regenerator.mark(function _callee(asyncIterator) {
    var _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, chunk;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 2;
            _iterator = _asyncIterator(asyncIterator);

          case 4:
            _context.next = 6;
            return _awaitAsyncGenerator(_iterator.next());

          case 6:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 10;
            return _awaitAsyncGenerator(_step.value);

          case 10:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 18;
              break;
            }

            chunk = _value;
            _context.next = 15;
            return toArrayBuffer(chunk);

          case 15:
            _iteratorNormalCompletion = true;
            _context.next = 4;
            break;

          case 18:
            _context.next = 24;
            break;

          case 20:
            _context.prev = 20;
            _context.t0 = _context["catch"](2);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 24:
            _context.prev = 24;
            _context.prev = 25;

            if (!(!_iteratorNormalCompletion && _iterator["return"] != null)) {
              _context.next = 29;
              break;
            }

            _context.next = 29;
            return _awaitAsyncGenerator(_iterator["return"]());

          case 29:
            _context.prev = 29;

            if (!_didIteratorError) {
              _context.next = 32;
              break;
            }

            throw _iteratorError;

          case 32:
            return _context.finish(29);

          case 33:
            return _context.finish(24);

          case 34:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[2, 20, 24, 34], [25,, 29, 33]]);
  }));
  return _makeToArrayBufferIterator.apply(this, arguments);
}

function makeBrowserStreamIterator(_x2) {
  return _makeBrowserStreamIterator.apply(this, arguments);
}

function _makeBrowserStreamIterator() {
  _makeBrowserStreamIterator = _wrapAsyncGenerator(regenerator.mark(function _callee2(stream) {
    var reader, _yield$_awaitAsyncGen, done, value;

    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            reader = stream.getReader();
            _context2.prev = 1;

          case 2:

            _context2.next = 5;
            return _awaitAsyncGenerator(reader.read());

          case 5:
            _yield$_awaitAsyncGen = _context2.sent;
            done = _yield$_awaitAsyncGen.done;
            value = _yield$_awaitAsyncGen.value;

            if (!done) {
              _context2.next = 10;
              break;
            }

            return _context2.abrupt("return");

          case 10:
            _context2.next = 12;
            return toArrayBuffer(value);

          case 12:
            _context2.next = 2;
            break;

          case 14:
            _context2.next = 19;
            break;

          case 16:
            _context2.prev = 16;
            _context2.t0 = _context2["catch"](1);
            reader.releaseLock();

          case 19:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[1, 16]]);
  }));
  return _makeBrowserStreamIterator.apply(this, arguments);
}

function makeNodeStreamIterator(_x3) {
  return _makeNodeStreamIterator.apply(this, arguments);
}

function _makeNodeStreamIterator() {
  _makeNodeStreamIterator = _wrapAsyncGenerator(regenerator.mark(function _callee3(stream) {
    var data;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.next = 2;
            return _awaitAsyncGenerator(stream);

          case 2:
            stream = _context3.sent;

          case 3:

            data = stream.read();

            if (!(data !== null)) {
              _context3.next = 9;
              break;
            }

            _context3.next = 8;
            return toArrayBuffer(data);

          case 8:
            return _context3.abrupt("continue", 3);

          case 9:
            if (!stream._readableState.ended) {
              _context3.next = 11;
              break;
            }

            return _context3.abrupt("return");

          case 11:
            _context3.next = 13;
            return _awaitAsyncGenerator(onceReadable(stream));

          case 13:
            _context3.next = 3;
            break;

          case 15:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _makeNodeStreamIterator.apply(this, arguments);
}

function onceReadable(_x4) {
  return _onceReadable.apply(this, arguments);
}

function _onceReadable() {
  _onceReadable = _asyncToGenerator(regenerator.mark(function _callee4(stream) {
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            return _context4.abrupt("return", new Promise(function (resolve) {
              stream.once('readable', resolve);
            }));

          case 1:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _onceReadable.apply(this, arguments);
}

function makeIterator(data) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  if (typeof data === 'string') {
    return makeStringIterator(data, options);
  }

  if (data instanceof ArrayBuffer) {
    return makeArrayBufferIterator(data, options);
  }

  if (isBlob(data)) {
    return makeBlobIterator(data, options);
  }

  if (isReadableStream(data)) {
    return makeStreamIterator(data);
  }

  if (isResponse(data)) {
    return makeStreamIterator(data.body);
  }

  return assert$2(false);
}

var ERR_DATA = 'Cannot convert supplied data type';
function getArrayBufferOrStringFromDataSync(data, loader) {
  if (loader.text && typeof data === 'string') {
    return data;
  }

  if (data instanceof ArrayBuffer) {
    var arrayBuffer = data;

    if (loader.text && !loader.binary) {
      var textDecoder = new TextDecoder('utf8');
      return textDecoder.decode(arrayBuffer);
    }

    return arrayBuffer;
  }

  if (ArrayBuffer.isView(data) || isBuffer(data)) {
    if (loader.text && !loader.binary) {
      var _textDecoder = new TextDecoder('utf8');

      return _textDecoder.decode(data);
    }

    var _arrayBuffer = data.buffer;
    var byteLength = data.byteLength || data.length;

    if (data.byteOffset !== 0 || byteLength !== _arrayBuffer.byteLength) {
      _arrayBuffer = _arrayBuffer.slice(data.byteOffset, data.byteOffset + byteLength);
    }

    return _arrayBuffer;
  }

  throw new Error(ERR_DATA);
}
function getArrayBufferOrStringFromData(_x, _x2) {
  return _getArrayBufferOrStringFromData.apply(this, arguments);
}

function _getArrayBufferOrStringFromData() {
  _getArrayBufferOrStringFromData = _asyncToGenerator(regenerator.mark(function _callee(data, loader) {
    var isArrayBuffer, response;
    return regenerator.wrap(function _callee$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            isArrayBuffer = data instanceof ArrayBuffer || ArrayBuffer.isView(data);

            if (!(typeof data === 'string' || isArrayBuffer)) {
              _context3.next = 3;
              break;
            }

            return _context3.abrupt("return", getArrayBufferOrStringFromDataSync(data, loader));

          case 3:
            if (!isBlob(data)) {
              _context3.next = 7;
              break;
            }

            _context3.next = 6;
            return makeResponse(data);

          case 6:
            data = _context3.sent;

          case 7:
            if (!isResponse(data)) {
              _context3.next = 21;
              break;
            }

            response = data;
            _context3.next = 11;
            return checkResponse(response);

          case 11:
            if (!loader.binary) {
              _context3.next = 17;
              break;
            }

            _context3.next = 14;
            return response.arrayBuffer();

          case 14:
            _context3.t0 = _context3.sent;
            _context3.next = 20;
            break;

          case 17:
            _context3.next = 19;
            return response.text();

          case 19:
            _context3.t0 = _context3.sent;

          case 20:
            return _context3.abrupt("return", _context3.t0);

          case 21:
            if (isReadableStream(data)) {
              data = makeIterator(data);
            }

            if (!(isIterable(data) || isAsyncIterable(data))) {
              _context3.next = 24;
              break;
            }

            return _context3.abrupt("return", concatenateChunksAsync(data));

          case 24:
            throw new Error(ERR_DATA);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee);
  }));
  return _getArrayBufferOrStringFromData.apply(this, arguments);
}

function ownKeys$7(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$7(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$7(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$7(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function getLoaderContext(context, options) {
  var previousContext = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (previousContext) {
    return previousContext;
  }

  context = _objectSpread$7({
    fetch: getFetchFunction(options || {}, context)
  }, context);

  if (!Array.isArray(context.loaders)) {
    context.loaders = null;
  }

  return context;
}
function getLoaders(loaders, context) {
  if (!context && loaders && !Array.isArray(loaders)) {
    return loaders;
  }

  var candidateLoaders;

  if (loaders) {
    candidateLoaders = Array.isArray(loaders) ? loaders : [loaders];
  }

  if (context && context.loaders) {
    var contextLoaders = Array.isArray(context.loaders) ? context.loaders : [context.loaders];
    candidateLoaders = candidateLoaders ? [].concat(_toConsumableArray(candidateLoaders), _toConsumableArray(contextLoaders)) : contextLoaders;
  }

  return candidateLoaders && candidateLoaders.length ? candidateLoaders : null;
}

var VERSION$3 = "2.3.13" ;
function canParseWithWorker(loader, data, options, context) {
  if (!WorkerFarm.isSupported()) {
    return false;
  }

  var loaderOptions = options && options[loader.id];

  if (options.worker === 'local' && loaderOptions && loaderOptions.localWorkerUrl || options.worker && loaderOptions && loaderOptions.workerUrl) {
    return loader.useWorker ? loader.useWorker(options) : true;
  }

  return false;
}
function parseWithWorker(loader, data, options, context) {
  var _ref = options || {},
      worker = _ref.worker;

  var loaderOptions = options && options[loader.id] || {};
  var workerUrl = worker === 'local' ? loaderOptions.localWorkerUrl : loaderOptions.workerUrl;
  var workerSource = "url(".concat(workerUrl, ")");
  var workerName = loader.name;
  var workerFarm = getWorkerFarm(options);
  options = JSON.parse(JSON.stringify(options));
  var warning = loader.version !== VERSION$3 ? "(core version ".concat(VERSION$3, ")") : '';
  return workerFarm.process(workerSource, "".concat(workerName, "-worker@").concat(loader.version).concat(warning), {
    arraybuffer: toArrayBuffer(data),
    options: options,
    source: "loaders.gl@".concat(VERSION$3),
    type: 'parse'
  });
}
var _workerFarm = null;

function getWorkerFarm() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var props = {};

  if (options.maxConcurrency) {
    props.maxConcurrency = options.maxConcurrency;
  }

  if (options.onDebug) {
    props.onDebug = options.onDebug;
  }

  if ('reuseWorkers' in options) {
    props.reuseWorkers = options.reuseWorkers;
  }

  if (!_workerFarm) {
    _workerFarm = new WorkerFarm({
      onMessage: onWorkerMessage
    });
  }

  _workerFarm.setProps(props);

  return _workerFarm;
}

function onWorkerMessage(_x) {
  return _onWorkerMessage.apply(this, arguments);
}

function _onWorkerMessage() {
  _onWorkerMessage = _asyncToGenerator(regenerator.mark(function _callee(_ref2) {
    var worker, data, resolve, reject, result;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            worker = _ref2.worker, data = _ref2.data, resolve = _ref2.resolve, reject = _ref2.reject;
            _context.t0 = data.type;
            _context.next = _context.t0 === 'done' ? 4 : _context.t0 === 'parse' ? 6 : _context.t0 === 'error' ? 17 : 19;
            break;

          case 4:
            resolve(data.result);
            return _context.abrupt("break", 19);

          case 6:
            _context.prev = 6;
            _context.next = 9;
            return parse$2(data.arraybuffer, data.options, data.url);

          case 9:
            result = _context.sent;
            worker.postMessage({
              type: 'parse-done',
              id: data.id,
              result: result
            }, getTransferList(result));
            _context.next = 16;
            break;

          case 13:
            _context.prev = 13;
            _context.t1 = _context["catch"](6);
            worker.postMessage({
              type: 'parse-error',
              id: data.id,
              message: _context.t1.message
            });

          case 16:
            return _context.abrupt("break", 19);

          case 17:
            reject(data.message);
            return _context.abrupt("break", 19);

          case 19:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[6, 13]]);
  }));
  return _onWorkerMessage.apply(this, arguments);
}

function ownKeys$6(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$6(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$6(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$6(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _createForOfIteratorHelper$6(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$6(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$6(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$6(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$6(o, minLen); }

function _arrayLikeToArray$6(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var EXT_PATTERN = /\.([^.]+)$/;
function selectLoader(_x) {
  return _selectLoader.apply(this, arguments);
}

function _selectLoader() {
  _selectLoader = _asyncToGenerator(regenerator.mark(function _callee(data) {
    var loaders,
        options,
        context,
        loader,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            loaders = _args.length > 1 && _args[1] !== undefined ? _args[1] : [];
            options = _args.length > 2 && _args[2] !== undefined ? _args[2] : {};
            context = _args.length > 3 && _args[3] !== undefined ? _args[3] : {};
            loader = selectLoaderSync(data, loaders, _objectSpread$6(_objectSpread$6({}, options), {}, {
              nothrow: true
            }), context);

            if (!loader) {
              _context.next = 6;
              break;
            }

            return _context.abrupt("return", loader);

          case 6:
            if (!isBlob(data)) {
              _context.next = 11;
              break;
            }

            _context.next = 9;
            return readFileSlice(data, 0, 10);

          case 9:
            data = _context.sent;
            loader = selectLoaderSync(data, loaders, options, context);

          case 11:
            if (!(!loader && !options.nothrow)) {
              _context.next = 13;
              break;
            }

            throw new Error(getNoValidLoaderMessage(data));

          case 13:
            return _context.abrupt("return", loader);

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _selectLoader.apply(this, arguments);
}

function selectLoaderSync(data) {
  var loaders = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : [];
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var context = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : {};

  if (loaders && !Array.isArray(loaders)) {
    return normalizeLoader(loaders);
  }

  loaders = [].concat(_toConsumableArray(loaders || []), _toConsumableArray(getRegisteredLoaders()));
  normalizeLoaders(loaders);

  var _getResourceUrlAndTyp = getResourceUrlAndType(data),
      url = _getResourceUrlAndTyp.url,
      type = _getResourceUrlAndTyp.type;

  var loader = findLoaderByUrl(loaders, url || context.url);
  loader = loader || findLoaderByContentType(loaders, type);
  loader = loader || findLoaderByExamingInitialData(loaders, data);

  if (!loader && !options.nothrow) {
    throw new Error(getNoValidLoaderMessage(data));
  }

  return loader;
}

function getNoValidLoaderMessage(data) {
  var _getResourceUrlAndTyp2 = getResourceUrlAndType(data),
      url = _getResourceUrlAndTyp2.url,
      type = _getResourceUrlAndTyp2.type;

  var message = 'No valid loader found';

  if (data) {
    message += " data: \"".concat(getFirstCharacters(data), "\", contentType: \"").concat(type, "\"");
  }

  if (url) {
    message += " url: ".concat(url);
  }

  return message;
}

function normalizeLoaders(loaders) {
  var _iterator = _createForOfIteratorHelper$6(loaders),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var loader = _step.value;
      normalizeLoader(loader);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function findLoaderByUrl(loaders, url) {
  var match = url && url.match(EXT_PATTERN);
  var extension = match && match[1];
  return extension && findLoaderByExtension(loaders, extension);
}

function findLoaderByExtension(loaders, extension) {
  extension = extension.toLowerCase();

  var _iterator2 = _createForOfIteratorHelper$6(loaders),
      _step2;

  try {
    for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
      var loader = _step2.value;

      var _iterator3 = _createForOfIteratorHelper$6(loader.extensions),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var loaderExtension = _step3.value;

          if (loaderExtension.toLowerCase() === extension) {
            return loader;
          }
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }
    }
  } catch (err) {
    _iterator2.e(err);
  } finally {
    _iterator2.f();
  }

  return null;
}

function findLoaderByContentType(loaders, mimeType) {
  var _iterator4 = _createForOfIteratorHelper$6(loaders),
      _step4;

  try {
    for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
      var loader = _step4.value;

      if (loader.mimeTypes && loader.mimeTypes.includes(mimeType)) {
        return loader;
      }

      if (mimeType === "application/x.".concat(loader.id)) {
        return loader;
      }
    }
  } catch (err) {
    _iterator4.e(err);
  } finally {
    _iterator4.f();
  }

  return null;
}

function findLoaderByExamingInitialData(loaders, data) {
  if (!data) {
    return null;
  }

  var _iterator5 = _createForOfIteratorHelper$6(loaders),
      _step5;

  try {
    for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
      var loader = _step5.value;

      if (typeof data === 'string') {
        if (testDataAgainstText(data, loader)) {
          return loader;
        }
      } else if (ArrayBuffer.isView(data)) {
        if (testDataAgainstBinary(data.buffer, data.byteOffset, loader)) {
          return loader;
        }
      } else if (data instanceof ArrayBuffer) {
        var byteOffset = 0;

        if (testDataAgainstBinary(data, byteOffset, loader)) {
          return loader;
        }
      }
    }
  } catch (err) {
    _iterator5.e(err);
  } finally {
    _iterator5.f();
  }

  return null;
}

function testDataAgainstText(data, loader) {
  return loader.testText && loader.testText(data);
}

function testDataAgainstBinary(data, byteOffset, loader) {
  var tests = Array.isArray(loader.tests) ? loader.tests : [loader.tests];
  return tests.some(function (test) {
    return testBinary(data, byteOffset, loader, test);
  });
}

function testBinary(data, byteOffset, loader, test) {
  if (test instanceof ArrayBuffer) {
    return compareArrayBuffers(test, data, test.byteLength);
  }

  switch (_typeof(test)) {
    case 'function':
      return test(data, loader);

    case 'string':
      var magic = getMagicString$1(data, byteOffset, test.length);
      return test === magic;

    default:
      return false;
  }
}

function getFirstCharacters(data) {
  var length = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 5;

  if (typeof data === 'string') {
    return data.slice(0, length);
  } else if (ArrayBuffer.isView(data)) {
    return getMagicString$1(data.buffer, data.byteOffset, length);
  } else if (data instanceof ArrayBuffer) {
    var byteOffset = 0;
    return getMagicString$1(data, byteOffset, length);
  }

  return '';
}

function getMagicString$1(arrayBuffer, byteOffset, length) {
  if (arrayBuffer.byteLength < byteOffset + length) {
    return '';
  }

  var dataView = new DataView(arrayBuffer);
  var magic = '';

  for (var i = 0; i < length; i++) {
    magic += String.fromCharCode(dataView.getUint8(byteOffset + i));
  }

  return magic;
}

function parse$2(_x, _x2, _x3, _x4) {
  return _parse$2.apply(this, arguments);
}

function _parse$2() {
  _parse$2 = _asyncToGenerator(regenerator.mark(function _callee(data, loaders, options, context) {
    var _getResourceUrlAndTyp, url, candidateLoaders, loader;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            assert$2(!context || typeof context !== 'string', 'parse no longer accepts final url');

            if (loaders && !Array.isArray(loaders) && !isLoaderObject(loaders)) {
              context = options;
              options = loaders;
              loaders = null;
            }

            _context.next = 4;
            return data;

          case 4:
            data = _context.sent;
            options = options || {};
            _getResourceUrlAndTyp = getResourceUrlAndType(data), url = _getResourceUrlAndTyp.url;
            candidateLoaders = getLoaders(loaders, context);
            _context.next = 10;
            return selectLoader(data, candidateLoaders, options);

          case 10:
            loader = _context.sent;

            if (loader) {
              _context.next = 13;
              break;
            }

            return _context.abrupt("return", null);

          case 13:
            options = normalizeOptions(options, loader, candidateLoaders, url);
            context = getLoaderContext({
              url: url,
              parse: parse$2,
              loaders: candidateLoaders
            }, options, context);
            _context.next = 17;
            return parseWithLoader(loader, data, options, context);

          case 17:
            return _context.abrupt("return", _context.sent);

          case 18:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parse$2.apply(this, arguments);
}

function parseWithLoader(_x5, _x6, _x7, _x8) {
  return _parseWithLoader.apply(this, arguments);
}

function _parseWithLoader() {
  _parseWithLoader = _asyncToGenerator(regenerator.mark(function _callee2(loader, data, options, context) {
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            validateLoaderVersion(loader);
            _context2.next = 3;
            return getArrayBufferOrStringFromData(data, loader);

          case 3:
            data = _context2.sent;

            if (!(loader.parseTextSync && typeof data === 'string')) {
              _context2.next = 7;
              break;
            }

            options.dataType = 'text';
            return _context2.abrupt("return", loader.parseTextSync(data, options, context, loader));

          case 7:
            if (!canParseWithWorker(loader, data, options)) {
              _context2.next = 11;
              break;
            }

            _context2.next = 10;
            return parseWithWorker(loader, data, options);

          case 10:
            return _context2.abrupt("return", _context2.sent);

          case 11:
            if (!(loader.parseText && typeof data === 'string')) {
              _context2.next = 15;
              break;
            }

            _context2.next = 14;
            return loader.parseText(data, options, context, loader);

          case 14:
            return _context2.abrupt("return", _context2.sent);

          case 15:
            if (!loader.parse) {
              _context2.next = 19;
              break;
            }

            _context2.next = 18;
            return loader.parse(data, options, context, loader);

          case 18:
            return _context2.abrupt("return", _context2.sent);

          case 19:
            assert$2(!loader.parseSync);
            return _context2.abrupt("return", assert$2(false));

          case 21:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _parseWithLoader.apply(this, arguments);
}

var KHR_BINARY_GLTF = 'KHR_binary_glTF';
var KHR_DRACO_MESH_COMPRESSION = 'KHR_draco_mesh_compression';
var KHR_LIGHTS_PUNCTUAL = 'KHR_lights_punctual';
var KHR_MATERIALS_UNLIT = 'KHR_materials_unlit';
var KHR_TECHNIQUES_WEBGL = 'KHR_techniques_webgl';

function assert$1(condition, message) {
  if (!condition) {
    throw new Error(message);
  }
}

var globals = {
  self: typeof self !== 'undefined' && self,
  window: typeof window !== 'undefined' && window,
  global: typeof global !== 'undefined' && global,
  document: typeof document !== 'undefined' && document
};
var global_ = globals.global || globals.self || globals.window;
var isBrowser = (typeof process === "undefined" ? "undefined" : _typeof(process)) !== 'object' || String(process) !== '[object process]' || process.browser;
var matches = typeof process !== 'undefined' && process.version && process.version.match(/v([0-9]*)/);
matches && parseFloat(matches[1]) || 0;

var _parseImageNode = global_._parseImageNode;
var IMAGE_SUPPORTED = typeof Image !== 'undefined';
var IMAGE_BITMAP_SUPPORTED = typeof ImageBitmap !== 'undefined';
var NODE_IMAGE_SUPPORTED = Boolean(_parseImageNode);
var DATA_SUPPORTED = isBrowser ? true : NODE_IMAGE_SUPPORTED;
function isImageTypeSupported(type) {
  switch (type) {
    case 'auto':
      return IMAGE_BITMAP_SUPPORTED || IMAGE_SUPPORTED || DATA_SUPPORTED;

    case 'imagebitmap':
      return IMAGE_BITMAP_SUPPORTED;

    case 'image':
      return IMAGE_SUPPORTED;

    case 'data':
      return DATA_SUPPORTED;

    case 'html':
      return IMAGE_SUPPORTED;

    case 'ndarray':
      return DATA_SUPPORTED;

    default:
      throw new Error("@loaders.gl/images: image ".concat(type, " not supported in this environment"));
  }
}
function getDefaultImageType() {
  if (IMAGE_BITMAP_SUPPORTED) {
    return 'imagebitmap';
  }

  if (IMAGE_SUPPORTED) {
    return 'image';
  }

  if (DATA_SUPPORTED) {
    return 'data';
  }

  throw new Error("Install '@loaders.gl/polyfills' to parse images under Node.js");
}

function getImageType(image) {
  var format = getImageTypeOrNull(image);

  if (!format) {
    throw new Error('Not an image');
  }

  return format;
}
function getImageData(image) {
  switch (getImageType(image)) {
    case 'data':
      return image;

    case 'image':
    case 'imagebitmap':
      var canvas = document.createElement('canvas');
      var context = canvas.getContext('2d');

      if (context) {
        canvas.width = image.width;
        canvas.height = image.height;
        context.drawImage(image, 0, 0);
        return context.getImageData(0, 0, image.width, image.height);
      }

    default:
      return assert$1(false);
  }
}

function getImageTypeOrNull(image) {
  if (typeof ImageBitmap !== 'undefined' && image instanceof ImageBitmap) {
    return 'imagebitmap';
  }

  if (typeof Image !== 'undefined' && image instanceof Image) {
    return 'image';
  }

  if (image && _typeof(image) === 'object' && image.data && image.width && image.height) {
    return 'data';
  }

  return null;
}

var SVG_DATA_URL_PATTERN = /^data:image\/svg\+xml/;
var SVG_URL_PATTERN = /\.svg((\?|#).*)?$/;
function isSVG(url) {
  return url && (SVG_DATA_URL_PATTERN.test(url) || SVG_URL_PATTERN.test(url));
}
function getBlobOrSVGDataUrl(arrayBuffer, url) {
  if (isSVG(url)) {
    var textDecoder = new TextDecoder();
    var xmlText = textDecoder.decode(arrayBuffer);
    var src = "data:image/svg+xml;base64,".concat(btoa(xmlText));
    return src;
  }

  return getBlob(arrayBuffer, url);
}
function getBlob(arrayBuffer, url) {
  if (isSVG(url)) {
    throw new Error('SVG cannot be parsed directly to imagebitmap');
  }

  return new Blob([new Uint8Array(arrayBuffer)]);
}

function parseToImage(_x, _x2, _x3) {
  return _parseToImage.apply(this, arguments);
}

function _parseToImage() {
  _parseToImage = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, url) {
    var blobOrDataUrl, URL, objectUrl;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            blobOrDataUrl = getBlobOrSVGDataUrl(arrayBuffer, url);
            URL = self.URL || self.webkitURL;
            objectUrl = typeof blobOrDataUrl !== 'string' && URL.createObjectURL(blobOrDataUrl);
            _context.prev = 3;
            _context.next = 6;
            return loadToImage(objectUrl || blobOrDataUrl, options);

          case 6:
            return _context.abrupt("return", _context.sent);

          case 7:
            _context.prev = 7;

            if (objectUrl) {
              URL.revokeObjectURL(objectUrl);
            }

            return _context.finish(7);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3,, 7, 10]]);
  }));
  return _parseToImage.apply(this, arguments);
}

function loadToImage(_x4, _x5) {
  return _loadToImage.apply(this, arguments);
}

function _loadToImage() {
  _loadToImage = _asyncToGenerator(regenerator.mark(function _callee2(url, options) {
    var image;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            image = new Image();
            image.src = url;

            if (!(options.image && options.image.decode && image.decode)) {
              _context2.next = 6;
              break;
            }

            _context2.next = 5;
            return image.decode();

          case 5:
            return _context2.abrupt("return", image);

          case 6:
            _context2.next = 8;
            return new Promise(function (resolve, reject) {
              try {
                image.onload = function () {
                  return resolve(image);
                };

                image.onerror = function (err) {
                  return reject(new Error("Could not load image ".concat(url, ": ").concat(err)));
                };
              } catch (error) {
                reject(error);
              }
            });

          case 8:
            return _context2.abrupt("return", _context2.sent);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadToImage.apply(this, arguments);
}

var EMPTY_OBJECT = {};
var imagebitmapOptionsSupported = true;
function parseToImageBitmap(_x, _x2, _x3) {
  return _parseToImageBitmap.apply(this, arguments);
}

function _parseToImageBitmap() {
  _parseToImageBitmap = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, url) {
    var blob, image, imagebitmapOptions;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (!isSVG(url)) {
              _context.next = 7;
              break;
            }

            _context.next = 3;
            return parseToImage(arrayBuffer, options, url);

          case 3:
            image = _context.sent;
            blob = image;
            _context.next = 8;
            break;

          case 7:
            blob = getBlob(arrayBuffer, url);

          case 8:
            imagebitmapOptions = options && options.imagebitmap;
            _context.next = 11;
            return safeCreateImageBitmap(blob, imagebitmapOptions);

          case 11:
            return _context.abrupt("return", _context.sent);

          case 12:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseToImageBitmap.apply(this, arguments);
}

function safeCreateImageBitmap(_x4) {
  return _safeCreateImageBitmap.apply(this, arguments);
}

function _safeCreateImageBitmap() {
  _safeCreateImageBitmap = _asyncToGenerator(regenerator.mark(function _callee2(blob) {
    var imagebitmapOptions,
        _args2 = arguments;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            imagebitmapOptions = _args2.length > 1 && _args2[1] !== undefined ? _args2[1] : null;

            if (isEmptyObject(imagebitmapOptions) || !imagebitmapOptionsSupported) {
              imagebitmapOptions = null;
            }

            if (!imagebitmapOptions) {
              _context2.next = 13;
              break;
            }

            _context2.prev = 3;
            _context2.next = 6;
            return createImageBitmap(blob, imagebitmapOptions);

          case 6:
            return _context2.abrupt("return", _context2.sent);

          case 9:
            _context2.prev = 9;
            _context2.t0 = _context2["catch"](3);
            console.warn(_context2.t0);
            imagebitmapOptionsSupported = false;

          case 13:
            _context2.next = 15;
            return createImageBitmap(blob);

          case 15:
            return _context2.abrupt("return", _context2.sent);

          case 16:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2, null, [[3, 9]]);
  }));
  return _safeCreateImageBitmap.apply(this, arguments);
}

function isEmptyObject(object) {
  for (var key in object || EMPTY_OBJECT) {
    return false;
  }

  return true;
}

var BIG_ENDIAN = false;
var LITTLE_ENDIAN = true;
function getBinaryImageMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  return getPngMetadata(dataView) || getJpegMetadata(dataView) || getGifMetadata(dataView) || getBmpMetadata(dataView);
}

function getPngMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isPng = dataView.byteLength >= 24 && dataView.getUint32(0, BIG_ENDIAN) === 0x89504e47;

  if (!isPng) {
    return null;
  }

  return {
    mimeType: 'image/png',
    width: dataView.getUint32(16, BIG_ENDIAN),
    height: dataView.getUint32(20, BIG_ENDIAN)
  };
}

function getGifMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isGif = dataView.byteLength >= 10 && dataView.getUint32(0, BIG_ENDIAN) === 0x47494638;

  if (!isGif) {
    return null;
  }

  return {
    mimeType: 'image/gif',
    width: dataView.getUint16(6, LITTLE_ENDIAN),
    height: dataView.getUint16(8, LITTLE_ENDIAN)
  };
}

function getBmpMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isBmp = dataView.byteLength >= 14 && dataView.getUint16(0, BIG_ENDIAN) === 0x424d && dataView.getUint32(2, LITTLE_ENDIAN) === dataView.byteLength;

  if (!isBmp) {
    return null;
  }

  return {
    mimeType: 'image/bmp',
    width: dataView.getUint32(18, LITTLE_ENDIAN),
    height: dataView.getUint32(22, LITTLE_ENDIAN)
  };
}

function getJpegMetadata(binaryData) {
  var dataView = toDataView(binaryData);
  var isJpeg = dataView.byteLength >= 3 && dataView.getUint16(0, BIG_ENDIAN) === 0xffd8 && dataView.getUint8(2) === 0xff;

  if (!isJpeg) {
    return null;
  }

  var _getJpegMarkers = getJpegMarkers(),
      tableMarkers = _getJpegMarkers.tableMarkers,
      sofMarkers = _getJpegMarkers.sofMarkers;

  var i = 2;

  while (i + 9 < dataView.byteLength) {
    var marker = dataView.getUint16(i, BIG_ENDIAN);

    if (sofMarkers.has(marker)) {
      return {
        mimeType: 'image/jpeg',
        height: dataView.getUint16(i + 5, BIG_ENDIAN),
        width: dataView.getUint16(i + 7, BIG_ENDIAN)
      };
    }

    if (!tableMarkers.has(marker)) {
      return null;
    }

    i += 2;
    i += dataView.getUint16(i, BIG_ENDIAN);
  }

  return null;
}

function getJpegMarkers() {
  var tableMarkers = new Set([0xffdb, 0xffc4, 0xffcc, 0xffdd, 0xfffe]);

  for (var i = 0xffe0; i < 0xfff0; ++i) {
    tableMarkers.add(i);
  }

  var sofMarkers = new Set([0xffc0, 0xffc1, 0xffc2, 0xffc3, 0xffc5, 0xffc6, 0xffc7, 0xffc9, 0xffca, 0xffcb, 0xffcd, 0xffce, 0xffcf, 0xffde]);
  return {
    tableMarkers: tableMarkers,
    sofMarkers: sofMarkers
  };
}

function toDataView(data) {
  if (data instanceof DataView) {
    return data;
  }

  if (ArrayBuffer.isView(data)) {
    return new DataView(data.buffer);
  }

  if (data instanceof ArrayBuffer) {
    return new DataView(data);
  }

  throw new Error('toDataView');
}

function parseToNodeImage(arrayBuffer, options) {
  var _ref = getBinaryImageMetadata(arrayBuffer) || {},
      mimeType = _ref.mimeType;

  var _parseImageNode = global_._parseImageNode;
  assert$1(_parseImageNode);
  return _parseImageNode(arrayBuffer, mimeType, options);
}

function parseImage(_x, _x2, _x3) {
  return _parseImage.apply(this, arguments);
}

function _parseImage() {
  _parseImage = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, context) {
    var imageOptions, imageType, _ref, url, loadType, image;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = options || {};
            imageOptions = options.image || {};
            imageType = imageOptions.type || 'auto';
            _ref = context || {}, url = _ref.url;
            loadType = getLoadableImageType(imageType);
            _context.t0 = loadType;
            _context.next = _context.t0 === 'imagebitmap' ? 8 : _context.t0 === 'image' ? 12 : _context.t0 === 'data' ? 16 : 20;
            break;

          case 8:
            _context.next = 10;
            return parseToImageBitmap(arrayBuffer, options, url);

          case 10:
            image = _context.sent;
            return _context.abrupt("break", 21);

          case 12:
            _context.next = 14;
            return parseToImage(arrayBuffer, options, url);

          case 14:
            image = _context.sent;
            return _context.abrupt("break", 21);

          case 16:
            _context.next = 18;
            return parseToNodeImage(arrayBuffer, options);

          case 18:
            image = _context.sent;
            return _context.abrupt("break", 21);

          case 20:
            assert$1(false);

          case 21:
            if (imageType === 'data') {
              image = getImageData(image);
            }

            return _context.abrupt("return", image);

          case 23:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseImage.apply(this, arguments);
}

function getLoadableImageType(type) {
  switch (type) {
    case 'auto':
    case 'data':
      return getDefaultImageType();

    default:
      isImageTypeSupported(type);
      return type;
  }
}

var VERSION$2 = "2.3.13" ;
var EXTENSIONS$1 = ['png', 'jpg', 'jpeg', 'gif', 'webp', 'bmp', 'ico', 'svg'];
var MIME_TYPES = ['image/png', 'image/jpeg', 'image/gif', 'image/webp', 'image/bmp', 'image/vnd.microsoft.icon', 'image/svg+xml'];
var ImageLoader = {
  id: 'image',
  name: 'Images',
  version: VERSION$2,
  mimeTypes: MIME_TYPES,
  extensions: EXTENSIONS$1,
  parse: parseImage,
  tests: [function (arrayBuffer) {
    return Boolean(getBinaryImageMetadata(new DataView(arrayBuffer)));
  }],
  options: {
    image: {
      type: 'auto',
      decode: true
    }
  }
};

function getBinaryImageMIMEType(arrayBuffer) {
  var metadata = getBinaryImageMetadata(arrayBuffer);
  return metadata ? metadata.mimeType : null;
}

function assert(condition, message) {
  if (!condition) {
    throw new Error(message || 'assert failed: gltf');
  }
}

function resolveUrl(url, options) {
  var absolute = url.startsWith('data:') || url.startsWith('http:') || url.startsWith('https:');

  if (absolute) {
    return url;
  }

  var baseUrl = options.baseUri || options.uri;

  if (!baseUrl) {
    throw new Error("'baseUri' must be provided to resolve relative url ".concat(url));
  }

  return baseUrl.substr(0, baseUrl.lastIndexOf('/') + 1) + url;
}

function getTypedArrayForBufferView(json, buffers, bufferViewIndex) {
  var bufferView = json.bufferViews[bufferViewIndex];
  assert(bufferView);
  var bufferIndex = bufferView.buffer;
  var binChunk = buffers[bufferIndex];
  assert(binChunk);
  var byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
  return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
}

function _arrayWithHoles(arr) {
  if (Array.isArray(arr)) return arr;
}

function _iterableToArrayLimit(arr, i) {
  var _i = arr && (typeof Symbol !== "undefined" && arr[Symbol.iterator] || arr["@@iterator"]);

  if (_i == null) return;
  var _arr = [];
  var _n = true;
  var _d = false;

  var _s, _e;

  try {
    for (_i = _i.call(arr); !(_n = (_s = _i.next()).done); _n = true) {
      _arr.push(_s.value);

      if (i && _arr.length === i) break;
    }
  } catch (err) {
    _d = true;
    _e = err;
  } finally {
    try {
      if (!_n && _i["return"] != null) _i["return"]();
    } finally {
      if (_d) throw _e;
    }
  }

  return _arr;
}

function _nonIterableRest() {
  throw new TypeError("Invalid attempt to destructure non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
}

function _slicedToArray(arr, i) {
  return _arrayWithHoles(arr) || _iterableToArrayLimit(arr, i) || _unsupportedIterableToArray$8(arr, i) || _nonIterableRest();
}

function ownKeys$5(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$5(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$5(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$5(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var loadDecoderPromise;
function loadDracoDecoderModule(_x) {
  return _loadDracoDecoderModule.apply(this, arguments);
}

function _loadDracoDecoderModule() {
  _loadDracoDecoderModule = _asyncToGenerator(regenerator.mark(function _callee(options) {
    var modules;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            modules = options.modules || {};

            if (modules.draco3d) {
              loadDecoderPromise = loadDecoderPromise || new Promise(function (resolve) {
                var draco = modules.draco3d.createDecoderModule({
                  onModuleLoaded: function onModuleLoaded() {
                    resolve({
                      draco: draco
                    });
                  }
                });
              });
            } else {
              loadDecoderPromise = loadDecoderPromise || loadDracoDecoder(options);
            }

            _context.next = 4;
            return loadDecoderPromise;

          case 4:
            return _context.abrupt("return", _context.sent);

          case 5:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _loadDracoDecoderModule.apply(this, arguments);
}

function loadDracoDecoder(_x3) {
  return _loadDracoDecoder.apply(this, arguments);
}

function _loadDracoDecoder() {
  _loadDracoDecoder = _asyncToGenerator(regenerator.mark(function _callee3(options) {
    var DracoDecoderModule, wasmBinary, _yield$Promise$all, _yield$Promise$all2;

    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            _context3.t0 = options.draco && options.draco.decoderType;
            _context3.next = _context3.t0 === 'js' ? 3 : _context3.t0 === 'wasm' ? 7 : 7;
            break;

          case 3:
            _context3.next = 5;
            return loadLibrary('draco_decoder.js', 'draco', options);

          case 5:
            DracoDecoderModule = _context3.sent;
            return _context3.abrupt("break", 21);

          case 7:
            _context3.t1 = Promise;
            _context3.next = 10;
            return loadLibrary('draco_wasm_wrapper.js', 'draco', options);

          case 10:
            _context3.t2 = _context3.sent;
            _context3.next = 13;
            return loadLibrary('draco_decoder.wasm', 'draco', options);

          case 13:
            _context3.t3 = _context3.sent;
            _context3.t4 = [_context3.t2, _context3.t3];
            _context3.next = 17;
            return _context3.t1.all.call(_context3.t1, _context3.t4);

          case 17:
            _yield$Promise$all = _context3.sent;
            _yield$Promise$all2 = _slicedToArray(_yield$Promise$all, 2);
            DracoDecoderModule = _yield$Promise$all2[0];
            wasmBinary = _yield$Promise$all2[1];

          case 21:
            DracoDecoderModule = DracoDecoderModule || global_$1.DracoDecoderModule;
            _context3.next = 24;
            return initializeDracoDecoder(DracoDecoderModule, wasmBinary);

          case 24:
            return _context3.abrupt("return", _context3.sent);

          case 25:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadDracoDecoder.apply(this, arguments);
}

function initializeDracoDecoder(DracoDecoderModule, wasmBinary) {
  var options = {};

  if (wasmBinary) {
    options.wasmBinary = wasmBinary;
  }

  return new Promise(function (resolve) {
    DracoDecoderModule(_objectSpread$5(_objectSpread$5({}, options), {}, {
      onModuleLoaded: function onModuleLoaded(draco) {
        return resolve({
          draco: draco
        });
      }
    }));
  });
}

var GEOMETRY_TYPE = {
  TRIANGULAR_MESH: 0,
  POINT_CLOUD: 1
};
var DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP = {
  POSITION: 'POSITION',
  NORMAL: 'NORMAL',
  COLOR: 'COLOR_0',
  TEX_COORD: 'TEXCOORD_0'
};
var DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP = {
  1: Int8Array,
  2: Uint8Array,
  3: Int16Array,
  4: Uint16Array,
  5: Int32Array,
  6: Uint32Array,
  9: Float32Array
};

var DracoParser = function () {
  function DracoParser(draco) {
    _classCallCheck(this, DracoParser);

    this.draco = draco;
    this.drawMode = 'TRIANGLE';
    this.metadataQuerier = {};
  }

  _createClass(DracoParser, [{
    key: "destroy",
    value: function destroy() {}
  }, {
    key: "destroyGeometry",
    value: function destroyGeometry(dracoGeometry) {
      if (dracoGeometry) {
        this.draco.destroy(dracoGeometry.dracoGeometry);
      }
    }
  }, {
    key: "parseSync",
    value: function parseSync(arrayBuffer) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      this.metadataQuerier = new this.draco.MetadataQuerier();
      var buffer = new this.draco.DecoderBuffer();
      buffer.Init(new Int8Array(arrayBuffer), arrayBuffer.byteLength);
      var decoder = new this.draco.Decoder();
      var data = {};
      var dracoStatus;
      var dracoGeometry;
      var header;

      try {
        var geometryType = decoder.GetEncodedGeometryType(buffer);

        switch (geometryType) {
          case this.draco.TRIANGULAR_MESH:
            dracoGeometry = new this.draco.Mesh();
            dracoStatus = decoder.DecodeBufferToMesh(buffer, dracoGeometry);
            header = {
              type: GEOMETRY_TYPE.TRIANGULAR_MESH,
              faceCount: dracoGeometry.num_faces(),
              attributeCount: dracoGeometry.num_attributes(),
              vertexCount: dracoGeometry.num_points()
            };
            break;

          case this.draco.POINT_CLOUD:
            dracoGeometry = new this.draco.PointCloud();
            dracoStatus = decoder.DecodeBufferToPointCloud(buffer, dracoGeometry);
            header = {
              type: GEOMETRY_TYPE.POINT_CLOUD,
              attributeCount: dracoGeometry.num_attributes(),
              vertexCount: dracoGeometry.num_points()
            };
            break;

          default:
            throw new Error('Unknown DRACO geometry type.');
        }

        if (!dracoStatus.ok() || !dracoGeometry.ptr) {
          var message = "DRACO decompression failed: ".concat(dracoStatus.error_msg());

          if (dracoGeometry) {
            this.draco.destroy(dracoGeometry);
          }

          throw new Error(message);
        }

        data.loaderData = {
          header: header
        };

        this._extractDRACOGeometry(decoder, dracoGeometry, geometryType, data, options);

        var metadata = this._getGeometryMetadata(decoder, dracoGeometry);

        data.header = {
          vertexCount: header.vertexCount,
          boundingBox: getMeshBoundingBox(data.attributes),
          metadata: metadata
        };
      } finally {
        this.draco.destroy(decoder);
        this.draco.destroy(buffer);
        this.draco.destroy(dracoGeometry);
        this.draco.destroy(this.metadataQuerier);
      }

      return data;
    }
  }, {
    key: "_extractDRACOGeometry",
    value: function _extractDRACOGeometry(decoder, dracoGeometry, geometryType, geometry, options) {
      var attributes = this._getAttributes(decoder, dracoGeometry, options);

      var positionAttribute = attributes.POSITION;

      if (!positionAttribute) {
        throw new Error('DRACO decompressor: No position attribute found.');
      }

      if (geometryType === this.draco.TRIANGULAR_MESH) {
        attributes.indices = this.drawMode === 'TRIANGLE_STRIP' ? this._getMeshStripIndices(decoder, dracoGeometry) : this._getMeshFaceIndices(decoder, dracoGeometry);
        geometry.mode = this.drawMode === 'TRIANGLE_STRIP' ? 5 : 4;
      } else {
        geometry.mode = 0;
      }

      if (attributes.indices) {
        geometry.indices = {
          value: attributes.indices,
          size: 1
        };
        delete attributes.indices;
      }

      geometry.attributes = attributes;
      return geometry;
    }
  }, {
    key: "getPositionAttributeMetadata",
    value: function getPositionAttributeMetadata(positionAttribute) {
      this.metadata = this.metadata || {};
      this.metadata.attributes = this.metadata.attributes || {};
      var posTransform = new this.draco.AttributeQuantizationTransform();

      if (posTransform.InitFromAttribute(positionAttribute)) {
        this.metadata.attributes.position.isQuantized = true;
        this.metadata.attributes.position.maxRange = posTransform.range();
        this.metadata.attributes.position.numQuantizationBits = posTransform.quantization_bits();
        this.metadata.attributes.position.minValues = new Float32Array(3);

        for (var i = 0; i < 3; ++i) {
          this.metadata.attributes.position.minValues[i] = posTransform.min_value(i);
        }
      }

      this.draco.destroy(posTransform);
    }
  }, {
    key: "_getAttributes",
    value: function _getAttributes(decoder, dracoGeometry, options) {
      var attributes = {};
      var numPoints = dracoGeometry.num_points();

      for (var attributeId = 0; attributeId < dracoGeometry.num_attributes(); attributeId++) {
        var dracoAttribute = decoder.GetAttribute(dracoGeometry, attributeId);

        var attributeMetadata = this._getAttributeMetadata(decoder, dracoGeometry, attributeId);

        var attributeData = {
          uniqueId: dracoAttribute.unique_id(),
          attributeType: dracoAttribute.attribute_type(),
          dataType: DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[dracoAttribute.data_type()],
          size: dracoAttribute.size(),
          numComponents: dracoAttribute.num_components(),
          byteOffset: dracoAttribute.byte_offset(),
          byteStride: dracoAttribute.byte_stride(),
          normalized: dracoAttribute.normalized(),
          metadata: attributeMetadata
        };

        var attributeName = this._deduceAttributeName(attributeData, options);

        var _this$_getAttributeTy = this._getAttributeTypedArray(decoder, dracoGeometry, dracoAttribute, attributeName),
            typedArray = _this$_getAttributeTy.typedArray;

        attributes[attributeName] = {
          value: typedArray,
          size: typedArray.length / numPoints,
          metadata: attributeMetadata
        };
      }

      return attributes;
    }
  }, {
    key: "_getMeshFaceIndices",
    value: function _getMeshFaceIndices(decoder, dracoGeometry) {
      var numFaces = dracoGeometry.num_faces();
      var numIndices = numFaces * 3;
      var indices = new Uint32Array(numIndices);
      var dracoArray = new this.draco.DracoInt32Array();

      for (var i = 0; i < numFaces; ++i) {
        decoder.GetFaceFromMesh(dracoGeometry, i, dracoArray);
        var index = i * 3;
        indices[index] = dracoArray.GetValue(0);
        indices[index + 1] = dracoArray.GetValue(1);
        indices[index + 2] = dracoArray.GetValue(2);
      }

      this.draco.destroy(dracoArray);
      return indices;
    }
  }, {
    key: "_getMeshStripIndices",
    value: function _getMeshStripIndices(decoder, dracoGeometry) {
      var dracoArray = new this.draco.DracoInt32Array();
      decoder.GetTriangleStripsFromMesh(dracoGeometry, dracoArray);
      var indices = new Uint32Array(dracoArray.size());

      for (var i = 0; i < dracoArray.size(); ++i) {
        indices[i] = dracoArray.GetValue(i);
      }

      this.draco.destroy(dracoArray);
      return indices;
    }
  }, {
    key: "_getAttributeTypedArray",
    value: function _getAttributeTypedArray(decoder, dracoGeometry, dracoAttribute, attributeName) {
      if (dracoAttribute.ptr === 0) {
        var message = "DRACO decode bad attribute ".concat(attributeName);
        throw new Error(message);
      }

      var attributeType = DRACO_DATA_TYPE_TO_TYPED_ARRAY_MAP[dracoAttribute.data_type()];
      var numComponents = dracoAttribute.num_components();
      var numPoints = dracoGeometry.num_points();
      var numValues = numPoints * numComponents;
      var dracoArray;
      var typedArray;

      switch (attributeType) {
        case Float32Array:
          dracoArray = new this.draco.DracoFloat32Array();
          decoder.GetAttributeFloatForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Float32Array(numValues);
          break;

        case Int8Array:
          dracoArray = new this.draco.DracoInt8Array();
          decoder.GetAttributeInt8ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Int8Array(numValues);
          break;

        case Int16Array:
          dracoArray = new this.draco.DracoInt16Array();
          decoder.GetAttributeInt16ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Int16Array(numValues);
          break;

        case Int32Array:
          dracoArray = new this.draco.DracoInt32Array();
          decoder.GetAttributeInt32ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Int32Array(numValues);
          break;

        case Uint8Array:
          dracoArray = new this.draco.DracoUInt8Array();
          decoder.GetAttributeUInt8ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Uint8Array(numValues);
          break;

        case Uint16Array:
          dracoArray = new this.draco.DracoUInt16Array();
          decoder.GetAttributeUInt16ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Uint16Array(numValues);
          break;

        case Uint32Array:
          dracoArray = new this.draco.DracoUInt32Array();
          decoder.GetAttributeUInt32ForAllPoints(dracoGeometry, dracoAttribute, dracoArray);
          typedArray = new Uint32Array(numValues);
          break;

        default:
          var errorMsg = 'DRACO decoder: unexpected attribute type.';
          throw new Error(errorMsg);
      }

      for (var i = 0; i < numValues; i++) {
        typedArray[i] = dracoArray.GetValue(i);
      }

      this.draco.destroy(dracoArray);
      return {
        typedArray: typedArray,
        components: numComponents
      };
    }
  }, {
    key: "_deduceAttributeName",
    value: function _deduceAttributeName(attributeData, options) {
      var _options$extraAttribu = options.extraAttributes,
          extraAttributes = _options$extraAttribu === void 0 ? {} : _options$extraAttribu;

      if (extraAttributes && _typeof(extraAttributes) === 'object') {
        for (var _i = 0, _Object$entries = Object.entries(extraAttributes); _i < _Object$entries.length; _i++) {
          var _Object$entries$_i = _slicedToArray(_Object$entries[_i], 2),
              attributeName = _Object$entries$_i[0],
              attributeUniqueId = _Object$entries$_i[1];

          if (attributeUniqueId === attributeData.uniqueId) {
            return attributeName;
          }
        }
      }

      for (var dracoAttributeConstant in DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP) {
        var attributeType = this.draco[dracoAttributeConstant];

        if (attributeData.attributeType === attributeType) {
          return DRACO_TO_GLTF_ATTRIBUTE_NAME_MAP[dracoAttributeConstant];
        }
      }

      if (attributeData.metadata) {
        var entryName = options.attributeNameEntry || 'name';

        if (attributeData.metadata[entryName]) {
          return attributeData.metadata[entryName].string;
        }
      }

      return "CUSTOM_ATTRIBUTE_".concat(attributeData.uniqueId);
    }
  }, {
    key: "_getGeometryMetadata",
    value: function _getGeometryMetadata(decoder, dracoGeometry) {
      var dracoMetadata = decoder.GetMetadata(dracoGeometry);
      return this._queryDracoMetadata(dracoMetadata);
    }
  }, {
    key: "_getAttributeMetadata",
    value: function _getAttributeMetadata(decoder, dracoGeometry, attributeId) {
      var dracoMetadata = decoder.GetAttributeMetadata(dracoGeometry, attributeId);
      return this._queryDracoMetadata(dracoMetadata);
    }
  }, {
    key: "_queryDracoMetadata",
    value: function _queryDracoMetadata(dracoMetadata) {
      if (!dracoMetadata || !dracoMetadata.ptr) {
        return {};
      }

      var result = {};
      var numEntries = this.metadataQuerier.NumEntries(dracoMetadata);

      for (var entryIndex = 0; entryIndex < numEntries; entryIndex++) {
        var entryName = this.metadataQuerier.GetEntryName(dracoMetadata, entryIndex);
        result[entryName] = {
          "int": this.metadataQuerier.GetIntEntry(dracoMetadata, entryName),
          string: this.metadataQuerier.GetStringEntry(dracoMetadata, entryName),
          "double": this.metadataQuerier.GetDoubleEntry(dracoMetadata, entryName),
          intArray: this.metadataQuerier.GetIntEntryArray(dracoMetadata, entryName)
        };
      }

      return result;
    }
  }, {
    key: "decode",
    value: function decode(arrayBuffer, options) {
      return this.parseSync(arrayBuffer, options);
    }
  }]);

  return DracoParser;
}();

function ownKeys$4(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$4(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$4(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$4(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var VERSION$1 = "2.3.13" ;
var DracoWorkerLoader = {
  id: 'draco',
  name: 'Draco',
  version: VERSION$1,
  extensions: ['drc'],
  mimeTypes: ['application/octet-stream'],
  binary: true,
  tests: ['DRACO'],
  options: {
    draco: {
      decoderType: (typeof WebAssembly === "undefined" ? "undefined" : _typeof(WebAssembly)) === 'object' ? 'wasm' : 'js',
      libraryPath: "libs/",
      workerUrl: "https://unpkg.com/@loaders.gl/draco@".concat(VERSION$1, "/dist/draco-loader.worker.js"),
      localWorkerUrl: "modules/draco/dist/draco-loader.worker.dev.js",
      extraAttributes: {}
    }
  }
};
var DracoLoader = _objectSpread$4(_objectSpread$4({}, DracoWorkerLoader), {}, {
  parse: parse$1
});

function parse$1(_x, _x2, _x3, _x4) {
  return _parse$1.apply(this, arguments);
}

function _parse$1() {
  _parse$1 = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer, options, context, loader) {
    var _yield$loadDracoDecod, draco, dracoParser;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            _context.next = 2;
            return loadDracoDecoderModule(options);

          case 2:
            _yield$loadDracoDecod = _context.sent;
            draco = _yield$loadDracoDecod.draco;
            dracoParser = new DracoParser(draco);
            _context.prev = 5;
            return _context.abrupt("return", dracoParser.parseSync(arrayBuffer, _objectSpread$4({
              extraAttributes: options.draco && options.draco.extraAttributes || null
            }, options.parseOptions || {})));

          case 7:
            _context.prev = 7;
            dracoParser.destroy();
            return _context.finish(7);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[5,, 7, 10]]);
  }));
  return _parse$1.apply(this, arguments);
}

var TYPES = ['SCALAR', 'VEC2', 'VEC3', 'VEC4'];
var ARRAY_TO_COMPONENT_TYPE = new Map([[Int8Array, 5120], [Uint8Array, 5121], [Int16Array, 5122], [Uint16Array, 5123], [Uint32Array, 5125], [Float32Array, 5126]]);
var ATTRIBUTE_TYPE_TO_COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
var ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY = {
  5120: Int8Array,
  5121: Uint8Array,
  5122: Int16Array,
  5123: Uint16Array,
  5125: Uint32Array,
  5126: Float32Array
};
function getAccessorTypeFromSize(size) {
  var type = TYPES[size - 1];
  return type || TYPES[0];
}
function getComponentTypeFromArray(typedArray) {
  var componentType = ARRAY_TO_COMPONENT_TYPE.get(typedArray.constructor);

  if (!componentType) {
    throw new Error('Illegal typed array');
  }

  return componentType;
}
function getAccessorArrayTypeAndLength(accessor, bufferView) {
  var ArrayType = ATTRIBUTE_COMPONENT_TYPE_TO_ARRAY[accessor.componentType];
  var components = ATTRIBUTE_TYPE_TO_COMPONENTS[accessor.type];
  var bytesPerComponent = ATTRIBUTE_COMPONENT_TYPE_TO_BYTE_SIZE[accessor.componentType];
  var length = accessor.count * components;
  var byteLength = accessor.count * components * bytesPerComponent;
  assert(byteLength >= 0 && byteLength <= bufferView.byteLength);
  return {
    ArrayType: ArrayType,
    length: length,
    byteLength: byteLength
  };
}

var GLTFScenegraph = function () {
  function GLTFScenegraph(gltf) {
    _classCallCheck(this, GLTFScenegraph);

    if (gltf instanceof GLTFScenegraph) {
      return gltf;
    }

    if (!gltf) {
      gltf = {
        json: {
          asset: {
            version: '2.0',
            generator: 'loaders.gl'
          },
          buffers: []
        },
        buffers: []
      };
    }

    this.byteLength = 0;
    this.gltf = gltf;
    assert(this.gltf.json);
  }

  _createClass(GLTFScenegraph, [{
    key: "getApplicationData",
    value: function getApplicationData(key) {
      var data = this.json[key];
      return data;
    }
  }, {
    key: "getExtraData",
    value: function getExtraData(key) {
      var extras = this.json.extras || {};
      return extras[key];
    }
  }, {
    key: "getExtension",
    value: function getExtension(extensionName) {
      var isExtension = this.getUsedExtensions().find(function (name) {
        return name === extensionName;
      });
      var extensions = this.json.extensions || {};
      return isExtension ? extensions[extensionName] || true : null;
    }
  }, {
    key: "getRequiredExtension",
    value: function getRequiredExtension(extensionName) {
      var isRequired = this.getRequiredExtensions().find(function (name) {
        return name === extensionName;
      });
      return isRequired ? this.getExtension(extensionName) : null;
    }
  }, {
    key: "getRequiredExtensions",
    value: function getRequiredExtensions() {
      return this.json.extensionsRequired || [];
    }
  }, {
    key: "getUsedExtensions",
    value: function getUsedExtensions() {
      return this.json.extensionsUsed || [];
    }
  }, {
    key: "getObjectExtension",
    value: function getObjectExtension(object, extensionName) {
      var extensions = object.extensions || {};
      return extensions[extensionName];
    }
  }, {
    key: "getScene",
    value: function getScene(index) {
      return this.getObject('scenes', index);
    }
  }, {
    key: "getNode",
    value: function getNode(index) {
      return this.getObject('nodes', index);
    }
  }, {
    key: "getSkin",
    value: function getSkin(index) {
      return this.getObject('skins', index);
    }
  }, {
    key: "getMesh",
    value: function getMesh(index) {
      return this.getObject('meshes', index);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(index) {
      return this.getObject('materials', index);
    }
  }, {
    key: "getAccessor",
    value: function getAccessor(index) {
      return this.getObject('accessors', index);
    }
  }, {
    key: "getCamera",
    value: function getCamera(index) {
      return null;
    }
  }, {
    key: "getTexture",
    value: function getTexture(index) {
      return this.getObject('textures', index);
    }
  }, {
    key: "getSampler",
    value: function getSampler(index) {
      return this.getObject('samplers', index);
    }
  }, {
    key: "getImage",
    value: function getImage(index) {
      return this.getObject('images', index);
    }
  }, {
    key: "getBufferView",
    value: function getBufferView(index) {
      return this.getObject('bufferViews', index);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(index) {
      return this.getObject('buffers', index);
    }
  }, {
    key: "getObject",
    value: function getObject(array, index) {
      if (_typeof(index) === 'object') {
        return index;
      }

      var object = this.json[array] && this.json[array][index];

      if (!object) {
        throw new Error("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
      }

      return object;
    }
  }, {
    key: "getTypedArrayForBufferView",
    value: function getTypedArrayForBufferView(bufferView) {
      bufferView = this.getBufferView(bufferView);
      var bufferIndex = bufferView.buffer;
      var binChunk = this.gltf.buffers[bufferIndex];
      assert(binChunk);
      var byteOffset = (bufferView.byteOffset || 0) + binChunk.byteOffset;
      return new Uint8Array(binChunk.arrayBuffer, byteOffset, bufferView.byteLength);
    }
  }, {
    key: "getTypedArrayForAccessor",
    value: function getTypedArrayForAccessor(accessor) {
      accessor = this.getAccessor(accessor);
      var bufferView = this.getBufferView(accessor.bufferView);
      var buffer = this.getBuffer(bufferView.buffer);
      var arrayBuffer = buffer.data;

      var _getAccessorArrayType = getAccessorArrayTypeAndLength(accessor, bufferView),
          ArrayType = _getAccessorArrayType.ArrayType,
          length = _getAccessorArrayType.length;

      var byteOffset = bufferView.byteOffset + accessor.byteOffset;
      return new ArrayType(arrayBuffer, byteOffset, length);
    }
  }, {
    key: "getTypedArrayForImageData",
    value: function getTypedArrayForImageData(image) {
      image = this.getAccessor(image);
      var bufferView = this.getBufferView(image.bufferView);
      var buffer = this.getBuffer(bufferView.buffer);
      var arrayBuffer = buffer.data;
      var byteOffset = bufferView.byteOffset || 0;
      return new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
    }
  }, {
    key: "addApplicationData",
    value: function addApplicationData(key, data) {
      this.json[key] = data;
      return this;
    }
  }, {
    key: "addExtraData",
    value: function addExtraData(key, data) {
      this.json.extras = this.json.extras || {};
      this.json.extras[key] = data;
      return this;
    }
  }, {
    key: "addObjectExtension",
    value: function addObjectExtension(object, extensionName, data) {
      assert(data);
      object.extensions = object.extensions || {};
      object.extensions[extensionName] = data;
      this.registerUsedExtension(extensionName);
      return this;
    }
  }, {
    key: "setObjectExtension",
    value: function setObjectExtension(object, extensionName, data) {
      var extensions = object.extensions || {};
      extensions[extensionName] = data;
    }
  }, {
    key: "removeObjectExtension",
    value: function removeObjectExtension(object, extensionName) {
      var extensions = object.extensions || {};
      var extension = extensions[extensionName];
      delete extensions[extensionName];
      return extension;
    }
  }, {
    key: "addExtension",
    value: function addExtension(extensionName) {
      var extensionData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      assert(extensionData);
      this.json.extensions = this.json.extensions || {};
      this.json.extensions[extensionName] = extensionData;
      this.registerUsedExtension(extensionName);
      return extensionData;
    }
  }, {
    key: "addRequiredExtension",
    value: function addRequiredExtension(extensionName) {
      var extensionData = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      assert(extensionData);
      this.addExtension(extensionName, extensionData);
      this.registerRequiredExtension(extensionName);
      return extensionData;
    }
  }, {
    key: "registerUsedExtension",
    value: function registerUsedExtension(extensionName) {
      this.json.extensionsUsed = this.json.extensionsUsed || [];

      if (!this.json.extensionsUsed.find(function (ext) {
        return ext === extensionName;
      })) {
        this.json.extensionsUsed.push(extensionName);
      }
    }
  }, {
    key: "registerRequiredExtension",
    value: function registerRequiredExtension(extensionName) {
      this.registerUsedExtension(extensionName);
      this.json.extensionsRequired = this.json.extensionsRequired || [];

      if (!this.json.extensionsRequired.find(function (ext) {
        return ext === extensionName;
      })) {
        this.json.extensionsRequired.push(extensionName);
      }
    }
  }, {
    key: "removeExtension",
    value: function removeExtension(extensionName) {
      if (this.json.extensionsRequired) {
        this._removeStringFromArray(this.json.extensionsRequired, extensionName);
      }

      if (this.json.extensionsUsed) {
        this._removeStringFromArray(this.json.extensionsUsed, extensionName);
      }

      if (this.json.extensions) {
        delete this.json.extensions[extensionName];
      }
    }
  }, {
    key: "addMesh",
    value: function addMesh(attributes, indices) {
      var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;

      var accessors = this._addAttributes(attributes);

      var glTFMesh = {
        primitives: [{
          attributes: accessors,
          indices: indices,
          mode: mode
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addPointCloud",
    value: function addPointCloud(attributes) {
      var accessorIndices = this._addAttributes(attributes);

      var glTFMesh = {
        primitives: [{
          attributes: accessorIndices,
          mode: 0
        }]
      };
      this.json.meshes = this.json.meshes || [];
      this.json.meshes.push(glTFMesh);
      return this.json.meshes.length - 1;
    }
  }, {
    key: "addImage",
    value: function addImage(imageData, mimeType) {
      mimeType = mimeType || getBinaryImageMIMEType(imageData);
      var bufferViewIndex = this.addBufferView(imageData);
      var glTFImage = {
        bufferView: bufferViewIndex,
        mimeType: mimeType
      };
      this.json.images = this.json.images || [];
      this.json.images.push(glTFImage);
      return this.json.images.length - 1;
    }
  }, {
    key: "addBufferView",
    value: function addBufferView(buffer) {
      var byteLength = buffer.byteLength;
      assert(Number.isFinite(byteLength));
      this.sourceBuffers = this.sourceBuffers || [];
      this.sourceBuffers.push(buffer);
      var glTFBufferView = {
        buffer: 0,
        byteOffset: this.byteLength,
        byteLength: byteLength
      };
      this.byteLength += padTo4Bytes(byteLength);
      this.json.bufferViews = this.json.bufferViews || [];
      this.json.bufferViews.push(glTFBufferView);
      return this.json.bufferViews.length - 1;
    }
  }, {
    key: "addAccessor",
    value: function addAccessor(bufferViewIndex, accessor) {
      var glTFAccessor = {
        bufferView: bufferViewIndex,
        type: getAccessorTypeFromSize(accessor.size),
        componentType: accessor.componentType,
        count: accessor.count
      };
      this.json.accessors = this.json.accessors || [];
      this.json.accessors.push(glTFAccessor);
      return this.json.accessors.length - 1;
    }
  }, {
    key: "addBinaryBuffer",
    value: function addBinaryBuffer(sourceBuffer) {
      var accessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {
        size: 3
      };
      var bufferViewIndex = this.addBufferView(sourceBuffer);
      var accessorDefaults = {
        size: accessor.size,
        componentType: getComponentTypeFromArray(sourceBuffer),
        count: Math.round(sourceBuffer.length / accessor.size)
      };
      return this.addAccessor(bufferViewIndex, Object.assign(accessorDefaults, accessor));
    }
  }, {
    key: "createBinaryChunk",
    value: function createBinaryChunk() {
      if (this.arrayBuffer) {
        return;
      }

      var totalByteLength = this.byteLength;
      var arrayBuffer = new ArrayBuffer(totalByteLength);
      var targetArray = new Uint8Array(arrayBuffer);
      var dstByteOffset = 0;

      for (var i = 0; i < this.sourceBuffers.length; i++) {
        var sourceBuffer = this.sourceBuffers[i];
        dstByteOffset = copyToArray(sourceBuffer, targetArray, dstByteOffset);
      }

      this.json.buffers[0].byteLength = totalByteLength;
      this.arrayBuffer = arrayBuffer;
      this.sourceBuffers = [];
    }
  }, {
    key: "_removeStringFromArray",
    value: function _removeStringFromArray(array, string) {
      var found = true;

      while (found) {
        var index = array.indexOf(string);

        if (index > -1) {
          array.splice(index, 1);
        } else {
          found = false;
        }
      }
    }
  }, {
    key: "json",
    get: function get() {
      return this.gltf.json;
    }
  }]);

  return GLTFScenegraph;
}();

function ownKeys$3(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$3(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$3(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$3(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
function getGLTFAccessors(attributes) {
  var jsonAccessors = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var accessors = {};

  for (var name in attributes) {
    var attribute = attributes[name];

    if (name !== 'indices') {
      var glTFAccessor = getGLTFAccessor(attribute, jsonAccessors[name] || {});
      accessors[name] = glTFAccessor;
    }
  }

  return accessors;
}
function getGLTFAccessor(attribute) {
  var jsonAccessor = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

  var _getAccessorData = getAccessorData(attribute),
      buffer = _getAccessorData.buffer,
      size = _getAccessorData.size,
      count = _getAccessorData.count;

  var glTFAccessor = _objectSpread$3(_objectSpread$3({}, jsonAccessor), {}, {
    value: buffer,
    size: size,
    bufferView: null,
    byteOffset: 0,
    count: count,
    type: getAccessorTypeFromSize(size),
    componentType: getComponentTypeFromArray(buffer)
  });

  return glTFAccessor;
}

function getAccessorData(attribute) {
  var buffer = attribute;
  var size = 1;
  var count = 0;

  if (attribute && attribute.value) {
    buffer = attribute.value;
    size = attribute.size || 1;
  }

  if (buffer) {
    if (!ArrayBuffer.isView(buffer)) {
      buffer = toTypedArray(buffer, Float32Array);
    }

    count = buffer.length / size;
  }

  return {
    buffer: buffer,
    size: size,
    count: count
  };
}

function toTypedArray(array, ArrayType) {
  var convertTypedArrays = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : false;

  if (!array) {
    return null;
  }

  if (Array.isArray(array)) {
    return new ArrayType(array);
  }

  if (convertTypedArrays && !(array instanceof ArrayType)) {
    return new ArrayType(array);
  }

  return array;
}

function ownKeys$2(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$2(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$2(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$2(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

var _marked = regenerator.mark(makeMeshPrimitiveIterator);

function _createForOfIteratorHelper$5(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$5(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$5(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$5(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$5(o, minLen); }

function _arrayLikeToArray$5(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$4(_x, _x2, _x3) {
  return _decode.apply(this, arguments);
}

function _decode() {
  _decode = _asyncToGenerator(regenerator.mark(function _callee(gltfData, options, context) {
    var scenegraph, promises, _iterator4, _step4, primitive;

    return regenerator.wrap(function _callee$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            if (options.gltf.decompressMeshes) {
              _context2.next = 2;
              break;
            }

            return _context2.abrupt("return");

          case 2:
            scenegraph = new GLTFScenegraph(gltfData);
            promises = [];
            _iterator4 = _createForOfIteratorHelper$5(makeMeshPrimitiveIterator(scenegraph));

            try {
              for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
                primitive = _step4.value;

                if (scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION)) {
                  promises.push(decompressPrimitive(primitive, scenegraph, options, context));
                }
              }
            } catch (err) {
              _iterator4.e(err);
            } finally {
              _iterator4.f();
            }

            _context2.next = 8;
            return Promise.all(promises);

          case 8:
            scenegraph.removeExtension(KHR_DRACO_MESH_COMPRESSION);

          case 9:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee);
  }));
  return _decode.apply(this, arguments);
}

function encode$3(gltfData) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  var scenegraph = new GLTFScenegraph(gltfData);

  var _iterator = _createForOfIteratorHelper$5(scenegraph.json.meshes || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var mesh = _step.value;
      compressMesh(mesh, options);
      scenegraph.addRequiredExtension(KHR_DRACO_MESH_COMPRESSION);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}

function decompressPrimitive(_x4, _x5, _x6, _x7) {
  return _decompressPrimitive.apply(this, arguments);
}

function _decompressPrimitive() {
  _decompressPrimitive = _asyncToGenerator(regenerator.mark(function _callee2(primitive, scenegraph, options, context) {
    var compressedPrimitive, buffer, bufferCopy, parse, dracoOptions, decodedData, originalAccessors, _i, _arr, _arr$_i, name, index;

    return regenerator.wrap(function _callee2$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            compressedPrimitive = scenegraph.getObjectExtension(primitive, KHR_DRACO_MESH_COMPRESSION);
            buffer = scenegraph.getTypedArrayForBufferView(compressedPrimitive.bufferView);
            bufferCopy = getZeroOffsetArrayBuffer(buffer.buffer, buffer.byteOffset);
            parse = context.parse;
            dracoOptions = _objectSpread$2({}, options);
            delete dracoOptions['3d-tiles'];
            _context3.next = 8;
            return parse(bufferCopy, DracoLoader, dracoOptions, context);

          case 8:
            decodedData = _context3.sent;
            originalAccessors = {};

            for (_i = 0, _arr = [].concat(_toConsumableArray(Object.entries(primitive.attributes)), [['indices', primitive.indices]]); _i < _arr.length; _i++) {
              _arr$_i = _slicedToArray(_arr[_i], 2), name = _arr$_i[0], index = _arr$_i[1];
              originalAccessors[name] = scenegraph.getAccessor(index);
            }

            primitive.attributes = getGLTFAccessors(decodedData.attributes, originalAccessors);

            if (decodedData.indices) {
              primitive.indices = getGLTFAccessor(decodedData.indices, originalAccessors.indices || {});
            }

            checkPrimitive(primitive);

          case 14:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee2);
  }));
  return _decompressPrimitive.apply(this, arguments);
}

function compressMesh(attributes, indices) {
  var mode = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 4;
  var options = arguments.length > 3 ? arguments[3] : undefined;
  var context = arguments.length > 4 ? arguments[4] : undefined;

  if (!options.DracoWriter || !options.DracoLoader) {
    throw new Error('DracoWriter/DracoLoader not available');
  }

  var compressedData = options.DracoWriter.encodeSync({
    attributes: attributes
  });
  var parseSync = context.parseSync;
  var decodedData = parseSync({
    attributes: attributes
  });

  var fauxAccessors = options._addFauxAttributes(decodedData.attributes);

  var bufferViewIndex = options.addBufferView(compressedData);
  var glTFMesh = {
    primitives: [{
      attributes: fauxAccessors,
      mode: mode,
      extensions: _defineProperty({}, KHR_DRACO_MESH_COMPRESSION, {
        bufferView: bufferViewIndex,
        attributes: fauxAccessors
      })
    }]
  };
  return glTFMesh;
}

function checkPrimitive(primitive) {
  if (!primitive.attributes && Object.keys(primitive.attributes).length > 0) {
    throw new Error('Empty glTF primitive detected: Draco decompression failure?');
  }
}

function makeMeshPrimitiveIterator(scenegraph) {
  var _iterator2, _step2, mesh, _iterator3, _step3, primitive;

  return regenerator.wrap(function makeMeshPrimitiveIterator$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _iterator2 = _createForOfIteratorHelper$5(scenegraph.json.meshes || []);
          _context.prev = 1;

          _iterator2.s();

        case 3:
          if ((_step2 = _iterator2.n()).done) {
            _context.next = 24;
            break;
          }

          mesh = _step2.value;
          _iterator3 = _createForOfIteratorHelper$5(mesh.primitives);
          _context.prev = 6;

          _iterator3.s();

        case 8:
          if ((_step3 = _iterator3.n()).done) {
            _context.next = 14;
            break;
          }

          primitive = _step3.value;
          _context.next = 12;
          return primitive;

        case 12:
          _context.next = 8;
          break;

        case 14:
          _context.next = 19;
          break;

        case 16:
          _context.prev = 16;
          _context.t0 = _context["catch"](6);

          _iterator3.e(_context.t0);

        case 19:
          _context.prev = 19;

          _iterator3.f();

          return _context.finish(19);

        case 22:
          _context.next = 3;
          break;

        case 24:
          _context.next = 29;
          break;

        case 26:
          _context.prev = 26;
          _context.t1 = _context["catch"](1);

          _iterator2.e(_context.t1);

        case 29:
          _context.prev = 29;

          _iterator2.f();

          return _context.finish(29);

        case 32:
        case "end":
          return _context.stop();
      }
    }
  }, _marked, null, [[1, 26, 29, 32], [6, 16, 19, 22]]);
}

var KHR_draco_mesh_compression = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$4,
    encode: encode$3
});

function _createForOfIteratorHelper$4(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$4(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$4(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$4(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$4(o, minLen); }

function _arrayLikeToArray$4(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$3(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;
  var extension = gltfScenegraph.getExtension(KHR_LIGHTS_PUNCTUAL);

  if (extension) {
    gltfScenegraph.json.lights = extension.lights;
    gltfScenegraph.removeExtension(KHR_LIGHTS_PUNCTUAL);
  }

  var _iterator = _createForOfIteratorHelper$4(json.nodes || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      var nodeExtension = gltfScenegraph.getObjectExtension(node, KHR_LIGHTS_PUNCTUAL);

      if (nodeExtension) {
        node.light = nodeExtension.light;
      }

      gltfScenegraph.removeObjectExtension(node, KHR_LIGHTS_PUNCTUAL);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function encode$2(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;

  if (json.lights) {
    var extension = gltfScenegraph.addExtension(KHR_LIGHTS_PUNCTUAL);
    assert(!extension.lights);
    extension.lights = json.lights;
    delete json.lights;
  }

  if (gltfScenegraph.json.lights) {
    var _iterator2 = _createForOfIteratorHelper$4(gltfScenegraph.json.lights),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var light = _step2.value;
        var node = light.node;
        gltfScenegraph.addObjectExtension(node, KHR_LIGHTS_PUNCTUAL, light);
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }

    delete gltfScenegraph.json.lights;
  }
}

var KHR_lights_punctual = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$3,
    encode: encode$2
});

function _createForOfIteratorHelper$3(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$3(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$3(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$3(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$3(o, minLen); }

function _arrayLikeToArray$3(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$2(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;
  gltfScenegraph.removeExtension(KHR_MATERIALS_UNLIT);

  var _iterator = _createForOfIteratorHelper$3(json.materials || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var material = _step.value;
      var extension = material.extensions && material.extensions.KHR_materials_unlit;

      if (extension) {
        material.unlit = true;
      }

      gltfScenegraph.removeObjectExtension(material, KHR_MATERIALS_UNLIT);
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }
}
function encode$1(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;

  if (gltfScenegraph.materials) {
    var _iterator2 = _createForOfIteratorHelper$3(json.materials),
        _step2;

    try {
      for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
        var material = _step2.value;

        if (material.unlit) {
          delete material.unlit;
          gltfScenegraph.addObjectExtension(material, KHR_MATERIALS_UNLIT, {});
          gltfScenegraph.addExtension(KHR_MATERIALS_UNLIT);
        }
      }
    } catch (err) {
      _iterator2.e(err);
    } finally {
      _iterator2.f();
    }
  }
}

var KHR_materials_unlit = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$2,
    encode: encode$1
});

function _createForOfIteratorHelper$2(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$2(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$2(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$2(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$2(o, minLen); }

function _arrayLikeToArray$2(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode$1(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;
  var extension = gltfScenegraph.getExtension(KHR_TECHNIQUES_WEBGL);

  if (extension) {
    var techniques = resolveTechniques(extension, gltfScenegraph);

    var _iterator = _createForOfIteratorHelper$2(json.materials || []),
        _step;

    try {
      for (_iterator.s(); !(_step = _iterator.n()).done;) {
        var material = _step.value;
        var materialExtension = gltfScenegraph.getObjectExtension(material, KHR_TECHNIQUES_WEBGL);

        if (materialExtension) {
          material.technique = Object.assign({}, materialExtension, techniques[materialExtension.technique]);
          material.technique.values = resolveValues(material.technique, gltfScenegraph);
        }

        gltfScenegraph.removeObjectExtension(material, KHR_TECHNIQUES_WEBGL);
      }
    } catch (err) {
      _iterator.e(err);
    } finally {
      _iterator.f();
    }

    gltfScenegraph.removeExtension(KHR_TECHNIQUES_WEBGL);
  }
}
function encode(gltfData, options) {}

function resolveTechniques(_ref, gltfScenegraph) {
  var _ref$programs = _ref.programs,
      programs = _ref$programs === void 0 ? [] : _ref$programs,
      _ref$shaders = _ref.shaders,
      shaders = _ref$shaders === void 0 ? [] : _ref$shaders,
      _ref$techniques = _ref.techniques,
      techniques = _ref$techniques === void 0 ? [] : _ref$techniques;
  var textDecoder = new TextDecoder();
  shaders.forEach(function (shader) {
    if (Number.isFinite(shader.bufferView)) {
      shader.code = textDecoder.decode(gltfScenegraph.getTypedArrayForBufferView(shader.bufferView));
    } else {
      throw new Error('KHR_techniques_webgl: no shader code');
    }
  });
  programs.forEach(function (program) {
    program.fragmentShader = shaders[program.fragmentShader];
    program.vertexShader = shaders[program.vertexShader];
  });
  techniques.forEach(function (technique) {
    technique.program = programs[technique.program];
  });
  return techniques;
}

function resolveValues(technique, gltfScenegraph) {
  var values = Object.assign({}, technique.values);
  Object.keys(technique.uniforms || {}).forEach(function (uniform) {
    if (technique.uniforms[uniform].value && !(uniform in values)) {
      values[uniform] = technique.uniforms[uniform].value;
    }
  });
  Object.keys(values).forEach(function (uniform) {
    if (_typeof(values[uniform]) === 'object' && values[uniform].index !== undefined) {
      values[uniform].texture = gltfScenegraph.getTexture(values[uniform].index);
    }
  });
  return values;
}

var KHR_techniques_webgl = /*#__PURE__*/Object.freeze({
    __proto__: null,
    decode: decode$1,
    encode: encode
});

var EXTENSIONS = {
  KHR_draco_mesh_compression: KHR_draco_mesh_compression,
  KHR_lights_punctual: KHR_lights_punctual,
  KHR_materials_unlit: KHR_materials_unlit,
  KHR_techniques_webgl: KHR_techniques_webgl
};
function decodeExtensions(_x) {
  return _decodeExtensions.apply(this, arguments);
}

function _decodeExtensions() {
  _decodeExtensions = _asyncToGenerator(regenerator.mark(function _callee(gltf) {
    var options,
        context,
        extensionName,
        excludes,
        exclude,
        extension,
        _args = arguments;
    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            context = _args.length > 2 ? _args[2] : undefined;
            options.gltf = options.gltf || {};
            _context.t0 = regenerator.keys(EXTENSIONS);

          case 4:
            if ((_context.t1 = _context.t0()).done) {
              _context.next = 14;
              break;
            }

            extensionName = _context.t1.value;
            excludes = options.gltf.excludeExtensions || {};
            exclude = extensionName in excludes && !excludes[extensionName];

            if (exclude) {
              _context.next = 12;
              break;
            }

            extension = EXTENSIONS[extensionName];
            _context.next = 12;
            return extension.decode(gltf, options, context);

          case 12:
            _context.next = 4;
            break;

          case 14:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _decodeExtensions.apply(this, arguments);
}

var MAGIC_glTF = 0x676c5446;
var GLB_FILE_HEADER_SIZE = 12;
var GLB_CHUNK_HEADER_SIZE = 8;
var GLB_CHUNK_TYPE_JSON = 0x4e4f534a;
var GLB_CHUNK_TYPE_BIN = 0x004e4942;
var GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED = 0;
var GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED = 1;
var GLB_V1_CONTENT_FORMAT_JSON = 0x0;
var LE = true;

function getMagicString(dataView) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  return "".concat(String.fromCharCode(dataView.getUint8(byteOffset + 0))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 1))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 2))).concat(String.fromCharCode(dataView.getUint8(byteOffset + 3)));
}

function isGLB(arrayBuffer) {
  var byteOffset = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 0;
  var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
  var dataView = new DataView(arrayBuffer);
  var _options$magic = options.magic,
      magic = _options$magic === void 0 ? MAGIC_glTF : _options$magic;
  var magic1 = dataView.getUint32(byteOffset, false);
  return magic1 === magic || magic1 === MAGIC_glTF;
}
function parseGLBSync(glb, arrayBuffer) {
  var byteOffset = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 0;
  var dataView = new DataView(arrayBuffer);
  glb.type = getMagicString(dataView, byteOffset + 0);
  glb.version = dataView.getUint32(byteOffset + 4, LE);
  var byteLength = dataView.getUint32(byteOffset + 8, LE);
  glb.header = {
    byteOffset: byteOffset,
    byteLength: byteLength
  };
  glb.json = {};
  glb.binChunks = [];
  byteOffset += GLB_FILE_HEADER_SIZE;

  switch (glb.version) {
    case 1:
      return parseGLBV1(glb, dataView, byteOffset);

    case 2:
      return parseGLBV2(glb, dataView, byteOffset, {});

    default:
      throw new Error("Invalid GLB version ".concat(glb.version, ". Only supports v1 and v2."));
  }
}

function parseGLBV1(glb, dataView, byteOffset, options) {
  assert$2(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  var contentLength = dataView.getUint32(byteOffset + 0, LE);
  var contentFormat = dataView.getUint32(byteOffset + 4, LE);
  byteOffset += GLB_CHUNK_HEADER_SIZE;
  assert$2(contentFormat === GLB_V1_CONTENT_FORMAT_JSON);
  parseJSONChunk(glb, dataView, byteOffset, contentLength);
  byteOffset += contentLength;
  byteOffset += parseBINChunk(glb, dataView, byteOffset, glb.header.byteLength);
  return byteOffset;
}

function parseGLBV2(glb, dataView, byteOffset, options) {
  assert$2(glb.header.byteLength > GLB_FILE_HEADER_SIZE + GLB_CHUNK_HEADER_SIZE);
  parseGLBChunksSync(glb, dataView, byteOffset, options);
  return byteOffset + glb.header.byteLength;
}

function parseGLBChunksSync(glb, dataView, byteOffset, options) {
  while (byteOffset + 8 <= glb.header.byteLength) {
    var chunkLength = dataView.getUint32(byteOffset + 0, LE);
    var chunkFormat = dataView.getUint32(byteOffset + 4, LE);
    byteOffset += GLB_CHUNK_HEADER_SIZE;

    switch (chunkFormat) {
      case GLB_CHUNK_TYPE_JSON:
        parseJSONChunk(glb, dataView, byteOffset, chunkLength);
        break;

      case GLB_CHUNK_TYPE_BIN:
        parseBINChunk(glb, dataView, byteOffset, chunkLength);
        break;

      case GLB_CHUNK_TYPE_JSON_XVIZ_DEPRECATED:
        if (!options.glb.strict) {
          parseJSONChunk(glb, dataView, byteOffset, chunkLength);
        }

        break;

      case GLB_CHUNK_TYPE_BIX_XVIZ_DEPRECATED:
        if (!options.glb.strict) {
          parseBINChunk(glb, dataView, byteOffset, chunkLength);
        }

        break;
    }

    byteOffset += padTo4Bytes(chunkLength);
  }

  return byteOffset;
}

function parseJSONChunk(glb, dataView, byteOffset, chunkLength, options) {
  var jsonChunk = new Uint8Array(dataView.buffer, byteOffset, chunkLength);
  var textDecoder = new TextDecoder('utf8');
  var jsonText = textDecoder.decode(jsonChunk);
  glb.json = JSON.parse(jsonText);
  return padTo4Bytes(chunkLength);
}

function parseBINChunk(glb, dataView, byteOffset, chunkLength, options) {
  glb.header.hasBinChunk = true;
  glb.binChunks.push({
    byteOffset: byteOffset,
    byteLength: chunkLength,
    arrayBuffer: dataView.buffer
  });
  return padTo4Bytes(chunkLength);
}

function _createForOfIteratorHelper$1(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray$1(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray$1(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray$1(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray$1(o, minLen); }

function _arrayLikeToArray$1(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
function decode(gltfData, options) {
  var gltfScenegraph = new GLTFScenegraph(gltfData);
  var json = gltfScenegraph.json;

  var _iterator = _createForOfIteratorHelper$1(json.images || []),
      _step;

  try {
    for (_iterator.s(); !(_step = _iterator.n()).done;) {
      var node = _step.value;
      var extension = gltfScenegraph.removeObjectExtension(node, KHR_BINARY_GLTF);

      if (extension) {
        Object.assign(node, extension);
      }
    }
  } catch (err) {
    _iterator.e(err);
  } finally {
    _iterator.f();
  }

  if (json.buffers && json.buffers[0]) {
    delete json.buffers[0].uri;
  }

  gltfScenegraph.removeExtension(KHR_BINARY_GLTF);
}

function _createForOfIteratorHelper(o, allowArrayLike) { var it; if (typeof Symbol === "undefined" || o[Symbol.iterator] == null) { if (Array.isArray(o) || (it = _unsupportedIterableToArray(o)) || allowArrayLike && o && typeof o.length === "number") { if (it) o = it; var i = 0; var F = function F() {}; return { s: F, n: function n() { if (i >= o.length) return { done: true }; return { done: false, value: o[i++] }; }, e: function e(_e) { throw _e; }, f: F }; } throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method."); } var normalCompletion = true, didErr = false, err; return { s: function s() { it = o[Symbol.iterator](); }, n: function n() { var step = it.next(); normalCompletion = step.done; return step; }, e: function e(_e2) { didErr = true; err = _e2; }, f: function f() { try { if (!normalCompletion && it["return"] != null) it["return"](); } finally { if (didErr) throw err; } } }; }

function _unsupportedIterableToArray(o, minLen) { if (!o) return; if (typeof o === "string") return _arrayLikeToArray(o, minLen); var n = Object.prototype.toString.call(o).slice(8, -1); if (n === "Object" && o.constructor) n = o.constructor.name; if (n === "Map" || n === "Set") return Array.from(o); if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen); }

function _arrayLikeToArray(arr, len) { if (len == null || len > arr.length) len = arr.length; for (var i = 0, arr2 = new Array(len); i < len; i++) { arr2[i] = arr[i]; } return arr2; }
var GLTF_ARRAYS = {
  accessors: 'accessor',
  animations: 'animation',
  buffers: 'buffer',
  bufferViews: 'bufferView',
  images: 'image',
  materials: 'material',
  meshes: 'mesh',
  nodes: 'node',
  samplers: 'sampler',
  scenes: 'scene',
  skins: 'skin',
  textures: 'texture'
};
var GLTF_KEYS = {
  accessor: 'accessors',
  animations: 'animation',
  buffer: 'buffers',
  bufferView: 'bufferViews',
  image: 'images',
  material: 'materials',
  mesh: 'meshes',
  node: 'nodes',
  sampler: 'samplers',
  scene: 'scenes',
  skin: 'skins',
  texture: 'textures'
};

var GLTFV1Normalizer = function () {
  function GLTFV1Normalizer(gltf) {
    _classCallCheck(this, GLTFV1Normalizer);

    this.idToIndexMap = {
      animations: {},
      accessors: {},
      buffers: {},
      bufferViews: {},
      images: {},
      materials: {},
      meshes: {},
      nodes: {},
      samplers: {},
      scenes: {},
      skins: {},
      textures: {}
    };
  }

  _createClass(GLTFV1Normalizer, [{
    key: "normalize",
    value: function normalize(gltf, options) {
      this.json = gltf.json;
      var json = gltf.json;

      switch (json.asset && json.asset.version) {
        case '2.0':
          return;

        case undefined:
        case '1.0':
          break;

        default:
          console.warn("glTF: Unknown version ".concat(json.asset.version));
          return;
      }

      if (!options.normalize) {
        throw new Error('glTF v1 is not supported.');
      }

      console.warn('Converting glTF v1 to glTF v2 format. This is experimental and may fail.');

      this._addAsset(json);

      this._convertTopLevelObjectsToArrays(json);

      decode(gltf);

      this._convertObjectIdsToArrayIndices(json);

      this._updateObjects(json);
    }
  }, {
    key: "_addAsset",
    value: function _addAsset(json) {
      json.asset = json.asset || {};
      json.asset.version = '2.0';
      json.asset.generator = json.asset.generator || 'Normalized to glTF 2.0 by loaders.gl';
    }
  }, {
    key: "_convertTopLevelObjectsToArrays",
    value: function _convertTopLevelObjectsToArrays(json) {
      for (var arrayName in GLTF_ARRAYS) {
        this._convertTopLevelObjectToArray(json, arrayName);
      }
    }
  }, {
    key: "_convertTopLevelObjectToArray",
    value: function _convertTopLevelObjectToArray(json, mapName) {
      var objectMap = json[mapName];

      if (!objectMap || Array.isArray(objectMap)) {
        return;
      }

      json[mapName] = [];

      for (var id in objectMap) {
        var object = objectMap[id];
        object.id = object.id || id;
        var index = json[mapName].length;
        json[mapName].push(object);
        this.idToIndexMap[mapName][id] = index;
      }
    }
  }, {
    key: "_convertObjectIdsToArrayIndices",
    value: function _convertObjectIdsToArrayIndices(json) {
      for (var arrayName in GLTF_ARRAYS) {
        this._convertIdsToIndices(json, arrayName);
      }

      if ('scene' in json) {
        json.scene = this._convertIdToIndex(json.scene, 'scene');
      }

      var _iterator = _createForOfIteratorHelper(json.textures),
          _step;

      try {
        for (_iterator.s(); !(_step = _iterator.n()).done;) {
          var texture = _step.value;

          this._convertTextureIds(texture);
        }
      } catch (err) {
        _iterator.e(err);
      } finally {
        _iterator.f();
      }

      var _iterator2 = _createForOfIteratorHelper(json.meshes),
          _step2;

      try {
        for (_iterator2.s(); !(_step2 = _iterator2.n()).done;) {
          var mesh = _step2.value;

          this._convertMeshIds(mesh);
        }
      } catch (err) {
        _iterator2.e(err);
      } finally {
        _iterator2.f();
      }

      var _iterator3 = _createForOfIteratorHelper(json.nodes),
          _step3;

      try {
        for (_iterator3.s(); !(_step3 = _iterator3.n()).done;) {
          var node = _step3.value;

          this._convertNodeIds(node);
        }
      } catch (err) {
        _iterator3.e(err);
      } finally {
        _iterator3.f();
      }

      var _iterator4 = _createForOfIteratorHelper(json.scenes),
          _step4;

      try {
        for (_iterator4.s(); !(_step4 = _iterator4.n()).done;) {
          var _node = _step4.value;

          this._convertSceneIds(_node);
        }
      } catch (err) {
        _iterator4.e(err);
      } finally {
        _iterator4.f();
      }
    }
  }, {
    key: "_convertTextureIds",
    value: function _convertTextureIds(texture) {
      if (texture.source) {
        texture.source = this._convertIdToIndex(texture.source, 'image');
      }
    }
  }, {
    key: "_convertMeshIds",
    value: function _convertMeshIds(mesh) {
      var _iterator5 = _createForOfIteratorHelper(mesh.primitives),
          _step5;

      try {
        for (_iterator5.s(); !(_step5 = _iterator5.n()).done;) {
          var primitive = _step5.value;
          var attributes = primitive.attributes,
              indices = primitive.indices,
              material = primitive.material;

          for (var attributeName in attributes) {
            attributes[attributeName] = this._convertIdToIndex(attributes[attributeName], 'accessor');
          }

          if (indices) {
            primitive.indices = this._convertIdToIndex(indices, 'accessor');
          }

          if (material) {
            primitive.material = this._convertIdToIndex(material, 'material');
          }
        }
      } catch (err) {
        _iterator5.e(err);
      } finally {
        _iterator5.f();
      }
    }
  }, {
    key: "_convertNodeIds",
    value: function _convertNodeIds(node) {
      var _this = this;

      if (node.children) {
        node.children = node.children.map(function (child) {
          return _this._convertIdToIndex(child, 'node');
        });
      }
    }
  }, {
    key: "_convertSceneIds",
    value: function _convertSceneIds(scene) {
      var _this2 = this;

      if (scene.nodes) {
        scene.nodes = scene.nodes.map(function (node) {
          return _this2._convertIdToIndex(node, 'node');
        });
      }
    }
  }, {
    key: "_convertIdsToIndices",
    value: function _convertIdsToIndices(json, topLevelArrayName) {
      var _iterator6 = _createForOfIteratorHelper(json[topLevelArrayName]),
          _step6;

      try {
        for (_iterator6.s(); !(_step6 = _iterator6.n()).done;) {
          var object = _step6.value;

          for (var key in object) {
            var id = object[key];

            var index = this._convertIdToIndex(id, key);

            object[key] = index;
          }
        }
      } catch (err) {
        _iterator6.e(err);
      } finally {
        _iterator6.f();
      }
    }
  }, {
    key: "_convertIdToIndex",
    value: function _convertIdToIndex(id, key) {
      var arrayName = GLTF_KEYS[key];

      if (arrayName in this.idToIndexMap) {
        var index = this.idToIndexMap[arrayName][id];

        if (!Number.isFinite(index)) {
          throw new Error("gltf v1: failed to resolve ".concat(key, " with id ").concat(id));
        }

        return index;
      }

      return id;
    }
  }, {
    key: "_updateObjects",
    value: function _updateObjects(json) {
      var _iterator7 = _createForOfIteratorHelper(this.json.buffers),
          _step7;

      try {
        for (_iterator7.s(); !(_step7 = _iterator7.n()).done;) {
          var buffer = _step7.value;
          delete buffer.type;
        }
      } catch (err) {
        _iterator7.e(err);
      } finally {
        _iterator7.f();
      }
    }
  }]);

  return GLTFV1Normalizer;
}();

function normalizeGLTFV1(gltf) {
  var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
  return new GLTFV1Normalizer().normalize(gltf, options);
}

var _DEFAULT_SAMPLER;

function ownKeys$1(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread$1(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys$1(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys$1(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var COMPONENTS = {
  SCALAR: 1,
  VEC2: 2,
  VEC3: 3,
  VEC4: 4,
  MAT2: 4,
  MAT3: 9,
  MAT4: 16
};
var BYTES = {
  5120: 1,
  5121: 1,
  5122: 2,
  5123: 2,
  5125: 4,
  5126: 4
};
var GL_SAMPLER = {
  TEXTURE_MAG_FILTER: 0x2800,
  TEXTURE_MIN_FILTER: 0x2801,
  TEXTURE_WRAP_S: 0x2802,
  TEXTURE_WRAP_T: 0x2803,
  REPEAT: 0x2901,
  LINEAR: 0x2601,
  NEAREST_MIPMAP_LINEAR: 0x2702
};
var SAMPLER_PARAMETER_GLTF_TO_GL = {
  magFilter: GL_SAMPLER.TEXTURE_MAG_FILTER,
  minFilter: GL_SAMPLER.TEXTURE_MIN_FILTER,
  wrapS: GL_SAMPLER.TEXTURE_WRAP_S,
  wrapT: GL_SAMPLER.TEXTURE_WRAP_T
};
var DEFAULT_SAMPLER = (_DEFAULT_SAMPLER = {}, _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_MAG_FILTER, GL_SAMPLER.LINEAR), _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_MIN_FILTER, GL_SAMPLER.NEAREST_MIPMAP_LINEAR), _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_WRAP_S, GL_SAMPLER.REPEAT), _defineProperty(_DEFAULT_SAMPLER, GL_SAMPLER.TEXTURE_WRAP_, GL_SAMPLER.REPEAT), _DEFAULT_SAMPLER);

function getBytesFromComponentType(componentType) {
  return BYTES[componentType];
}

function getSizeFromAccessorType(type) {
  return COMPONENTS[type];
}

var GLTFPostProcessor = function () {
  function GLTFPostProcessor() {
    _classCallCheck(this, GLTFPostProcessor);
  }

  _createClass(GLTFPostProcessor, [{
    key: "postProcess",
    value: function postProcess(gltf) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
      var json = gltf.json,
          _gltf$buffers = gltf.buffers,
          buffers = _gltf$buffers === void 0 ? [] : _gltf$buffers,
          _gltf$images = gltf.images,
          images = _gltf$images === void 0 ? [] : _gltf$images,
          _gltf$baseUri = gltf.baseUri,
          baseUri = _gltf$baseUri === void 0 ? '' : _gltf$baseUri;
      assert(json);
      this.baseUri = baseUri;
      this.json = json;
      this.buffers = buffers;
      this.images = images;

      this._resolveTree(this.json, options);

      return this.json;
    }
  }, {
    key: "_resolveTree",
    value: function _resolveTree(json) {
      var _this = this;

      if (json.bufferViews) {
        json.bufferViews = json.bufferViews.map(function (bufView, i) {
          return _this._resolveBufferView(bufView, i);
        });
      }

      if (json.images) {
        json.images = json.images.map(function (image, i) {
          return _this._resolveImage(image, i);
        });
      }

      if (json.samplers) {
        json.samplers = json.samplers.map(function (sampler, i) {
          return _this._resolveSampler(sampler, i);
        });
      }

      if (json.textures) {
        json.textures = json.textures.map(function (texture, i) {
          return _this._resolveTexture(texture, i);
        });
      }

      if (json.accessors) {
        json.accessors = json.accessors.map(function (accessor, i) {
          return _this._resolveAccessor(accessor, i);
        });
      }

      if (json.materials) {
        json.materials = json.materials.map(function (material, i) {
          return _this._resolveMaterial(material, i);
        });
      }

      if (json.meshes) {
        json.meshes = json.meshes.map(function (mesh, i) {
          return _this._resolveMesh(mesh, i);
        });
      }

      if (json.nodes) {
        json.nodes = json.nodes.map(function (node, i) {
          return _this._resolveNode(node, i);
        });
      }

      if (json.skins) {
        json.skins = json.skins.map(function (skin, i) {
          return _this._resolveSkin(skin, i);
        });
      }

      if (json.scenes) {
        json.scenes = json.scenes.map(function (scene, i) {
          return _this._resolveScene(scene, i);
        });
      }

      if (json.scene !== undefined) {
        json.scene = json.scenes[this.json.scene];
      }
    }
  }, {
    key: "getScene",
    value: function getScene(index) {
      return this._get('scenes', index);
    }
  }, {
    key: "getNode",
    value: function getNode(index) {
      return this._get('nodes', index);
    }
  }, {
    key: "getSkin",
    value: function getSkin(index) {
      return this._get('skins', index);
    }
  }, {
    key: "getMesh",
    value: function getMesh(index) {
      return this._get('meshes', index);
    }
  }, {
    key: "getMaterial",
    value: function getMaterial(index) {
      return this._get('materials', index);
    }
  }, {
    key: "getAccessor",
    value: function getAccessor(index) {
      return this._get('accessors', index);
    }
  }, {
    key: "getCamera",
    value: function getCamera(index) {
      return null;
    }
  }, {
    key: "getTexture",
    value: function getTexture(index) {
      return this._get('textures', index);
    }
  }, {
    key: "getSampler",
    value: function getSampler(index) {
      return this._get('samplers', index);
    }
  }, {
    key: "getImage",
    value: function getImage(index) {
      return this._get('images', index);
    }
  }, {
    key: "getBufferView",
    value: function getBufferView(index) {
      return this._get('bufferViews', index);
    }
  }, {
    key: "getBuffer",
    value: function getBuffer(index) {
      return this._get('buffers', index);
    }
  }, {
    key: "_get",
    value: function _get(array, index) {
      if (_typeof(index) === 'object') {
        return index;
      }

      var object = this.json[array] && this.json[array][index];

      if (!object) {
        console.warn("glTF file error: Could not find ".concat(array, "[").concat(index, "]"));
      }

      return object;
    }
  }, {
    key: "_resolveScene",
    value: function _resolveScene(scene, index) {
      var _this2 = this;

      scene.id = scene.id || "scene-".concat(index);
      scene.nodes = (scene.nodes || []).map(function (node) {
        return _this2.getNode(node);
      });
      return scene;
    }
  }, {
    key: "_resolveNode",
    value: function _resolveNode(node, index) {
      var _this3 = this;

      node.id = node.id || "node-".concat(index);

      if (node.children) {
        node.children = node.children.map(function (child) {
          return _this3.getNode(child);
        });
      }

      if (node.mesh !== undefined) {
        node.mesh = this.getMesh(node.mesh);
      }

      if (node.camera !== undefined) {
        node.camera = this.getCamera(node.camera);
      }

      if (node.skin !== undefined) {
        node.skin = this.getSkin(node.skin);
      }

      return node;
    }
  }, {
    key: "_resolveSkin",
    value: function _resolveSkin(skin, index) {
      skin.id = skin.id || "skin-".concat(index);
      skin.inverseBindMatrices = this.getAccessor(skin.inverseBindMatrices);
      return skin;
    }
  }, {
    key: "_resolveMesh",
    value: function _resolveMesh(mesh, index) {
      var _this4 = this;

      mesh.id = mesh.id || "mesh-".concat(index);

      if (mesh.primitives) {
        mesh.primitives = mesh.primitives.map(function (primitive) {
          primitive = _objectSpread$1({}, primitive);
          var attributes = primitive.attributes;
          primitive.attributes = {};

          for (var attribute in attributes) {
            primitive.attributes[attribute] = _this4.getAccessor(attributes[attribute]);
          }

          if (primitive.indices !== undefined) {
            primitive.indices = _this4.getAccessor(primitive.indices);
          }

          if (primitive.material !== undefined) {
            primitive.material = _this4.getMaterial(primitive.material);
          }

          return primitive;
        });
      }

      return mesh;
    }
  }, {
    key: "_resolveMaterial",
    value: function _resolveMaterial(material, index) {
      material.id = material.id || "material-".concat(index);

      if (material.normalTexture) {
        material.normalTexture = _objectSpread$1({}, material.normalTexture);
        material.normalTexture.texture = this.getTexture(material.normalTexture.index);
      }

      if (material.occlusionTexture) {
        material.occlustionTexture = _objectSpread$1({}, material.occlustionTexture);
        material.occlusionTexture.texture = this.getTexture(material.occlusionTexture.index);
      }

      if (material.emissiveTexture) {
        material.emmisiveTexture = _objectSpread$1({}, material.emmisiveTexture);
        material.emissiveTexture.texture = this.getTexture(material.emissiveTexture.index);
      }

      if (material.pbrMetallicRoughness) {
        material.pbrMetallicRoughness = _objectSpread$1({}, material.pbrMetallicRoughness);
        var mr = material.pbrMetallicRoughness;

        if (mr.baseColorTexture) {
          mr.baseColorTexture = _objectSpread$1({}, mr.baseColorTexture);
          mr.baseColorTexture.texture = this.getTexture(mr.baseColorTexture.index);
        }

        if (mr.metallicRoughnessTexture) {
          mr.metallicRoughnessTexture = _objectSpread$1({}, mr.metallicRoughnessTexture);
          mr.metallicRoughnessTexture.texture = this.getTexture(mr.metallicRoughnessTexture.index);
        }
      }

      return material;
    }
  }, {
    key: "_resolveAccessor",
    value: function _resolveAccessor(accessor, index) {
      accessor.id = accessor.id || "accessor-".concat(index);

      if (accessor.bufferView !== undefined) {
        accessor.bufferView = this.getBufferView(accessor.bufferView);
      }

      accessor.bytesPerComponent = getBytesFromComponentType(accessor.componentType);
      accessor.components = getSizeFromAccessorType(accessor.type);
      accessor.bytesPerElement = accessor.bytesPerComponent * accessor.components;

      if (accessor.bufferView) {
        var buffer = accessor.bufferView.buffer;

        var _getAccessorArrayType = getAccessorArrayTypeAndLength(accessor, accessor.bufferView),
            ArrayType = _getAccessorArrayType.ArrayType,
            length = _getAccessorArrayType.length;

        var byteOffset = (accessor.bufferView.byteOffset || 0) + (accessor.byteOffset || 0) + buffer.byteOffset;
        accessor.value = new ArrayType(buffer.arrayBuffer, byteOffset, length);
      }

      return accessor;
    }
  }, {
    key: "_resolveTexture",
    value: function _resolveTexture(texture, index) {
      texture.id = texture.id || "texture-".concat(index);
      texture.sampler = 'sampler' in texture ? this.getSampler(texture.sampler) : DEFAULT_SAMPLER;
      texture.source = this.getImage(texture.source);
      return texture;
    }
  }, {
    key: "_resolveSampler",
    value: function _resolveSampler(sampler, index) {
      sampler.id = sampler.id || "sampler-".concat(index);
      sampler.parameters = {};

      for (var key in sampler) {
        var glEnum = this._enumSamplerParameter(key);

        if (glEnum !== undefined) {
          sampler.parameters[glEnum] = sampler[key];
        }
      }

      return sampler;
    }
  }, {
    key: "_enumSamplerParameter",
    value: function _enumSamplerParameter(key) {
      return SAMPLER_PARAMETER_GLTF_TO_GL[key];
    }
  }, {
    key: "_resolveImage",
    value: function _resolveImage(image, index) {
      image.id = image.id || "image-".concat(index);

      if (image.bufferView !== undefined) {
        image.bufferView = this.getBufferView(image.bufferView);
      }

      var preloadedImage = this.images[index];

      if (preloadedImage) {
        image.image = preloadedImage;
      }

      return image;
    }
  }, {
    key: "_resolveBufferView",
    value: function _resolveBufferView(bufferView, index) {
      bufferView.id = bufferView.id || "bufferView-".concat(index);
      var bufferIndex = bufferView.buffer;
      bufferView.buffer = this.buffers[bufferIndex];
      var arrayBuffer = this.buffers[bufferIndex].arrayBuffer;
      var byteOffset = this.buffers[bufferIndex].byteOffset || 0;

      if ('byteOffset' in bufferView) {
        byteOffset += bufferView.byteOffset;
      }

      bufferView.data = new Uint8Array(arrayBuffer, byteOffset, bufferView.byteLength);
      return bufferView;
    }
  }, {
    key: "_resolveCamera",
    value: function _resolveCamera(camera, index) {
      camera.id = camera.id || "camera-".concat(index);

      if (camera.perspective) ;

      if (camera.orthographic) ;

      return camera;
    }
  }]);

  return GLTFPostProcessor;
}();

function postProcessGLTF(gltf, options) {
  return new GLTFPostProcessor().postProcess(gltf, options);
}

function parseGLTF(_x, _x2) {
  return _parseGLTF.apply(this, arguments);
}

function _parseGLTF() {
  _parseGLTF = _asyncToGenerator(regenerator.mark(function _callee(gltf, arrayBufferOrString) {
    var byteOffset,
        options,
        context,
        promises,
        _promise,
        promise,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            byteOffset = _args.length > 2 && _args[2] !== undefined ? _args[2] : 0;
            options = _args.length > 3 ? _args[3] : undefined;
            context = _args.length > 4 ? _args[4] : undefined;
            parseGLTFContainerSync(gltf, arrayBufferOrString, byteOffset, options);
            normalizeGLTFV1(gltf, {
              normalize: options.gltf.normalize
            });
            promises = [];

            if (!(options.gltf.loadBuffers && gltf.json.buffers)) {
              _context.next = 9;
              break;
            }

            _context.next = 9;
            return loadBuffers(gltf, options, context);

          case 9:
            if (options.gltf.loadImages) {
              _promise = loadImages(gltf, options, context);
              promises.push(_promise);
            }

            promise = decodeExtensions(gltf, options, context);
            promises.push(promise);
            _context.next = 14;
            return Promise.all(promises);

          case 14:
            return _context.abrupt("return", options.gltf.postProcess ? postProcessGLTF(gltf, options) : gltf);

          case 15:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parseGLTF.apply(this, arguments);
}

function parseGLTFContainerSync(gltf, data, byteOffset, options) {
  if (options.uri) {
    gltf.baseUri = options.uri;
  }

  if (data instanceof ArrayBuffer && !isGLB(data, byteOffset, options)) {
    var textDecoder = new TextDecoder();
    data = textDecoder.decode(data);
  }

  if (typeof data === 'string') {
    gltf.json = parseJSON(data);
  } else if (data instanceof ArrayBuffer) {
    var glb = {};
    byteOffset = parseGLBSync(glb, data, byteOffset, options);
    assert(glb.type === 'glTF', "Invalid GLB magic string ".concat(glb.type));
    gltf._glb = glb;
    gltf.json = glb.json;
  } else {
    assert(false, "GLTF: must be ArrayBuffer or string");
  }

  var buffers = gltf.json.buffers || [];
  gltf.buffers = new Array(buffers.length).fill(null);

  if (gltf._glb && gltf._glb.header.hasBinChunk) {
    var binChunks = gltf._glb.binChunks;
    gltf.buffers[0] = {
      arrayBuffer: binChunks[0].arrayBuffer,
      byteOffset: binChunks[0].byteOffset,
      byteLength: binChunks[0].byteLength
    };
  }

  var images = gltf.json.images || [];
  gltf.images = new Array(images.length).fill({});
}

function loadBuffers(_x3, _x4, _x5) {
  return _loadBuffers.apply(this, arguments);
}

function _loadBuffers() {
  _loadBuffers = _asyncToGenerator(regenerator.mark(function _callee2(gltf, options, context) {
    var i, buffer, fetch, uri, response, arrayBuffer;
    return regenerator.wrap(function _callee2$(_context2) {
      while (1) {
        switch (_context2.prev = _context2.next) {
          case 0:
            i = 0;

          case 1:
            if (!(i < gltf.json.buffers.length)) {
              _context2.next = 18;
              break;
            }

            buffer = gltf.json.buffers[i];

            if (!buffer.uri) {
              _context2.next = 15;
              break;
            }

            fetch = context.fetch;
            assert(fetch);
            uri = resolveUrl(buffer.uri, options);
            _context2.next = 9;
            return fetch(uri);

          case 9:
            response = _context2.sent;
            _context2.next = 12;
            return response.arrayBuffer();

          case 12:
            arrayBuffer = _context2.sent;
            gltf.buffers[i] = {
              arrayBuffer: arrayBuffer,
              byteOffset: 0,
              byteLength: arrayBuffer.byteLength
            };
            delete buffer.uri;

          case 15:
            ++i;
            _context2.next = 1;
            break;

          case 18:
          case "end":
            return _context2.stop();
        }
      }
    }, _callee2);
  }));
  return _loadBuffers.apply(this, arguments);
}

function loadImages(_x6, _x7, _x8) {
  return _loadImages.apply(this, arguments);
}

function _loadImages() {
  _loadImages = _asyncToGenerator(regenerator.mark(function _callee3(gltf, options, context) {
    var images, promises, i;
    return regenerator.wrap(function _callee3$(_context3) {
      while (1) {
        switch (_context3.prev = _context3.next) {
          case 0:
            images = gltf.json.images || [];
            promises = [];

            for (i = 0; i < images.length; ++i) {
              promises.push(loadImage(gltf, images[i], i, options, context));
            }

            _context3.next = 5;
            return Promise.all(promises);

          case 5:
            return _context3.abrupt("return", _context3.sent);

          case 6:
          case "end":
            return _context3.stop();
        }
      }
    }, _callee3);
  }));
  return _loadImages.apply(this, arguments);
}

function loadImage(_x9, _x10, _x11, _x12, _x13) {
  return _loadImage.apply(this, arguments);
}

function _loadImage() {
  _loadImage = _asyncToGenerator(regenerator.mark(function _callee4(gltf, image, i, options, context) {
    var fetch, parse, arrayBuffer, uri, response, array, parsedImage;
    return regenerator.wrap(function _callee4$(_context4) {
      while (1) {
        switch (_context4.prev = _context4.next) {
          case 0:
            fetch = context.fetch, parse = context.parse;

            if (!image.uri) {
              _context4.next = 9;
              break;
            }

            uri = resolveUrl(image.uri, options);
            _context4.next = 5;
            return fetch(uri);

          case 5:
            response = _context4.sent;
            _context4.next = 8;
            return response.arrayBuffer();

          case 8:
            arrayBuffer = _context4.sent;

          case 9:
            if (Number.isFinite(image.bufferView)) {
              array = getTypedArrayForBufferView(gltf.json, gltf.buffers, image.bufferView);
              arrayBuffer = getZeroOffsetArrayBuffer(array.buffer, array.byteOffset, array.byteLength);
            }

            assert(arrayBuffer, 'glTF image has no data');
            _context4.next = 13;
            return parse(arrayBuffer, ImageLoader, {}, context);

          case 13:
            parsedImage = _context4.sent;
            gltf.images[i] = parsedImage;

          case 15:
          case "end":
            return _context4.stop();
        }
      }
    }, _callee4);
  }));
  return _loadImage.apply(this, arguments);
}

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }
var VERSION = "2.3.13" ;
var GLTFLoader = {
  id: 'gltf',
  name: 'glTF',
  version: VERSION,
  extensions: ['gltf', 'glb'],
  mimeTypes: ['model/gltf+json', 'model/gltf-binary'],
  text: true,
  binary: true,
  tests: ['glTF'],
  parse: parse,
  options: {
    gltf: {
      normalize: false,
      loadBuffers: true,
      loadImages: true,
      decompressMeshes: true,
      postProcess: true
    },
    baseUri: '',
    log: console
  },
  deprecatedOptions: {
    fetchImages: 'gltf.loadImages',
    createImages: 'gltf.loadImages',
    decompress: 'gltf.decompressMeshes',
    postProcess: 'gltf.postProcess',
    gltf: {
      decompress: 'gltf.decompressMeshes'
    }
  }
};
function parse(_x) {
  return _parse.apply(this, arguments);
}

function _parse() {
  _parse = _asyncToGenerator(regenerator.mark(function _callee(arrayBuffer) {
    var options,
        context,
        _options,
        _options$byteOffset,
        byteOffset,
        gltf,
        _args = arguments;

    return regenerator.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            options = _args.length > 1 && _args[1] !== undefined ? _args[1] : {};
            context = _args.length > 2 ? _args[2] : undefined;
            options = _objectSpread(_objectSpread({}, GLTFLoader.options), options);
            options.gltf = _objectSpread(_objectSpread({}, GLTFLoader.options.gltf), options.gltf);
            addDeprecatedGLTFOptions(options);
            _options = options, _options$byteOffset = _options.byteOffset, byteOffset = _options$byteOffset === void 0 ? 0 : _options$byteOffset;
            gltf = {};
            _context.next = 9;
            return parseGLTF(gltf, arrayBuffer, byteOffset, options, context);

          case 9:
            return _context.abrupt("return", _context.sent);

          case 10:
          case "end":
            return _context.stop();
        }
      }
    }, _callee);
  }));
  return _parse.apply(this, arguments);
}

function addDeprecatedGLTFOptions(options) {
  if ('fetchImages' in options) {
    options.gltf.loadImages = options.fetchImages;
  }

  if ('createImages' in options) {
    options.gltf.loadImages = options.createImages;
  }

  if ('fetchLinkedResources' in options) {
    options.gltf.fetchBuffers = options.fetchLinkedResources;
  }

  if ('decompress' in options) {
    options.gltf.decompressMeshes = options.decompress;
  }

  if ('decompress' in options.gltf) {
    options.gltf.decompressMeshes = options.gltf.decompress;
  }

  if ('postProcess' in options) {
    options.gltf.postProcess = options.postProcess;
  }
}

const testcube = `
{
    "asset" : {
        "generator" : "Khronos glTF Blender I/O v1.5.17",
        "version" : "2.0"
    },
    "scene" : 0,
    "scenes" : [
        {
            "name" : "Scene",
            "nodes" : [
                0,
                1,
                2
            ]
        }
    ],
    "nodes" : [
        {
            "mesh" : 0,
            "name" : "Cube"
        },
        {
            "name" : "Light",
            "rotation" : [
                0.16907575726509094,
                0.7558803558349609,
                -0.27217137813568115,
                0.570947527885437
            ],
            "translation" : [
                4.076245307922363,
                5.903861999511719,
                -1.0054539442062378
            ]
        },
        {
            "name" : "Camera",
            "rotation" : [
                0.483536034822464,
                0.33687159419059753,
                -0.20870360732078552,
                0.7804827094078064
            ],
            "translation" : [
                7.358891487121582,
                4.958309173583984,
                6.925790786743164
            ]
        }
    ],
    "materials" : [
        {
            "doubleSided" : true,
            "name" : "Material",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.800000011920929,
                    0.800000011920929,
                    0.800000011920929,
                    1
                ],
                "metallicFactor" : 0,
                "roughnessFactor" : 0.4000000059604645
            }
        }
    ],
    "meshes" : [
        {
            "name" : "Cube",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 0,
                        "NORMAL" : 1,
                        "TEXCOORD_0" : 2
                    },
                    "indices" : 3,
                    "material" : 0
                }
            ]
        }
    ],
    "accessors" : [
        {
            "bufferView" : 0,
            "componentType" : 5126,
            "count" : 24,
            "max" : [
                1,
                1,
                1
            ],
            "min" : [
                -1,
                -1,
                -1
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 1,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC3"
        },
        {
            "bufferView" : 2,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC2"
        },
        {
            "bufferView" : 3,
            "componentType" : 5123,
            "count" : 36,
            "type" : "SCALAR"
        }
    ],
    "bufferViews" : [
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 0
        },
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 288
        },
        {
            "buffer" : 0,
            "byteLength" : 192,
            "byteOffset" : 576
        },
        {
            "buffer" : 0,
            "byteLength" : 72,
            "byteOffset" : 768
        }
    ],
    "buffers" : [
        {
            "byteLength" : 840,
            "uri" : "data:application/octet-stream;base64,AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AAAAAAAAAAAAAIC/AAAAAAAAgD8AAACAAACAPwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAPwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAAAAAgD8AAACAAACAPwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AACAPwAAAAAAAACAAACAvwAAAAAAAACAAAAAAAAAAAAAAIC/AAAAAAAAgD8AAACAAACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAvwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAAAAAgD8AAACAAACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AAAgPwAAAD8AACA/AAAAPwAAID8AAAA/AADAPgAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAgD4AACA/AACAPgAAID8AAIA+AADAPgAAgD4AAMA+AACAPgAAwD4AAIA+AAAgPwAAQD8AACA/AABAPwAAYD8AAAA/AADAPgAAQD8AAAA+AAAAPwAAwD4AAEA/AAAgPwAAgD8AACA/AAAAAAAAYD8AAIA+AADAPgAAgD8AAAA+AACAPgAAwD4AAAAAAQAOABQAAQAUAAcACgAGABMACgATABcAFQASAAwAFQAMAA8AEAADAAkAEAAJABYABQACAAgABQAIAAsAEQANAAAAEQAAAAQA"
        }
    ]
}
`;

class GLTFImporter {
  static async LoadMesh(gltfString, meshIdentifier) {
    gltfString = testcube;
    const gltf = await parse$2(gltfString, GLTFLoader);
    const meshData = gltf.meshes[0];
    const vertexData = meshData.primitives[0].attributes.POSITION.value;
    const totalVerticies = meshData.primitives[0].attributes.POSITION.count / 3;
    const totalFaces = meshData.primitives[0].indices.count / 3;
    const faceData = meshData.primitives[0].indices.value;
    const mesh = new Mesh(meshData.id, totalVerticies, totalFaces);
    const vertexMap = {};
    let index = 0;

    for (let offset = 0; offset < meshData.primitives[0].attributes.POSITION.count; offset += 3) {
      mesh.verticies[index] = new Vector3(vertexData[offset], vertexData[offset + 1], vertexData[offset + 2]);
      vertexMap[offset] = index;
      vertexMap[offset + 1] = index;
      vertexMap[offset + 2] = index;
      index++;
    }

    mesh.faces = [];

    for (index = 0; index < totalFaces; index++) {
      mesh.faces.push(new Face(vertexMap[faceData[index * 3]], vertexMap[faceData[index * 3 + 1]], vertexMap[faceData[index * 3 + 2]]));
    }

    console.log(mesh);
    return mesh;
    /*
    gltfString = testcube
      if (meshIdentifier === undefined) {
        meshIdentifier = 0
    }
      const gltfData = JSON.parse(gltfString)
    if (typeof meshIdentifier === 'string') {
        meshIdentifier = gltfData.nodes.find(node => node.name === meshIdentifier).mesh // .mesh is an int representing the mesh index
    }
      const buffers = []
    for(const buffer of gltfData.buffers) {
        buffers.push(Uint8Array.from(atob(buffer.uri.replace('data:application/octet-stream;base64,', '')), c => c.charCodeAt(0)))
    }
      const meshRecord = gltfData.meshes[meshIdentifier]
    const locAccessorIndex = meshRecord.primitives[0].attributes.POSITION
    const normalAccessorIndex = meshRecord.primitives[0].attributes.NORMAL
    const locAccessor = gltfData.accessors[locAccessorIndex]
    const locBufferView = gltfData.bufferViews[locAccessor.bufferView]
    const locData = buffers[locBufferView.buffer].slice(locBufferView.byteOffset, locBufferView.byteOffset + locBufferView.byteLength)
      const totalComponents = AccessorComponents[locAccessor.type]
    const componentSize = ComponentSize[locAccessor.componentType]
    const fieldSize = componentSize * totalComponents
    const verticies = []
      for (let offset = 0; offset < locData.length; offset += fieldSize) {
        switch(locAccessor.type) {
            case AccessorTypes.VEC3:
                const xOffset = offset
                const yOffset = xOffset + componentSize
                const zOffset = yOffset + componentSize
                  const xData = locData.slice(xOffset, xOffset + componentSize)
                const yData = locData.slice(yOffset, yOffset + componentSize)
                const zData = locData.slice(zOffset, zOffset + componentSize)
                  const xBuffer = new ArrayBuffer(componentSize)
                const xView = new DataView(xBuffer)
                xView.setUint8(0, xData[0], false)
                xView.setUint8(1, xData[1], false)
                xView.setUint8(2, xData[2], false)
                xView.setUint8(3, xData[3], false)
                  const yBuffer = new ArrayBuffer(componentSize)
                const yView = new DataView(yBuffer)
                yView.setUint8(0, yData[0], false)
                yView.setUint8(1, yData[1], false)
                yView.setUint8(2, yData[2], false)
                yView.setUint8(3, yData[3], false)
                  const zBuffer = new ArrayBuffer(componentSize)
                const zView = new DataView(zBuffer)
                zView.setUint8(0, zData[0], false)
                zView.setUint8(1, zData[1], false)
                zView.setUint8(2, zData[2], false)
                zView.setUint8(3, zData[3], false)
                  const x = xView.getFloat32(0)
                const y = yView.getFloat32(0)
                const z = zView.getFloat32(0)
                  verticies.push(new Vector3(x, y, z))
            break;
        }
    }
      console.log(verticies)
    //console.log('decode')
    */
  }

}

const GameEngine = {
  Engine,
  Scene,
  Mesh,
  Face,
  Vector3,
  Vector2,
  RGBA,
  Matrix,
  Viewport,
  Actor,
  Camera,
  GLTF: GLTFImporter
};
