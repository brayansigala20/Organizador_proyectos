

const Alerta = ({error}) => {
  return (
    <div className={`${error.error ? " w-full from-red-500 to-red-700" : " from-blue-500 to-blue-700" }
    "  mt-5 rounded-2xl uppercase text-xl bg-gradient-to-br text-white text-center " `}>
     {error.msj}

    </div>
  )
}

export default Alerta