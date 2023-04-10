import {BrowserRouter , Routes , Route} from "react-router-dom"
import AuthLayout from "./layout/AuthLayout"
import Login from "./pages/Login"
import Registrar from "./pages/Registrar"
import OlvidePass from "./pages/OlvidePass"
import NewPassword from "./pages/NewPassword"
import Confirmar from "./pages/Confirmar"
import { AuthProvider } from "../context/AuthProvider"
import Proyectos from "./pages/Proyectos"
import RutaProtegida from "./layout/RutaProtegida"
import NuevoProyecto from "./pages/NuevoProyecto"
import {ProyectoProvider} from "../context/ProyectProvider"
import Proyecto from "./pages/Proyecto"
import EditarProyectos from "./pages/EditarProyectos"
import NuevoColaborador from "./pages/NuevoColaborador"

function App() {
 return(
  <>
    <BrowserRouter>
    <AuthProvider>
    <ProyectoProvider>
    
     <Routes>
      <Route path="/" element={<AuthLayout/>}>

        <Route index element={<Login/>} />
        <Route path="registrar" element={<Registrar/>}/>
        <Route path="olvide-pass" element={<OlvidePass/>}/>
        <Route path="olvide-pass/:token" element={<NewPassword/>}/>
        <Route  path="confirmar/:id" element={<Confirmar/>}/>
      </Route>

      <Route path="/proyectos" element={<RutaProtegida/>}>
        <Route index element={<Proyectos/>}/>
        <Route path="nuevo-proyecto" element={<NuevoProyecto/>}/>
        <Route path=":id" element={<Proyecto/>}/>
       <Route path="editar/:id" element={<EditarProyectos/>}/>
       <Route path="nuevo-colaborador/:id" element={<NuevoColaborador/>} />

      </Route>
     </Routes>
     </ProyectoProvider>
     </AuthProvider>
    </BrowserRouter>
  </>
 )
}

export default App
