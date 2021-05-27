import { Vector3 } from "./vector"
import {parse} from '@loaders.gl/core'
import {GLTFLoader} from '@loaders.gl/gltf'
import { Mesh, Face } from './mesh'

const testcube = `
{
    "asset" : {
        "generator" : "Khronos glTF Blender I/O v1.5.17",
        "version" : "2.0"
    },
    "scene" : 0,
    "scenes" : [
        {
            "name" : "Scene",
            "nodes" : [
                0,
                1,
                2
            ]
        }
    ],
    "nodes" : [
        {
            "mesh" : 0,
            "name" : "Cube"
        },
        {
            "name" : "Light",
            "rotation" : [
                0.16907575726509094,
                0.7558803558349609,
                -0.27217137813568115,
                0.570947527885437
            ],
            "translation" : [
                4.076245307922363,
                5.903861999511719,
                -1.0054539442062378
            ]
        },
        {
            "name" : "Camera",
            "rotation" : [
                0.483536034822464,
                0.33687159419059753,
                -0.20870360732078552,
                0.7804827094078064
            ],
            "translation" : [
                7.358891487121582,
                4.958309173583984,
                6.925790786743164
            ]
        }
    ],
    "materials" : [
        {
            "doubleSided" : true,
            "name" : "Material",
            "pbrMetallicRoughness" : {
                "baseColorFactor" : [
                    0.800000011920929,
                    0.800000011920929,
                    0.800000011920929,
                    1
                ],
                "metallicFactor" : 0,
                "roughnessFactor" : 0.4000000059604645
            }
        }
    ],
    "meshes" : [
        {
            "name" : "Cube",
            "primitives" : [
                {
                    "attributes" : {
                        "POSITION" : 0,
                        "NORMAL" : 1,
                        "TEXCOORD_0" : 2
                    },
                    "indices" : 3,
                    "material" : 0
                }
            ]
        }
    ],
    "accessors" : [
        {
            "bufferView" : 0,
            "componentType" : 5126,
            "count" : 24,
            "max" : [
                1,
                1,
                1
            ],
            "min" : [
                -1,
                -1,
                -1
            ],
            "type" : "VEC3"
        },
        {
            "bufferView" : 1,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC3"
        },
        {
            "bufferView" : 2,
            "componentType" : 5126,
            "count" : 24,
            "type" : "VEC2"
        },
        {
            "bufferView" : 3,
            "componentType" : 5123,
            "count" : 36,
            "type" : "SCALAR"
        }
    ],
    "bufferViews" : [
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 0
        },
        {
            "buffer" : 0,
            "byteLength" : 288,
            "byteOffset" : 288
        },
        {
            "buffer" : 0,
            "byteLength" : 192,
            "byteOffset" : 576
        },
        {
            "buffer" : 0,
            "byteLength" : 72,
            "byteOffset" : 768
        }
    ],
    "buffers" : [
        {
            "byteLength" : 840,
            "uri" : "data:application/octet-stream;base64,AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgD8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgL8AAIC/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgD8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAPwAAgL8AAIA/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgD8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgL8AAIC/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgD8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AACAvwAAgL8AAIA/AAAAAAAAAAAAAIC/AAAAAAAAgD8AAACAAACAPwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAPwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAAAAAgD8AAACAAACAPwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AACAPwAAAAAAAACAAACAvwAAAAAAAACAAAAAAAAAAAAAAIC/AAAAAAAAgD8AAACAAACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIC/AACAvwAAAAAAAACAAAAAAAAAAAAAAIA/AAAAAAAAgD8AAACAAACAvwAAAAAAAACAAAAAAAAAgL8AAACAAAAAAAAAAAAAAIA/AAAgPwAAAD8AACA/AAAAPwAAID8AAAA/AADAPgAAAD8AAMA+AAAAPwAAwD4AAAA/AAAgPwAAgD4AACA/AACAPgAAID8AAIA+AADAPgAAgD4AAMA+AACAPgAAwD4AAIA+AAAgPwAAQD8AACA/AABAPwAAYD8AAAA/AADAPgAAQD8AAAA+AAAAPwAAwD4AAEA/AAAgPwAAgD8AACA/AAAAAAAAYD8AAIA+AADAPgAAgD8AAAA+AACAPgAAwD4AAAAAAQAOABQAAQAUAAcACgAGABMACgATABcAFQASAAwAFQAMAA8AEAADAAkAEAAJABYABQACAAgABQAIAAsAEQANAAAAEQAAAAQA"
        }
    ]
}
`

const AccessorTypes = {
    SCALER: "SCALER",
    VEC2: "VEC2",
    VEC3: "VEC3",
    VEC4: "VEC4",
    MAT2: "MAT2",
    MAT3: "MAT3",
    MAT4: "MAT4"
}

const AccessorComponents = {
    [AccessorTypes.SCALER]: 1,
    [AccessorTypes.VEC2]: 2,
    [AccessorTypes.VEC3]: 3,
    [AccessorTypes.VEC4]: 4,
    [AccessorTypes.MAT2]: 4,
    [AccessorTypes.MAT3]: 9,
    [AccessorTypes.MAT4]: 16
}

const ComponentType = {
    BYTE: 5120,
    UBYTE: 5121,
    SHORT: 5122,
    USHORT: 5123,
    UINT: 5125,
    FLOAT: 5126
}

const ComponentSize = {
    [ComponentType.BYTE]: 1,
    [ComponentType.UBYTE]: 1,
    [ComponentType.SHORT]: 2,
    [ComponentType.USHORT]: 2,
    [ComponentType.UINT]: 4,
    [ComponentType.FLOAT]: 4
}

class GLTFImporter {

    static async LoadMesh(gltfString, meshIdentifier) {
        gltfString = testcube
        const gltf = await parse(gltfString, GLTFLoader)

        const meshData = gltf.meshes[0]
        const vertexData = meshData.primitives[0].attributes.POSITION.value
        const totalVerticies = meshData.primitives[0].attributes.POSITION.count / 3
        const totalFaces = meshData.primitives[0].indices.count / 3
        const faceData = meshData.primitives[0].indices.value
        const mesh = new Mesh(meshData.id, totalVerticies, totalFaces)
        const vertexMap = {}
    
        let index = 0
        for(let offset = 0; offset < meshData.primitives[0].attributes.POSITION.count; offset += 3) {
          mesh.verticies[index] =  new Vector3(vertexData[offset], vertexData[offset + 1], vertexData[offset + 2])
          vertexMap[offset] = index
          vertexMap[offset + 1] = index
          vertexMap[offset + 2] = index
          index++
        }
    
        mesh.faces = []
        for (index = 0; index < totalFaces; index++) {
          mesh.faces.push(new Face(
            vertexMap[faceData[index * 3]],
            vertexMap[faceData[index * 3 + 1]],
            vertexMap[faceData[index * 3 + 2]],
          ))
        }
    
        console.log(mesh);
    
        return mesh;

        console.log(gltf)

        /*
        gltfString = testcube

        if (meshIdentifier === undefined) {
            meshIdentifier = 0
        }

        const gltfData = JSON.parse(gltfString)
        if (typeof meshIdentifier === 'string') {
            meshIdentifier = gltfData.nodes.find(node => node.name === meshIdentifier).mesh // .mesh is an int representing the mesh index
        }

        const buffers = []
        for(const buffer of gltfData.buffers) {
            buffers.push(Uint8Array.from(atob(buffer.uri.replace('data:application/octet-stream;base64,', '')), c => c.charCodeAt(0)))
        }

        const meshRecord = gltfData.meshes[meshIdentifier]
        const locAccessorIndex = meshRecord.primitives[0].attributes.POSITION
        const normalAccessorIndex = meshRecord.primitives[0].attributes.NORMAL
        const locAccessor = gltfData.accessors[locAccessorIndex]
        const locBufferView = gltfData.bufferViews[locAccessor.bufferView]
        const locData = buffers[locBufferView.buffer].slice(locBufferView.byteOffset, locBufferView.byteOffset + locBufferView.byteLength)

        const totalComponents = AccessorComponents[locAccessor.type]
        const componentSize = ComponentSize[locAccessor.componentType]
        const fieldSize = componentSize * totalComponents
        const verticies = []

        for (let offset = 0; offset < locData.length; offset += fieldSize) {
            switch(locAccessor.type) {
                case AccessorTypes.VEC3:
                    const xOffset = offset
                    const yOffset = xOffset + componentSize
                    const zOffset = yOffset + componentSize

                    const xData = locData.slice(xOffset, xOffset + componentSize)
                    const yData = locData.slice(yOffset, yOffset + componentSize)
                    const zData = locData.slice(zOffset, zOffset + componentSize)

                    const xBuffer = new ArrayBuffer(componentSize)
                    const xView = new DataView(xBuffer)
                    xView.setUint8(0, xData[0], false)
                    xView.setUint8(1, xData[1], false)
                    xView.setUint8(2, xData[2], false)
                    xView.setUint8(3, xData[3], false)

                    const yBuffer = new ArrayBuffer(componentSize)
                    const yView = new DataView(yBuffer)
                    yView.setUint8(0, yData[0], false)
                    yView.setUint8(1, yData[1], false)
                    yView.setUint8(2, yData[2], false)
                    yView.setUint8(3, yData[3], false)

                    const zBuffer = new ArrayBuffer(componentSize)
                    const zView = new DataView(zBuffer)
                    zView.setUint8(0, zData[0], false)
                    zView.setUint8(1, zData[1], false)
                    zView.setUint8(2, zData[2], false)
                    zView.setUint8(3, zData[3], false)

                    const x = xView.getFloat32(0)
                    const y = yView.getFloat32(0)
                    const z = zView.getFloat32(0)

                    verticies.push(new Vector3(x, y, z))
                break;
            }
        }

        console.log(verticies)
        //console.log('decode')
*/
    }


}

export default GLTFImporter