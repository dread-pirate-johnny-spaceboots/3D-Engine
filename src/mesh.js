import { Vector3 } from "./vector"

class Mesh {
    constructor(name, totalVerticies, totalFaces) {
        this.name = name
        this.verticies = new Array(totalVerticies)
        this.faces = new Array(totalFaces)
        this.rotation = Vector3.Zero()
        this.location = Vector3.Zero()
        this.initialized = true
    }
}

class Face {
    constructor(a, b, c) {
        this.a = a
        this.b = b
        this.c = c
    }
}

export { Mesh, Face }