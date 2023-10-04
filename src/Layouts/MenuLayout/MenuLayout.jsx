/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ToggleLeftContext from '../../Context/ToggleLeftContext';
import { BsBuildings, BsFillBuildingsFill } from 'react-icons/bs';
import { MdStackedLineChart } from 'react-icons/md';
import { FaBuildingUser, FaSackDollar } from 'react-icons/fa6';
import { BiDollarCircle } from 'react-icons/bi';
import { HiOutlineUserGroup } from 'react-icons/hi';
import { FaUsers } from 'react-icons/fa';

const MenuLayout = () => {
    const [isLeftOpen, setIsLeftOpen] = useState(true)

    const toggleLeft = () => {
        setIsLeftOpen((prev) => !prev)
    }


    return (
        <div className='flex w-full z-10'>
            <div className={`bg-secondary ${isLeftOpen ? 'ml-[281px]' : 'ml-16'}`}>

                <div className=' bg-secondary text-white text-sm'>
                    <Drawer
                        open={isLeftOpen}
                        onClose={toggleLeft}
                        direction='left'
                        size={220}
                        style={{ backgroundColor: '#F1A0FF', boxShadow: 'none' }}
                        enableOverlay={false}
                        className='ml-[61px] py-5 px-2'
                    >
                        <div className='flex flex-col gap-2 mt-3  font-semibold'>

                            <Link to='/studio' className='flex items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3 gap-3'>
                                <BsBuildings className='text-xl' />
                                <p>Studio</p>
                            </Link>
                            <Link className='flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3'>
                                <MdStackedLineChart className='text-xl' />
                                <p>Autoflow</p>
                            </Link>
                            <Link to='/menu/community' className='flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3'>
                                <FaBuildingUser className='text-xl' />
                                <p>Community Forums</p>
                            </Link>
                            <Link to='/payment' className='flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3'>
                                <FaSackDollar className='text-xl' />
                                <p>Payment</p>
                            </Link>
                            <Link to='/menu/refercoach' className='flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3'>
                                <BiDollarCircle className='text-2xl' />
                                <p>Refer a Coach</p>
                            </Link>
                            <Link to='/setting/teammates' className='flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary rounded-md px-4 py-3'>
                                <FaUsers className='text-xl' />
                                <p>Team</p>
                            </Link>
                        </div>
                    </Drawer>
                </div>
            </div>
            <ToggleLeftContext.Provider value={toggleLeft}>
                <Outlet />
            </ToggleLeftContext.Provider>
        </div>
    );
};

export default MenuLayout;