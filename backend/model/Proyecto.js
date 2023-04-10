import mongoose from "mongoose";

const ProyectoSchema = mongoose.Schema({
    nombre:{
        type: String,
        require: true,
        trim: true
    },
    descripcion:{
        type: String,
        trim: true,
        require: true,
    },
    fechaEntrega:{
        type: Date,
        default: Date.now(),

    },
    cliente:{
        type: String,
        trim: true,
        require: true,
    },
    creador:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Usuario',
    },
    tareas:[
    {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'tarea'
    }],
    colaboradores: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Usuario',
        }
    ],
    

},{
    timeStamps:true
})

const Proyecto = mongoose.model('Proyecto', ProyectoSchema)

export default Proyecto