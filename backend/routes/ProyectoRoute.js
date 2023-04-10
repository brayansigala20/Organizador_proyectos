import express from "express";
import checkAuth from "../middleware/checkAuth.js";

import 
{
obtenerProyectos,obtenerProyecto,
nuevoProyecto,editarProyecto,eliminarProyecto,
eliminarColaborador,agregarColaborador,buscarColaborador
} from '../controller/ProyectoController.js'
const route = express.Router()

route.route('/')
    .get(checkAuth,obtenerProyectos)
    .post(checkAuth,nuevoProyecto)

route.route('/:id')
.get(checkAuth,obtenerProyecto)
.put(checkAuth,editarProyecto)
.delete(checkAuth, eliminarProyecto)

route.post("/colaborador",checkAuth,buscarColaborador )
route.post("/colaborador/:id",checkAuth, agregarColaborador)
route.post("/eliminar-colaborador/:id",checkAuth, eliminarColaborador)




export default route