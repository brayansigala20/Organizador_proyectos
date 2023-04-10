import {useState} from 'react'
import { Link } from 'react-router-dom'
import useAuthContext from '../../hooks/useAuthContext'
import { useLocation } from 'react-router-dom'

const AssideBar = () => {
  const location = useLocation()
  const path = location.pathname


  
  
  
  const {autenticacion} = useAuthContext()

  return (
    <aside className=' md:w-80 lg:w-90 px-5 py-10  '>

        <label htmlFor=""className='font-bold  font-xl   '>Hola: <span>{autenticacion.nombre}</span></label>

        <div className=' flex mt-5'>
          {path !=='/proyectos/nuevo-proyecto' ? (
            <Link 
            to={'nuevo-proyecto'}
            className=' bg-indigo-800 text-white  font-black p-1 rounded-md w-full text-center'>
                  Nuevo proyecto
                </Link>
          ) : ''}
        
        </div>
    
    </aside>
  )
}

export default AssideBar