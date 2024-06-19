import { useState } from "react";
import Modal from "./Modal"
import { uploadCloudinary } from "../../app/upload";

const AddProductModal = ({ isOpen, closeModal }) => {
    const [imageUrls, setImageUrls] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        size: '',
        isAvailable: "true", //set default value to Yes
        pricing: {
            price: '',
            survey: '',
            development: '',
            unit: '0' //set the default value to squaremeter
        }
    });

    const [errors, setErrors] = useState({
        name: '',
        location: '',
        images: '',
        description: '',
        size: '',
        isAvailable: '',
        pricing: {
            price: '',
            survey: '',
            development: '',
            unit: ''
        }
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, subField] = name.split('.');
        if (subField) {
            setFormData(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subField]: value
                }
            }));
            setErrors(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subField]: ''
                }
            }))
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
            setErrors(prevState => ({
                ...prevState,
                [name]: ''
            }))
        }
        // setFormData({
        //     ...formData,
        //     [name]: value
        // });
        // setErrors({
        //     ...errors,
        //     [name]: ''
        // });
    };

    const validate = () => {
        const newErrors = {};
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.location) {
            newErrors.location = 'Location is required';
        }
        if (!formData.description) {
            newErrors.description = "Description is required"
        }
        if (!formData.isAvailable) {
            newErrors.isAvailable = "Required"
        }
        if (imageUrls.length == 0) {
            newErrors.images = "Please select at least one image"
        }
        if (!formData.size) {
            newErrors.size = 'Size is required';
        } else if (/[^0-9]/.test(formData.size)) {
            newErrors.size = 'Field should contain only digits';
        }
        if (!formData.pricing.survey) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.survey = 'Survey pricing is required';
        } else if (/[^0-9]/.test(formData.pricing.survey)) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.survey = 'Field should contain only digits';
        }
        if (!formData.pricing.price) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.price = 'Price is required';
        } else if (/[^0-9]/.test(formData.pricing.price)) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.price = 'Field should contain only digits';
        }
        if (!formData.pricing.unit) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.unit = 'Unit is required';
        }
        if (!formData.pricing.development) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.development = 'Development pricing is required';
        } else if (/[^0-9]/.test(formData.pricing.development)) {
            newErrors.pricing = newErrors.pricing || {};
            newErrors.pricing.development = 'Field should contain only digits';
        }
        console.log(newErrors)
        return newErrors;
    };

    const uploadImages = async (selectedFiles) => {
        let arr = []
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles?.length; i++) {
                const data = await uploadCloudinary(selectedFiles[i]);
                arr.push(data);
            }
        }
        return arr
    }

    const handleFileChange = async (selectedFiles) => {
        setErrors({ ...errors, images: '' });
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                if (!validImageTypes.includes(selectedFiles[i].type)) {
                    setErrors({ ...errors, images: 'Please select valid image files (jpeg, png, gif).' });
                    return;
                }
                if (selectedFiles[i].size > maxSize) {
                    setErrors({ ...errors, images: 'File size must be less than 2MB.' });
                    return;
                }
            }
        }
        // if(selectedFiles) {
        //     const uploadUrls = await uploadImages(selectedFiles)
        //     setImageUrls(uploadUrls)
        // } 
        else {
            setErrors({ ...errors, images: 'Please select at least one image' });
        }
    }

    const clearFormData = (data) => {
        const newData = {};
    
        Object.keys(data).forEach(key => {
            if (typeof data[key] === 'object' && data[key] !== null) {
                newData[key] = clearFormData(data[key]); // Recursively clear nested objects
            } else {
                newData[key] = ''; // Set to empty string
            }
        });
    
        return newData;
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length > 0) {
            setErrors(validationErrors);
        } else {
            const submittedData = {
                ...formData, images: imageUrls
            };
            // Process form data
            console.log(submittedData);
            // Reset form
            const updatedFormData = clearFormData(formData);
            setFormData(updatedFormData);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h2 className="text-xl font-medium py-2">Add Product</h2>
            <hr className="pb-2" />

            <form onSubmit={handleSubmit} >

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/2">
                        <label htmlFor="name" className="block text-sm  text-gray-700 dark:text-gray-300">Name</label>
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
                        <label htmlFor="location" className="block text-sm text-gray-700 dark:text-gray-300">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                           className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/3">
                        <label htmlFor="price" className="block text-sm text-gray-700 dark:text-gray-300">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="pricing.price"
                            value={formData.pricing.price}
                            onChange={handleChange}
                           className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                        {errors.pricing?.price && <p className="text-red-500 text-xs mt-1">{errors.pricing?.price}</p>}
                    </div>

                    <div className="py-2 pe-2 basis-1/3">
                        <label htmlFor="survey" className="block text-sm text-gray-700 dark:text-gray-300">Survey</label>
                        <input
                            type="text"
                            id="survey"
                            name="pricing.survey"
                            value={formData.pricing.survey}
                            onChange={handleChange}
                           className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                        {errors.pricing?.survey && <p className="text-red-500 text-xs mt-1">{errors.pricing?.survey}</p>}
                    </div>

                    <div className="py-2 basis-1/3">
                        <label htmlFor="development" className="block text-sm text-gray-700 dark:text-gray-300">Development</label>
                        <input
                            type="text"
                            id="development"
                            name="pricing.development"
                            value={formData.pricing.development}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                        {errors.pricing?.development && <p className="text-red-500 text-xs mt-1">{errors.pricing?.development}</p>}
                    </div>
                </div>

                <div className="flex justify-between">
                    <div className="py-2 ps-2 basis-1/3">
                        <label htmlFor="size" className="block text-sm text-gray-700 dark:text-gray-300">Size</label>
                        <input
                            type="text"
                            id="size"
                            name="size"
                            value={formData.size}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        />
                        {errors.size && <p className="text-red-500 text-xs mt-1">{errors.size}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/3">
                        <label htmlFor="unit" className="block text-sm text-gray-700 dark:text-gray-300">Unit</label>
                        <select
                            id="unit"
                            name="pricing.unit"
                            value={formData.pricing.unit}
                            onChange={handleChange}
                           className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        >
                            {/* <option value="">Select gender</option> */}
                            <option value="0">SquareMeter</option>
                            <option value="1">Plot</option>
                        </select>
                        {errors.pricing?.unit && <p className="text-red-500 text-xs mt-1">{errors.pricing?.unit}</p>}
                    </div>

                    <div className="py-2 ps-6 basis-1/3">
                        <label className="block text-sm text-gray-700 dark:text-gray-300">isAvailable</label>
                        <div className="mt-3">
                            <label className="inline-flex items-center">
                                <input
                                    type="radio"
                                    name="isAvailable"
                                    value="true"
                                    checked={formData.isAvailable === 'true'}
                                    onChange={handleChange}
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2">Yes</span>
                            </label>
                            <label className="inline-flex items-center ml-6">
                                <input
                                    type="radio"
                                    name="isAvailable"
                                    value="false"
                                    checked={formData.isAvailable === 'false'}
                                    onChange={handleChange}
                                    className="form-radio text-blue-500"
                                />
                                <span className="ml-2">No</span>
                            </label>
                        </div>
                        {errors.isAvailable && <p className="text-red-500 text-xs mt-1">{errors.isAvailable}</p>}
                    </div>
                </div>

                <div className="py-2">
                    <label htmlFor="description" className="block text-sm text-gray-700 dark:text-gray-300">Description</label>
                    <textarea
                        rows={5}
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="py-2 ">
                    <label htmlFor="images" className="block text-sm text-gray-700 dark:text-gray-300">Images</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        value={formData.images}
                        onChange={async (event) => {
                            const selectedFiles = event.currentTarget.files
                            await handleFileChange(selectedFiles)
                        }}
                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:file:bg-gray-300 file:bg-blue-100 file:text-blue-700 file:rounded-full file:border-0 file:py-2 file:px-4 
                        hover:file:bg-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    />
                    {errors.images && <p className="text-red-500 text-xs mt-1">{errors.images}</p>}
                </div>

                <div className="py-2 ">
                    <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded-md">
                        Submit
                    </button>
                </div>
            </form>


            {/* <button onClick={closeModal} className="bg-red-500 text-white px-4 py-2 rounded">
                Close Modal
            </button> */}
        </Modal>
    )
}

export default AddProductModal