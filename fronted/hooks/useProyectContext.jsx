import { useContext } from "react";
import ProyectoContext from "../context/ProyectProvider";

const useProyectContext = ()=>{
    return useContext(ProyectoContext)
}

export default useProyectContext