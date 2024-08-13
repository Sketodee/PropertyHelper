import React, { useState, useEffect} from 'react';
import { IoSearch } from "react-icons/io5";
import { formatDate } from '../../hooks/dateFormatter';
import { useGetMembersOfConsultantGroupMutation } from '../../features/consultantGroup/consultantGroupApiSlice';

const ConsultantGroupMemberList = ({groupId}) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [batch, setBatch] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [consultantData, setConsultantData] = useState([])

    const [getMembers] = useGetMembersOfConsultantGroupMutation()


    const customersPerPage = 10;
    var customerData = consultantData

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
                groupId: groupId, 
                PageNumber: page //initialize the first page loading 
            };
            const response = await getMembers(credentials).unwrap()
            setConsultantData(response.data.data)
            setTotalCount(response.data.totalCount)
        } catch (error) {
        //    console.log(error)
        } 
    };

    //make the first call to return the first page 
    useEffect(() => {
        // fetchData();
        fetchData(currentPage);
    }, [currentPage]) 
    

    return (
        <>
            <div className="overflow-x-auto h-1/2">
                <div className="bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3">
                    <p className='text-customPrimary dark:text-white font-medium text-base '> Group Members </p>

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
                            <button disabled={totalCount < (index + (10 * batch)) * 10} key={index} onClick={() => paginate(index + 1 + (10 * batch))}
                                className={`leading-none cursor-pointer pt-3 mr-0 sm:mr-4 px-1 sm:px-0
                                ${currentPage === index + 1 + (10 * batch) ? 'dark:text-gray-200 text-gray-700 font-bold' : 'dark:text-gray-400 text-gray-500 font-light'}
                                      ${totalCount < (index + (10 * batch)) * 10 ? 'dark:text-gray-600 text-gray-300 text-sm' : ' '}
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
}

export default ConsultantGroupMemberList