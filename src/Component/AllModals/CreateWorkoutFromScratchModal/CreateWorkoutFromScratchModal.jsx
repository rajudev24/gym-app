/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from 'react'
import { ImCross } from 'react-icons/im'
import Modal from 'react-responsive-modal'
import CreateWorkoutModal from '../CreateWorkoutModal/CreateWorkoutModal'

export const CreateWorkoutFromScratchModal = ({ handleClose }) => {
  return (
    <Modal
      open={true}
      onClose={handleClose}
      closeIcon={<ImCross />}
      classNames={{ modal: 'p-0 overflow-visible rounded-md min-w-[900px]', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50' }}>
      <CreateWorkoutModal />
    </Modal>
  )
}
