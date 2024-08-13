import ProductList from '../components/product/ProductList'
import AddProductModal from '../components/product/AddProductModal'
import { useState } from 'react'

const Product = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
      <ProductList openModal={openModal} />
      <AddProductModal isOpen={isModalOpen} closeModal={closeModal}>
      </AddProductModal>
    </div>
  )
}

export default Product