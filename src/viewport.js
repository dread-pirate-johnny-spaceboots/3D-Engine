import { Vector2, Vector3, RGBA } from "./vector"
import Matrix from './matrix'

class Viewport {
    constructor(canvas) {
        this.canvas = canvas
        this.context = this.canvas.getContext('2d')
        this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }

    clear() {
        this.context.clearRect(0, 0, this.canvas.width, this.canvas.height)
        this.buffer = this.context.getImageData(0, 0, this.canvas.width, this.canvas.height)
    }

    flush() {
        this.context.putImageData(this.buffer, 0, 0)
    }

    plotPixel(x, y, color) {
        const index = ((x >> 0) + (y >> 0) * this.canvas.width) * 4 // 4 pixel data array entries per color [r,g,b,a]
        this.buffer.data[index] = color.r * 255;
        this.buffer.data[index + 1] = color.g * 255;
        this.buffer.data[index + 2] = color.b * 255;
        this.buffer.data[index + 3] = color.a * 255;
    }

    project2D(vector3, transformationMatrix) {
        const w = this.canvas.width
        const h = this.canvas.height
        const point = Vector3.TransformCoordinates(vector3, transformationMatrix)
        const x = point.x * w + w / 2 >> 0
        const y = point.y * h + h / 2 >> 0

        return new Vector2(x, y)
    }

    render(camera, meshes) {
        const viewMatrix = Matrix.LookAtLH(camera.location, camera.target, Vector3.Up())
        const projMatrix = Matrix.PerspectiveForLH(0.78, this.canvas.width / this.canvas.height, 0.01, 1.0)

        for (const mesh of meshes) {
            if (mesh == undefined) { continue } // meshes on actors can be loaded async, if its not there yet just continue
            
            const worldMatrix = Matrix.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z)
                                      .multiply(Matrix.Translation(mesh.location.x, mesh.location.y, mesh.location.z))
            const transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projMatrix)
            
            for(const face of mesh.faces) {
                const vertexA = mesh.verticies[face.a]
                const vertexB = mesh.verticies[face.b]
                const vertexC = mesh.verticies[face.c]
                const pixelA = this.project2D(vertexA, transformMatrix)
                const pixelB = this.project2D(vertexB, transformMatrix)
                const pixelC = this.project2D(vertexC, transformMatrix)

                this.drawLine(pixelA, pixelB)
                this.drawLine(pixelB, pixelC)
                this.drawLine(pixelC, pixelA)
            }
        }
    }

    drawVertex(vector3) {
        if (vector3.x >= 0 && vector3.y >= 0 && vector3.x < this.canvas.width && vector3.y < this.canvas.height) {
            this.plotPixel(vector3.x, vector3.y, new RGBA(1, 0, 0, 1))
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
            this.plotPixel(x0, y0, new RGBA(1,0,0,1))
            if (x0 == x1 && y0 == y1) break;

            const dblErr = err * 2
            if (dblErr > -dy) { err -= dy; x0 += sx; }
            if (dblErr < dx)  { err += dx; y0 += sy; }
        }
    }
}

export default Viewport