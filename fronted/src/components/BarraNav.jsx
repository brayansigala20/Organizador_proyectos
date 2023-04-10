import { Link, useNavigate } from "react-router-dom"

const BarraNav = () => {
  return (
    <nav className="flex px-10 py-5 shadow-lg w-full justify-between  items-center">
        <div>
            <h1 className=" font-black text-3xl text-indigo-700">Task_Mern</h1>

        </div>

        <div>
            <input 
            className=" w-96 p-1 px-1 bg-slate-100 rounded-2xl outline-transparent text-center focus:text-start "
            placeholder="Busqueda"
            type="text" />
        </div>

        <div className=" ">
           
            <Link
            to={'/proyectos'}
            className="px-5 italic font-extrabold">
            proyectos
            </Link>
            
            <Link
             className=" bg-indigo-700 text-white p-2 rounded-md hover:bg-indigo-800 active:bg-slate-700">
              cerrar sesion
            </Link>

            </div>
        

    </nav>
  )
}

export default BarraNav