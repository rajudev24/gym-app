/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, useParams } from 'react-router-dom';

const Training = () => {
    const [traning, setTraning] = useState(false);
    const { id } = useParams();

    // hide &show traning calender-------------------
    const handleTraningShow = () => {
        setTraning(true)
    }
    const handleTraningHide = () => {
        setTraning(false)
    }
    return (
        <div onMouseOver={handleTraningShow} onMouseOut={handleTraningHide} className='border rounded-md bg-slate-50'>
            <div className='flex justify-between items-center mx-4 my-2'>
                <h5 className='text-base font-medium text-slate-700 '>Training</h5>
                <Link to={`/profile/${id}/traning`} className={traning ? 'text-sm block hover:underline duration-500' : 'hidden'}>Open Calendar</Link>

            </div>
            <hr className=" border-gray-300" />
            <div className='grid lg:grid-cols-3 grid-cols-3 p-5 bg-white rounded-md'>
                <div className=' flex justify-evenly items-center' >
                    <div className='text-center'>
                        <p>Last 7 days</p>
                        <h1 className='text-3xl font-bold'>1/1</h1>
                        <p className='text-green-600'><small>Tracked</small></p>
                    </div>
                    <div className="w-px h-16 bg-gray-300"></div>
                </div>
                <div className='flex justify-evenly items-center' >
                    <div className='text-center'>
                        <p>Last 7 days</p>
                        <h1 className='text-3xl font-bold'>1/1</h1>
                        <p className='text-green-600'><small>Tracked</small></p>
                    </div>
                    <div className="w-px h-16 bg-gray-300"></div>
                </div>
                <div className=' flex justify-evenly items-center' >
                    <div className='text-center'>
                        <p>Last 7 days</p>
                        <h1 className='text-3xl font-bold'>1/1</h1>
                        <p className='text-green-600'><small>Tracked</small></p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Training;