import { useParams } from "react-router-dom"
import { useEffect, useState } from "react"
import axios from 'axios'
import Alerta from "../components/Alerta"
import clientesAxios from "../../config/clienteAxios"


const NewPassword = () => {

  const [error, setError]= useState({})
  const [autenticado , setAutenticado] = useState(false)
  const [NewPassword,SetNewPassword] = useState('')
  const params = useParams()
  const {token} = params

  // request: autenticacion
  const reqAutenticacion = async ()=>{
   try {
    const url = `${import.meta.env.VITE_URL_BACKEND}/api/usuarios/olvide-contrasena/${token}` 
    const status =  (await axios(url)).status
    if(status === 200){
      setAutenticado(!autenticado)
    }
   } catch (error) {
     setError({
      msj: error.response.data.mensaje,
      error: true
     })
   }

  }
  // submit
  const handleSubmit = async(e)=>{
    e.preventDefault()
    const url = `/usuarios/olvide-contrasena/${token}` 
    const {data} = await clientesAxios.post(url,{
      password: NewPassword
    })
    setError({
      msj: data.mensaje,
      error: false
    })
    setAutenticado(!autenticado)
  }

  useEffect(()=>{
         reqAutenticacion()
  },[])

  
  return (
    <>
    <div className="text-center capitalize ">
    <label className="font-black text-5xl text-indigo-500 ">restablece tu contraseña y no pierdas tus </label>
    <span className="font-black text-6xl text-indigo-800">proyectos</span>
</div>

   {error && <Alerta error={error}/>}
     
      {autenticado && (
    <form 
    onSubmit={handleSubmit}
    className="mt-10 flex justify-center ">
      <div className=" bg-slate-100 md:w-2/3 lg:w-11/12 shadow-lg rounded-md p-1">

      <div className="p-5">
            <label className=" font-semibold block text-xl mb-2 " htmlFor="password">Nueva contraseña</label>
            <input
            onChange={e => SetNewPassword(e.target.value)}
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="password"
            name="password"
            id="password"
            type="new-password" />
        </div>

      <div className="p-5">
      <input 
        value={"restablecer"}
        type={"submit"}
        className= "text-2xl bg-indigo-600 w-full rounded hover:bg-indigo-700 text-white font-bold  p-2"
        />
      </div>
       
    </div>

    </form>
    )}
    
 
    </>
  )
}

export default NewPassword