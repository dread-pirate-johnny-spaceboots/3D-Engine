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
            const worldMatrix = Matrix.RotationYawPitchRoll(mesh.rotation.y, mesh.rotation.x, mesh.rotation.z)
                                      .multiply(Matrix.Translation(mesh.location.x, mesh.location.y, mesh.location.z))
            const transformMatrix = worldMatrix.multiply(viewMatrix).multiply(projMatrix)
            
            for (const vertex of mesh.verticies) {
                const point = this.project2D(vertex, transformMatrix)
                this.drawVertex(point)
            }
        }
    }

    drawVertex(point) {
        if (point.x >= 0 && point.y >= 0 && point.x < this.canvas.width && point.y < this.canvas.height) {
            this.plotPixel(point.x, point.y, new RGBA(1, 0, 0, 1))
        }
    }
}

export default Viewport