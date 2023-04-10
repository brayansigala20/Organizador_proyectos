import { Link, useNavigate} from "react-router-dom"
import { useEffect, useState } from "react"
import Alerta from "../components/Alerta"
import clientesAxios from "../../config/clienteAxios"
import useAuthContext from "../../hooks/useAuthContext"


const Login = () => {
     const [email, setEmail] = useState('')
     const [password, setPassword] = useState('')
     const [error , setError] = useState({})

     const { setAutenticacion} = useAuthContext()
 
     const handleSubmit = async (e)=>{
         e.preventDefault()
       try {
        const {data} = await clientesAxios.post("/usuarios/login",{
          email , password
        })
        setAutenticacion(data)
         localStorage.setItem('token',data.token)
        setError({})

        

       } catch (error) {
        setError({
          msj: error.response.data.msj,
          error: true
        })
       }
     }

    const {msj} = error

  return (
    <>
    <div className="text-center capitalize ">
    <label className="font-black text-5xl text-indigo-500 ">ingresa a tu cuenta y accede a tus </label>
    <span className="font-black text-6xl text-indigo-800">proyectos</span>
</div>
    {error && <Alerta error={error}/>}
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
            <label className=" font-semibold block text-xl mb-2 " htmlFor="password">Contraseña</label>
            <input
            value={password}
            onChange={e => setPassword(e.target.value)}
            className="w-full p-2 rounded-xl outline-slate-300 focus:border-x-4 border-indigo-600 bg-indigo-100"
            placeholder="password"
            name="password"
            id="password"
            type="text" />
        </div>

      <div className="p-5">
      <input 
      value={"Loguin"}
        type={"submit"}
        className="text-2xl  bg-indigo-600 w-full rounded hover:bg-indigo-700 text-white font-bold  p-2"
        />
      </div>
       
    </div>

    </form>

    
    <nav className="lg:flex lg:justify-between p-1">
      <Link
      to={"/registrar"}
       className="block text-center my-5 text-slate-500 uppercase text-sm mx-7"
      >No tienes una cuenta? registrate</Link>

      <Link
      to={"/olvide-pass"} 
      className="block text-center my-5 text-slate-500 uppercase text-sm mx-7"
      >¿olvidaste tu Contraseña?</Link>
      </nav>
    </>
  )
}

export default Login