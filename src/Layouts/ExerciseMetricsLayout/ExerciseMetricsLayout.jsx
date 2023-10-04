/* eslint-disable no-unused-vars */
import { format } from 'date-fns';
import React, { useState } from 'react';
import { BiPlus } from 'react-icons/bi';
import { FaDumbbell } from 'react-icons/fa';
import { FaSliders } from 'react-icons/fa6';
import { FcSettings } from 'react-icons/fc';
import { PiPulseBold, PiSlidersHorizontalFill } from 'react-icons/pi';
import { Link, Outlet, useLocation, useParams } from 'react-router-dom';

const ExerciseMetricsLayout = () => {
    const { id } = useParams();
    const [active, setActive] = useState(false);
    // Get Location------------
    const location = useLocation();
    const paths = location?.pathname.split('/');
    const path = paths[paths?.length - 1]

    return (

        <div className='flex gap-2 '>
            <div className='relative'>
                <div className='w-72 fixed top-24'>
                    <div className=' shadow-lg flex flex-col min-h-screen justify-between pb-[18px]'>
                        <div>
                            {/* button section---------- */}
                            <div className="border border-primary m-5 flex rounded-md text-white">
                                <Link to={`/profile/${id}/metrics`} className={`flex gap-1 items-center justify-center px-2 py-2 ${path === "metrics" && 'bg-primary text-white'} rounded-l-sm w-1/2 text-black`}>
                                    <PiPulseBold />
                                    <span className='text-xs'>Body Matrics</span>
                                </Link>
                                <Link to={`/profile/${id}/exercise`} className={`flex items-center gap-2 justify-center px-2 py-2 bg-primary text-white rounded-r-sm w-1/2 `}>
                                    <FaDumbbell className='' />
                                    <span className='text-xs'>Exercise Matrics</span>
                                </Link>
                            </div>
                            {/* Steps section---------- */}
                            <div className='flex flex-col gap-2 mt-5'>
                                <div className='flex justify-between items-center px-5 border-b shadow-sm'>
                                    <p className='text-gray-500 font-semibold'><small>Total(5)</small></p>
                                    <p className='text-gray-500 font-semibold'><small>Last Updated(5)</small></p>
                                </div>

                                <div className='h-80 overflow-y-scroll flex flex-col text-sm'>
                                    <Link to={`/profile/${id}/exercise`} className='flex justify-between gap-2 items-center px-4 py-4'>
                                        <h6 className='font-semibold'>Mid Neutral Lat Pulldown</h6>
                                        <p className='text-gray-500 '><small>{format(new Date(), 'PP')}</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />

                                    <Link to={`/profile/${id}/exercise/layinglegcurls`} className='flex justify-between gap-2 items-center px-4 py-4'>
                                        <h6 className='font-semibold'>Lying Leg Curls</h6>
                                        <p className='text-gray-500 '><small>{format(new Date(), 'PP')}</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                    <Link to={`/profile/${id}/exercise/smithmachinepress`} className='flex justify-between gap-2 items-center px-4 py-4'>
                                        <h6 className='font-semibold'>Smith Machine Incline Bench Press</h6>
                                        <p className='text-gray-500 '><small>{format(new Date(), 'PP')}</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                    <Link to={`/profile/${id}/exercise/fatmass`} className='flex justify-between gap-2 items-center px-4 py-4'>
                                        <h6 className='font-semibold'>Seated Cable Rows</h6>
                                        <p className='text-gray-500 '><small>{format(new Date(), 'PP')}</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                    <Link to={`/profile/${id}/exercise/steps`} className='flex justify-between gap-2 items-center px-4 pb-4'>
                                        <h6 className='font-semibold'>Leg Press</h6>
                                        <p className='text-gray-500 '><small>June 26,2023</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                    <Link to={`/profile/${id}/exercise/steps`} className='flex justify-between gap-2 items-center px-4 pb-4'>
                                        <h6 className='font-semibold'>Cable Triceps Pushdown - Rope Attachment</h6>
                                        <p className='text-gray-500 '><small>June 26,2023</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                    <Link to={`/profile/${id}/exercise/steps`} className='flex justify-between gap-2 items-center px-4 pb-4'>
                                        <h6 className='font-semibold'>Incline Dumbbell Curl (Supinated Grip)</h6>
                                        <p className='text-gray-500 '><small>June 26,2023</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                    <Link to={`/profile/${id}/exercise/steps`} className='flex justify-between gap-2 items-center px-4 pb-4'>
                                        <h6 className='font-semibold'>Dumbbell Shoulder Press (Seated)</h6>
                                        <p className='text-gray-500 '><small>June 26,2023</small></p>
                                    </Link>
                                    <hr className="border-gray-200" />
                                </div>
                            </div>
                        </div>

                        <div className='flex flex-col m-5 gap-5'>
                            <div className='flex flex-col m-5 justify-center gap-5'>
                                <div className='flex gap-3 justify-center items-center'>
                                    <FaSliders className='text-lg font-bold' />
                                    <div className='text-gray-500 text-sm font-semibold'>Manually Set 1RM</div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className='p-5  ml-[285px] w-full'>
                <Outlet />
            </div>
        </div>

    );
};

export default ExerciseMetricsLayout;