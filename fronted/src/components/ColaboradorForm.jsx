import React, { useState } from 'react'
import useProyectContext from '../../hooks/useProyectContext'
import Alerta from './Alerta'

const ColaboradorForm = () => {
    const {error, setError, submitColaboradores} = useProyectContext()
    const [email, setEmail] = useState('')

    const handleSubmit = async(e)=>{
        e.preventDefault()
        if (email == ''){
            setError({
                msj: 'todos los compos son obligatorios',
                error: true
            })
            return
        }

       await submitColaboradores(email)
       
          
     
    }

    const {msj} = error
  return (
    <form
    onSubmit={handleSubmit}
    className='shadow bg-white rounded '>
        {msj && <Alerta error={error}/>}
   
       <div className='p-5 flex flex-col '>
        <label htmlFor="email" className='mb-1 font-semibold'>E-mail</label>
        <input 
        value={email}
        onChange={e => setEmail(e.target.value) }
        className='w-96 rounded bg-slate-100  p-1 outline-none'
        type="email"
        placeholder='E-mail'  
        id="email" />

        <input 
        value={'Buscar'}
        className=' rounded  mt-5 bg-amber-200 text-black'
        type="submit" />


       </div>
      
      </form>
  )
}

export default ColaboradorForm