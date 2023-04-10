import React from 'react'
import { Link } from 'react-router-dom'

const Proyecto = ({proyecto}) => {
    const { _id, nombre , cliente } = proyecto
  return (
    <div className=' flex border-b font-sans p-4 justify-between '>
      <p className='font-black capitalize font-sm'>{nombre}
      <samp  className='text-indigo-700 font-black text-lg'> {''}|
      <samp className='font-semibold text-indigo-400 text-base'>{cliente} </samp></samp></p> 
      
      <Link
      className=' underline font-mono underline-offset-3 text-lg capitalize hover:text-sky-600 '
      to={_id}
      >ver Proyecto</Link>

    </div>
  )
}

export default Proyecto