/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from 'react';
import { HiOutlineMenuAlt1, HiOutlineMenuAlt3 } from 'react-icons/hi';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { FaAngleDown, FaBell, FaBook, FaClipboardCheck, FaCog, FaLink, FaPlus, FaRegEnvelope, FaRocket, FaSearch, FaUser } from 'react-icons/fa';
import banner from '../../../assets/autoflow_banner.png'
import { Link } from 'react-router-dom';
import { PiTextAlignCenter } from 'react-icons/pi';
import { FaUsersRectangle } from 'react-icons/fa6';
import axios from 'axios';
import { AuthContext } from '../../../Context/AuthProvider/AuthProvider';
import { MdStackedLineChart } from 'react-icons/md';
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import OnDemandWorkoutModal from '../../../Component/AllModals/OnDemandWorkoutModal/OnDemandWorkoutModal';
import AutoFlowModal from '../../../Component/AllModals/AutoFlowModal/AutoFlowModal';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const AutoFlow = () => {
    const [search, setSearch] = useState(false);
    const [openAutoflow, setOpenAutoflow] = useState(false);

    const toggleLeft = useContext(ToggleLeftContext);


    // Add Workout Modal----------------------------
    const openAutoflowModal = () => setOpenAutoflow(true);
    const closeAutoflowModal = () => setOpenAutoflow(false);


    const allClient = [1]

    return (
        <div className='w-full'>

            {/* Workout modal------ */}
            <Modal open={openAutoflow} closeIcon={<ImCross />} onClose={closeAutoflowModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-1/2', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <AutoFlowModal closeAutoflowModal={closeAutoflowModal}></AutoFlowModal>
            </Modal>

            <div className="flex justify-between items-center mx-4 pt-4">
                <div className="flex gap-2 items-center">
                    {/* <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" /> */}
                    <h2 className="text-2xl font-semibold">Autoflow</h2>
                </div>
                <NavBarRightSide></NavBarRightSide>
            </div>

            <div className='bg-sky-100 mx-5 mt-10 rounded-lg pt-10 px-10 relative'>
                <div className='z-50 w-1/2 absolute pr-5'>
                    <p className='font-medium text-sm'>AUTOFLOW</p>
                    <h2 className='text-2xl font-bold pb-2'>Automated program delivery at Scale</h2>
                    <p className='text-sm'>Manage your group training programs with ease. Schedule workouts, tasks, metric and progress photo check-ins, and announcement message</p>
                    <div className='mt-3 flex gap-5'>
                        <Link className='text-primary flex gap-1 items-center font-bold text-sm hover:underline'>
                            <FaBook className='text-base' />
                            <h2>How Autoflow works</h2>
                        </Link>
                        <Link className='text-primary flex gap-1 items-center font-bold text-sm hover:underline'>
                            <FaBook className='text-base' />
                            <h2>How Leaderboard works</h2>
                        </Link>
                    </div>

                    <div className='flex gap-4 mt-5 items-center'>
                        <button onClick={() => openAutoflowModal()} className="flex gap-2 p-1 px-6 py-2 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                            <FaPlus />
                            <p className="text-sm font-medium">Add New Autoflow</p>
                        </button>
                        {
                            search ?
                                <div>
                                    <div className='bg-white px-4 py-2 border rounded-md items-center flex'>
                                        <FaSearch className='text-lg' />
                                        <input type="search" placeholder='Search by Keyword or Name ' className='focus:outline-none px-3 bg-transparent w-56 text-sm' />
                                    </div>
                                </div>
                                :
                                <button onClick={() => setSearch(!search)}>
                                    <div className="flex gap-2 p-2 items-center rounded-md border border-primary text-secondary">
                                        <FaSearch />
                                    </div>
                                </button>

                        }

                    </div>

                </div>
                <div className='flex justify-end'>
                    <img src={banner} alt="" className='w-3/5 object-cover' />
                </div>
            </div>

            {/* AutoFlow Table------------- */}
            <div className='mt-10 p-5'>
                <div className="">
                    <table className="table table-sm table-pin-rows table-pin-cols overflow-x-scroll">
                        {/* head */}
                        <thead>
                            <tr>
                                {/* <th>SL</th> */}
                                <th className='flex items-center gap-1 z-50'><MdStackedLineChart /> Autoflow</th>
                                <th>
                                    Type
                                </th>
                                <th>
                                    Clients
                                </th>
                                <th>
                                    Most Recent
                                </th>
                                <th>
                                    Owner
                                </th>
                            </tr>
                        </thead>
                        <tbody className='text-gray-500'>
                            {
                                allClient?.map((client, i) =>
                                    <tr key={i}>
                                        <th>
                                            <Link to={`/menu/autoflow/${1}`} className='flex gap-3 items-center'>
                                                2 Week Fitness Challenge - Demo
                                            </Link>
                                        </th>
                                        <td>
                                            <div className='flex gap-4 items-center text-xs font-semibold'>
                                                <h2>BY DAY SEQUENCE</h2>
                                                <FaCog />
                                            </div>
                                        </td>
                                        <td className='flex justify-start'>
                                            <div className='text-center'>
                                                <h2 className='text-lg font-semibold'>0</h2>
                                                <p>Total</p>
                                            </div>
                                        </td>
                                        <td>--</td>
                                        <td>Pintu Roy</td>

                                    </tr>
                                )
                            }

                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default AutoFlow;