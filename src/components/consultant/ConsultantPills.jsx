import React from 'react'
import { FaUserGroup } from "react-icons/fa6";
import { PiUsersThreeFill } from "react-icons/pi";

const ConsultantPills = () => {
    return (
        <div className="bg-white py-3 rounded-md shadow mb-6 px-3">
            <p className='text-customPrimary font-medium text-base '>Consultant Summary</p>
            <p className='text-xs text-gray-400 pb-6'>Today's Summary</p>
            <div className="grid grid-cols-2 gap-4 md:grid-cols-4 ">

                {/* <div className="bg-red-100 p-3 rounded-md h-32">
                    <div className='w-10 h-10 bg-red-300 rounded-full flex justify-center items-center'>
                        <FaHouseChimney className='text-1xl text-white' />
                    </div>
                    <p className='text-3xl font-bold pt-3 text-zinc-700'> 24</p>
                    <p className='text-xs text-gray-400 pb-6'>Total Property</p>
                </div> */}

                <div className="bg-orange-100 p-3 rounded-md h-32">
                    <div className='w-10 h-10 bg-orange-300 rounded-full flex justify-center items-center'>
                        <FaUserGroup className='text-1xl text-white' />
                    </div>
                    <p className='text-3xl font-bold pt-3 text-zinc-700'> 1899</p>
                    <p className='text-xs text-gray-400 pb-6'>Total Consultants</p>
                </div>

                <div className="bg-green-100 p-3 rounded-md h-32">
                    <div className='w-10 h-10 bg-green-300 rounded-full flex justify-center items-center'>
                        <PiUsersThreeFill className='text-1xl text-white' />
                    </div>
                    <p className='text-3xl font-bold pt-3 text-zinc-700'> 187</p>
                    <p className='text-xs text-gray-400 pb-6'>New This Month</p>
                </div>

                {/* <div className="bg-indigo-100 p-3 rounded-md h-32">
                    <div className='w-10 h-10 bg-indigo-300 rounded-full flex justify-center items-center'>
                        <TbReportAnalytics className='text-1xl text-white' />
                    </div>
                    <p className='text-3xl font-bold pt-3 text-zinc-700'> 450</p>
                    <p className='text-xs text-gray-400 pb-6'>Total Sales</p>
                </div> */}
            </div>

        </div>
    )
}

export default ConsultantPills