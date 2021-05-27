
class ATestCube extends GameEngine.Actor {
    constructor() {
        const mesh = new GameEngine.Mesh("cube", 8, 12)
        mesh.verticies[0] = new GameEngine.Vector3(-1, 1, 1)
        mesh.verticies[1] = new GameEngine.Vector3(1, 1, 1)
        mesh.verticies[2] = new GameEngine.Vector3(-1, -1, 1)
        mesh.verticies[3] = new GameEngine.Vector3(1, -1, 1)
        mesh.verticies[4] = new GameEngine.Vector3(-1, 1, -1)
        mesh.verticies[5] = new GameEngine.Vector3(1, 1, -1)
        mesh.verticies[6] = new GameEngine.Vector3(1, -1, -1)
        mesh.verticies[7] = new GameEngine.Vector3(-1, -1, -1)

        mesh.faces[0] = new GameEngine.Face(0, 1, 2)
        mesh.faces[1] = new GameEngine.Face(1, 2, 3)
        mesh.faces[2] = new GameEngine.Face(1, 3, 6)
        mesh.faces[3] = new GameEngine.Face(1, 5, 6)
        mesh.faces[4] = new GameEngine.Face(0, 1, 4)
        mesh.faces[5] = new GameEngine.Face(1, 4, 5)
        mesh.faces[6] = new GameEngine.Face(2, 3, 7)
        mesh.faces[7] = new GameEngine.Face(3, 6, 7)
        mesh.faces[8] = new GameEngine.Face(0, 2, 7)
        mesh.faces[9] = new GameEngine.Face(0, 4, 7)
        mesh.faces[10] = new GameEngine.Face(4, 5, 6)
        mesh.faces[11] = new GameEngine.Face(4, 6, 7)

        super(mesh)
    }

    tick() {
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.01
    }
}