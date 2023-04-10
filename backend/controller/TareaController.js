import Proyecto from "../model/Proyecto.js"
import Tarea from "../model/Tarea.js"


const agregarTarea = async (req,res)=>{
    const { proyecto } = req.body;

    const existeProyecto = await Proyecto.findById(proyecto)

    if(!existeProyecto){
        const error = new Error("el proyecto no existe");
        return res.status(404).json({msj: error.message})

    }

    if(existeProyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("no tienes los permisos para estas tareas");
        return res.status(404).json({msj: error.message})
    }

    try {
        const almacenarTarea = await Tarea.create(req.body)
        existeProyecto.tareas.push(almacenarTarea._id)
        await existeProyecto.save()
        res.json(almacenarTarea)
    } catch (error) {
        
    }
}

const obtenetTarea = async (req,res)=>{
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("accion no valida");
    return res.status(404).json({msj: error.message})
    }

    res.json(tarea)


}

const actualizarTarea = async (req,res)=>{
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("accion no valida");
    return res.status(404).json({msj: error.message})
    }
  tarea.nombre = req.body.nombre || tarea.nombre
  tarea.descripcion = req.body.descripcion || tarea.descripcion
  tarea.prioridad = req.body.prioridad || tarea.prioridad
  tarea.fechaEntrega = req.body.fechaEntrega || tarea.fechaEntrega

  try {
    const tareaActualizada = await tarea.save()
    res.json(tareaActualizada)
  } catch (error) {
    console.log(error)
  }
}

const eliminarTarea = async (req,res)=>{
    const {id} = req.params;

    const tarea = await Tarea.findById(id).populate("proyecto")

    if(tarea.proyecto.creador.toString() !== req.usuario._id.toString()){
    const error = new Error("accion no valida");
    return res.status(404).json({msj: error.message})
    }
      try {
        await tarea.deleteOne()
        res.json({msj: "tarea eliminada"})
      } catch (error) {
        console.log(error)
        
      }
}

const cambiarEstado = async (req,res)=>{

}

export{
    agregarTarea,
    obtenetTarea,
    actualizarTarea,eliminarTarea,cambiarEstado
}