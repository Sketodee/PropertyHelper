import React, { useState } from 'react';

const Register = () => {
    const [formData, setFormData] = useState({
        surname: '',
        firstname: '',
        email: '', 
        password:'', 
        accountDetails: '', 
        bankProvider: '',
        referrerId: '', 
        phoneNumber: ''
    });

    const [errors, setErrors] = useState({
        surname: '',
        firstname: '',
        email: '', 
        password: '', 
        accountDetails: '', 
        bankProvider: '',
        referrerId: '', 
        phoneNumber: ''
    });

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
        if (!formData.surname) {
            newErrors.surname = 'Surname is required';
        }
        if (!formData.firstname) {
            newErrors.firstname = 'First Name is required';
        }
        if (!formData.password) {
            newErrors.password = 'Password is required';
        }
        if (!formData.accountDetails) {
            newErrors.accountDetails = 'Account Details is required';
        } else if (/[^0-9]/.test(formData.accountDetails)) {
            newErrors.accountDetails = 'Account details should contain only digits';
          }
        if (!formData.bankProvider) {
            newErrors.bankProvider = 'Bank Provider is required';
        }
        if (!formData.phoneNumber) {
            newErrors.phoneNumber = 'Phone number is required';
          } else if (/[^0-9]/.test(formData.phoneNumber)) {
            newErrors.phoneNumber = 'Phone number should contain only digits';
          }
        if (!formData.email) {
            newErrors.email = 'Email is required';
        } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
            newErrors.email = 'Email address is invalid';
        }
        return newErrors;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const submittedData = {
                ...formData,
                referrerId: formData.referrerId.trim() === '' ? null : formData.referrerId.trim() //this line checks if referrerId is empty and assign it null before sending to the backend 
              };
            // Process form data
            console.log(submittedData);
            // Reset form
            setFormData({
                surname: '',
                firstname: '',
                email: '', 
                password:'', 
                accountDetails: '', 
                bankProvider: '',
                referrerId: '', 
                phoneNumber: ''
            });
        }
    };

    return (
        <div className=''>
            <h3 className='py-5 text-3xl font-medium text-blue-500  '>Create your Free Account</h3>
            <p className='text-sm text-gray-400 pb-6'> Submit your data for registration</p>
            <form onSubmit={handleSubmit} className="max-w-md">

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/2">
                        <label htmlFor="surname" className="block text-sm text-gray-700">Surname</label>
                        <input
                            type="text"
                            id="surname"
                            name="surname"
                            value={formData.surname}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.surname && <p className="text-red-500 text-xs mt-1">{errors.surname}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/2">
                    <label htmlFor="firstname" className="block text-sm text-gray-700">First Name</label>
                        <input
                            type="text"
                            id="firstname"
                            name="firstname"
                            value={formData.firstname}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
                    </div>
                </div>

                <div className="py-2">
                    <label htmlFor="email" className="block text-sm text-gray-700">Email</label>
                    <input
                        type="email"
                        id="email"
                        name="email"
                        value={formData.email}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.email && <p className="text-red-500 text-xs mt-1">{errors.email}</p>}
                </div>   

                <div className="py-2">
                    <label htmlFor="password" className="block text-sm text-gray-700">Password</label>
                    <input
                        type="password"
                        id="password"
                        name="password"
                        value={formData.password}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.password && <p className="text-red-500 text-xs mt-1">{errors.password}</p>}
                </div>                  

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/2">
                        <label htmlFor="accountDetails" className="block text-sm text-gray-700">Account Number</label>
                        <input
                            type="text"
                            id="accountDetails"
                            name="accountDetails"
                            value={formData.accountDetails}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.accountDetails && <p className="text-red-500 text-xs mt-1">{errors.accountDetails}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/2">
                    <label htmlFor="bankProvider" className="block text-sm text-gray-700">Bank Provider </label>
                        <input
                            type="text"
                            id="bankProvider"
                            name="bankProvider"
                            value={formData.bankProvider}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.bankProvider && <p className="text-red-500 text-xs mt-1">{errors.bankProvider}</p>}
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/2">
                        <label htmlFor="referrerId" className="block text-sm text-gray-700">Referrer Id (Optional)</label>
                        <input
                            type="text"
                            id="referrerId"
                            name="referrerId"
                            value={formData.referrerId}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.referrerId && <p className="text-red-500 text-xs mt-1">{errors.referrerId}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/2">
                    <label htmlFor="phoneNumber" className="block text-sm text-gray-700">Phone Number </label>
                        <input
                            type="tel"
                            id="phoneNumber"
                            name="phoneNumber"
                            value={formData.phoneNumber}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.phoneNumber && <p className="text-red-500 text-xs mt-1">{errors.phoneNumber}</p>}
                    </div>
                </div>

                <div className="py-2 ">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Submit
                    </button>
                </div>
            </form>
        </div>
    );
};

export default Register;
