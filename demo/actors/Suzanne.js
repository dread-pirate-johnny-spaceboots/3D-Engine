class ASuzanne extends GameEngine.Actor {
    constructor() {
        super()
        GameEngine.GLTF.LoadMesh("INJECT:suzanne.gltf").then(mesh => this.mesh = mesh)
    }

    tick() {
        if (!this.mesh) { return }
       // this.mesh.rotation.z += 0.01
    }
}