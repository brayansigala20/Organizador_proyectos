import useProyectContext from "../../hooks/useProyectContext"
import Proyecto from '../components/Proyecto'
const Proyectos = () => {
  const {proyectos} = useProyectContext()
  
  return (
    <>
    <div className="">
      <span className="font-black text-2xl ">Proyectos</span>

     <div className="rounded bg-white shadow  mt-5">
     {proyectos.length ? 
         proyectos.map(proyecto => (
          <Proyecto
          key={proyecto._id}
          proyecto={proyecto}
          />
        ))
      : <p className="font-bold text-xl text-center p-3">No hay proyectos</p>}

     </div>


    </div>
        
    </>
  )
}

export default Proyectos