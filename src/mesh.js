import { Vector3 } from "./vector"

class Mesh {
    constructor(name, totalVerticies) {
        this.name = name
        this.verticies = new Array(totalVerticies)
        this.rotation = Vector3.Zero()
        this.location = Vector3.Zero()
    }
}

export default Mesh