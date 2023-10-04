/* eslint-disable no-unused-vars */
import React, { useContext } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaClipboardCheck, FaRegBell, FaRegEnvelope, FaRocket, FaSearch } from 'react-icons/fa';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';


const notifications = [
    {
        title: 'Client complete task',
        app: true,
        push: true
    },
    {
        title: 'Payments and Packages',
        app: true,
        push: true
    },
    {
        title: 'Client account connected',
        app: true,
        push: true
    },
    {
        title: 'Pending client reminder',
        app: true,
        push: false
    },
    {
        title: 'Client logs workout',
        app: false,
        push: true
    },
    {
        title: 'Client logs activity',
        app: true,
        push: true
    },
    {
        title: 'Client submits form and questionnaire',
        app: true,
        push: true
    },
    {
        title: 'Client adds body metric entry',
        app: true,
        push: true
    },
    {
        title: 'Client adds progress photo',
        app: true,
        push: true
    },
    {
        title: 'Client edits goal',
        app: true,
        push: true
    },
    {
        title: 'Client submits food entry',
        app: true,
        push: true
    },
    {
        title: 'Client leaves comment',
        app: true,
        push: true
    },
    {
        title: 'Goal Countdown',
        app: true,
        push: true
    },
    {
        title: 'Goal Countdown',
        app: true,
        push: true
    },
]


const Notifications = () => {
    const toggleLeft = useContext(ToggleLeftContext);


    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className="mx-4 pt-4 flex justify-between items-center bg-white">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Notifications</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr className='mt-3' />
            </div>
            <div className='p-5'>
                <div className='flex gap-10 items-baseline'>
                    <div className='flex gap-3 items-center w-72'>
                        <FaRegEnvelope className='text-xl text-gray-500' />
                        <h2 className='text-xl font-semibold'>Email Updates</h2>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='flex justify-between w-full pr-20'>
                            <div className='flex flex-col gap-2'>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" defaultChecked className="checkbox w-5 h-5 rounded-full checkbox-primary" />
                                    <h2 className=''>Product release newsletter</h2>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" defaultChecked className="checkbox w-5 h-5 rounded-full checkbox-primary" />
                                    <h2 className=''>Alert for new inbox messages</h2>
                                </div>
                                <div className='flex items-center gap-3'>
                                    <input type="checkbox" defaultChecked className="checkbox w-5 h-5 rounded-full checkbox-primary" />
                                    <h2 className=''>Daily Digest</h2>
                                </div>
                            </div>
                            <div>
                                <button className='shadow-green-500 bg-green-400 px-7 py-2 text-white font-medium shadow-lg rounded-md'>Save</button>
                            </div>

                        </div>
                        <hr className='mt-10 w-full' />
                    </div>
                </div>
                <div className='flex gap-10 items-start mt-10'>
                    <div className='flex gap-3 items-center w-72'>
                        <FaRegBell className='text-xl text-gray-500' />
                        <h2 className='text-xl font-semibold'>Notifications</h2>
                    </div>
                    <div className='flex flex-col w-full'>
                        <div className='grid grid-cols-3 gap-5'>
                            <div> </div>
                            <div>
                                <h2 className='text-center text-lg font-semibold'>In-app</h2>
                                <p className='text-sm text-gray-400 px-8 text-center'>(Activity that appears on Notifications log)</p>
                            </div>
                            <div>
                                <h2 className='text-center text-lg font-semibold'>Push</h2>
                                <p className='text-sm text-gray-400 px-8 text-center'>(Notification alerts sent to your mobile app)</p>
                            </div>
                        </div>
                        <hr className='mt-2 w-full' />
                        <div className='flex flex-col h-56 overflow-y-scroll'>
                            {
                                notifications?.map((item, i) =>
                                    <div key={i}>
                                        <div className='grid grid-cols-3 items-center my-4 px-5'>
                                            <div className='w-96 font-semibold'>
                                                <h2>{item?.title}</h2>
                                            </div>
                                            <div className='text-center'>
                                                <input type="checkbox" checked={item?.app} className="checkbox w-5 h-5 rounded-full checkbox-primary" />
                                            </div>
                                            <div className='text-center'>
                                                <input type="checkbox" checked={item?.push} className="checkbox w-5 h-5 rounded-full checkbox-primary" />
                                            </div>
                                        </div>
                                        <hr className='w-full' />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Notifications;