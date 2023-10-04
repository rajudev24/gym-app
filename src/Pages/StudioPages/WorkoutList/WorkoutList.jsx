/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import { FaBell, FaClipboardCheck, FaRocket, FaSearch } from 'react-icons/fa';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { FaArrowLeft } from 'react-icons/fa6';
import { Link } from 'react-router-dom'
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const WorkoutList = () => {
    const toggleLeft = useContext(ToggleLeftContext);


    return (
        <div className='w-full'>
            <div className="flex justify-between items-center mx-4 pt-4 ">
                <div className="flex gap-2 items-center">
                    <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                    <h2 className="text-2xl font-semibold">Manage Workout Labels</h2>
                </div>
                <NavBarRightSide></NavBarRightSide>
            </div>
            <hr className='my-5' />
            <div className='w-4/5 mx-auto mt-10'>
                <Link to='/studio/workoutlabel' className='font-semibold text-lg gap-3 flex items-center mb-5'><FaArrowLeft /> Location</Link>

                <div className='h-[450px] overflow-y-scroll pr-5'>
                    {
                        [1, 2, 3, 4, 5, 6, 7, 8, 9]?.map(i =>
                            <div key={i} className='flex gap-5 items-center rounded-lg w-ful border shadow-lg px-6 py-4 mb-3'>
                                <h2 className='text-lg'>{i}.</h2>
                                <h2 className='text-lg font-semibold'>Other</h2>
                            </div>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

export default WorkoutList;