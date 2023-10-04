/* eslint-disable no-unused-vars */
import { FocusableItem, Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import axios from 'axios';
import React, { useContext, useEffect, useState } from 'react';
import { FaBell, FaClipboardCheck, FaRocket, FaSearch } from 'react-icons/fa';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Link, useNavigate } from 'react-router-dom';
import { TbRuler2Off } from 'react-icons/tb';

const NavBarRightSide = () => {


    return (
        <div className="flex gap-4 text-gray-400 text-lg items-center">

            {/* {
                showSearch ?
                    <div className='relative'>
                        <div className='w-80 border px-2 rounded-md flex justify-between items-center'>
                            <input
                                onChange={(e) => handleSearch(e)}
                                type="search"
                                className='focus:outline-none w-full text-sm p-2' placeholder='Clietn Name..' />
                            <FaSearch onClick={() => setShowSearch(false)} className="font-bold text-gray-400 cursor-pointer text-sm" />
                        </div>
                        <div className='border w-full h-72 py-2 overflow-y-scroll rounded-md absolute z-50 bg-white'>
                            <div className='px-3 py-2 flex justify-between'>
                                <p className='text-xs font-medium text-gray-600'>Most recent({allClients?.length})</p>
                                <p className='text-xs font-medium text-gray-600'>Hotkey</p>
                            </div>

                            {
                                allClients?.map(client =>
                                    <div key={client?._id}>
                                        <div className="px-3 py-2 flex gap-3 items-center w-52">
                                            <p className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}>
                                                {client?.firstName?.slice(0, 2).toUpperCase()}
                                            </p>
                                            <button onClick={() => handleClient(client)} className="text-base text-black font-semibold">
                                                {client?.firstName + " " + client?.lastName}
                                            </button>
                                        </div>
                                        <hr className='' />
                                    </div>
                                )
                            }
                        </div>
                    </div>
                    :
                    <FaSearch onClick={() => setShowSearch(true)} className="font-bold text-gray-400 cursor-pointer" />
            } */}


            <FaSearch className="font-bold text-gray-400" />
            <FaClipboardCheck className="font-bold" />
            <FaRocket className="font-bold" />
            <FaBell className="font-bold" />
        </div>
    );
};

export default NavBarRightSide;