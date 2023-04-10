import { Fragment, useState, useEffect } from 'react'
import { Dialog, Transition } from '@headlessui/react'
import useProyectContext from '../../hooks/useProyectContext'
import { useParams } from 'react-router-dom'
import Alerta from './Alerta'


const ModalFormularioTareas = () => {
    const {id} = useParams()
    const PRIORIDAD = ['alta','media','baja' ]
    const { handleSetModal, modalFormularioTareas, setError,error, handleSubmitTareas, tareaS} = useProyectContext()
    
    const [NewId, setNewId] = useState('')
    const [nombre, setNombre] = useState('')
    const [descripcion, setDescripcion] = useState('')
    const [fechaEntraga, setFechaEntrega] = useState('')
    const [prioridad, setPrioridad] = useState('')


    useEffect(()=>{
        setNewId(tareaS._id)
        setNombre(tareaS.nombre)
        setDescripcion(tareaS.descripcion)
        setFechaEntrega(tareaS.fechaEntraga)
        setPrioridad(tareaS.prioridad)
    },[tareaS])


    const handleSubmit =async (e)=>{
        e.preventDefault()

        if([nombre, descripcion ,fechaEntraga, prioridad].includes('')){
             setError({
                msj: 'todos los campos son obligatorios',
                error: true
             })
                      
              return
        }
       


        handleSubmitTareas( {NewId ,nombre, descripcion,fechaEntraga, prioridad, id})
 
        setError({})
        setNewId('')
        setNombre('')
        setDescripcion('')
        setFechaEntrega('')
        setPrioridad('')
    }


 
    return (
        <Transition.Root show={ modalFormularioTareas } as={Fragment}>
            <Dialog as="div" className="fixed z-10 inset-0 overflow-y-auto" onClose={ handleSetModal }>
                <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0"
                        enterTo="opacity-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100"
                        leaveTo="opacity-0"
                    >
                        <Dialog.Overlay 
                            className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" 
                        />
                    </Transition.Child>

                    {/* This element is to trick the browser into centering the modal contents. */}
                    <span className="hidden sm:inline-block sm:align-middle sm:h-screen" aria-hidden="true">
                        &#8203;
                    </span>

                    <Transition.Child
                        as={Fragment}
                        enter="ease-out duration-300"
                        enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                        enterTo="opacity-100 translate-y-0 sm:scale-100"
                        leave="ease-in duration-200"
                        leaveFrom="opacity-100 translate-y-0 sm:scale-100"
                        leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
                    >
                            <div className="inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">


                            <div className="hidden sm:block absolute top-0 right-0 pt-4 pr-4">
                                <button
                                    type="button"
                                    className="bg-white rounded-md text-gray-400 hover:text-gray-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                                    onClick={  handleSetModal  }
                                >
                                <span className="sr-only">Cerrar</span>
                                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 20 20" fill="currentColor">
                                        <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                                    </svg>
                                </button>
                            </div>


                            <div className="sm:flex sm:items-start">
                                <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                                    <Dialog.Title as="h3" className="text-4xl leading-6 font-bold text-gray-900 text-center capitalize">
                                        crear tarea
                                    </Dialog.Title>
                                       {error && <Alerta error={error}/>}
                                    <form 
                                    onSubmit={ handleSubmit}
                                    className='py-5'>
                                        <div className='mb-5'>
                                            <label className='block font-bold'>Nombre</label>
                                            <input 
                                            className=' p-1 outline-none w-full border content-none'
                                            placeholder='name'
                                            onChange={(e)=> setNombre(e.target.value)}
                                            value={nombre}
                                            type="text" />
                                        </div>

                                        <div className='mb-5'>
                                            <label className='block font-bold'>descripcion</label>
                                            <textarea 
                                            className=' p-1 outline-none w-full border content-none'
                                            placeholder='description'
                                            onChange={e => setDescripcion(e.target.value)}
                                            value={descripcion}
                                            type="text" />
                                        </div>

                                        <div className='mb-5'>
                                            <label className='block font-bold'>fecha de Entraga</label>
                                            <input 
                                            className=' p-1 outline-none w-full border content-none'
                                            onChange={(e)=> setFechaEntrega(e.target.value)}
                                            value={fechaEntraga}
                                            type="date" />
                                        </div>


                                        <div className='mb-5'>
                                            <label className='block font-bold'>prioridad</label>
                                            <select 
                                            className=' p-1 outline-none w-full border content-none capitalize'
                                            placeholder='priority'
                                            onChange={e => setPrioridad(e.target.value)}
                                            value={prioridad}
                                            type="text" >
                                                <option>--selecionar</option>
                                                {PRIORIDAD.map(priori => (
                                                    <option
                                                    value={priori}
                                                    key={priori}
                                                    className='capitalize'>{priori}</option>
                                                ))}
                                            </select>
                                        </div>

                                        <input
                                        className= ' bg-sky-500 w-full p-1 text-white rounded'
                                        value={tareaS?.nombre? 'Editar Proyecto' : 'Nuevo Proyecto'}
                                        type="submit" />
                                    </form>

                                </div>
                            </div>
                        </div>
                    </Transition.Child>
                </div>
            </Dialog>
        </Transition.Root>
    )
}

export default ModalFormularioTareas