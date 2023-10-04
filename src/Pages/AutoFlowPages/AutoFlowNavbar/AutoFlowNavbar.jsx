/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { Link, useLocation, useParams } from 'react-router-dom';
import { FaBell, FaClipboardCheck, FaRocket, FaSearch } from 'react-icons/fa';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const AutoFlowNavbar = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [active, setActive] = useState(false)
    const { id } = useParams();

    const location = useLocation();
    const paths = location?.pathname.split('/');
    const path = paths[paths?.length - 1];

    const handleActive = (e) => {
        setActive(e?.target?.checked)
    }

    return (
        <div>
            <div className='flex w-full gap-3 items-center z-50'>
                <div className='flex items-center'>
                    <HiOutlineMenuAlt3 onClick={toggleLeft} className='text-2xl' />
                </div>

                <div className='w-full'>
                    <div className='flex justify-between items-center w-full'>
                        <div className='flex gap-3 items-center'>
                            <h2 className='text-2xl font-bold'>Team Alpha</h2>
                            <div className='flex gap-2 items-center text-sm font-semibold text-gray-400'>
                                <input onChange={handleActive} type="checkbox" className="toggle toggle-sm toggle-primary" />
                                {
                                    active ?
                                        <h2 className='text-primary'>Active</h2>
                                        :
                                        <h2>Inactive</h2>
                                }
                            </div>
                        </div>
                        <NavBarRightSide></NavBarRightSide>
                    </div>

                    <div className='flex text-gray-400 gap-8 text-sm mt-2'>
                        <Link to={`/menu/autoflow/${id}/leaderboard`} className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${path === 'leaderboard' && 'text-secondary font-medium underline underline-offset-8'}`}>Leaderboard</Link>
                        <Link to={`/menu/autoflow/${id}`} className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${path === id && 'text-secondary font-medium underline underline-offset-8'}`}>Training</Link>

                        <Link to={`/menu/autoflow/${id}/autoflowtask`} className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${path === 'autoflowtask' && 'text-secondary font-medium underline underline-offset-8'}`}>Tasks</Link>

                        <Link to={`/menu/autoflow/${id}/autoflowmessage`} className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${path === 'autoflowmessage' && 'text-secondary font-medium underline underline-offset-8'}`}>Auto Message</Link>

                        <Link to={`/menu/autoflow/${id}/autoflowclient`} className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${path === 'autoflowclient' && 'text-secondary font-medium underline underline-offset-8'}`}>Clients</Link>

                        <Link to={`/menu/autoflow/${id}/autoflowsetting`} className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${path === 'autoflowsetting' && 'text-secondary font-medium underline underline-offset-8'}`}>Settings</Link>

                    </div>
                </div>
            </div>
        </div>
    );
};

export default AutoFlowNavbar;