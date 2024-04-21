import React from 'react'
import ClientPills from '../components/client/ClientPills'
import ClientList from '../components/client/ClientList'

const Client = () => {
  return (
    <div  className= "overflow-y-auto p-4 w-full lg:w-5/6 bg-gray-100  absolute right-0 h-screen helvetica">
    <div className="bg-white py-3 rounded-md shadow mb-6">
      <p className='px-3 text-2xl font-medium text-customPrimary  '> Clients  </p>
    </div>
    <ClientPills /> 
    <ClientList /> 
</div>
  )
}

export default Client