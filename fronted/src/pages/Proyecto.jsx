import { useEffect } from "react"
import { useParams } from "react-router-dom"
import useProyectContext from "../../hooks/useProyectContext"
import { Link } from "react-router-dom"
import ModalFormularioTareas from "../components/ModalFormularioTareas"
import TareaN from "../components/TareaN"
import ModalEliminarTarea from "../components/ModalEliminarTarea"
import Colaborador from "../components/Colaborador"


const Proyecto = () => {
    const { reqProyectos, stateProy, handleSetModal} = useProyectContext()
    const {id} = useParams()

    const {nombre, tareas} = stateProy
    
    useEffect(()=>{
        reqProyectos(id)
    },[])

    
  return (
    
    <main className="min-h-screen   p-5">
    <div className="flex justify-between  ">
        <h1 className="font-black text-5xl">{nombre}</h1>
        
        <Link
        className="flex items-center mt-5 shadow p-1 active:shadow-none"
        to={`/proyectos/editar/${id}`}
        >
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6">
        <path d="M21.731 2.269a2.625 2.625 0 00-3.712 0l-1.157 1.157 3.712 3.712 1.157-1.157a2.625 2.625 0 000-3.712zM19.513 8.199l-3.712-3.712-12.15 12.15a5.25 5.25 0 00-1.32 2.214l-.8 2.685a.75.75 0 00.933.933l2.685-.8a5.25 5.25 0 002.214-1.32L19.513 8.2z" />
        </svg>

        Editar</Link>


    </div>

  

          
    <div className=" flex p-5 mt-2">
          <button 
          onClick={ handleSetModal}
          className="capitalize  bg-sky-500 p-1 w-full md:w-1/5 shadow rounded text-white"
          >nueva tarea</button>
        </div>

      
        <ModalFormularioTareas/>
        <ModalEliminarTarea/>

       

        <div className=" mt-7 w-full">
   {tareas?.length ? (
      tareas.map(tarea=> (
        <TareaN
        key={tarea._id}
        tarea={tarea}
        />
      ))
   ) : <div className=" w-full capitalize text-3xl font-bold shadow rounded text-center">no hay tareas!</div>}
    </div>
     {tareas?.length ?(
     <div className="flex justify-between py-4">
      
      <h1 className="font-black ">colaboradores</h1>
      <Link
      to={`/proyectos/nuevo-colaborador/${stateProy._id}`}
      className=" font-semibold hover:text-slate-500">añadir</Link>
     </div>
     ): ''}


   {tareas?.length ? (
      stateProy.colaboradores.map(colaborador=> (
          <Colaborador
          key={colaborador._id}
          colaborador={colaborador}
          />

      ))
   ) : <div className=" w-full capitalize text-3xl font-bold shadow rounded text-center mt-10">no hay Colaboradores!</div>}





    
    </main>
  )
}

export default Proyecto