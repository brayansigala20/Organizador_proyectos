import React from 'react'
import { formatearFecha } from '../../helpers'
import useProyectContext from '../../hooks/useProyectContext'

const TareaN = ({tarea}) => {
    const { handleEditarTarea, tareaS, handleEliminarTarea} = useProyectContext()
    const {descripcion,estado,fechaEntrega,nombre, prioridad} = tarea
    
    

  return (
    <div className='shadow w-full rounded '>

     <div className='p-5'>
     <span className="font-black capitalize block mb-1">nombre:{' '} <label className="text-gray-500"> {nombre}</label></span>
       <span className="font-black capitalize block mb-1">Prioridad:{' '} <label className="text-indigo-500 font-mono"> {prioridad}</label></span>
       <span className="font-black capitalize">decripcion:{' '} <p  className=" border-b-2 border-zinc-600 text-md focus:outline-none mb-2  p-1 bg-slate-200 font-serif w-fit min-h-fit block mt-1">{descripcion}</p></span>
       <span className="font-black capitalize">fecha de entrega:{' '} <h1 className="text-amber-500 font-sans"> {formatearFecha(fechaEntrega)}</h1></span>
        
        <div className='flex justify-end gap-4'>
          <button
          onClick={()=> handleEditarTarea(tarea) }
          className=' p-2 bg-blue-600 rounded text-white font-semibold  '
          >Editar</button>
          
          <button
          onClick={()=> handleEliminarTarea(tarea)}
          className=' p-2 bg-red-700 rounded text-white font-semibold  '
          >Eliminar</button>


          <div className=' mt-2'>

         {estado
            ?(<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
            <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          ) 
            : (<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v3.75m9-.75a9 9 0 11-18 0 9 9 0 0118 0zm-9 3.75h.008v.008H12v-.008z" />
              </svg>)}
          
         

          

          </div>
        </div>
     </div>
    </div>
  )
}

export default TareaN