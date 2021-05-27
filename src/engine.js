import Camera from "./camera"
import Mesh from "./mesh"
import { Vector3 } from "./vector"
import Viewport from "./viewport"

class Engine {
    constructor() {
        this.meshes = []
        this.camera = null
        this.canvas = null
        this.viewport = null
        
        this.draw = this.draw.bind(this)
    }

    init(canvas) {
        this.canvas = canvas
        this.camera = new Camera(Vector3.Zero(), Vector3.Zero())
        this.viewport = new Viewport(this.canvas)

        //tmp
        const mesh = new Mesh("cube", 8)
        this.meshes.push(mesh)

        mesh.verticies[0] = new Vector3(-1, 1, 1);
        mesh.verticies[1] = new Vector3(1, 1, 1);
        mesh.verticies[2] = new Vector3(-1, -1, 1);
        mesh.verticies[3] = new Vector3(-1, -1, -1);
        mesh.verticies[4] = new Vector3(-1, 1, -1);
        mesh.verticies[5] = new Vector3(1, 1, -1);
        mesh.verticies[6] = new Vector3(1, -1, 1);
        mesh.verticies[7] = new Vector3(1, -1, -1);

        this.camera.location = new Vector3(0, 0, 10)
        this.camera.target = new Vector3(0, 0, 0)

        requestAnimationFrame(this.draw)
    }

    draw() {
        this.viewport.clear()

        this.meshes[0].rotation.x += 0.01;
        this.meshes[0].rotation.y += 0.01;

        this.viewport.render(this.camera, this.meshes)
        this.viewport.flush()

        requestAnimationFrame(this.draw)
    }
}

export default Engine