/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaClipboardCheck, FaCreditCard, FaRocket, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const Billing = () => {
    const toggleLeft = useContext(ToggleLeftContext);


    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className="mx-4 pt-4 flex justify-between items-center bg-white">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Billing</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr className='mt-3' />
            </div>
            <div className='p-5 grid grid-cols-2 gap-5'>
                <div className='border p-5 rounded-md shadow-md'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-lg font-semibold'>Current Plan - <span className='font-bold'>Studio</span></h2>
                        <button className='px-5 py-1 text-white font-semibold bg-gradient-to-r from-[#FBB731] to-[#F47635] rounded-sm'>Change Plan</button>
                    </div>
                    <div className='my-10'>
                        <h2 className='text-4xl text-blue-950 font-bold'>$0.00 <span className='text-xs font-semibold'>(Tax inclusive)</span></h2>
                        <h2>Next Charge: --</h2>
                    </div>
                    <div className='flex justify-between items-center'>
                        <Link to='' className='text-primary hover:underline text-sm font-medium'>View Upcoming Bill</Link>

                        <h2 className='text-sm'>Clients: <span className='font-semibold text-gray-500'>7/50</span></h2>
                    </div>
                </div>

                <div className='border p-5 rounded-md shadow-md'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-semibold'>Billing Details</h2>

                        <div className='border px-5 py-2 rounded-sm bg-slate-50'>
                            <h2 className='text-sm'>Credit: <span className='font-semibold'>$0.00</span></h2>
                        </div>
                    </div>
                    <div className='my-10'>
                        <p className='text-sm text-gray-400 font-semibold'>Billing Period</p>
                        <h2 className='text-lg font-semibold'>Monthly</h2>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <FaCreditCard className='text-6xl text-gray-300' />
                        <Link to='' className='text-primary hover:underline text-sm font-medium'>Add Credit Card</Link>
                    </div>
                </div>

                <div className='border p-5 rounded-md shadow-md'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-semibold'>Bill History</h2>

                        <div className='border px-5 py-2 rounded-sm bg-slate-50'>
                            <h2 className='text-sm'>Credit: <span className='font-semibold'>$0.00</span></h2>
                        </div>
                    </div>
                    <div className='my-10'>
                        <p className='flex justify-center text-gray-400'>No bills yet</p>

                    </div>
                    <div className='flex gap-5 items-center'>
                        <Link to='' className='text-primary hover:underline text-sm font-medium'>View Full History</Link>
                    </div>
                </div>

                <div className='border p-5 rounded-md shadow-md'>
                    <div className='flex justify-between items-center'>
                        <h2 className='font-semibold'>Billing Contact</h2>

                        <div className='border px-5 py-2 rounded-sm bg-slate-50'>
                            <h2 className='text-sm'>Credit: <span className='font-semibold'>$0.00</span></h2>
                        </div>
                    </div>
                    <div className='my-10 flex items-center gap-5'>
                        <div className='p-5 w-14 h-14 flex justify-center items-center bg-pink-400 rounded-full'>
                            <h2 className='text-xl text-white font-semibold'>PR</h2>
                        </div>
                        <div>
                            <h2 className='font-semibold'>Pintu Roy</h2>
                            <h2 className='text-sm text-gray-400 font-semibold'>roypintu121@gmail.com</h2>
                        </div>
                    </div>
                    <div className='flex gap-5 items-center'>
                        <Link to='' className='text-primary hover:underline text-sm font-medium'>Change Contact</Link>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default Billing;