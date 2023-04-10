import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import clientesAxios from "../config/clienteAxios";

const AuthContext = createContext()

const AuthProvider = ({children})=>{
    const nav = useNavigate()

    const [autenticacion, setAutenticacion] = useState({})
    const [cargando, setCargando]= useState(true)

    useEffect(()=>{
        const AutenticarPerfil = async ()=>{
            const token = localStorage.getItem('token')
            
            if(!token){
                setCargando(false)
                return
            }
              const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
                
              }
            try {
                const {data} = await clientesAxios('/usuarios/perfil', config)
                setAutenticacion(data)
                nav('/proyectos')
            } catch (error) {
                console.log(error)
            }finally{
                setCargando(false)
            }
        }
        AutenticarPerfil()
    },[])

   
    return(
         <AuthContext.Provider
         value={{
            setAutenticacion,
            autenticacion,
            cargando

         }}
         >
            {children}
         </AuthContext.Provider>
    )
}

export {AuthProvider}

export default AuthContext