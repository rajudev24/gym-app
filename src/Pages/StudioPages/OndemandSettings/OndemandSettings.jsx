/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaBell, FaClipboardCheck, FaRocket, FaSearch } from 'react-icons/fa';
import phone from '../../../assets/iphone_ondemand_layout.svg'
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const OndemandSettings = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [demand, setDemand] = useState()

    return (
        <div className='w-full'>
            <div className="flex justify-between items-center mx-4 pt-4">
                <div className="flex gap-2 items-center">
                    <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                    <h2 className="text-2xl font-semibold">On-demand Settings</h2>
                </div>
                <NavBarRightSide></NavBarRightSide>
            </div>
            <hr className='mt-3' />
            <div className='flex'>
                <div className='w-3/5 p-5'>
                    <div className='flex justify-between items-center'>
                        <h2 className='text-2xl font-semibold'>General Settings</h2>
                        <button className='bg-primary px-7 py-2 rounded-md text-base font-semibold text-white'>Save</button>
                    </div>
                    <div className='px-5 mt-5'>
                        <label htmlFor="" className='text-xs font-bold'>TITLE</label>
                        <input onChange={(e) => setDemand(e.target.value)} type="text" className='hover:border-primary focus:border-primary focus:outline-none text-lg px-5 py-2 mt-2 w-full border rounded-md' placeholder='On-demand' />
                    </div>
                </div>
                <div className='w-2/5 bg-slate-200'>
                    <div className='p-5 flex justify-center relative'>
                        <h2 className='absolute top-20 left-20 text-xl font-bold'>{demand ? demand : 'On-demand'}</h2>
                        <img src={phone} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OndemandSettings;