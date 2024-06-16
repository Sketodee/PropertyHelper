import React from 'react'
import ConsultantPills from '../components/consultant/ConsultantPills'
import ConsultantList from '../components/consultant/ConsultantList'

const Consultant = () => {
  return (
    <div  className= "overflow-y-auto p-4 w-full lg:w-5/6 bg-gray-100 dark:bg-gray-700 absolute right-0 h-screen satoshi">
    <div className="bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6">
      <p className='px-3 text-2xl font-medium text-customPrimary  dark:text-white '> Consultants  </p>
    </div>
    <ConsultantPills />
    <ConsultantList /> 
</div>
  )
}

export default Consultant