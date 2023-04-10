import useProyectContext from "../../hooks/useProyectContext"
import ModalEliminarColaborador from "./ModalEliminarColaborador"

const Colaborador = ({colaborador}) => {
    const {nombre, email, _id} = colaborador
    const {handleEliminarcolaborador} = useProyectContext()
   
  return (
    <div className='shadow p-4 flex items-center justify-between'>
       <div>
        <h1 className='font-bold'>{nombre}</h1>
        <h2>{email}</h2>

       </div>
       <div>
        <button 
        onClick={()=> handleEliminarcolaborador(colaborador)}
        className='bg-red-700 text-white font-bold p-2 rounded'>Eliminar</button>
       </div>
       <ModalEliminarColaborador/>
    </div>
  )
}

export default Colaborador