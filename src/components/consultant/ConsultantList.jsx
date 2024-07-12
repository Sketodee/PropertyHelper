import React, { useState, useEffect} from 'react';
import { IoSearch } from "react-icons/io5";
import { formatDate } from '../../hooks/dateFormatter';
import { useGetAllConsultantMutation, useGetAllConsultantByFilterMutation } from '../../features/consultant/consultantApiSlice';

const ConsultantList = () => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [batch, setBatch] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [consultantData, setConsultantData] = useState([])

    const [getAllConsultant] = useGetAllConsultantMutation()
    const [getAllConsultantByFilter] = useGetAllConsultantByFilterMutation()


    const customersPerPage = 10;
    var customerData = consultantData

    const handleSearchChange = (event) => {
        setCurrentPage(1)
        setBatch(0)
        setSearchQuery(event.target.value);
    };

    // Get current customers
    const indexOfLastCustomer = currentPage * customersPerPage;
    const indexOfFirstCustomer = indexOfLastCustomer - customersPerPage;
    const currentCustomers = customerData;

    // Change page
    const paginate = async (pageNumber) => {
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

    const fetchData = async (page) => {
        try {
            const credentials = {
                PageNumber: page //initialize the first page loading 
            };
            const response = await getAllConsultant(credentials).unwrap()
            setConsultantData(response.data.data)
            setTotalCount(response.data.totalCount)
        } catch (error) {
        //    console.log(error)
        } 
    };

    const search = async (query, page) => {
        try {
            const credentials = {
                queryParam: query,
                PageNumber: page
            };
            const response = await getAllConsultantByFilter(credentials).unwrap()
            setConsultantData(response.data.data)
            setTotalCount(response.data.totalCount)
        } catch (error) {
        //    console.log(error)
        } 
    }

    useEffect(() => {
        const delayDebounceFn = setTimeout(() => {
            if (searchQuery.trim() === '') {
                fetchData(currentPage)
            } else {
                search(searchQuery, currentPage);
            }
        }, 2000);

        return () => clearTimeout(delayDebounceFn);

    }, [searchQuery,currentPage]);

    //make the first call to return the first page 
    useEffect(() => {
        // fetchData();
        if (searchQuery.trim() === '') {
            fetchData(currentPage);
        } else {
            search(searchQuery,currentPage);
        }
    }, [currentPage]) 
    

    return (
        <>
            <div className="overflow-x-auto h-1/2">
                <div className="bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3">
                    <p className='text-customPrimary dark:text-white font-medium text-base '> All Consultants </p>

                    <div className="max-w mx-auto">
                        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative py-3">
                            <input type="search" id="default-search" value={searchQuery} onChange={handleSearchChange} className="block w-full px-2 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Consultants..." required />
                            <button onClick={search} className="text-white absolute end-1.5 top-3.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoSearch className='text-2xl text-white' /></button>
                        </div>
                        
                    </div>

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
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400">Phone</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400">Date Joined</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentCustomers.map((customer, index) => (
                                                    <tr key={index}
                                                        className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + indexOfFirstCustomer + 1}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{customer.surname} {customer.firstName}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{customer.email}</td>
                                                        <td className="whitespace-nowrap px-6 py-4 "><span className={`px-6 py-2 rounded-full text-white ${customer.isActive ? 'bg-green-500' : 'bg-red-500'}`}> {customer.isActive ? "Active" : "Inactive"}</span></td>
                                                        <td className="whitespace-nowrap px-6 py-4">{customer.phoneNumber}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{formatDate(customer.createdOn)}</td>
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
                    <div onClick={previous} className="flex items-center pt-3 text-gray-600 dark:text-gray-300 hover:text-indigo-700 cursor-pointer">
                        <p className="text-sm sm:text-xs ml-3 font-light leading-none ">Prev</p>
                    </div>
                    <div className="flex">
                        {[...Array(10)].map((_, index) => (
                            <button disabled={totalCount -1 < (index + (10 * batch)) * 10} key={index} onClick={() => paginate(index + 1 + (10 * batch))}
                                className={`leading-none cursor-pointer pt-3 mr-0 sm:mr-4 px-1 sm:px-0
                                ${currentPage === index + 1 + (10 * batch) ? 'dark:text-gray-200 text-gray-700 font-bold' : 'dark:text-gray-400 text-gray-500 font-light'}
                                      ${totalCount -1 < (index + (10 * batch)) * 10 ? 'dark:text-gray-600 text-gray-300 text-sm' : ' '}
                                `}>
                                {index + 1 + (10 * batch)}
                            </button>
                        ))}
                    </div>
                    <div onClick={next} className="flex items-center pt-3 text-gray-600 dark:text-gray-300 hover:text-indigo-700 cursor-pointer">
                        <p className="text-sm font-light leading-none mr-3">Next</p>

                    </div>
                </div>
            </div>
        </>
    );
};

export default ConsultantList;