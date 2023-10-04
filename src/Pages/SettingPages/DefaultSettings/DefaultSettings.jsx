/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaBook, FaCamera, FaClipboardCheck, FaDumbbell, FaRocket, FaSearch } from 'react-icons/fa';
import { TfiRulerAlt2 } from 'react-icons/tfi';
import { MdOutlineListAlt, MdOutlineSportsGymnastics, MdOutlineWatchLater } from 'react-icons/md';
import TimezoneSelect from 'react-timezone-select'
import { Link } from 'react-router-dom';
import { FaBookOpenReader } from 'react-icons/fa6';
import { CiAvocado } from 'react-icons/ci';
import { BiLock, BiPulse, BiSolidMessageDetail, BiSolidPieChartAlt2 } from 'react-icons/bi';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';


const DefaultSettings = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )


    return (
        <div className='w-full relative'>

            {/* Nav bar-------------- */}
            <div className='w-full pr-[280px] fixed top-0 z-10'>
                <div className="px-4 pt-3 pb-3 flex justify-between items-center bg-white">
                    <div className="flex gap-2 items-baseline">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <div>
                            <h2 className="text-2xl font-semibold">Default Client Settings</h2>
                            <p className='text-sm'>For new clients</p>
                        </div>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr />
            </div>

            <div className='flex justify-center items-center min-h-screen'>
                <div className='flex w-full'>

                    {/* Left Side---------------- */}
                    <div className='relative'>
                        <div className='w-48 py-8 border-r min-h-screen fixed top-20 px-5'>
                            <h2 className='text-lg font-bold px-3'>Settings</h2>
                            <div className='flex flex-col gap-2 justify-start text-left mt-5'>
                                <a href='#unit' className='text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md'>Units</a>
                                <a href='#feature' className='text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md'>Features</a>
                                <a href='#workout' className='text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md'>Workout Settings</a>
                            </div>
                        </div>
                    </div>

                    {/* Right Side------------ */}
                    <div>
                        {/* units section------------- */}
                        <div id='unit' className='ml-48 p-5 mt-20'>
                            <div className='flex gap-36 items-baseline'>
                                <div className='flex gap-3 items-center'>
                                    <TfiRulerAlt2 className='text-xl text-gray-500 -rotate-90' />
                                    <h2 className='text-xl font-semibold'>Units</h2>
                                </div>
                                <div className='flex gap-20'>
                                    <div className='flex gap-5'>
                                        <ul className='flex flex-col gap-3'>
                                            <li className='text-[10px] text-gray-400 font-semibold'>WEIGHT UNIT</li>
                                            <li className='flex gap-1 items-center'>
                                                <input type="radio" name="radio-2" className="radio-primary w-4 h-4 p-0" />
                                                <h2 className='text-sm font-semibold'>Metric (kg)</h2>
                                            </li>
                                            <li className='flex gap-1 items-center'>
                                                <input type="radio" name="radio-2" className="radio-primary w-4 h-4 p-0" />
                                                <h2 className='text-sm font-semibold'>US/Imperial (lb)</h2>
                                            </li>

                                        </ul>
                                        <ul className='flex flex-col gap-3'>
                                            <li className='text-[10px] text-gray-400 font-semibold'>DISTANCE UNIT</li>
                                            <li className='flex gap-1 items-center'>
                                                <input type="radio" name="radio-3" className="radio-primary w-4 h-4 p-0" />
                                                <h2 className='text-sm font-semibold'>Metric (km)</h2>
                                            </li>
                                            <li className='flex gap-1 items-center'>
                                                <input type="radio" name="radio-3" className="radio-primary w-4 h-4 p-0" />
                                                <h2 className='text-sm font-semibold'>US/Imperial (miles)</h2>
                                            </li>
                                        </ul>
                                        <ul className='flex flex-col gap-3'>
                                            <li className='text-[10px] text-gray-400 font-semibold'>LENGTH UNIT</li>
                                            <li className='flex gap-1 items-center'>
                                                <input type="radio" name="radio-4" className="radio-primary w-4 h-4 p-0" />
                                                <h2 className='text-sm font-semibold'>US/Imperial (miles)</h2>
                                            </li>
                                            <li className='flex gap-1 items-center'>
                                                <input type="radio" name="radio-4" className="radio-primary w-4 h-4 p-0" />
                                                <h2 className='text-sm font-semibold'>US/Imperial (inch)</h2>
                                            </li>
                                        </ul>
                                    </div>
                                    <div>
                                        <button className='border px-6 py-1 border-primary rounded-md'>Save</button>
                                    </div>
                                </div>
                            </div>
                            <hr className='my-10' />
                        </div>



                        {/* Features------------------ */}
                        <div id='feature' className='ml-48 p-5 '>
                            <div className='flex gap-28 items-baseline'>
                                <div className='flex gap-2 items-center'>
                                    <MdOutlineListAlt className='text-2xl text-gray-500' />
                                    <h2 className='text-xl font-semibold'>Features</h2>
                                </div>

                                <div className='flex gap-14'>
                                    <div className='flex flex-col gap-5'>
                                        <p className='text-sm'>Create a custom experience for every client by disabling or enabling certain features. When a feature is disabled, it will not appear on your client's mobile app</p>
                                        <Link className='text-primary flex gap-2 items-center'>
                                            <FaBook />
                                            <p className='text-sm font-semibold hover:underline'>How to disable/enable features </p>
                                        </Link>

                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <FaDumbbell className='text-2xl text-gray-500 -rotate-45' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Training</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Assign workouts and track training progress</p>
                                                    <div className='flex gap-2 items-center'>
                                                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                                                        <p className='text-sm font-semibold'>Allow client to leave workout comments</p>
                                                    </div>
                                                    <div className='flex gap-2 items-center'>
                                                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                                                        <p className='text-sm font-semibold'>Show rest day message</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>
                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <MdOutlineSportsGymnastics className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Log Activities</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Let your client add extra workouts or unassigned activities</p>
                                                    <div className='flex gap-2 items-center'>
                                                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                                                        <p className='text-sm font-semibold'>Allow client to leave activity comments</p>
                                                    </div>
                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>

                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <FaBookOpenReader className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Tasks</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Schedule to-dos and deliver education material</p>
                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>


                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <CiAvocado className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Food Journal</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Monitor client food intake and easily provide feedback</p>

                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>
                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <BiSolidPieChartAlt2 className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Macros</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Track client nutrition using macros and daily calories</p>

                                                    <div className='flex gap-2 items-center'>
                                                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                                                        <p className='text-sm font-semibold'>Allow client to adjust their own goal</p>
                                                    </div>

                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>
                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <BiSolidMessageDetail className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Messages</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Message your client directly through the platform</p>

                                                    <div className='flex gap-2 items-center'>
                                                        <input type="checkbox" name="" id="" className='w-4 h-4' />
                                                        <p className='text-sm font-semibold'>Allow client to send voice messages</p>
                                                    </div>

                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>
                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <FaCamera className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Progress Photo</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Visualize improvement with before and after photos</p>
                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>
                                        <div className='flex justify-between items-start w-full'>
                                            <div className='flex gap-10'>
                                                <div className='bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center'>
                                                    <BiPulse className='text-2xl text-gray-500 ' />
                                                </div>
                                                <div className='flex flex-col gap-3'>
                                                    <h2 className='text-base font-bold'>Body Metrics</h2>
                                                    <p className='text-xs font-semibold text-gray-400'>Track client progress using various body metrics</p>
                                                    <Link className='text-sm text-primary font-semibold hover:underline'>Manage Metrics</Link>
                                                </div>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>
                                    </div>
                                    <div>
                                        <button className='border px-6 py-1 border-primary rounded-md'>Save</button>
                                    </div>
                                </div>

                            </div>
                            <hr className='my-10' />
                        </div>

                        {/* Workout section------------------ */}
                        <div id='workout' className='ml-48 p-5 '>
                            <div className='flex gap-10 items-start'>
                                <div className='flex gap-2 items-start'>
                                    <MdOutlineListAlt className='text-4xl text-gray-500' />
                                    <h2 className='text-xl font-semibold'>Client workout settings</h2>
                                </div>

                                <div className='flex gap-14'>
                                    <div className='flex flex-col gap-5 '>
                                        <div className='flex flex-col gap-2'>
                                            <h2 className='text-sm font-semibold'>Date range visible to client</h2>
                                            <p className='text-sm'>Choose range you would like your clients to have access to on their training calendar</p>
                                        </div>
                                        <div className='flex items-start justify-between'>
                                            <div>
                                                <h2 className='font-semibold'>Allow clients to rearrange workouts</h2>
                                                <p className='text-xs font-semibold text-gray-400'>Grant your clients flexibility to rearrange workouts within their visible range</p>
                                            </div>
                                            <input type="checkbox" className="toggle toggle-primary" />
                                        </div>

                                    </div>
                                    <div>
                                        <button className='border px-6 py-1 border-primary rounded-md'>Save</button>
                                    </div>
                                </div>

                            </div>
                            <hr className='my-10' />
                        </div>

                    </div>
                </div >
            </div>
        </div>
    );
};

export default DefaultSettings;