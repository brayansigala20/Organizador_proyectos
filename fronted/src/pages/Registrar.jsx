import { Link } from "react-router-dom"
import { useState } from "react"
import Alerta from "../components/Alerta"
import axios from 'axios'


const Registrar = () => {
     
  const [nombre , setNombre] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')
  const [error, setError] = useState({})


  const handleValidarSubmit =async (e)=>{
       e.preventDefault()

       if([nombre,email,password,password2].includes('')){
           setError({
            msj: "todos los campos son obligatorios!! ",
            error: true
           })
           return
          }
          setError({})

          if(password !== password2){
            setError({
              msj: "el password es diferente",
              error: true
            })
             return

            }
            try {
              const {data} = await axios.post(`${import.meta.env.VITE_URL_BACKEND}/api/usuarios` , {
                nombre,email,password
              })
  
              setError({
                msj: data.msj,
                error: false

              })

              setNombre('')
              setEmail('')
              setPassword('')
              setPassword2('')
             } catch (error) {

              const {msj }= error.response.data
              setError({
                msj: msj,
                error:true
              })
              
             
         }
          

      
  }

  const {msj} = error

  return (
     <>
    <div className="text-center capitalize ">
    <label className="font-black text-5xl text-indigo-500 ">ingresa tus datos y registrate </label>
    <span className="font-black text-6xl text-indigo-800">facil y rapido</span>
</div>
{msj && <Alerta error={error}/> }
    <form 
    onSubmit={handleValidarSubmit}
    className="mt-10 flex justify-center ">

      
      <div className=" bg-slate-100 md:w-2/3 lg:w-11/12 shadow-lg rounded-md p-1">

      <div className="p-5">
            <label className=" font-semibold block text-xl mb-2 " htmlFor="nombre">Nombre</label>
            <input
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="nombre"
            name="nombre"
            id="nombre"
            type="text"
            value={nombre}
            onChange={e=> setNombre(e.target.value)} />
        </div>


        <div className="p-5">
            <label className=" font-semibold block text-xl mb-2 " htmlFor="email">E-mail</label>
            <input
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="email"
            name="email"
            id="email"
            type="email"
            value={email}
            onChange={e=> setEmail(e.target.value)}  />
        </div>

        <div className="p-5">
            <label className=" font-semibold block text-xl mb-2 " htmlFor="password">Contraseña</label>
            <input
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="password"
            name="password"
            id="password"
            type="text"
            value={password}
            onChange={e=> setPassword(e.target.value)}  />
        </div>

        <div className="p-5">
            <label className=" font-semibold block text-xl mb-2 " htmlFor="password2">confirmar Contraseña</label>
            <input
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="password"
            name="password2"
            id="password2"
            type="text"
            value={password2}
            onChange={e=> setPassword2(e.target.value)}  />
        </div>

      <div className="p-5">
      <input 
        value={"crear"}
        type={"submit"}
        className="text-2xl bg-indigo-600 w-full rounded hover:bg-indigo-700 text-white font-bold  p-2"
        />
      </div>
       
    </div>

    </form>

    
    <nav className="lg:flex lg:justify-between p-1">
      <Link
      to={"/"}
       className="block text-center my-5 text-slate-500 uppercase text-sm mx-7"
      >loguin</Link>

      <Link
      to={"/olvide-pass"} 
      className="block text-center my-5 text-slate-500 uppercase text-sm mx-7"
      >¿olvidaste tu Contraseña?</Link>
      </nav>
    </>
  )
}

export default Registrar