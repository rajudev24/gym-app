/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaClipboardCheck, FaPlus, FaRocket, FaSearch } from 'react-icons/fa';
import community from '../../../assets/forum_first_screen.svg'
import { Link } from 'react-router-dom';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const CommunityForums = () => {
    const toggleLeft = useContext(ToggleLeftContext);


    return (
        <div className='w-full relative'>
            <div className='absolute top-0 w-full bg-white'>
                <div className="mx-4 pt-4 flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Community Forums</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr className='mt-5' />
            </div>

            <div className='flex flex-col gap-3 justify-center items-center min-h-screen'>
                <img src={community} alt="" />
                <h2 className='text-lg font-semibold'>Community Forums</h2>
                <p className='w-64 text-sm text-center'>Start a forum to engage your clients and easily share content with each other.</p>
                <Link
                    // onClick={() => openCollectionModal()}
                    className="flex gap-2 mt-3 px-6 py-2  items-center rounded-md border border-primary text-primary">
                    <FaPlus />
                    <p className="text-sm font-medium">Create first Forum</p>
                </Link>
            </div>
        </div>
    );
};

export default CommunityForums;