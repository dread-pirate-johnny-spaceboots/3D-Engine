class Actor {
    constructor(mesh) {
        this.mesh = mesh
    }

    tick(deltaTime) {
        // override in child class
    }
}

export default Actor