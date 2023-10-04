/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaCamera, FaClipboardCheck, FaRegUser, FaRocket, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import { MdOutlineWatchLater } from 'react-icons/md';
import TimezoneSelect from 'react-timezone-select'
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';


const AccountDetails = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )


    return (
        <div className='w-full relative mb-10'>
            <div className='w-full pr-[280px] fixed top-0 z-10'>
                <div className="px-4 pt-4 pb-3 flex justify-between items-center bg-white">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Account Details</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr />
            </div>
            <div className='p-10 mt-10 overflow-y-scroll'>
                <div className='flex gap-10 w-full'>
                    <div className='w-1/5 flex flex-col gap-5'>
                        <div className='text-xl font-semibold flex items-center gap-2'>
                            <FaRegUser className='text-gray-500' />
                            <h2>Basic Info</h2>
                        </div>
                        <div>
                            <label
                                htmlFor="upload-photo"
                                className="label w-24 h-24 flex flex-col justify-center items-center cursor-pointer bg-green-300 border border-gray-400 rounded-full mt-2 relative">
                                <h2 className='text-4xl font-bold text-white'>MR</h2>
                                <div className='absolute w-6 h-6 p-1 flex justify-center items-center right-2 bottom-0 bg-gray-400 rounded-full'>
                                    <FaCamera className='text-white text-sm' />
                                </div>
                            </label>
                            <input
                                // onChange={handleImage}
                                type="file"
                                id="upload-photo"
                                className="px-3 py-3 border w-full rounded-md hidden"
                            />
                        </div>
                    </div>
                    <div className='w-4/5'>
                        <div className='grid grid-cols-2 gap-10 pr-10'>
                            <div className='text-xs'>
                                <label>FIRST NAME</label>
                                <div>
                                    <input placeholder='First_Name' className='px-3 py-2 border border-primary mt-2 focus:outline-none w-full rounded-md font-semibold' />
                                </div>
                            </div>
                            <div className='text-xs'>
                                <label>LAST NAME</label>
                                <div>
                                    <input placeholder='First_Name' className='px-3 py-2 border border-primary mt-2 focus:outline-none w-full rounded-md font-semibold' />
                                </div>
                            </div>
                            <div className='text-xs'>
                                <label>BIRTHDATE</label>
                                <div>
                                    <input type='date' placeholder='Birthdate' className='px-3 py-2 border mt-2 focus:outline-none w-full rounded-md font-semibold' />
                                </div>
                            </div>
                            <div className='text-xs'>
                                <label>PHONE</label>
                                <div>
                                    <input type='phone' placeholder='Phone' className='px-3 py-2 border mt-2 focus:outline-none w-full rounded-md font-semibold' />
                                </div>
                            </div>
                            <div className='flex gap-5'>
                                <div className="form-control">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            // onChange={handleGender}
                                            // checked={gender === 'male'}
                                            checked
                                            value='male'
                                            type="radio" name="radio-2"
                                            className="radio w-5 h-5 radio-primary" />
                                        <span className="label-text">Male</span>
                                    </label>
                                </div>
                                <div className="form-control">
                                    <label className="flex items-center gap-2 cursor-pointer">
                                        <input
                                            // onChange={handleGender}
                                            value='female'
                                            // checked={gender === 'female'}
                                            type="radio" name="radio-2"
                                            className="radio w-5 h-5 radio-primary" />
                                        <span className="label-text">Female</span>
                                    </label>
                                </div>

                            </div>
                        </div>
                        <hr className='my-8' />
                        <div>
                            <div className='text-sm w-1/2'>
                                <label>Email:</label>
                                <div>
                                    <input className='px-3 py-2 mt-2 border focus:outline-none w-full rounded-md font-semibold' disabled />
                                </div>
                            </div>
                            <div className='mt-8 flex gap-5 font-medium'>
                                <Link className='px-5 py-2 rounded-full border'>Change Email</Link>
                                <Link className='px-5 py-2 rounded-full border'>Change Password</Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr className='ml-5' />
            <div className='p-5 '>
                <div className='flex gap-10 w-full items-baseline'>
                    <div className='flex gap-2 items-center w-1/5'>
                        <MdOutlineWatchLater className='text-2xl text-gray-500' />
                        <h2 className='text-xl font-semibold'>Timezone</h2>
                    </div>

                    <div className='flex gap-20 w-4/5'>
                        <div className='flex flex-col gap-8'>
                            <div className='flex items-baseline'>
                                <div className='mr-24'>
                                    <TimezoneSelect
                                        className='w-96'
                                        value={selectedTimezone}
                                        onChange={setSelectedTimezone}
                                    />
                                    <div className='flex items-center gap-3 mt-5'>
                                        <input type="checkbox" className="toggle toggle-primary" />
                                        <h2 className='text-sm font-semibold'>Auto adjust timezone based on location</h2>
                                    </div>
                                </div>
                                <div>
                                    <button className='border px-6 py-1 border-primary rounded-md'>Save</button>
                                </div>
                            </div>
                            <div className='flex justify-between mt-4'>
                                <div>
                                    <h2 className='text-sm font-semibold'>Date Settings</h2>
                                    <h2 className='text-sm text-gray-500'>Current date format</h2>
                                </div>
                                <select className="select select-bordered w-56 focus:outline-none hover:border-primary focus:border-primary">
                                    <option>MM/DD/YYYY</option>
                                    <option>DD/MM/YYYY</option>
                                </select>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountDetails;