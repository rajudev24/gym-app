/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ToggleLeftContext from '../../Context/ToggleLeftContext';
import { FaArrowLeftLong } from 'react-icons/fa6';


const StudioLayout = () => {
    const [isLeftOpen, setIsLeftOpen] = useState(true)

    const toggleLeft = () => {
        setIsLeftOpen((prev) => !prev)
    }

    const location = useLocation();
    const path = location?.pathname.split('/')[2];
    const basePath = location.pathname;

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
                        <div className='flex flex-col gap-2'>
                            <Link to='/menu' className='text-2xl flex gap-3 items-center px-4 py-4'>
                                <FaArrowLeftLong />
                                <h1>Studio</h1>
                            </Link>

                            <Link className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${basePath === '/studio' && 'text-white bg-primary'}`}>
                                <p>Resource Collections</p>
                            </Link>
                            <Link to='/studio/resources' className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${path === 'resources' && 'text-white bg-primary'}`}>
                                <p>Resources</p>
                            </Link>
                            <Link to='/studio/workout' className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${path === 'workout' && 'text-white bg-primary'}`}>
                                <p>Workout Collections</p>
                            </Link>
                            <Link to='/studio/ondemandworkout' className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${path === 'ondemandworkout' && 'text-white bg-primary'}`}>
                                <p>On-demand Workout</p>
                            </Link>
                            <Link to='/studio/workoutlabel' className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${path === 'workoutlabel' && 'text-white bg-primary'}`}>
                                <p>Workout Labels</p>
                            </Link>
                            <Link to='/studio/studioprogram' className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${path === 'studioprogram' && 'text-white bg-primary'}`}>
                                <p>Studio Programs</p>
                            </Link>
                            <Link to='/studio/ondemandsetting' className={`font-semibold  flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-white focus:text-white rounded-full px-4 py-2 ${path === 'ondemandsetting' && 'text-white bg-primary'}`}>
                                <p>Settings</p>
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

export default StudioLayout;