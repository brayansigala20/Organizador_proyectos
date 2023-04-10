import { createContext, useState  } from "react";
import clientesAxios from "../config/clienteAxios";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";


const ProyectoContext = createContext()

const ProyectoProvider = ({children})=>{  
    const nav = useNavigate()
    const [proyectos, setProyectos] = useState([])
    const [error, setError]= useState({})
    const [stateProy, setStateProy] = useState({})

    const [modalFormularioTareas , setModalFormularioTareas] = useState(false) 
    const [tareaS, setTareaS] = useState({})

    const [tareaElim, setTareaElim] = useState(false)
    const [tareaEliminar, setTareaEliminar] = useState({}) 

    const [Colaborador, setColaborador] = useState({})
    const [EliminarColabModal, setEliminarColabModal]  = useState(false)
    const [colaboradorElim , setColaboradorElim] = useState({})

    const EliminarColaborador = async ()=>{
        const token = localStorage.getItem('token')
        if(!token){
    
            return
        }
    
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        } 
        try {
            
         const {data} = await clientesAxios.post(`/proyectos/eliminar-colaborador/${stateProy._id}`,colaboradorElim,config)
         
        //  Actualizar State
        
        const proyectoActualizar = stateProy.colaboradores.filter(colaborador=> colaborador._id !== colaboradorElim._id )
         stateProy.colaboradores = proyectoActualizar
         setEliminarColabModal(false)
        } catch (error) {
            console.log(error)
        }
    } 
    
    const handleEliminarcolaborador = (id)=>{
           setEliminarColabModal(!EliminarColabModal)
           setColaboradorElim(id)

    }

    const agregarColaborador = async(email)=>{
        const token = localStorage.getItem('token')
        if(!token){
    
            return
        }
    
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
           try {
            const {data} = await clientesAxios.post(`/proyectos/colaborador/${stateProy._id}`,email,config)
            setError({
                msj:data,
                error:false
            })
            setColaborador({})
           } catch (error) {
            setError({
                msj:error.response.data.msj,
                error: true
            })
           }
    }

    const submitColaboradores = async(email)=>{  
    const token = localStorage.getItem('token')
    if(!token){

        return
    }

    const config = {
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }

     try {
        const {data} = await clientesAxios.post('/proyectos/colaborador',{email},config)

        setColaborador(data)
        setError({})
     } catch (error) {
        console.log(error)
     }
        
         
    }

    const EliminarTarea = async()=>{
   
        const token = localStorage.getItem('token')
        if(!token){
    
            return
        }
    
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

        try {
            const {data} = await clientesAxios.delete(`/tareas/${tareaEliminar._id}`,config)
            
            const deletetarea = {...stateProy}
            deletetarea.tareas =  deletetarea.tareas.filter(tareaState=> tareaState._id !== tareaEliminar._id)
            setStateProy(deletetarea)
            

            handleEliminarTarea()
        } catch (error) {
            console.log(error)
        }

    }

    const handleEliminarTarea =  (tarea)=>{
       setTareaElim(!tareaElim)
       setTareaEliminar(tarea)


    }

    const handleSubmitTareas = async (tarea) =>{ 
    if(tarea?.NewId){
       await  EditarTarea(tarea)
    }else{
        await NuevaTarea(tarea)
    }
      
    }

    const NuevaTarea = async (tarea)=>{
        
        const {NewId ,nombre, descripcion,fechaEntraga, prioridad, id} = tarea
        const token = localStorage.getItem('token')
        if(!token){
    
            return
        }
    
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

      
     
      try {
          const {data} = await clientesAxios.post('/tareas', {
              nombre,
              descripcion,
              fechaEntraga,
              prioridad,
              proyecto: id

          }, config)

          
      const proyectoActualizado = {...stateProy}
      proyectoActualizado.tareas = [...stateProy.tareas, data]
      setStateProy(proyectoActualizado)

      handleSetModal()
          
      } catch (error) {
          console.log(error)
      }

    }

    const EditarTarea = async (tarea)=>{
        const token = localStorage.getItem('token')
        if(!token){
    
            return
        }
    
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }

      
     
      try {
          const {data} = await clientesAxios.put(`/tareas/${tarea.NewId}`,tarea,config)
         
         
        const Tareas = {...stateProy}
        const tareaActualizada = Tareas.tareas.map(tareaState => tareaState._id === data._id? data : tareaState)
         stateProy.tareas = tareaActualizada
          
          handleSetModal()
          
      } catch (error) {
          console.log(error)
      }
         
    }

    const handleEditarTarea =(tarea)=>{ 
       setTareaS(tarea)
       handleSetModal()
    }
  

    const handleSetModal = ()=>{
        setModalFormularioTareas(!modalFormularioTareas)
    }

    const EliminarProyecto = async (id)=>{
        const token = localStorage.getItem('token')
        if(!token){
    
            return
        }
    
        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        try {
            const {data} = await clientesAxios.delete(`/proyectos/${id}`, config)
            
            
             const proyectoEliminado = proyectos.filter(proyetoState=> proyetoState._id !== id ) 
              setProyectos(proyectoEliminado)

            setError({
                msj: data.msj,
                error: false
             })

        
             setTimeout(()=>{
                setError({})
                nav('/proyectos')
             },2000 )
        } catch (error) {
            
        }
    }

    const NuevoProyecto = async(proyec,config)=>{    
        try {
            const {data} =  await clientesAxios.post('/proyectos',proyec,config )
                setProyectos([...proyectos, data])
            } catch (error) {
            console.log(error)
            }

    }
    
    const EditarProyecto = async(proyec, config)=>{
        const { nombre, descripcion, fechaEntrega, cliente} = proyec
        try {
            const {data} = await clientesAxios.put(`/proyectos/${proyec.newId}`, proyec, config)

            const proyectoAct = proyectos.map(proyectoState => proyectoState._id === proyec.newId? data : stateProy)
            setProyectos(proyectoAct)
            setError({
                msj: 'proyecto editado con exito',
                error: false
            })
        } catch (error) {
            
        }

    }
   const valuesProyect = async (proyec)=>{
  

    const token = localStorage.getItem('token')
    if(!token){

        return
    }

    const config = {
        headers:{
            "Content-Type" : "application/json",
            Authorization: `Bearer ${token}`
        }
    }

    if(proyec.newId){
        EditarProyecto(proyec, config)
       }else{
        NuevoProyecto(proyec, config)
       }

    setError({
        msj:'Proyecto creado con exito',
        error: false
     })

     setTimeout(()=>{
        setError({})
        nav('/proyectos')
     },2000 )

}
    


    const reqProyectos = async id =>{
         try {
            const token = localStorage.getItem('token')
        if(!token){

            return
        }

        const config = {
            headers:{
                "Content-Type" : "application/json",
                Authorization: `Bearer ${token}`
            }
        }
        const {data} = await clientesAxios(`/proyectos/${id}`, config)

        setStateProy(data.proyecto)

         } catch (error) {
            console.log(error)
            
         }
     

    }



    useEffect(()=>{
        const proyectosReq = async()=>{
            const token = localStorage.getItem('token')
            if(!token){

                return
            }
    
            const config = {
                headers:{
                    "Content-Type" : "application/json",
                    Authorization: `Bearer ${token}`
                }
            }
    
            try {
                 const {data} = await clientesAxios('/proyectos', config)
           setProyectos(data)
            } catch (error) {
                console.log(error)
            }
           
        } 
       proyectosReq()
    },[])





        return(
        <ProyectoContext.Provider
        value={{
            error,
            proyectos,
            reqProyectos,
            stateProy,
            valuesProyect,
            setError,
            EliminarProyecto,
            handleSetModal,
            modalFormularioTareas,
            handleSubmitTareas,
            handleEditarTarea,
            tareaS,
            handleEliminarTarea,
            tareaElim,
            EliminarTarea,
            submitColaboradores,
            Colaborador,
            agregarColaborador,
            handleEliminarcolaborador,
            EliminarColabModal,
            setEliminarColabModal,
            EliminarColaborador

        }}
        >
            {children}
        </ProyectoContext.Provider>
    )
}

export{
    ProyectoProvider
}

export default ProyectoContext