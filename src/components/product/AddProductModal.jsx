import { useState, useRef } from "react";
import Modal from "./Modal";
import { FaPlus } from "react-icons/fa6";
import { useAddProductMutation } from "../../features/product/productApiSlice";
import { uploadCloudinary } from "../../app/upload";
import { MdDeleteSweep } from "react-icons/md";

const AddProductModal = ({ isOpen, closeModal }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const fileInputRef = useRef(null);

    const LandSizeUnit = {
        SquareMeter: 0,
        Plot: 1
    };

    const PricingDuration = {
        Outright : 0, ThreeMonths : 1, SixMonths : 2, OneYear : 3
    }

    const [addProduct] = useAddProductMutation();

    const [formData, setFormData] = useState({
        name: '',
        location: '',
        description: '',
        size: '',
        isAvailable: true,
        unit: LandSizeUnit.SquareMeter,
        pricing: [
            {
                price: '',
                survey: '',
                development: '',
                duration: ''
            }
        ]
    });

    const [errors, setErrors] = useState({
        name: '',
        location: '',
        imageLinks: '',
        description: '',
        size: '',
        isAvailable: '',
        unit: '',
        pricing: [
            {
                price: '',
                survey: '',
                development: '',
                duration: ''
            }
        ]
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        const [field, subField, index] = name.split('.');
        if (subField) {
            const pricingIndex = parseInt(index, 10);
            setFormData(prevState => {
                const newPricing = [...prevState.pricing];
                newPricing[pricingIndex] = {
                    ...newPricing[pricingIndex],
                    [subField]: value
                };
                return { ...prevState, pricing: newPricing };
            });
            setErrors(prevState => {
                const newErrors = [...prevState.pricing];
                newErrors[pricingIndex] = {
                    ...newErrors[pricingIndex],
                    [subField]: ''
                };
                return { ...prevState, pricing: newErrors };
            });
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
            setErrors(prevState => ({
                ...prevState,
                [name]: ''
            }));
        }
    };

    const validate = () => {
        const newErrors = {
            pricing: []
        };
        if (!formData.name) {
            newErrors.name = 'Name is required';
        }
        if (!formData.location) {
            newErrors.location = 'Location is required';
        }
        if (!formData.description) {
            newErrors.description = "Description is required"
        }
        // if (!formData.isAvailable) {
        //     newErrors.isAvailable = "Required"
        // }
        if (imageUrls.length === 0) {
            newErrors.imageLinks = "Please select at least one image"
        }
        if (!formData.size) {
            newErrors.size = 'Size is required';
        } else if (/[^0-9]/.test(formData.size)) {
            newErrors.size = 'Field should contain only digits';
        }
        formData.pricing.forEach((pricingGroup, index) => {
            const groupErrors = {};
            if (!pricingGroup.price) {
                groupErrors.price = 'Price is required';
            } else if (/[^0-9]/.test(pricingGroup.price)) {
                groupErrors.price = 'Field should contain only digits';
            }
            if (!pricingGroup.survey) {
                groupErrors.survey = 'Survey pricing is required';
            } else if (/[^0-9]/.test(pricingGroup.survey)) {
                groupErrors.survey = 'Field should contain only digits';
            }
            if (!pricingGroup.development) {
                groupErrors.development = 'Development pricing is required';
            } else if (/[^0-9]/.test(pricingGroup.development)) {
                groupErrors.development = 'Field should contain only digits';
            }
            // if (!pricingGroup.duration) {
            //     groupErrors.duration = 'Duration is required';
            // } else if (/[^0-9]/.test(pricingGroup.duration)) {
            //     groupErrors.duration = 'Field should contain only digits';
            // }
            newErrors.pricing[index] = groupErrors;
        });
        
        return newErrors;
    };

    const removeItem = (index) => {
        setFormData(prevState => {
            const updatedPricing = [...prevState.pricing];
            if (index > 0 && index < updatedPricing.length) {
                updatedPricing.splice(index, 1);
            }
            return {
                ...prevState,
                pricing: updatedPricing
            };
        });
    };

    const uploadImages = async (selectedFiles) => {
        let arr = [];
        if (selectedFiles) {
            for (let i = 0; i < selectedFiles.length; i++) {
                const data = await uploadCloudinary(selectedFiles[i]);
                arr.push(data);
            }
        }
        return arr;
    };

    const handleFileChange = async (selectedFiles) => {
        setErrors({ ...errors, images: '' });
        const validImageTypes = ['image/jpeg', 'image/png', 'image/gif'];
        const maxSize = 2 * 1024 * 1024; // 2MB in bytes
        if (selectedFiles.length > 0) {
            for (let i = 0; i < selectedFiles.length; i++) {
                if (!validImageTypes.includes(selectedFiles[i].type)) {
                    setErrors({ ...errors, imageLinks: 'Please select valid image files (jpeg, png, gif).' });
                    return;
                }
                if (selectedFiles[i].size > maxSize) {
                    setErrors({ ...errors, imageLinks: 'File size must be less than 2MB.' });
                    return;
                }
            }
        }
        if (selectedFiles) {
            const uploadUrls = await uploadImages(selectedFiles);
            setImageUrls(uploadUrls);
        } else {
            setErrors({ ...errors, imageLinks: 'Please select at least one image' });
        }
    };

    const clearFormData = (data) => {
        const newData = {};
        setImageUrls([])
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
        Object.keys(data).forEach(key => {
            if (Array.isArray(data[key])) {
                newData[key] = data[key].map(item => clearFormData(item));
            } else if (typeof data[key] === 'object' && data[key] !== null) {
                newData[key] = clearFormData(data[key]);
            } else {
                newData[key] = '';
            }
        });
        return newData;
    };

    const handleAddPricingGroup = () => {
        setFormData(prevState => ({
            ...prevState,
            unit: LandSizeUnit.SquareMeter,
            pricing: [...prevState.pricing, {
                price: '',
                survey: '',
                development: '',
                duration: PricingDuration.Outright
            }]
        }));
        setErrors(prevState => ({
            ...prevState,
            pricing: [...prevState.pricing, {
                price: '',
                survey: '',
                development: '',
                duration: ''
            }]
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const validationErrors = validate();
        if (Object.keys(validationErrors).length !== 1 && Object.keys(validationErrors.pricing[0]).length !== 0) { //greater than one is used here because the pricing array set in the validate function 
            setErrors(validationErrors);
        } else {
            const submittedData = {
                ...formData,
                unit: Number(formData.unit),
                imageLinks: imageUrls,
                pricing: formData.pricing.map(group => ({
                    ...group, duration: Number(group.duration)
                }))
            };
            try {
                const newProductData = await addProduct(submittedData).unwrap();
                if (newProductData) {
                    const updatedFormData = clearFormData(formData);
                    setFormData(updatedFormData);
                }
                closeModal()
            } catch (error) {
                console.log("add product failed");
            }
           
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={closeModal}>
            <h2 className="text-xl font-medium py-2">Add Product</h2>
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

                {imageUrls.length > 0 && (
                    <div className="py-2 ps-2">
                        <label className="block text-sm font-medium text-gray-700">Uploaded Images:</label>
                        <div className="flex flex-wrap mt-2">
                            {imageUrls.map((url, index) => (
                                <img
                                    key={index}
                                    src={url}
                                    alt={`Uploaded ${index}`}
                                    className="w-20 h-20 object-cover rounded-md mr-2 mb-2"
                                />
                            ))}
                        </div>
                    </div>
                )}

                <div className="py-2 pe-2">
                    <label htmlFor="imageLinks" className="block text-sm text-gray-700 dark:text-gray-300">Images</label>
                    <input
                        type="file"
                        multiple
                        id="imageLinks"
                        name="imageLinks"
                        ref={fileInputRef}
                        onChange={(e) => handleFileChange(e.target.files)}
                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:file:bg-gray-300 file:bg-blue-100 file:text-blue-700 file:rounded-full file:border-0 file:py-2 file:px-4 
                        hover:file:bg-blue-200 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    />
                    {errors.imageLinks && <p className="text-red-500 text-xs mt-1">{errors.imageLinks}</p>}
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

                <div className="flex justify-between">
                    <div className="py-2 pe-2 basis-1/2">
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

                    <div className="py-2 pe-2 basis-1/3">
                        <label htmlFor="unit" className="block text-sm text-gray-700 dark:text-gray-300"> Unit</label>
                        <select
                            id="unit"
                            name="unit"
                            value={FormData.unit}
                            onChange={handleChange}
                            className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                        >
                            <option value={LandSizeUnit.SquareMeter}>Square Meter</option>
                            <option value={LandSizeUnit.Plot}>Plot</option>
                        </select>
                        {errors.unit && <p className="text-red-500 text-xs mt-1">{errors.unit}</p>}
                    </div>

                    <div className="py-2 basis-1/3">
                    <label htmlFor="isAvailable" className="block text-sm text-gray-700 dark:text-gray-300">Available</label>
                    <select
                        id="isAvailable"
                        name="isAvailable"
                        value={formData.isAvailable}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    {errors.isAvailable && <p className="text-red-500 text-xs mt-1">{errors.isAvailable}</p>}
                </div>

                </div>

                <div className="flex justify-between">
                    <p className="pt-5 pb-2"> Configure Pricing </p>
                    <button type="button" onClick={handleAddPricingGroup} className="mt-3 px-3  bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none">
                    <FaPlus />
                </button>
                </div>
                <hr />

                {formData.pricing.map((pricingGroup, index) => (
                    <div key={index} className="py-2 pe-2 border-b border-gray-300 my-2">
                        <div className="flex justify-between">
                            <div className="py-2 pe-2 basis-1/4">
                                <label htmlFor={`pricing.${index}.price`} className="block text-sm text-gray-700 dark:text-gray-300">Price</label>
                                <input
                                    type="text"
                                    id={`pricing.${index}.price`}
                                    name={`pricing.price.${index}`}
                                    value={pricingGroup.price}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                />
                                {errors.pricing[index]?.price && <p className="text-red-500 text-xs mt-1">{errors.pricing[index].price}</p>}
                            </div>

                            <div className="py-2 pe-2 basis-1/4">
                                <label htmlFor={`pricing.${index}.survey`} className="block text-sm text-gray-700 dark:text-gray-300">Survey Pricing</label>
                                <input
                                    type="text"
                                    id={`pricing.${index}.survey`}
                                    name={`pricing.survey.${index}`}
                                    value={pricingGroup.survey}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                />
                                {errors.pricing[index]?.survey && <p className="text-red-500 text-xs mt-1">{errors.pricing[index].survey}</p>}
                            </div>
                            <div className="py-2 pe-2 basis-1/4">
                                <label htmlFor={`pricing.${index}.development`} className="block text-sm text-gray-700 dark:text-gray-300">Development Pricing</label>
                                <input
                                    type="text"
                                    id={`pricing.${index}.development`}
                                    name={`pricing.development.${index}`}
                                    value={pricingGroup.development}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                />
                                {errors.pricing[index]?.development && <p className="text-red-500 text-xs mt-1">{errors.pricing[index].development}</p>}
                            </div>

                            <div className="py-2 basis-1/4">
                                <label htmlFor= {`pricing.${index}.duration`} className="block text-sm text-gray-700 dark:text-gray-300"> Duration(Months)</label>
                                <select 
                                    type="text"
                                    id={`pricing.${index}.duration`}
                                    name={`pricing.duration.${index}`}
                                    value={pricingGroup.duration}
                                    onChange={handleChange}
                                    className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                                >
                                <option value={PricingDuration.Outright}>Outright </option>
                                <option value={PricingDuration.ThreeMonths}>Three Months </option>
                                <option value={PricingDuration.SixMonths}>Six Months </option>
                                <option value={PricingDuration.OneYear}>One Year </option>
                                </select>
                                {errors.pricing[index]?.duration && <p className="text-red-500 text-xs mt-1">{errors.pricing[index].duration}</p>}
                            </div>

                            <button type="button" onClick={() => removeItem(index)} className= {`ps-2 mt-4  text-red-600 py-6 text-2xl ${index === 0 ? 'hidden' : ''}`} > <MdDeleteSweep /> </button>
                        </div>

                    </div>
                ))}

                {/* <button type="button" onClick={handleAddPricingGroup} className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none">
                    Add Pricing Group
                </button> */}


                <div className="py-2">
                    <label htmlFor="isAvailable" className="block text-sm text-gray-700 dark:text-gray-300">Available</label>
                    <select
                        id="isAvailable"
                        name="isAvailable"
                        value={formData.isAvailable}
                        onChange={handleChange}
                        className="mt-1 block w-full px-3 py-2 border border-blue-200 rounded-sm focus:outline-none focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-blue-500"
                    >
                        <option value={true}>Yes</option>
                        <option value={false}>No</option>
                    </select>
                    {errors.isAvailable && <p className="text-red-500 text-xs mt-1">{errors.isAvailable}</p>}
                </div>

                <div className="flex justify-end">
                    <button type="submit" className="mt-2 px-3 py-2 bg-blue-500 text-white rounded-sm hover:bg-blue-600 focus:outline-none">
                        Submit
                    </button>
                </div>
            </form>
        </Modal>
    );
};

export default AddProductModal;
