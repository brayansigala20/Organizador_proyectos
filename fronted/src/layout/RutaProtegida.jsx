import { Navigate, Outlet } from "react-router-dom"
import useAuthContext from "../../hooks/useAuthContext"
import BarraNav from "../components/BarraNav"
import AssideBar from "../components/AssideBar"
const RutaProtegida = () => {
    const {autenticacion, cargando} = useAuthContext()
    if(cargando) return 'cargando...'
  return (
    <>
    {autenticacion._id ? (
     <>
        <div className=" w-full block">
         <BarraNav/>
        </div>
 <div className="md:flex md:min-h-screen  ">
        <div className="">
        <AssideBar/>
        </div>

        <main className=" p-10  flex-1">
         <Outlet/>
        </main>
    </div>
    </>

    ) : <Navigate to={'/'}/>}
    
    
    </>
  )
}

export default RutaProtegida