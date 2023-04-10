import { useEffect, useState } from "react"
import {  useParams ,Link } from "react-router-dom"
import axios from 'axios'
import Alerta from "../components/Alerta"

const Confirmar = () => {
  const [cuentaCon,setCuentaCon]= useState(false)
  const [error, setError]= useState({})

  
  const  params = useParams()
  const {id} = params

  useEffect(()=>{
    const reqConfirmar = async()=>{
      try {
        const url = `${import.meta.env.VITE_URL_BACKEND}/api/usuarios/confirmar/${id}`

        const {data} = await axios(url)
        
        setError({
          msj: data.msj,
          error: false
        })
       return
      } catch (error) {
        setError({
          msj: error.response.data.mensaje,
          error: true
        })
      }
    }

    reqConfirmar()

  },[])

  const {msj}= error

  return (
    <>
  <div className="text-center capitalize ">
    <label className="font-black text-5xl text-indigo-500 ">confirmando tu cuenta! </label>
    <span className="font-black text-6xl text-indigo-800">inicia secion</span>
  </div>

  <div className=" shadow-2xl py-5 px-10 rounded-md mx-10 my-5">
    {msj && <Alerta error={error}/>}



  </div>
  
  </>
  )
}

export default Confirmar