import express, { application } from 'express';
import conectarDB from './config/db.js';
import dotenv from 'dotenv'
import UsuariosRoute from './routes/UsuariosRoute.js'
import ProyectoRoute from './routes/ProyectoRoute.js'
import TareaRoute from './routes/TareaRoute.js'
import cors from 'cors'

const app = express();
dotenv.config()
conectarDB()
app.use(express.json())

const WhitheList = [process.env.FRONTEND_URL]

const corsOptions = {
    origin: function (origin, callback){
       if(WhitheList.includes(origin)){
        callback(null,true)
       }else{

        callback(new Error("error de cors"))
    }

    }
}

app.use(cors(corsOptions))

app.use("/api/usuarios", UsuariosRoute)
app.use("/api/proyectos", ProyectoRoute)
app.use("/api/tareas", TareaRoute)

const PORT = process.env.PORT || 4000

app.listen(PORT, ()=>{
 console.log(`${PORT}`)
});