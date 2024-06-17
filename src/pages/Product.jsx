import ProductList from '../components/product/ProductList'
import AddProductModal from '../components/product/AddProductModal'
import { useState } from 'react'

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div className="overflow-y-auto p-4 w-full lg:w-5/6 bg-gray-100 dark:bg-gray-700 absolute right-0 h-screen satoshi">
      <div className="bg-white dark:bg-gray-800 py-3 rounded-md shadow mb-6">
        <p className='px-3 text-2xl font-medium text-customPrimary  dark:text-white '> Products </p>
      </div>
      <ProductList openModal = {openModal}/>
      <AddProductModal isOpen={isModalOpen} closeModal={closeModal}>
      </AddProductModal>
    </div>
  )
}

export default Product