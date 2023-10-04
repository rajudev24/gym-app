/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaClipboardCheck, FaRocket, FaSearch } from 'react-icons/fa';
import TimezoneSelect from 'react-timezone-select'
import Select from 'react-select'
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const TeamSettings = () => {
    const toggleLeft = useContext(ToggleLeftContext);

    const [selectedTimezone, setSelectedTimezone] = useState(
        Intl.DateTimeFormat().resolvedOptions().timeZone
    )

    const options = [
        { value: 'royPintu@gmail.com', label: 'roypintu@gmail.com' },
        { value: 'chocolate', label: 'Chocolate' },
        { value: 'strawberry', label: 'Strawberry' },
        { value: 'vanilla', label: 'Vanilla' }
    ]


    return (
        <div className='w-full'>
            <div className='w-full'>
                <div className="mx-4 pt-4 flex justify-between items-center bg-white">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Team Settings</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
                <hr className='mt-3' />
            </div>
            <div className='p-5'>
                <form className='flex flex-col gap-5'>
                    <div className='flex flex-col'>
                        <label className='text-[10px] text-gray-500 ml-3 font-medium'>WORKSPACE NAME</label>
                        <input placeholder='Work space Name' defaultValue="Masud Rana's Workspace" className='w-96 font-semibold border px-5 py-2 rounded-md focus:outline-none' />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[10px] text-gray-500 ml-3 font-medium'>TIMEZONE</label>
                        <TimezoneSelect
                            className='w-96'
                            value={selectedTimezone}
                            onChange={setSelectedTimezone}
                        />
                    </div>
                    <div className='flex flex-col'>
                        <label className='text-[10px] text-gray-500 ml-3 font-medium'>BILLING EMAIL</label>
                        <Select defaultValue={options[0]} options={options} className='w-96 font-semibold focus:outline-none' />
                    </div>
                    <div>
                        <input type="submit" value="Save" className='px-10 rounded-sm text-white py-1 bg-primary' />
                    </div>
                </form>
            </div>
        </div>
    );
};

export default TeamSettings;