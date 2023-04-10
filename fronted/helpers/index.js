export const formatearFecha = (fecha)=>{

    const newFecha = new Date(fecha.split('T')[0].split('-'))
   const config = {
         weekday: 'long',
         year: 'numeric',
         month: 'long',
         day: 'numeric'

    }
   return  newFecha.toLocaleDateString('es-ES', config)
}