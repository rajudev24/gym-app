/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaAngleDown, FaAngleRight, FaBell, FaClipboardCheck, FaFilter, FaPlus, FaRocket, FaSearch } from 'react-icons/fa';
import { Menu, MenuButton } from '@szhsin/react-menu';
import { CiDumbbell } from 'react-icons/ci';
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import OnDemandWorkoutModal from '../../../Component/AllModals/OnDemandWorkoutModal/OnDemandWorkoutModal';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const OndemandWorkout = () => {
    const [openWorkout, setOpenWorkout] = useState(false);

    const toggleLeft = useContext(ToggleLeftContext);


    // Add Workout Modal----------------------------
    const openWorkoutModal = () => setOpenWorkout(true);
    const closeWorkoutModal = () => setOpenWorkout(false);

    return (
        <div className='mx-4 pt-4 w-full'>
            {/* Workout modal------ */}
            <Modal open={openWorkout} closeIcon={<ImCross />} onClose={closeWorkoutModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-2/5', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <OnDemandWorkoutModal closeWorkoutModal={closeWorkoutModal}></OnDemandWorkoutModal>
            </Modal>
            {/* workout Navbar----- */}
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">On-demand Workout Library</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <div className='mt-5 flex justify-between items-center'>
                    <div className='flex gap-2 items-center'>

                        <div className='bg-base-50 border w-72 px-2 py-1 rounded-sm items-center flex'>
                            <FaSearch className='text-gray-400' />
                            <input
                                // onChange={hadleSearch}
                                type="search" placeholder='Search ' className='focus:outline-none px-3 bg-transparent w-full' />
                        </div>

                        {/* Add Filter------------- */}
                        <Menu
                            menuButton={
                                <MenuButton>
                                    <div className="flex gap-2 ml-2 border px-6 py-1 items-center rounded-sm">
                                        <FaFilter className='text-gray-500' />
                                        <p>Filter</p>
                                    </div>
                                </MenuButton>
                            }
                            arrow={true}
                            align="center"
                        >
                            <div className="w-[400px]">
                                <div className="h-96">
                                    <div className="flex justify-between items-center px-5">
                                        <h2 className=" font-semibold my-2">Exercise Filter</h2>
                                        <button className="text-sm font-semibold text-primary hover:underline">
                                            Clear All
                                        </button>
                                    </div>
                                    <div className="collapse">
                                        <input type="checkbox" />
                                        <div className="collapse-title flex justify-between items-center px-5 p-0 min-h-0 bg-none font-medium">
                                            Exercie Form
                                            <FaAngleRight className="text-xl" />
                                        </div>
                                        <div className="collapse-content flex gap-4 mt-2">
                                            <div className="flex gap-2">
                                                <input type="checkbox" name="" id="" />
                                                <p>Everfit</p>
                                            </div>
                                            <div className="flex gap-2">
                                                <input type="checkbox" name="" id="" />
                                                <p>Custom Exercises</p>
                                            </div>
                                        </div>
                                    </div>
                                    <hr />
                                    <div className="px-5">
                                        <div className="form-control w-full">
                                            <label className="cursor-pointer label flex justify-between items-center">
                                                <span className="font-semibold">
                                                    Exercises With Video
                                                </span>
                                                <input
                                                    type="checkbox"
                                                    className="toggle toggle-sm toggle-primary"
                                                />
                                            </label>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            {/* <MenuItem className='px-3 flex gap-2 text-sm text-gray-800' > </MenuItem> */}

                            <hr className="mt-4" />
                            <div className="flex justify-end items-center px-4 py-2">
                                <button className="text-center bg-primary text-white text-sm font-semibold px-4 py-1 rounded-md ">
                                    Update
                                </button>
                            </div>
                        </Menu>
                    </div>
                    <button
                        onClick={() => openWorkoutModal()}
                        className="flex gap-2 p-1 px-6 py-2 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                        <FaPlus />
                        <p className="text-xs font-medium">Add New Workout</p>
                    </button>
                </div>
            </div>
            {/* workout Navbar----- */}

            {/* Workout Body------ */}
            <div className='mt-10 px-10'>
                <div className='flex justify-between items-center text-xs text-gray-400 my-4 px-3'>
                    <button className='flex gap-1 items-center focus:text-primary active:text-primary'>
                        <h2>Workouts (0)</h2>
                        <FaAngleDown />
                    </button>
                    <div className='flex gap-10 mr-10'>
                        <button className='flex gap-1 items-center focus:text-primary active:text-primary'>
                            <h2>Lebel</h2>
                            <FaAngleDown />
                        </button>
                        <button className='flex gap-1 items-center focus:text-primary active:text-primary'>
                            <h2>Duration</h2>
                            <FaAngleDown />
                        </button>
                        <button className='flex gap-1 items-center focus:text-primary active:text-primary'>
                            <h2>Most Recent</h2>
                            <FaAngleDown />
                        </button>
                    </div>
                </div>
                <hr className='' />
            </div>

            <div className='flex justify-center items-center'>
                <div className='flex justify-center flex-col items-center mt-16'>
                    <CiDumbbell className='text-7xl text-gray-200' />
                    <p className='text-sm text-gray-400'>Add your first on-demand workout!</p>
                    <button
                        onClick={() => openWorkoutModal()}
                        className="flex gap-2 p-1 px-6 mt-10 py-2 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                        <FaPlus />
                        <p className="text-xs font-medium">Add New Workout</p>
                    </button>
                </div>
            </div>

        </div >
    );
};

export default OndemandWorkout;