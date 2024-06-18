import { useState } from "react";
import Modal from "./Modal"
import { uploadCloudinary } from "../../app/upload";

const AddProductModal = ({ isOpen, closeModal }) => {
    const [imageUrls, setImageUrls] = useState([])
    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: ''
    });

    const [errors, setErrors] = useState({
        name: '',
        location: '',
        images: '',
        description: ''
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
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.location) {
            newErrors.location = 'Location is required';
        }
        if (!formData.description) {
            newErrors.description = "Description is required"
        }
        if (imageUrls.length == 0) {
            newErrors.images = "Please select at least one image"
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

    const clearAllKeys = (arr) => {
        return arr.map(item => {
            const newItem = {};
            for (const key in item) {
                if (item.hasOwnProperty(key)) {
                    newItem[key] = '';
                }
            }
            return newItem;
        });
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
            const updatedFormData = clearAllKeys(formData);
            setFormData(updatedFormData);
            // setFormData({
            //     name: '',
            //     location: '', 
            //     description: ''
            // });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h2 className="text-xl font-bold py-2">Add Product</h2>
            <hr className="pb-2" />

            <form onSubmit={handleSubmit} >

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/2">
                        <label htmlFor="name" className="block text-sm text-gray-700">Name</label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            value={formData.name}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.name && <p className="text-red-500 text-xs mt-1">{errors.name}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/2">
                        <label htmlFor="location" className="block text-sm text-gray-700">Location</label>
                        <input
                            type="text"
                            id="location"
                            name="location"
                            value={formData.location}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.location && <p className="text-red-500 text-xs mt-1">{errors.location}</p>}
                    </div>
                </div>

                <div className='flex justify-between'>
                    <div className="py-2 pe-2 basis-1/4">
                        <label htmlFor="price" className="block text-sm text-gray-700">Price</label>
                        <input
                            type="text"
                            id="price"
                            name="price"
                            value={formData.price}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.price && <p className="text-red-500 text-xs mt-1">{errors.price}</p>}
                    </div>

                    <div className="py-2 pe-2 basis-1/4">
                        <label htmlFor="survey" className="block text-sm text-gray-700">Survey</label>
                        <input
                            type="text"
                            id="survey"
                            name="survey"
                            value={formData.survey}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.survey && <p className="text-red-500 text-xs mt-1">{errors.survey}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/4">
                        <label htmlFor="development" className="block text-sm text-gray-700">Development</label>
                        <input
                            type="text"
                            id="development"
                            name="development"
                            value={formData.development}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                        />
                        {errors.development && <p className="text-red-500 text-xs mt-1">{errors.development}</p>}
                    </div>

                    <div className="py-2 ps-2 basis-1/4">
                        <label htmlFor="unit" className="block text-sm text-gray-700">Unit</label>
                        <select
                            id="unit"
                            name="unit"
                            value={formData.unit}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-blue-300 rounded-md"
                        >
                            {/* <option value="">Select gender</option> */}
                            <option  value="0">SquareMeter</option>
                            <option value="1">Plot</option>
                        </select>
                        {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                    </div>
                </div>

                <div className="py-2">
                    <label htmlFor="description" className="block text-sm text-gray-700">Description</label>
                    <textarea
                        rows={5}
                        type="text"
                        id="description"
                        name="description"
                        value={formData.description}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md"
                    />
                    {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description}</p>}
                </div>

                <div className="py-2 ">
                    <label htmlFor="images" className="block text-sm text-gray-700">Images</label>
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
                        className="mt-1 block w-full px-3 border border-gray-300 rounded-sm file:bg-blue-100 file:text-blue-700 file:rounded-full file:border-0 file:py-2 file:px-4 hover:file:bg-blue-200"
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