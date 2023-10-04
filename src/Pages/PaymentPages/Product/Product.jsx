/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaClipboardCheck, FaRocket, FaSearch } from 'react-icons/fa';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const Product = () => {
    const toggleLeft = useContext(ToggleLeftContext);


    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className="mx-4 pt-4 flex justify-between items-center bg-white">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Product</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr className='mt-3' />
            </div>
            <div className='flex justify-center items-center min-h-screen'>
                <h2 className='text-5xl font-semibold'>Commin Soon...</h2>
            </div>
        </div>
    );
};

export default Product;