import React, {useState} from 'react'
import ConsultantGroupList from '../components/consultantGroup/ConsultantGroupList'
import AddConsultantGroupModal from '../components/consultantGroup/AddConsultantGroupModal'

const ConsultantGroup = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);
  return (
    <div>
        <ConsultantGroupList openModal={openModal} />
        <AddConsultantGroupModal isOpen={isModalOpen} closeModal={closeModal}>
        </AddConsultantGroupModal>
    </div>
  )
}

export default ConsultantGroup