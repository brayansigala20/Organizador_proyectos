import {Outlet} from 'react-router-dom'


const AuthLayout = () => {
  return (

    <main className=' container  mx-auto p-5 mt-5 md:mt-20 md:flex md:justify-center  '>
       <div className='lg:w-1/2 md:w-2/3 '>
       <Outlet/>
       </div>
    </main>
  )
}

export default AuthLayout