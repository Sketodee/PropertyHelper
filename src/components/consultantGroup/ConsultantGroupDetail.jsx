import React, { useState, useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { useGetAllConsultantGroupByFilterMutation } from '../../features/consultantGroup/consultantGroupApiSlice';
import { formatDate } from '../../hooks/dateFormatter';
import ConsultantGroupMemberList from './ConsultantGroupMemberList';

const ConsultantGroupDetail = () => {
    let { Id } = useParams();
    const [groupData, setGroupData] = useState([])
    const [loading, setLoading] = useState(true);
    const [getAllConsultantGroupByFilter] = useGetAllConsultantGroupByFilterMutation()

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const credentials = {
                    Id: Id,
                    queryParam: '',
                    PageNumber: 1
                };
                const data = await getAllConsultantGroupByFilter(credentials).unwrap()
                // console.log(data.data.data[0])
                setGroupData(data.data.data[0])
                setLoading(false)
            } catch (error) {
                console.log(error)
                setLoading(false)
            }
        }

        fetchProduct()
    }, [])

    if (loading) {
        return <p>Loading...</p>;
    }

    return (
        <div>
            <div className='dark:text-white bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3'>
                <div className="flex font-light justify-between items-center leading-loose">
                    <div>
                        <p className='text-2xl '>{groupData?.name?.toUpperCase()}</p>
                        <p>{groupData?.code?.toUpperCase()}</p>
                        <p className=''>ACCOUNT MANAGER : <span className='text-sm'>{groupData.accountManagerName}</span></p>
                    </div>
                    <div className='border-l border-gray-400 ps-3'>
                        <p className=''>ACCOUNT NAME : <span className='text-sm'>{groupData.accountName}</span></p>
                        <p className=''>BANK PROVIDER : <span className='text-sm'>{groupData.bankProvider}</span></p>
                        <p className=''>ACCOUNT DETAILS : <span className='text-sm'>{groupData.accountDetails}</span></p>
                    </div>
                    <div className='border-l border-gray-400 ps-3'>
                        <p className=''>EMAIL : <span className='text-sm'>{groupData.email}</span></p>
                        <p className=''>PHONE : <span className='text-sm'>{groupData.phoneNumber}</span></p>
                        <p className=''> DATE CREATED : <span className='text-sm'>{formatDate(groupData.createdOn)}</span></p>
                    </div>
                </div>
            </div>

            <div className='dark:text-white bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6 px-3'>
                <ConsultantGroupMemberList groupId={Id}/>
            </div>
        </div>

    )
}

export default ConsultantGroupDetail