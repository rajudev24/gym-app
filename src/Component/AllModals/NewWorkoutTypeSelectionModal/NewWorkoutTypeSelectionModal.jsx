import React, { useState } from 'react'
import Modal from 'react-responsive-modal';
import { MdOutlineFitnessCenter } from "react-icons/md"
import { TbNewSection } from "react-icons/tb"
// import "./styles.css"
import { ImCross } from 'react-icons/im';

export const NewWorkoutTypeSelectionModal = ({ isOpen, handleClose, handleSelectedType }) => {

  const handleModalClose = (name) => {
    name && handleSelectedType(name)
    handleClose()
  }
  
  const renderTypes = () => typesOptions.map(item => <RenderTypeOptionView key={item.title} subtext={item.subtext} title={item.title} icon={item.icon} handleSelectedType={handleModalClose} />)

  return (
    <div className='flex flex-col gap-4 rounded-sm'>
      <Modal
        open={isOpen}
        closeIcon={<ImCross />}
        onClose={handleClose}
        center
        classNames={{
          modal: 'p-5 pt-1 overflow-visible rounded-md w-[490px]',
          closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50'
        }}
      >
        <div className='my-2 mt-1'>
          <h2 className='text-primary-content font-bold'>Create Workout</h2>
          <p className='text-primary-content text-[15px]'>Please select how you would like to start</p>
        </div>
        <div className='flex gap-x-6 justify-between h-48'>
          {renderTypes()}
        </div>
      </Modal>
    </div>
  );
}

const RenderTypeOptionView = ({ title, subtext, icon, handleSelectedType }) => {
  const [hoveredTitle, setHoveredTitle] = useState("")

  const handleClicked = () => {
    if(title === "Create From Template") {
      handleSelectedType("fromTemplate")
    } else if(title === "New Workout") {
      handleSelectedType("newWorkout")
    }
  }

  const handleHoveredTitle = (typeName) => setHoveredTitle(typeName)

  return (
    <div
      className='w-1/2 flex flex-col gap-y-0.5 items-center mx-auto
      outline outline-1 outline-slate-400 transition-all duration-200 hover:outline-primary-focus px-4 rounded-sm cursor-pointer shadow-md hover:shadow-none'
      onMouseEnter={() => handleHoveredTitle(title)}
      onMouseLeave={() => setHoveredTitle("")}
      onClick={handleClicked}
    >
      <div
        className={`text-[80px] transition-all duration-200 ${hoveredTitle === title ? "text-primary-focus" : "text-slate-300"} h-28 flex justify-center items-center`}
      >
        {icon}
      </div>
      <div className='mx-auto'>
        <h3 className='text-[15px] w-full font-bold'>{title}</h3>
        <p className='text-[11px] text-primary-content w-full text-center'>{subtext}</p>
      </div>
    </div>
  )
}


const typesOptions = [
  {
    icon: <MdOutlineFitnessCenter />,
    title: "Create From Template",
    subtext: "Choose from our list of workout templates"
  },
  {
    icon: <TbNewSection />,
    title: "New Workout",
    subtext: "Create your own"
  }
]