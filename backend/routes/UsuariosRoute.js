import express from "express";
 const route = express.Router();
import {registrar , autenticar,confirmar, autenticarpass, confirtoken , newPassword, perfil} from '../controller/UsuariosController.js'
import checkAuth from '../middleware/checkAuth.js'
  route.post("/", registrar)

  route.post('/login', autenticar)

  route.get("/confirmar/:token", confirmar)

  route.post("/olvide-contrasena", autenticarpass )

  route.route("/olvide-contrasena/:token").get(confirtoken).post(newPassword)

  route.get("/perfil", checkAuth, perfil)
  
  export default route