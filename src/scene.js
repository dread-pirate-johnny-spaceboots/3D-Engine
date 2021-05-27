class Scene {
    constructor() {
        this.actors = []
        this.meshes = []
    }

    addActor(actor) {
        this.actors.push(actor)
    }

    addMesh(mesh) {
        this.meshes.push(mesh)
    }   

    tick(deltaTime) {
        // override in child class if you need to, but be sure to call super(deltaTime)!      
       for(const actor of this.actors) {
           actor.tick(deltaTime)
       }
    }
}

export default Scene