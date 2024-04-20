import React from 'react'
import Pills from '../components/dashboard/Pills'
import TopProducts from '../components/dashboard/TopProducts'
import TopConsultantByDownline from '../components/dashboard/TopConsultantByDownline'
import TopConsultantBySales from '../components/dashboard/TopConsultantBySales'
import Activities from '../components/dashboard/Activities'

const Dashboard = () => {
  return (
    <div  className= "overflow-y-auto p-4 w-full  lg:w-5/6 bg-gray-100  absolute right-0 h-screen helvetica">
    <div className="bg-white py-3 rounded-md shadow mb-6">
      <p className='px-3 text-2xl font-medium text-customPrimary  '> Welcome Admin,  </p>
    </div>
    <Pills/>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
      <TopProducts />
      <TopConsultantByDownline/>
    </div>
    <div className='grid grid-cols-1 gap-4 md:grid-cols-2'>
    <TopConsultantBySales /> 
     <Activities />
    </div>
   
</div>
  )
}

export default Dashboard