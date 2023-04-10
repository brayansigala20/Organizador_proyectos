import Proyecto from "../model/Proyecto.js"
import Tarea from "../model/Tarea.js"
import Usuario from "../model/Usuario.js"
 
 const obtenerProyectos = async (req, res)=>{
    
    const proyecto = await Proyecto.find().where("creador").equals(req.usuario)
     res.json(proyecto)
    
}
 const nuevoProyecto = async (req, res)=>{
    const proyecto = new Proyecto(req.body)
     proyecto.creador = req.usuario._id

   try {
    const almacenarProyecto = await proyecto.save();
    res.json(almacenarProyecto)
   } catch (error) {
    console.log(error)
    
   }
}
 const obtenerProyecto = async (req, res)=>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id)
    .populate('tareas')
    .populate('colaboradores', 'email nombre')
    
    if(!proyecto){
        return res.status(401).json({ msj: 'error not found'})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("accion no validada")
        return res.status(401).json({ msj: error.message})
    }
    const tareas = await Tarea.find().where("proyecto").equals(proyecto._id)

     res.json({
        proyecto,tareas
     })
 }
 const editarProyecto = async (req, res)=>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    
    if(!proyecto){
        return res.status(401).json({ msj: 'error not found'})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("accion no validada")
        return res.status(401).json({ msj: error.message})
    }
    proyecto.nombre = req.body.nombre || proyecto.nombre
    proyecto.descripcion = req.body.descripcion || proyecto.descripcion
    proyecto.fechaEntrega = req.body.fechaEntrega || proyecto.fechaEntrega
    proyecto.cliente = req.body.cliente || proyecto.cliente
    
    try {
        const proyectoAlmacenado = await proyecto.save()
        res.json(proyectoAlmacenado)
    } catch (error) {
        console.log(error)
    }
}
 const eliminarProyecto = async (req, res)=>{
    const {id} = req.params;
    const proyecto = await Proyecto.findById(id);
    
    if(!proyecto){
        return res.status(401).json({ msj: 'error not found'})
    }

    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error("accion no validada")
        return res.status(401).json({ msj: error.message})
    }
    try {
        await proyecto.deleteOne()
        res.json({msj: "proyecto elimiado"})
    } catch (error) {
        console.log(error)
    }
}

const buscarColaborador = async (req, res)=>{
    const {email} = req.body;

    const usuario = await Usuario.findOne({email}).select('-confirmado -token -createdAt -updatedAt -__v -password')
    
    res.json(usuario)
    
}
 const agregarColaborador = async (req, res)=>{
  
   
    const proyecto = await Proyecto.findById(req.params.id)

    if(!proyecto){
        const error = new Error('proyecto no encontardo')
        return res.status(404).json({msj:error.message})
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('accion no valida')
        return res.status(404).json({msj:error.message})
    }
 
    const {email} = req.body
    const usuarios = await Usuario.findOne({email}).select('-confirmado -token -createdAt -updatedAt -__v -password')
    
    if(!usuarios){
        const error = new Error('usuario no encontardo')
        return res.status(404).json({msj:error.message})
    }

   if(proyecto.creador.toString() === usuarios._id.toString()){
        const error = new Error('usuario no valido')
        return res.status(403).json({msj:error.message})
         
   }
   
   try {
    proyecto.colaboradores.push(usuarios._id)
    await proyecto.save()
    res.json('colaborador agregado')
   } catch (error) {
    console.log(error)
   }


   

   
    
}
 const eliminarColaborador = async (req, res)=>{
    const proyecto = await Proyecto.findById(req.params.id)

    if(!proyecto){
        const error = new Error('proyecto no encontardo')
        return res.status(404).json({msj:error.message})
    }
    if(proyecto.creador.toString() !== req.usuario._id.toString()){
        const error = new Error('accion no valida')
        return res.status(404).json({msj:error.message})
    }
   
    try {
        proyecto.colaboradores.pull(req.body._id)
        await proyecto.save()
        res.json('colaborador eliminado')
       } catch (error) {
        console.log(error)
       }
}


export {obtenerProyectos,obtenerProyecto,nuevoProyecto,editarProyecto,eliminarProyecto,eliminarColaborador,agregarColaborador,buscarColaborador}