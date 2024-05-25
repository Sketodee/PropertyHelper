import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { useDispatch } from 'react-redux';
import { setCredentials } from '../../features/auth/authSlice';
import { useLoginMutation } from '../../features/auth/authApiSlice';

import usePersist from '../../hooks/usePersist'



const Login = () => {

    const navigate = useNavigate()
    const dispatch = useDispatch()

    const [login, { isLoading }] = useLoginMutation()
    const [persist, setPersist] = usePersist()

    const [formData, setFormData] = useState({
        email: '',
        password: '',
    });


    const [errors, setErrors] = useState({
        email: '',
        password: '',
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
        if (!formData.password) {
            newErrors.password = 'Password is required';
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
            try {
                const userData = await login(formData).unwrap()
                dispatch(setCredentials({ ...userData, user: userData.data.user, accessToken: userData.data.token }))
                setFormData({
                    email: '',
                    password: '',
                });
                navigate('/dashboard')
            } catch (error) {
                console.log("Login failed")
            }
        }
    };

    const handleToggle = () => setPersist(prev => !prev)

    return (
        <div className=''>
            <h3 className='py-5 text-3xl font-medium text-blue-500  '>Welcome back!</h3>
            <p className='text-sm text-gray-400 pb-6'> Sign in your account</p>
            <form onSubmit={handleSubmit} className="max-w-md">

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

                <div className="relative flex gap-x-3">
                    <div className="flex h-6 items-center">
                        <input onChange={handleToggle} checked={persist} id="persist" name="persist" type="checkbox" className="h-4 w-4 rounded border-gray-300 text-indigo-600 focus:ring-indigo-600" />
                    </div>
                    <div className="text-sm leading-6">
                        <label htmlFor="persist" className="font-sm text-gray-500">Remember Me</label>
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

export default Login;
