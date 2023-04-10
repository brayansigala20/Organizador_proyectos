import Usuario from "../model/Usuario.js"
import generarId from "../helpers/generarId.js"
import generarJWT from "../helpers/generarJWT.js"
import {emailRegistro, emailT} from '../helpers/emails.js'

const registrar = async (req,res)=>{
    const {email} = req.body
    const usuarioDuplicado = await Usuario.findOne({email})
    if(usuarioDuplicado){
        const error = new Error('usuario existente')
        return res.status(400).json({msj: error.message})
    }
try {
    const usuario = new Usuario(req.body)
    usuario.token = generarId()
    await usuario.save()

     emailRegistro({
        nombre:usuario.nombre,
        email: usuario.email,
        token: usuario.token
        
     })

    res.json({msj: 'usuario creado exitosamente'})

    
} catch (error) {
    console.log(error)
}
}

const autenticar = async (req, res )=>{
 const {email, password} = req.body;

 const autenticarEmail = await Usuario.findOne({email})
 console.log(autenticarEmail)
 if(!autenticarEmail){
    const error = new Error('usuario no encontrado')
    return res.status(404).json({msj: error.message})
 }
 
  if(!autenticarEmail.confirmado){
     const error = new Error('usuario no ah sido confirmado')
     return res.status(403).json({msj: error.message})
 }

  if (await autenticarEmail.confirmarPass(password) ) {
    res.json({
        _id: autenticarEmail._id,
        nombre: autenticarEmail.nombre,
        email: autenticarEmail.email,
        token: generarJWT(autenticarEmail._id)
    })
  }else{
    const error = new Error('contrasena incorrecta')
    return res.status(403).json({msj: error.message})
  }
  
  


}

const confirmar = async (req, res)=>{
   const {token}= req.params

   const usuarioConfir = await Usuario.findOne({token})
   
    
   if(usuarioConfir === null){
    const error = new Error("token no valido")
     return res.status(403).json({mensaje: error.message})
   }

   try{
    
    usuarioConfir.confirmado = true
    usuarioConfir.token = ''
    await usuarioConfir.save()
    res.json({msj:"usuario confirmado por token"})

   }catch(error){
    console.log(error)
    
   }
}

const autenticarpass = async (req,res)=>{
    const {email} = req.body

    const usuarioE = await Usuario.findOne({email})

    if(!usuarioE){
        const error = new Error('el usuario no existe')
        return res.status(403).json({msg: error.message})
    }
    try {
        usuarioE.token = generarId()
        await usuarioE.save()
        //crear email 
        emailT({
            nombre:usuarioE.nombre,
            email: usuarioE.email,
            token: usuarioE.token
            
         })
         res.json({msg:'se envio un token unico a tu email'})
        
    } catch (error) {
        console.log(error)
    }



}

const confirtoken = async (req,res)=>{
    const {token} = req.params;

    const ustoken = await Usuario.findOne({token})

    if(ustoken){
        res.json({msj:"acces token"})
    }else{
        const error = new Error("token no valido")
       return res.status(403).json({mensaje: error.message})
    }

}

const newPassword = async (req, res)=>{
    const {token} = req.params;
    const {password} = req.body;

    const usuario =  await Usuario.findOne({token})

    if (!usuario) {
        const error = new Error("token invalido")
        return res.status(403).json({error: error.message})
    }
    usuario.password = password;
    usuario.token = ''
    try {
        res.json({msg: "contrasena renovada"})
        await usuario.save()
    } catch (error) {
        console.log(error)
        
    }
}

const perfil = async (req , res)=>{
   const {usuario} = req;

   res.json(usuario)
}
export {registrar, autenticar, confirmar, autenticarpass,confirtoken, newPassword, perfil}