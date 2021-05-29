import GameEngine from "./main"
import { Vector3 } from "./vector"

class Mesh {
    constructor(name, totalVerticies, totalFaces) {
        if (totalVerticies && totalFaces) {
            this.name = name
            this.verticies = new Array(totalVerticies)
            this.faces = new Array(totalFaces)
            this.rotation = Vector3.Zero()
            this.location = Vector3.Zero()
            this.initialized = true
        } else if (name && totalVerticies == undefined && totalFaces == undefined) {
            let meshData
            if (typeof name === 'string') {
                meshData = JSON.parse(name)
            } else {
                meshData = name
            }
            
            const vertexIndicies = {}
            this.name = ""
            this.verticies = []
            this.faces = []

            let i = 0;
            for (const vI in meshData.verticies) {
                vertexIndicies[vI] = i
                const v = meshData.verticies[vI]
                this.verticies[i] = new GameEngine.Vector3(v[0], v[1], v[2])
                i++
            }

            i = 0
            for (const fI in meshData.faces) {
                const f = meshData.faces[fI].map(v => vertexIndicies[v])
                this.faces[i] = new GameEngine.Face(f[0], f[1], f[2])
                i++
            }

            for (const face of this.faces) {
                const n0 = new Vector3(meshData.normals[face.a])
                const n1 = new Vector3(meshData.normals[face.b])
                const n2 = new Vector3(meshData.normals[face.c])
                const v0 = n1.subtract(n0)
                const v1 = n2.subtract(n0)
                const normal = Vector3.Cross(v0, v1)
                const averageVertexNormal = n0.add(n1).add(n2).divide(3)
                const dot = Vector3.Dot(normal, averageVertexNormal)
                
                face.normal = dot < 0 ? -normal : normal;
              }

            this.rotation = Vector3.Zero()
            this.location = Vector3.Zero()
            this.initialized = true
        }
        
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