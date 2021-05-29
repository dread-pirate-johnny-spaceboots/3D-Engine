import bpy
import bmesh
import json
import mathutils, math

def write_some_data(context, filepath, use_some_setting):
    if bpy.ops.object.mode_set.poll():
        bpy.ops.object.mode_set(mode='OBJECT')		        
    
    scene=context.scene
    meshes = []
    for object in [object for object in scene.objects]:
            if (object.type == 'MESH'):
                meshes.append(object)
    
    
    print("running write_some_data...")
    f = open(filepath, 'w', encoding='utf-8')
    f.write(export_meshes(meshes, scene, f))
    f.close()

    return {'FINISHED'}

def export_meshes(meshes, scene, fileHandle):
    meshData = []    
    for obj in meshes:    
        # Create mesh object 
        mesh = obj.to_mesh(preserve_all_data_layers=True)
        matrix_world = obj.matrix_world.copy()
        matrix_world.translation = mathutils.Vector((0, 0, 0))
        mesh.transform(matrix_world)
        
        # Triangulate it
        bm = bmesh.new()
        bm.from_mesh(mesh)
        bmesh.ops.triangulate(bm, faces=bm.faces)
        bm.to_mesh(mesh)
        
        # Get verticies
        verticies = {}
        normals = {}
        faces = {}
        for i in range(0, len(mesh.vertices)):
            v = mesh.vertices[i]
            verticies[v.index] = (v.co.x, v.co.y, v.co.z)
            normals[v.index] = (v.normal.x, v.normal.y, v.normal.z)
        
        for i in range(0, len(bm.faces)):
            bm.faces.ensure_lookup_table()
            f = bm.faces[i]
            fVerts = []
            for vI in range(0, len(f.verts)):
                v = f.verts[vI]
                fVerts.append(v.index) 
            faces[f.index] = fVerts
        meshData.append({'verticies': verticies, 'normals': normals, 'faces': faces})

        #clean up 
        bm.free() 
    return json.dumps(meshData)

# ExportHelper is a helper class, defines filename and
# invoke() function which calls the file selector.
from bpy_extras.io_utils import ExportHelper
from bpy.props import StringProperty, BoolProperty, EnumProperty
from bpy.types import Operator


class ExportSomeData(Operator, ExportHelper):
    """Export meshes in scene to a .JSON format meant for 3DGameEngine"""
    bl_idname = "export_test.some_data"  # important since its how bpy.ops.import_test.some_data is constructed
    bl_label = "Export to 3DGameEngine .json"

    # ExportHelper mixin class uses this
    filename_ext = ".json"

    filter_glob: StringProperty(
        default="*.json",
        options={'HIDDEN'},
        maxlen=255,  # Max internal buffer length, longer would be clamped.
    )

    # List of operator properties, the attributes will be assigned
    # to the class instance from the operator settings before calling.
    use_setting: BoolProperty(
        name="Example Boolean",
        description="Example Tooltip",
        default=True,
    )

    type: EnumProperty(
        name="Example Enum",
        description="Choose between two items",
        items=(
            ('OPT_A', "First Option", "Description one"),
            ('OPT_B', "Second Option", "Description two"),
        ),
        default='OPT_A',
    )

    def execute(self, context):
        return write_some_data(context, self.filepath, self.use_setting)


# Only needed if you want to add into a dynamic menu
def menu_func_export(self, context):
    self.layout.operator(ExportSomeData.bl_idname, text="3DGameEngine .json")


def register():
    bpy.utils.register_class(ExportSomeData)
    bpy.types.TOPBAR_MT_file_export.append(menu_func_export)


def unregister():
    bpy.utils.unregister_class(ExportSomeData)
    bpy.types.TOPBAR_MT_file_export.remove(menu_func_export)


if __name__ == "__main__":
    register()

    # test call
    bpy.ops.export_test.some_data('INVOKE_DEFAULT')
