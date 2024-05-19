import React, { useState } from 'react';
import dummydata from '../consultant/dumydata';

const ClientList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [batch, setBatch] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')


    const customersPerPage = 10;
    const customerData = dummydata.slice(0, 143)
    
    const handleSearchChange = (event) => {
        setCurrentPage(1)
        setBatch(0)
        setSearchQuery(event.target.value);
    };

    const filteredConsultants = customerData.filter(consultant =>
        consultant.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    const totalCount = filteredConsultants.length


    // Get current customers
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    // const currentCustomers = customerData.slice(indexOfFirstCustomer, indexOfLastCustomer);
    const currentCustomers = filteredConsultants.slice(indexOfFirstCustomer, indexOfLastCustomer);

    // Change page
    const paginate = (pageNumber) =>{
        setCurrentPage(pageNumber);
        // console.log(totalCount < (pageNumber - 1) * 10 )
    } 
    const next = () => {
        // setCurrentPage(prev => prev + 1)
        if (totalCount > ((batch + 1) * 100)) {
            setBatch(prev => prev + 1)
            setCurrentPage(((batch + 1) * 10) + 1)
        }
    }
    const previous = () => {
        if (batch * 10 >= 10) {
            setBatch(prev => prev - 1)
            setCurrentPage(((batch - 1) * 10) + 1)
        }
    }

    return (
        <>
            <div className="overflow-x-auto">

                <div className="bg-white py-3 rounded-md shadow mb-6 px-3">
                    <p className='text-customPrimary font-medium text-base '> All Clients </p>

                    <form className="max-w mx-auto">
                        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative py-3">
                            <input type="search" id="default-search" value={searchQuery} onChange={handleSearchChange} className="block w-full px-2 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Clients..." required />
                        </div>
                    </form>
                    
                    <div className="flex flex-col">
                        <div className="overflow-x-auto sm:-mx-6 lg:-mx-8">
                            <div className="inline-block min-w-full py-2 sm:px-6 lg:px-8">
                                <div className="overflow-hidden">
                                    <table
                                        className="min-w-full text-left text-sm font-light text-surface dark:text-white">
                                        <thead
                                            className="border-b border-neutral-200 ">
                                            <tr>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400">#</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400">Name</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400">Email</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400">Active</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentCustomers.map((customer, index) => (
                                                    <tr
                                                        className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + indexOfFirstCustomer + 1}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{customer.name}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{customer.email}</td>
                                                    </tr>
                                                ))
                                            }
                                        </tbody>
                                    </table>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>



            <div className="flex items-center justify-center py-4 px-1">
                <div className="w-full sm:w-3/5 flex items-center justify-between">
                    <div onClick={previous} className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                        <p className="text-sm sm:text-xs ml-3 font-light leading-none ">Prev</p>
                    </div>
                    <div className="flex">
                        {[...Array(10)].map((_, index) => (
                            <button disabled={totalCount < ( index + (10 * batch)) * 10}  key={index} onClick={() => paginate(index + 1 + (10 * batch))}
                                className={`leading-none cursor-pointer pt-3 mr-0 sm:mr-4 px-1 sm:px-0
                                ${currentPage === index + 1 + (10 * batch) ? ' text-customPrimary text:xs sm:text-base font-bold sm:font-bold' : 'text-xs sm:text-sm font-light'}
                                ${totalCount < ( index + (10 * batch)) * 10 ? 'text-gray-400' : ' hover:text-customPrimary hover:font-bold '}
                                `}>
                                {index + 1 + (10 * batch)}
                            </button>
                        ))}
                    </div>
                    <div onClick={next} className="flex items-center pt-3 text-gray-600 hover:text-indigo-700 cursor-pointer">
                        <p className="text-sm font-light leading-none mr-3">Next</p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ClientList;