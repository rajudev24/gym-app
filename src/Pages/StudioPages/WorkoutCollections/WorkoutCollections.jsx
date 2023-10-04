/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { FaBell, FaBook, FaClipboardCheck, FaPlus, FaRocket, FaSearch } from 'react-icons/fa';
import banner from '../../../assets/workout_collections_banner.5d74e23e.svg'
import { Link } from 'react-router-dom';
import { FaAngleDown } from 'react-icons/fa6';
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import AddCollectionModal from '../../../Component/AllModals/AddCollectionModal/AddCollectionModal';
import WorkoutCollection from '../../../Component/AllModals/WorkoutCollection/WorkoutCollection';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const WorkoutCollections = () => {
    const [search, setSearch] = useState(false);
    const [hide, setHide] = useState(false);
    const toggleLeft = useContext(ToggleLeftContext);
    const [openCollection, setOpenCollection] = useState(false);


    // Add Collection Modal----------------------------
    const openCollectionModal = () => setOpenCollection(true);
    const closeCollectionModal = () => setOpenCollection(false);


    return (
        <div className='mx-4 pt-4 w-full'>
            {/* Collection modal------ */}
            <Modal open={openCollection} closeIcon={<ImCross />} onClose={closeCollectionModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-1/3', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <WorkoutCollection closeCollectionModal={closeCollectionModal}></WorkoutCollection>
            </Modal>
            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Workout Collections</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
            </div>
            {
                hide &&
                <div className='mt-5 flex justify-between items-center'>
                    <div className='bg-base-200 w-72 px-2 py-1 rounded-sm items-center flex'>
                        <FaSearch />
                        <input
                            // onChange={hadleSearch}
                            type="search" placeholder='Search ' className='focus:outline-none px-3 bg-transparent w-full' />
                    </div>
                    <button
                        onClick={() => openCollectionModal()}
                        className="flex gap-2 p-1 px-6 py-2 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                        <FaPlus />
                        <p className="text-xs font-medium">Create New Collection</p>
                    </button>
                </div>
            }

            <div>
                {
                    !hide &&
                    <div className='bg-[#F0F8FF] rounded-md w-full relative mt-10 p-8'>
                        <div className='flex justify-start'>
                            <div className='z-50 w-1/2 pr-5'>
                                <p className='font-medium text-xs'>WORKOUT COLLECTIONS</p>
                                <h2 className='text-2xl font-bold pb-2'>Netflix-style Training Portal</h2>
                                <div className='text-sm'>
                                    <p>Create an on-demand searchable workout directory with different categories that your clients can browse anytime</p>
                                    <span className='mt-2 flex gap-5'>
                                        <Link className='text-primary flex gap-1 items-center font-bold text-sm hover:underline'>
                                            <FaBook className='text-base' />
                                            <h2>Learn more</h2>
                                        </Link>
                                    </span>
                                </div>

                                <div className='flex gap-4 mt-3 items-center'>
                                    <button
                                        onClick={() => openCollectionModal()}
                                        className="flex gap-2 p-1 px-6 py-3 items-center rounded-md bg-primary text-white">
                                        <FaPlus />
                                        <p className="text-xs font-medium">Create New Collection</p>
                                    </button>
                                    {
                                        search ?
                                            <div>
                                                <div className='bg-white px-4 py-3 rounded-md items-center flex'>
                                                    <FaSearch className='text-lg' />
                                                    <input type="search" placeholder='Search by Keyword or Name ' className='focus:outline-none px-3 bg-transparent w-56 text-sm' />
                                                </div>
                                            </div>
                                            :
                                            <button onClick={() => setSearch(!search)}>
                                                <div className="flex gap-2 p-3 items-center rounded-md border border-primary text-primary">
                                                    <FaSearch />
                                                </div>
                                            </button>
                                    }
                                </div>
                            </div>
                        </div>
                        <img src={banner} alt="" className='w-5/12 absolute bottom-0 right-5' />
                        <button onClick={() => setHide(true)} className='absolute bottom-3 right-1/2 bg-gray-100 px-5 py-1 text-sm rounded-sm flex gap-1 items-center'>Hide <FaAngleDown /></button>
                    </div>
                }


                <div className='w-1/4 mx-auto my-10 text-gray-400 text-sm flex flex-col gap-5 justify-center items-center'>
                    <img src="https://app.everfit.io/static/media/first_create_new_workout_collections.febd9cce.svg" alt="" className='w-1/2' />
                    <p>
                        First, create your on-demand workouts
                        Then add them to your new Collections
                    </p>
                </div>
            </div>
        </div>
    );
};

export default WorkoutCollections;