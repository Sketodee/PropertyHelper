import React, { useState, useEffect } from 'react';
import { IoSearch } from "react-icons/io5";
import { FaPlus } from "react-icons/fa6";
import { formatDate } from '../../hooks/dateFormatter';
import { useGetAllConsultantGroupMutation, useGetAllConsultantGroupByFilterMutation } from '../../features/consultantGroup/consultantGroupApiSlice';
import { useNavigate } from 'react-router-dom';


const ConsultantGroupList = ({ openModal }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const [totalCount, setTotalCount] = useState(0)
    const [batch, setBatch] = useState(0)
    const [searchQuery, setSearchQuery] = useState('')
    const [consultantGroupData, setConsultantGroupData] = useState([])

    const navigate = useNavigate();

    const handleRowClick = (index) => {
        navigate(`/dashboard/consultantgroup/${index}`);
    };


    const [getAllConsultantGroup] = useGetAllConsultantGroupMutation()
    const [getAllConsultantGroupByFilter] = useGetAllConsultantGroupByFilterMutation()


    const groupPerPage = 10;
    var groupData = consultantGroupData

    const handleSearchChange = (event) => {
        setCurrentPage(1)
        setBatch(0)
        setSearchQuery(event.target.value);
    };

    // Get current customers
    const indexOfLastGroup = currentPage * groupPerPage;
    const indexOfFirstGroup = indexOfLastGroup - groupPerPage;
    const currentGroup = groupData;

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
            const response = await getAllConsultantGroup(credentials).unwrap()
            setConsultantGroupData(response.data.data)
            setTotalCount(response.data.totalCount)
        } catch (error) {
            //    console.log(error)
        }
    };

    const search = async (query, page) => {
        try {
            const credentials = {
                Id: '',
                queryParam: query,
                PageNumber: page
            };
            const response = await getAllConsultantGroupByFilter(credentials).unwrap()
            setConsultantGroupData(response.data.data)
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

    }, [searchQuery, currentPage]);

    //make the first call to return the first page 
    useEffect(() => {
        // fetchData();
        if (searchQuery.trim() === '') {
            fetchData(currentPage);
        } else {
            search(searchQuery, currentPage);
        }
    }, [currentPage])


    return (
        <>
            <div className="overflow-x-auto h-1/2">
                <div className="bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3">
                    <p className='text-customPrimary dark:text-white font-medium text-base '> All Consultant Groups </p>

                    <div className="max-w mx-auto flex justify-between items-center px-2">
                        <label htmlFor="default-search" className="text-sm font-medium text-gray-900 sr-only dark:text-white">Search</label>
                        <div className="relative py-3 w-4/5">
                            <input type="search" id="default-search" value={searchQuery} onChange={handleSearchChange} className="block w-full px-2 py-3 text-sm text-gray-900 border border-gray-300 rounded-lg bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500" placeholder="Search Consultant Groups..." required />
                            <button onClick={search} className="text-white absolute end-1.5 top-3.5 bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-4 py-2 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"><IoSearch className='text-2xl text-white' /></button>
                        </div>
                        <button onClick={openModal} className="bg-blue-700 text-white flex items-center  px-4 py-2 rounded">
                            <FaPlus />
                            <p className='ps-2 hidden sm:block'>Add New Group</p>
                        </button>

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
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 w-1/12">#</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 w-3/12">Name</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 w-3/12">Email</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 1-2/12">Phone</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 w-2/12">Date Joined</th>
                                                <th scope="col" className="px-6 py-4 font-light text-gray-400 w-1/12"></th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                currentGroup.map((group, index) => (
                                                    <tr key={index} 
                                                        className="border-b border-neutral-200 bg-black/[0.02] dark:border-white/10">
                                                        <td className="whitespace-nowrap px-6 py-4 font-medium">{index + indexOfFirstGroup + 1}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{group.name}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{group.email}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{group.phoneNumber}</td>
                                                        <td className="whitespace-nowrap px-6 py-4">{formatDate(group.createdOn)}</td>
                                                        <td className="whitespace-nowrap px-6 py-4"><button onClick={() => handleRowClick(group.id)} className="bg-blue-700 text-white flex items-center  px-4 py-2 rounded">View</button></td>
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

export default ConsultantGroupList