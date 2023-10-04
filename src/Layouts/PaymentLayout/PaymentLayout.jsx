/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ToggleLeftContext from '../../Context/ToggleLeftContext';
import { FaArrowLeftLong } from 'react-icons/fa6';

const PaymentLayout = () => {
    const [isLeftOpen, setIsLeftOpen] = useState(true)

    const toggleLeft = () => {
        setIsLeftOpen((prev) => !prev)
    }

    const location = useLocation();
    const path = location?.pathname.split('/')[2];
    const rootPath = location?.pathname;

    return (
        <div className='flex w-full z-10'>
            <div className={`bg-secondary ${isLeftOpen ? 'ml-[281px]' : 'ml-16'}`}>

                <div className='flex flex-col bg-secondary text-white text-sm'>
                    <Drawer
                        open={isLeftOpen}
                        onClose={toggleLeft}
                        direction='left'
                        size={220}
                        style={{ backgroundColor: '#F1A0FF', boxShadow: 'none' }}
                        enableOverlay={false}
                        className='ml-[61px] py-5 px-2'
                    >
                        <Link to='/menu' className='text-2xl flex gap-3 items-center px-4 py-4'>
                            <FaArrowLeftLong />
                            <h1>Payment</h1>
                        </Link>

                        <Link to='/payment' className={`font-semibold text-gray-400 flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3 ${rootPath === '/payment' && 'text-white bg-primary'}`}>
                            <p>Packages</p>
                        </Link>
                        <Link to='/payment/product' className={`font-semibold text-gray-400 flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3 ${path === 'product' && 'text-white bg-primary'}`}>
                            <p>Product</p>
                        </Link>


                    </Drawer>
                </div>
            </div>
            <ToggleLeftContext.Provider value={toggleLeft}>
                <Outlet />
            </ToggleLeftContext.Provider>
        </div>
    );
};

export default PaymentLayout;