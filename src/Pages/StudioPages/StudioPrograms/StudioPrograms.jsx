/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaAngleRight, FaBell, FaClipboardCheck, FaEllipsisH, FaFilter, FaPlus, FaRegCopy, FaRegEdit, FaRegSave, FaRocket, FaSearch, FaTrashAlt } from 'react-icons/fa';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import WorkoutLabelModal from '../../../Component/AllModals/WorkoutLabelModal/WorkoutLabelModal';
import OnDemandWorkoutModal from '../../../Component/AllModals/OnDemandWorkoutModal/OnDemandWorkoutModal';
import StudioProgrammModal from '../../../Component/AllModals/StudioProgrammModal/StudioProgrammModal';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const StudioPrograms = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [openStudioProgram, setOpenStudioProgram] = useState(false);

    // Add Workout Label Modal----------------------------
    const openStudioProgramModal = () => setOpenStudioProgram(true);
    const closeStudioProgramModal = () => setOpenStudioProgram(false);

    return (
        <div className='mx-4 pt-4 w-full'>
            {/* Studio Proramm modal------ */}
            <Modal open={openStudioProgram} closeIcon={<ImCross />} onClose={closeStudioProgramModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-2/5', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <StudioProgrammModal closeStudioProgramModal={closeStudioProgramModal}></StudioProgrammModal>
            </Modal>

            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Studio Programs</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <div className='mt-5 flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>

                        <div className='bg-gray-100 border w-72 px-2 py-1 rounded-sm items-center flex'>
                            <FaSearch className='text-gray-400' />
                            <input
                                // onChange={hadleSearch}
                                type="search" placeholder='Search ' className='focus:outline-none px-3 bg-transparent w-full' />
                        </div>

                    </div>
                    <button
                        onClick={() => openStudioProgramModal()}
                        className="flex gap-2 p-1 px-6 py-2 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                        <FaPlus />
                        <p className="text-sm font-medium">Create Studio Program</p>
                    </button>
                </div>
            </div>

            <div className='mt-10'>
                <div className="card card-compact p-0 rounded-md w-1/2 bg-base-100 shadow-lg cursor-pointer relative">
                    <div className='absolute top-2 right-3 bg-gray-500 hover:bg-gray-100 bg-opacity-20 px-2 rounded-sm'>

                        <Menu align='end' menuStyle={{ backgroundColor: '#222222' }} menuButton={<MenuButton>

                            <FaEllipsisH className='text-sm cursor-pointer hover:text-gray-800 text-white' />

                        </MenuButton>} transition>
                            <MenuItem className='hover:bg-[#2b2b2c] text-gray-400 text-sm font-medium'>
                                <div className='flex gap-2 items-center'>
                                    <FaRegSave className='' />
                                    <p>Save as Programm</p>
                                </div>
                            </MenuItem>
                            <MenuItem className='hover:bg-[#2b2b2c] text-gray-400 text-sm font-medium'>
                                <div className='flex gap-2 items-center'>
                                    <FaRegCopy />
                                    <p>Duplicate</p>
                                </div>
                            </MenuItem>
                            <MenuItem className='hover:bg-[#2b2b2c] text-gray-400 text-sm font-medium'>
                                <div className='flex gap-2 items-center'>
                                    <FaRegEdit />
                                    <p>Edit</p>
                                </div>
                            </MenuItem>
                            <MenuItem className='hover:bg-[#2b2b2c] text-gray-400 text-sm font-medium'>
                                <div className='flex gap-2 items-center'>
                                    <FaTrashAlt />
                                    <p>Remove</p>
                                </div>
                            </MenuItem>

                        </Menu>
                    </div>
                    <figure><img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSY_X7ffNGPDAK8xur1vBHmceHD9DCg7Id6zUKPNZHPMFfNDzDkz82CLZRbXlTwufd938w&usqp=CAU" alt="Shoes" className='w-full object-cover h-56' /></figure>
                    <div className="card-body p-2">
                        <h2 className="text-blue-950 font-semibold text-base hover:text-primary">Starting Strength - Demo</h2>
                        <p className='text-blue-950'>Loosely based off of Mark Rippetoe's Starting Strength. A full body, free weight program that is designed for newcomers or those that have taken a</p>
                        <p className='text-base mt-2'>Available for <span className='font-medium'>0 Clients</span></p>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default StudioPrograms;