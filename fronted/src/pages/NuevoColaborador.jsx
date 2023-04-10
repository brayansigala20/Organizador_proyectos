import { useEffect } from "react"
import { useState } from "react"
import useProyectContext from "../../hooks/useProyectContext"
import ColaboradorForm from "../components/ColaboradorForm"

const NuevoColaborador = () => {
    const {stateProy, Colaborador, agregarColaborador,submitColaboradores} = useProyectContext()
    useEffect(()=>{
      submitColaboradores()
    },[])


    if(!stateProy?.nombre){
        return 'cargando...'

    }
  return (
    <>
    <div className="flex">
    <h1 className=" font-semibold text-4xl ">{` colaborador de el proyecto ${''}`}<span className=' text-sky-800'>{stateProy.nombre}</span></h1> 
    </div>

    <div className="flex py-10 justify-center">
    <ColaboradorForm/>
    
   
    </div>

   <div className="flex justify-center">
   {Colaborador?.email && 
    (
    <div className="  shadow w-1/2 p-5">
      <label className="font-black capitalize ">nombre:</label><h1 className=" font-mono">{Colaborador.email}</h1>
     <div className="flex justify-end"> 
      <button 
      onClick={()=> agregarColaborador({
        email: Colaborador.email
      }) }
      className="p-2 bg-slate-600 rounded text-white  ">
        añadir</button>
      </div>
    </div>
    
    )}
    
   </div>
         
    </>
  )
}

export default NuevoColaborador