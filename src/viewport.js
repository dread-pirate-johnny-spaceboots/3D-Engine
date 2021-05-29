import { Vector2, Vector3, RGBA } from "./vector"
import Matrix from './matrix'

class Viewport {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        this.zBuffer = new Array(this.canvas.width * this.canvas.height)
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
        for(let i = 0; i < this.zBuffer.length; i++) {
            this.zBuffer[i] = Number.MAX_VALUE
        }
    }

    flush() {
        this.context.putImageData(this.buffer, 0, 0)
    }

    plotPixel(x, y, z, color) {
        let index = ((x | 0) + (y | 0) * this.canvas.width) 

        if (this.zBuffer[index] < z) {
            return;
        }
        this.zBuffer[index] = z

        index *= 4 // 4 pixel data array entries per color [r,g,b,a]
        this.buffer.data[index] = color.r * 255;
        this.buffer.data[index + 1] = color.g * 255;
        this.buffer.data[index + 2] = color.b * 255;
        this.buffer.data[index + 3] = color.a * 255;
    }

    project2D(vector3, transformationMatrix) {
        const w = this.canvas.width
        const h = this.canvas.height
        const point = Vector3.TransformCoordinates(vector3, transformationMatrix)
        const x = point.x * w + w / 2
        const y = -point.y * h + h / 2

        return new Vector3(x, y, point.z)
    }

    render(camera, meshes, mode) {
        if (mode === undefined) {
            mode = RenderingMode.SHADED
        }

        const viewMatrix = Matrix.LookAtLH(camera.location, camera.target, Vector3.Up())
        const projMatrix = Matrix.PerspectiveForLH(0.78, this.canvas.width / this.canvas.height, 0.01, 1.0)

        for (const mesh of meshes) {
            if (mesh == undefined) { continue } // meshes on actors can be loaded async, if its not there yet just continue
            
            const worldMatrix = Matrix.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z)
                                      .multiply(Matrix.Translation(mesh.location.x, mesh.location.y, mesh.location.z))
            const transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projMatrix)
            
            let fI = 0
            for(const face of mesh.faces) {
                const vertexA = mesh.verticies[face.a]
                const vertexB = mesh.verticies[face.b]
                const vertexC = mesh.verticies[face.c]
                const pixelA = this.project2D(vertexA, transformMatrix)
                const pixelB = this.project2D(vertexB, transformMatrix)
                const pixelC = this.project2D(vertexC, transformMatrix)

                if (mode === RenderingMode.WIREFRAME) {
                    this.drawLine(pixelA, pixelB)
                    this.drawLine(pixelB, pixelC)
                    this.drawLine(pixelC, pixelA)
                } else {
                    const color = 0.25 + ((fI % mesh.faces.length) / mesh.faces.length) * 0.75
                    this.drawTriangle(pixelA, pixelB, pixelC, new RGBA(color, color, color, 1))
                }
                
                
                fI++
            }
        }
    }

    drawVertex(vector3) {
        if (vector3.x >= 0 && vector3.y >= 0 && vector3.x < this.canvas.width && vector3.y < this.canvas.height) {
            this.plotPixel(vector3.x, vector3.y, vector3.z, new RGBA(1, 0, 0, 1))
        }
    }

    drawLine(v3Start, v3End) {
        // Bresenham's line algo
        let x0 = v3Start.x | 0
        let y0 = v3Start.y | 0
        const x1 = v3End.x | 0
        const y1 = v3End.y | 0
        const dx = Math.abs(x1 - x0)
        const dy = Math.abs(y1 - y0)
        const sx = (x0 < x1) ? 1 : -1
        const sy = (y0 < y1) ? 1 : -1
        let err = dx - dy

        while(true) {
            this.plotPixel(x0, y0, v3Start.z, new RGBA(1,0,0,1))
            if (x0 == x1 && y0 == y1) break;

            const dblErr = err * 2
            if (dblErr > -dy) { err -= dy; x0 += sx; }
            if (dblErr < dx)  { err += dx; y0 += sy; }
        }
    }

    drawTriangle(v3P1, v3P2, v3P3, color) {
        // sort on y
        const points = [v3P1, v3P2, v3P3]
        points.sort((p1, p2) => p1.y > p2.y ? 1 : (p1.y < p2.y ? -1 : 0))
        const p1 = points[0]
        const p2 = points[1]
        const p3 = points[2]

        // get line slopes
        let m12, m13 // slope of 1->2 & 1->3
         if (p2.y - p1.y > 0) {
             m12 = (p2.x - p1.x) / (p2.y - p1.y)
         } else {
             m12 = 0
         }

        if(p3.y - p1.y > 0) {
            m13 = (p3.x - p1.x) / (p3.y - p1.y);
        } else {
            m13 = 0;
        }

        if (m12 > m13) {
            // right facing triangle
            for (let y = p1.y | 0; y <= p3.y | 0; y++) {
                if (y < p2.y) {
                    this.drawInterpolatedLine(y, p1, p3, p1, p2, color)
                } else {
                    this.drawInterpolatedLine(y, p1, p3, p2, p3, color)
                }
            }
        } else {
            // left facing triangle
            for(let y = p1.y | 0; y <= p3.y | 0; y++) {
                if (y < p2.y) {
                    this.drawInterpolatedLine(y, p1, p2, p1, p3, color)
                } else {
                    this.drawInterpolatedLine(y, p2, p3, p1, p3, color)
                }
            }
        }
    }

    drawInterpolatedLine(y, v3a, v3b, v3c, v3d, color) {
        const g1 = v3a.y != v3b.y ? (y - v3a.y) / (v3b.y - v3a.y) : 1
        const g2 = v3c.y != v3d.y ? (y - v3c.y) / (v3d.y - v3c.y) : 1

        const start = this.interpolate(v3a.x, v3b.x, g1) | 0
        const end = this.interpolate(v3c.x, v3d.x, g2) | 0
        const zStart = this.interpolate(v3a.z, v3b.z, g1)
        const zEnd = this.interpolate(v3c.z, v3d.z, g2)

        for (let x = start; x < end; x++) {
            const g3 = (x - start) / (end - start);
            const z = this.interpolate(zStart, zEnd, g3);
            this.plotPixel(x, y, z, color)
        }
    }

    interpolate(min, max, gradient) {
        return min + (max - min) * this.clamp(gradient)
    }

    clamp(value, min, max) {
        if (typeof min === "undefined") { min = 0 }
        if (typeof max === "undefined") { max = 1 }

        return Math.max(min, Math.min(value, max))
    }
}

const RenderingMode = {
    WIREFRAME: 1,
    SHADED: 2,
    TEXTURED: 3
}

export { Viewport, RenderingMode }