import React, { useState, useEffect } from 'react'
import Modal from '../product/Modal'
import { useGetAllConsultantByFilterMutation } from '../../features/consultant/consultantApiSlice'

const AddConsultantGroupModal = ({ isOpen, closeModal }) => {
const [searchQuery, setSearchQuery] = useState("")
const [fetchedMembers, setFetchedMembers] = useState([])
const [getAllConsultantByFilter] = useGetAllConsultantByFilterMutation()

  const [formData, setFormData] = useState({
    name: '',
    email: '', 
    accountName: '',
    bankProvider: '', 
    accountDetails:'', 
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
    accountDetails:'', 
    referrerId: '',
    phoneNumber: '', 
    accountManagerId: '', 
    description: '', 
  });

const handleQueryChange = (e) => {
  setSearchQuery(e.target.value)
  console.log(searchQuery)
}

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

  const validate = () => {
    const newErrors = {};
    if (!formData.name) {
      newErrors.name = 'Name is required';
    }
    if (!formData.email) {
      newErrors.email = 'Email is required';
    }
    return newErrors;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
    } else {
      console.log(formData.membersId)
    }
  }

  const search = async (query) => {
    try {
        const credentials = {
            queryParam: query,
            PageNumber: 1
        };
        const response = await getAllConsultantByFilter(credentials).unwrap()
        console.log(response.data.data)
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
            <input
              type="text"
              id="accountManagerId"
              name="accountManagerId"
              value={formData.accountManagerId}
              onChange={handleChange}
              className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
            />
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
          {fetchedMembers.length > 0 && (
               <ul className="dropdown bg-white border border-gray-300 rounded-md mt-2 p-2 max-h-48 overflow-y-auto">
               {fetchedMembers.map((item, index) => (
                <li key={index} className="p-2 hover:bg-gray-100 cursor-pointer">
                  {item.fullName}
                </li>
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