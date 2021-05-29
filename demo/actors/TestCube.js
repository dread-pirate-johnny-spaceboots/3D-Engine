// TODO: integrate webpack or rollup into the demo and configure imports for .json data
const cube = {"verticies": {"0": [1.0, 1.0, 1.0], "1": [1.0, 1.0, -1.0], "2": [1.0, -1.0, 1.0], "3": [1.0, -1.0, -1.0], "4": [-1.0, 1.0, 1.0], "5": [-1.0, 1.0, -1.0], "6": [-1.0, -1.0, 1.0], "7": [-1.0, -1.0, -1.0]}, "normals": {"0": [0.5773491859436035, 0.5773491859436035, 0.5773491859436035], "1": [0.5773491859436035, 0.5773491859436035, -0.5773491859436035], "2": [0.5773491859436035, -0.5773491859436035, 0.5773491859436035], "3": [0.5773491859436035, -0.5773491859436035, -0.5773491859436035], "4": [-0.5773491859436035, 0.5773491859436035, 0.5773491859436035], "5": [-0.5773491859436035, 0.5773491859436035, -0.5773491859436035], "6": [-0.5773491859436035, -0.5773491859436035, 0.5773491859436035], "7": [-0.5773491859436035, -0.5773491859436035, -0.5773491859436035]}, "faces": {"0": [4, 2, 0], "1": [2, 7, 3], "2": [6, 5, 7], "3": [1, 7, 5], "4": [0, 3, 1], "5": [4, 1, 5], "6": [4, 6, 2], "7": [2, 6, 7], "8": [6, 4, 5], "9": [1, 3, 7], "10": [0, 2, 3], "11": [4, 0, 1]}}

class ATestCube extends GameEngine.Actor {
    constructor() {
        super(new GameEngine.Mesh(cube))
    }

    tick() {
        this.mesh.rotation.x += 0.01
        this.mesh.rotation.y += 0.01
    }
}