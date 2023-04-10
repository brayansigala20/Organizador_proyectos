import express from "express";
import {
    agregarTarea,
    obtenetTarea,
    actualizarTarea,
    eliminarTarea,cambiarEstado
} from '../controller/TareaController.js'
import checkAuth from "../middleware/checkAuth.js";

const route = express.Router()

route.post("/",checkAuth,agregarTarea)

route.route("/:id")
.get(checkAuth,obtenetTarea)
.put(checkAuth,actualizarTarea)
.delete(checkAuth,eliminarTarea)

route.post("/estado/:id", checkAuth,cambiarEstado)
export default route