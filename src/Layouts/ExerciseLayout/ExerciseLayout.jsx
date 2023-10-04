/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ToggleLeftContext from '../../Context/ToggleLeftContext';
import Clients from '../../Pages/Exercise Pages/Exercises/Exercises';

const ExerciseLayout = () => {
    const [isLeftOpen, setIsLeftOpen] = useState(true)

    const toggleLeft = () => {
        setIsLeftOpen((prev) => !prev)
    }
    return (
        <div className='flex w-full z-10'>
            <div className={`bg-secondary ${isLeftOpen ? 'ml-[281px]' : 'ml-16'}`}>

                <div className='flex flex-col bg-secondary font-semibold text-sm'>
                    <Drawer
                        open={isLeftOpen}
                        onClose={toggleLeft}
                        direction='left'
                        size={220}
                        style={{ backgroundColor: '#F1A0FF', boxShadow: 'none' }}
                        enableOverlay={false}
                        className='ml-[64px] py-5 px-2'
                    >
                        <div className='flex flex-col gap-1'>
                            <h2 className='text-2xl px-4 text-white mb-5'>Library</h2>
                            <Link className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                <p>Exercise</p>
                            </Link>
                            <Link to='/exersise/workouts' className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                <p>Workouts</p>
                            </Link>
                            <Link to='/exersise/sections' className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                <p>Sections</p>
                            </Link>
                            <Link to='/exersise/programs' className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                <p>Programs</p>
                            </Link>
                            <Link to='/exersise/tasks' className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                <p>Tasks</p>
                            </Link>
                            <Link to='/exersise/forms' className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                <p>Forms & Questionnaires</p>
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

export default ExerciseLayout;