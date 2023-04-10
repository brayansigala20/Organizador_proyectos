import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import axios from 'axios'

const OlvidePass = () => {
  const [email , setEmail] = useState('')
  const [error, setError]= useState({})

  const handleSubmit = async(e)=>{
         e.preventDefault()

         if(email === '' || email.length < 6){
          setError({
            msj: "e-mail no valido",
            error: true
          })
           return
         }
          try {
            
         const url = `${import.meta.env.VITE_URL_BACKEND}/api/usuarios/olvide-contrasena`

         const {data} = await axios.post(url,{
          email
         }) 

          setError({
              msj:data.msg,
              error: false
          })
          
          setEmail('')
          
          } catch (error) {
            console.log(error)
          }

         



  }

    const {msj} = error
  return (
    <>
    <div className="text-center capitalize ">
    <label className="font-black text-5xl text-indigo-500 ">ingresa tu correo para recuperar tu </label>
    <span className="font-black text-6xl text-indigo-800">cuenta</span>
</div>
     {msj && <Alerta error={error}/>}
    <form 
    onSubmit={handleSubmit}
    className="mt-10 flex justify-center ">
      <div className=" bg-slate-100 md:w-2/3 lg:w-11/12 shadow-lg rounded-md p-1">

      <div className="p-5">
            <label className=" font-semibold block text-xl mb-2 " htmlFor="email">E-maill</label>
            <input
            value={email}
            onChange={e => setEmail(e.target.value)}
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="E-mail"
            name="email"
            id="email"
            type="email" />
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

    
    <nav className="lg:flex lg:justify-between p-1">
      <Link
      to={"/registrar"}
       className="block text-center my-5 text-slate-500 uppercase text-sm mx-7"
      >No tienes una cuenta? registrate</Link>

     
      </nav>
    </>
  )
}

export default OlvidePass