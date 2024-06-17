import { useState } from "react";
import Modal from "./Modal"
import { uploadCloudinary } from "../../app/upload";

const AddProductModal = ({ isOpen, closeModal }) => {
    const [imageUrls, setImageUrls] = useState([])
    const [formData, setFormData] = useState({
        surname: '',
        firstname: '', 
    });

    const [errors, setErrors] = useState({
        surname: '',
        firstname: '', 
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
        return newErrors;
    };

    const uploadImages = async (selectedFiles) => {
        let arr = []
        if(selectedFiles) {
            for (let i = 0; i < selectedFiles?.length; i++) {
                const data = await uploadCloudinary(selectedFiles[i]);
                arr.push(data);
            }
        }
        return arr
    }

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
            setFormData({
                surname: '',
                firstname: '', 
            });
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h2 className="text-xl font-bold py-2">Add Product</h2>
            <hr />

            <form onSubmit={handleSubmit} >

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

                <div className="py-2 ">
                    <label htmlFor="images" className="block text-sm text-gray-700">Images</label>
                    <input
                        type="file"
                        id="images"
                        name="images"
                        multiple
                        value={formData.images}
                        onChange={async(event)=> {
                            const selectedFiles = event.currentTarget.files
                            if(selectedFiles) {
                                const uploadUrls = await uploadImages(selectedFiles)
                                setImageUrls(uploadUrls)
                                console.log(uploadUrls)
                            }
                        }}
                        className="mt-1 block w-full px-3 border border-gray-300 rounded-sm file:bg-blue-100 file:text-blue-700 file:rounded-full file:border-0 file:py-2 file:px-4 hover:file:bg-blue-200"
                    />
                    {errors.firstname && <p className="text-red-500 text-xs mt-1">{errors.firstname}</p>}
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