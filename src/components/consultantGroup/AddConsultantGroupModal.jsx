import React, { useState, useEffect } from 'react'
import Modal from '../product/Modal'
import { IoIosClose } from "react-icons/io";
import { useGetAllConsultantByFilterMutation } from '../../features/consultant/consultantApiSlice'
import { useCreateConsultantGroupMutation } from '../../features/consultantGroup/consultantGroupApiSlice';
import { useGetAllAdminsMutation } from '../../features/auth/authApiSlice';

const AddConsultantGroupModal = ({ isOpen, closeModal }) => {
  const [searchQuery, setSearchQuery] = useState("")
  const [fetchedMembers, setFetchedMembers] = useState([])
  const [selectedMembers, setSelectedMembers] = useState([])
  const [adminMembers, setAdminMembers] = useState([])

  const [getAllConsultantByFilter] = useGetAllConsultantByFilterMutation()
  const [createConsultantGroup] = useCreateConsultantGroupMutation()
  const [getAllAdmins] = useGetAllAdminsMutation()

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    accountName: '',
    bankProvider: '',
    accountDetails: '',
    referrerId: '',
    phoneNumber: '',
    accountManagerId: '',
    description: '',
  });

  const [errors, setErrors] = useState({
    name: '',
    email: '',
    accountName: '',
    bankProvider: '',
    accountDetails: '',
    membersId: '',
    referrerId: '',
    phoneNumber: '',
    accountManagerId: '',
    description: '',
  });

  const handleQueryChange = (e) => {
    setSearchQuery(e.target.value)
  }

  const handleSelectedMembers = (item) => {
    if (!selectedMembers.some(member => member.id === item.id)) {
      setSelectedMembers((prevMembers) => [
        ...prevMembers,
        { name: item.fullName, id: item.id }
      ]);
    }
    setErrors({ ...errors, membersId: '' });
  };

  const isMemberSelected = (id) => {
    return selectedMembers.some(member => member.id === id);
  };


  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    setErrors({
      ...errors,
      [name]: ''
    });
  };

  const clearFormData = (data) => {
    const resetData = {};
    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        resetData[key] = '';
      }
    }
    setSelectedMembers([])
    setFetchedMembers([])
    setAdminMembers([])
    return resetData;
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Email address is invalid';
    }
    if (!formData.accountName) {
      newErrors.accountName = 'Account Name is required'
    }
    if (!formData.bankProvider) {
      newErrors.bankProvider = 'Bank Provider is required'
    }
    if (!formData.accountDetails) {
      newErrors.accountDetails = 'Account Details is required'
    }
    if (!formData.phoneNumber) {
      newErrors.phoneNumber = 'Phone number is required'
    } else if (!/^\d+$/.test(formData.phoneNumber)) {
      newErrors.phoneNumber = 'Phone number is invalid';
    }
    if (!formData.accountManagerId) {
      newErrors.accountManagerId = 'Account manager ID is required';
    }
    if (!formData.description) {
      newErrors.description = 'Description is required';
    }
    if (selectedMembers.length === 0) {
      newErrors.membersId = 'No members selected'
    }

    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      const submittedData = {
        ...formData,
        membersId: selectedMembers.map(obj => obj.id), 
        referrerId: formData.referrerId || null
    };
    try {
      const newGroupData = await createConsultantGroup(submittedData).unwrap();
      if (newGroupData) {
        const updatedData = clearFormData(formData)
        setFormData(updatedData)
      }
      closeModal()
  } catch (error) {
      console.log("add product failed");
  }
    }
  }

  const search = async (query) => {
    try {
      const credentials = {
        queryParam: query,
        PageNumber: 1
      };
      const response = await getAllConsultantByFilter(credentials).unwrap()
      setFetchedMembers(response.data.data)
      // setTotalCount(response.data.totalCount)
    } catch (error) {
      //    console.log(error)
    }
  }

  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      if (searchQuery) {
        // console.log(searchQuery)
        search(searchQuery)
      } else {
        setFetchedMembers([])
      }
    }, 2000);

    return () => clearTimeout(delayDebounceFn);

  }, [searchQuery]);

  const fetchAdmins = async () => {
    try {
      const response = await getAllAdmins().unwrap()
      setAdminMembers(response.data.data)
    } catch (error) {
      console.log(error)
    }
  }


  return (
    <Modal isOpen={isOpen} onClose={closeModal}>
      <h2 className="text-xl font-medium py-2">Add Consultant Group</h2>
      <hr className="pb-2" />

      <form onSubmit={handleSubmit}>

        <div className="flex justify-between">
          <div className="py-2 pe-2 basis-1/2">
            <label htmlFor="name" className="block text-sm text-gray-700 dark:text-gray-300">Name</label>
            <input
              type="text"
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
          </div>

          <div className="py-2 ps-2 basis-1/2">
            <label htmlFor="email" className="block text-sm text-gray-700 dark:text-gray-300"> Email</label>
            <input
              type="text"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
          </div>
        </div>

        <div className="flex justify-between">
          <div className="py-2 pe-2 basis-1/2">
            <label htmlFor="accountName" className="block text-sm text-gray-700 dark:text-gray-300">Account Name</label>
            <input
              type="text"
              id="accountName"
              name="accountName"
              value={formData.accountName}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.accountName && <p className="text-red-500 text-xs mt-1">{errors.accountName}</p>}
          </div>

          <div className="py-2 ps-2 basis-1/2">
            <label htmlFor="bankProvider" className="block text-sm text-gray-700 dark:text-gray-300"> Bank Provider</label>
            <input
              type="text"
              id="bankProvider"
              name="bankProvider"
              value={formData.bankProvider}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.bankProvider && <p className="text-red-500 text-xs mt-1">{errors.bankProvider}</p>}
          </div>


        </div>

        <div className="flex justify-between">
          <div className="py-2 pe-2 basis-1/2">
            <label htmlFor="accountDetails" className="block text-sm text-gray-700 dark:text-gray-300">Account Details</label>
            <input
              type="text"
              id="accountDetails"
              name="accountDetails"
              value={formData.accountDetails}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.accountDetails && <p className="text-red-500 text-xs mt-1">{errors.accountDetails}</p>}
          </div>

          <div className="py-2 ps-2 basis-1/2">
            <label htmlFor="referrerId" className="block text-sm text-gray-700 dark:text-gray-300"> Referrer Id (Optional) </label>
            <input
              type="text"
              id="referrerId"
              name="referrerId"
              value={formData.referrerId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.referrerId && <p className="text-red-500 text-xs mt-1">{errors.referrerId}</p>}
          </div>
        </div>


        <div className="flex justify-between">
          <div className="py-2 pe-2 basis-1/2">
            <label htmlFor="phoneNumber" className="block text-sm text-gray-700 dark:text-gray-300"> Phone Number </label>
            <input
              type="text"
              id="phoneNumber"
              name="phoneNumber"
              value={formData.phoneNumber}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
            {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
          </div>

          <div className="py-2 ps-2 basis-1/2">
            <label htmlFor="accountManagerId" className="block text-sm text-gray-700 dark:text-gray-300"> Account Manager </label>
            <select
              // type="text"
              id="accountManagerId"
              name="accountManagerId"
              value={formData.accountManagerId}
              onClick={fetchAdmins}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            > 
            <option value="" disabled>Select a user</option>
            {adminMembers.length > 0 && adminMembers.map(option => (
            <option key={option.id} value={option.id}>{option.fullName}</option>
          ))}
            </select>
            {errors.accountManagerId && <p className="text-red-500 text-xs mt-1">{errors.accountManagerId}</p>}
          </div>
        </div>

        <div className="py-2">
          <label htmlFor="membersId" className="block text-sm text-gray-700 dark:text-gray-300"> Members </label>
          <input
            placeholder='Search for members ...'
            type="text"
            id="membersId"
            name="membersId"
            value={formData.membersId}
            onChange={handleQueryChange}
            className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          />
          {errors.membersId && <p className="text-red-500 text-xs mt-1">{errors.membersId}</p>}

          {selectedMembers.length > 0 && (
            <div className='flex flex-wrap py-2'>
              {selectedMembers.map((member, index) => (
                <div key={index} className='flex items-center bg-sky-400 text-white me-2 px-3 py-2 rounded-full'>
                  <p className='' >{member.name} </p>
                  <IoIosClose className='text-2xl' />
                </div>
              ))}
            </div>
          )}

          {fetchedMembers.length > 0 && (
            <ul className="dropdown dark:bg-gray-700 dark:border-gray-600 dark:text-white bg-white border border-gray-300 rounded-md mt-2 p-2 max-h-48 overflow-y-auto">
              {fetchedMembers.map((item, index) => (
                <option key={index} onClick={() => handleSelectedMembers(item)}
                  className={`p-2 cursor-pointer text-sm font-light ${isMemberSelected(item.id) ? 'text-red-600 cursor-not-allowed' : 'hover:bg-gray-200 hover:bg-gray-500'}`}>
                  {item.fullName}
                </option>
              ))}
            </ul>
          )}

        </div>

        <div className="py-2">
          <label htmlFor="description" className="block text-sm text-gray-700 dark:text-gray-300">Description</label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleChange}
            className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
          />
          {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
        </div>


        <div className="flex justify-end">
          <button type="submit" className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none">
            Submit
          </button>
        </div>
      </form>
    </Modal>
  )
}

export default AddConsultantGroupModal