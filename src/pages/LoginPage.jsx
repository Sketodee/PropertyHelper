import React from 'react'
import { Link } from 'react-router-dom'
import Login from '../components/Auth/Login'

const LoginPage = () => {
  return (
    <div className='satoshi'>
    <div className="py-6 px-md-6  flex justify-between items-center border-b border-gray-200">
        <div className='ps-md-12 ps-6'>
            <h1 className="text-1xl lg:text-2xl cursor-pointer font-bold text-blue-500 w-full sora">
                Estate Helper
            </h1>
        </div>
        <div className='pe-md-12 pe-6'>
            <Link to={'/'} className='cursor-pointer bg-blue-500 py-2 px-5 text-white rounded'>Register</Link>
        </div>
    </div>

    <div className='flex flex-row items-center justify-between'>
        <div className='basis-1/2 hidden md:flex items-center justify-center py-20 px-20'>
            <div className='w-96 '>
                <img className='h-full w-full rounded-br-[200px]' src="/assets/2149661457-min.jpg" alt="" />
            </div>
        </div>
        <div className='basis-full sm:basis-1/2 py-md-10 px-md-20 py-2 px-6 '>
            <Login />
            {/* {toggle ? <Login /> : <Register />} */}
        </div>
    </div>


</div>
  )
}

export default LoginPage