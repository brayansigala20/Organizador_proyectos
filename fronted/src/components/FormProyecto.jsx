import { useState } from "react"
import clientesAxios from "../../config/clienteAxios"
import useProyectContext from "../../hooks/useProyectContext"
import Alerta from "./Alerta"
import { useNavigate , useParams } from "react-router-dom";
import { useEffect } from "react";




const FormProyecto = () => {
 const nav = useNavigate()
 const {id} = useParams()

  const { setError, error, valuesProyect, stateProy } = useProyectContext()
  const [newId,  setNewId] = useState('')
  const [nombre , setnombre] = useState('')
  const [descripcion , setDescripcion] = useState('')
  const [fechaEntrega , setFechaEntrega] = useState('')
  const [cliente , setCliente] = useState('')

  const [paramId, setParamId] = useState(null)



    useEffect(()=>{
      setParamId(id)
     if(id){
      setNewId(stateProy._id)
      setnombre(stateProy.nombre)
      setDescripcion(stateProy.descripcion)
      setFechaEntrega(stateProy.fechaEntrega?.split('T')[0])
      setCliente(stateProy.cliente)
     }
    
    },[id])

   
    
    const handleSubmit = async(e)=>{
      e.preventDefault()

      if([nombre, descripcion, fechaEntrega, cliente].includes('')){
          setError({
              msj:'campos incompletos',
              error: true
           })

          return
      }
      1
      valuesProyect({newId,nombre, descripcion, fechaEntrega, cliente})
 
      
     setnombre('')
     setCliente('')
     setDescripcion('')
     setFechaEntrega('')
  }
    
    
  return (
    <form 
    onSubmit={handleSubmit}
    className='  bg-white py-10 px-5 shadow md:w-1/2 rounded-lg  '>

       
       <h1 className='  text-center capitalize text-3xl text-sky-700 mb-10'>{id? 'editar proyecto' : 'nuevo proyecto'}</h1>
     {error && <Alerta error={error}/>}
     <div className='mb-5 mt-2'>
    <label
    className='block placeholder-slate-300 rounded-md text-md font-black capitalize'
     htmlFor="">nombre</label>

    <input
    value={nombre}
    onChange={e=> setnombre(e.target.value)}
    name='nombre'
    className='w-full bg-gray-100 p-2 rounded focus:outline-transparent '
    placeholder="Name"
    type="text" />
</div>

<div className='mb-5'>
    <label
    className='block placeholder-slate-300 rounded-md text-md font-black capitalize'
     htmlFor="">desripcion</label>

    <textarea 
    value={descripcion}
    onChange={e=> setDescripcion(e.target.value)}
    name='descripcion'
    className='w-full bg-gray-100 p-2 rounded focus:outline-transparent '
    placeholder="Description"
     />
</div>

<div className='mb-5'>
    <label
    className='block placeholder-slate-300 rounded-md text-md font-black capitalize'
     htmlFor="">Fecha Entrega</label>

    <input 
    value={fechaEntrega}
    onChange={e=> setFechaEntrega(e.target.value)}
    name='fechaEntrega'
    className='w-full bg-gray-100 p-2 rounded focus:outline-transparent '
    placeholder="Date"
    type="date" />
</div>

<div className='mb-5'>
    <label
    className='block placeholder-slate-300 rounded-md text-md font-black capitalize'
     htmlFor="">cliente</label>

    <input 
    value={cliente}
    onChange={e=> setCliente(e.target.value)}
    name='cliente'
    className='w-full bg-gray-100 p-2 rounded focus:outline-transparent '
    placeholder="Client"
    type="text" />
</div>

<input 
className='p-1 w-full text-white rounded bg-sky-600 mt-2 '
value={paramId? 'Editar Proyecto' : 'Nuevo Proyecto'}
type={'submit'}/>


    </form>
  )
}

export default FormProyecto