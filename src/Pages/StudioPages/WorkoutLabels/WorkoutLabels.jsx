/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { FaAngleRight, FaBell, FaClipboardCheck, FaPlus, FaRocket, FaSearch } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { ImCross } from 'react-icons/im';
import Modal from 'react-responsive-modal';
import OnDemandWorkoutModal from '../../../Component/AllModals/OnDemandWorkoutModal/OnDemandWorkoutModal';
import WorkoutLabelModal from '../../../Component/AllModals/WorkoutLabelModal/WorkoutLabelModal';
import { Link } from 'react-router-dom'
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const WorkoutLabels = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [openWorkoutLabel, setOpenWorkoutLabel] = useState(false);

    // Add Workout Label Modal----------------------------
    const openWorkoutLabelModal = () => setOpenWorkoutLabel(true);
    const closeWorkoutLabelModal = () => setOpenWorkoutLabel(false);

    const List = [1, 2, 3, 4, 5]

    return (
        <div className='mx-4 pt-4 w-full'>
            {/* WorkoutLabel modal------ */}
            <Modal open={openWorkoutLabel} closeIcon={<ImCross />} onClose={closeWorkoutLabelModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-2/5', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                {/* <OnDemandWorkoutModal closeWorkoutModal={closeWorkoutLabelModal}></OnDemandWorkoutModal> */}
                <WorkoutLabelModal closeWorkoutLabelModal={closeWorkoutLabelModal}></WorkoutLabelModal>
            </Modal>


            <div className="flex justify-between items-center">
                <div className="flex gap-2 items-center">
                    <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                    <h2 className="text-2xl font-semibold">Manage Workout Labels</h2>
                </div>
                <NavBarRightSide></NavBarRightSide>
            </div>

            {/* Workout labels body--- */}
            <div className='w-4/5 mx-auto mt-10'>
                <div className='flex justify-between items-center mb-10'>
                    <div className='w-2/3 '>
                        <h2 className='font-semibold text-2xl'>Label List</h2>
                        <p className='pr-24 tex text-sm mt-2'>Labels help you organize workouts and help your clients search for workouts in a collection. Define labels for your workspace below.</p>
                    </div>
                    <div className='w-1/3 flex justify-end'>
                        <button
                            onClick={() => openWorkoutLabelModal()}
                            className="flex gap-2 p-1 px-6 py-3 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                            <FaPlus />
                            <p className="text-xs font-medium">Add New Label</p>
                        </button>
                    </div>
                </div>
                <div className='h-[400px] overflow-y-scroll pr-5'>
                    {
                        List?.map(i =>
                            <Link to={`/studio/workoutlabel/${1}`} key={i} className='flex justify-between items-center rounded-lg w-ful border shadow-lg px-6 py-4 mb-3'>
                                <div>
                                    <h2 className='text-lg font-semibold'>Location</h2>
                                    <p className='text-xs text-gray-500'>9 options</p>
                                </div>
                                <FaAngleRight />
                            </Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default WorkoutLabels;