import React, {useState} from 'react'
import Modal from '../product/Modal'

const AddConsultantGroupModal = ({isOpen, closeModal}) => {

  const [formData, setFormData] = useState({
    name: '',
    email: ''
});

const [errors, setErrors] = useState({
  name: '',
  email: ''
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
          console.log(formData)
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