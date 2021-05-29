import Camera from "./camera"
import { Vector3 } from "./vector"
import { Viewport, RenderingMode } from "./viewport"

class Engine {
    constructor() {
        //this.meshes = []
        this.scene = null
        this.camera = null
        this.canvas = null
        this.viewport = null
        this.started = null
        this.lastframe = null

        this.draw = this.draw.bind(this)
    }

    init(canvas, renderingMode) {
        this.canvas = canvas
        this.viewport = new Viewport(this.canvas)
        this.camera = new Camera(Vector3.Zero(), Vector3.Zero())
        this.camera.location = new Vector3(0, 0, 10)
        this.camera.target = new Vector3(0, 0, 0)
        this.renderingMode = renderingMode === undefined ? RenderingMode.FLAT : renderingMode

        requestAnimationFrame(this.draw)
        this.canvas.dispatchEvent(new CustomEvent("GameEngineInitialized"))
    }

    setScene(scene) {
        this.scene = scene
        requestAnimationFrame(this.draw)
    }

    draw(timestamp) {
        if (!this.scene) { return }

        if (!this.started) {
            this.started = timestamp
            this.lastframe = timestamp
        }
        const elapsed = timestamp - this.started
        const deltaT = timestamp - this.lastframe
        const actorMeshes = this.scene.actors.map(actor => actor.mesh)

        this.scene.tick(deltaT)
        this.viewport.clear()
        this.viewport.render(this.camera, [...this.scene.meshes, ...actorMeshes], this.renderingMode)
        this.viewport.flush()

        this.lastframe = timestamp
        requestAnimationFrame(this.draw)
    }
}

export default Engine