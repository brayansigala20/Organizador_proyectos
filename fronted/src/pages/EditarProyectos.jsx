import useProyectContext from "../../hooks/useProyectContext"
import FormProyecto from "../components/FormProyecto"


const EditarProyectos = () => {

    const { reqProyectos, stateProy,EliminarProyecto} = useProyectContext()
     const  {nombre} = stateProy

     const handleDelete =()=>{
        EliminarProyecto(stateProy._id)
     }
  return (
    <div>

       <div className="flex justify-between  ">

        <h1 className="font-black text-5xl">{nombre}</h1>
        
        <button
        onClick={handleDelete}
        className="flex items-center mt-5 shadow p-1 active:shadow-none bg-red-100"
        >
       <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
  <path strokeLinecap="round" strokeLinejoin="round" d="M20.25 7.5l-.625 10.632a2.25 2.25 0 01-2.247 2.118H6.622a2.25 2.25 0 01-2.247-2.118L3.75 7.5m6 4.125l2.25 2.25m0 0l2.25 2.25M12 13.875l2.25-2.25M12 13.875l-2.25 2.25M3.375 7.5h17.25c.621 0 1.125-.504 1.125-1.125v-1.5c0-.621-.504-1.125-1.125-1.125H3.375c-.621 0-1.125.504-1.125 1.125v1.5c0 .621.504 1.125 1.125 1.125z" />
</svg>

        Eliminar</button>

        </div>

         <div className="  flex justify-center mt-10">
         <FormProyecto/>
         </div>
    </div>
  )
}

export default EditarProyectos