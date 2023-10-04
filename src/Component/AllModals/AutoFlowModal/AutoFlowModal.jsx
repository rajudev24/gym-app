/* eslint-disable react/no-unescaped-entities */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { BsCalendarMonth } from 'react-icons/bs';
import { FcCalendar } from 'react-icons/fc';

const AutoFlowModal = ({ closeAutoflowModal }) => {
    const [checked, setChecked] = useState('coach');
    const [duration, setDuration] = useState(false)

    // handle user Role---------------------
    const handleDate = () => {
        setDuration(false)
    }
    const handleDuration = () => {
        setDuration(true)
    }

    // Handle Auto flow form ------------
    const handleAutoflow = (e) => {
        e.preventDefault();
        const form = e.target;
        const name = form?.name?.value;
        const duration = form?.duration?.value;
        console.log(name, duration);
    }


    return (
        <div className='p-7'>
            <div className=''>
                <h2 className='text-xl font-semibold'>Create an Autoflow</h2>
                <p className='text-sm text-gray-400 py-2'>Choose if you want to schedule assignments based on a sequence of days after start date or directly to dates on a calendar.</p>
            </div>
            <div className='grid grid-cols-2 gap-5 my-5'>
                <button onClick={() => handleDate()} className={`border ${!duration ? 'border-primary' : ''} flex flex-col justify-center items-center font-medium p-5 text-center text rounded-md w-full`}>
                    <FcCalendar className='text-7xl' />
                    <h2 className='text-lg text-blue-950'>By Day Sequence</h2>
                    <p className='text-xs px-5 text-gray-500'>Schedule assignments based on day number in the Autoflow</p>
                </button>

                <button onClick={() => handleDuration()} className={`border ${duration ? 'border-primary' : ''} flex flex-col justify-center items-center font-medium p-3 text-center text rounded-md w-full`}>
                    <BsCalendarMonth className='text-7xl text-gray-500' />
                    <h2 className='text-lg text-blue-950'>Exact Date</h2>
                    <p className='text-xs px-5 text-gray-500'>Choose exact days on a calendar your client should train.</p>
                </button>

            </div>
            <form onSubmit={handleAutoflow} className='mt-5'>
                <div>
                    <label className='text-[10px] text-gray-500'>AUTOFLOW NAME</label>
                    <input type="text" name="name" id="" className='w-full px-4 py-2 focus:outline-none border rounded-md mt-2' placeholder='Enter Name...' />
                </div>
                <div className={`flex flex-col mt-5 ${duration && 'hidden'}`}>
                    <label className='text-[10px] text-gray-500'>DURATION</label>
                    <div className='flex gap-3 items-center'>
                        <input type="number" name="duration" id="" className='w-32 px-4 py-2 focus:outline-none border rounded-md mt-2' defaultValue={1} />
                        <p className='font-semibold text-gray-500'>Week</p>
                    </div>
                </div>
                <div className='w-full flex justify-end mt-5'>
                    <button type='submit' className='px-10 py-1 text-white rounded-sm bg-primary hover:bg-secondary duration-300'>Create</button>
                </div>
            </form>
        </div>
    );
};

export default AutoFlowModal;