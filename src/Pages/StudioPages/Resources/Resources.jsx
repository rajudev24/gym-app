/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import ToggleLeftContext from '../../../Context/ToggleLeftContext';
import { HiOutlineMenuAlt3 } from 'react-icons/hi';
import { FaAngleRight, FaBell, FaClipboardCheck, FaPlus, FaRocket, FaSearch } from 'react-icons/fa';
import { Link } from 'react-router-dom';
import resource from '../../../assets/collection_area_cover_img.png'
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import AddCollectionModal from '../../../Component/AllModals/AddCollectionModal/AddCollectionModal';
import AddResources from '../../../Component/AllModals/AddResources/AddResources';
import NavBarRightSide from '../../../Shared/NavBarRightSide/NavBarRightSide';

const Resources = () => {
    const toggleLeft = useContext(ToggleLeftContext);
    const [openCollection, setOpenCollection] = useState(false);
    const [openResource, setOpenResource] = useState(false);

    // Add Collection Modal----------------------------
    const openCollectionModal = () => setOpenCollection(true);
    const closeCollectionModal = () => setOpenCollection(false);

    // Add Resource Modal----------------------------
    const openResourceModal = () => setOpenResource(true);
    const closeResourceModal = () => setOpenResource(false);


    return (
        <div className='mx-4 pt-4 w-full'>
            {/* Collection modal------ */}
            <Modal open={openCollection} closeIcon={<ImCross />} onClose={closeCollectionModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-1/3', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <AddCollectionModal closeCollectionModal={closeCollectionModal}></AddCollectionModal>
            </Modal>

            {/* Resource modal------ */}
            <Modal open={openResource} closeIcon={<ImCross />} onClose={closeResourceModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-4/5', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <AddResources closeResourceModal={closeResourceModal}></AddResources>
            </Modal>

            <div>
                <div className="flex justify-between items-center">
                    <div className="flex gap-2 items-center">
                        <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
                        <h2 className="text-2xl font-semibold">Resource Collections</h2>
                    </div>
                    <NavBarRightSide></NavBarRightSide>
                </div>
            </div>

            <div className='mt-5 flex justify-between items-center'>
                <div className='bg-base-200 w-72 px-2 py-1 rounded-sm items-center flex'>
                    <FaSearch />
                    <input
                        // onChange={hadleSearch}
                        type="search" placeholder='Search ' className='focus:outline-none px-3 bg-transparent w-full' />
                </div>
                <button
                    onClick={() => openResourceModal()}
                    className="flex gap-2 p-1 px-6 py-2 items-center rounded-md bg-primary hover:bg-secondary duration-300 text-white">
                    <FaPlus />
                    <p className="text-xs font-medium">Add Resource</p>
                </button>
            </div>
            <h2 className='font-medium mt-10'>Resources</h2>
            <div className='text-gray-400 text-sm flex justify-center items-center'>
                <p>Add your first resource</p>
            </div>

            <div>
                <h2 className='mt-16 text-sm font-semibold'>Collections</h2>
                <div className='bg-[#F0F8FF] rounded-md h-52 w-3/5 relative mt-5 p-10'>
                    <img src={resource} alt="" className='w-2/6 absolute bottom-0 left-5' />
                    <div className='flex justify-end'>
                        <div className='w-3/5'>
                            <h2 className='font-bold'>Create a Resource Collection</h2>
                            <p className='text-sm font-semibold text-gray-500'>Empower your client with a collection of resources (links and documents)</p>

                            <div className='flex justify-between'>
                                <button
                                    onClick={() => openCollectionModal()}
                                    className='px-14 py-2 text-sm bg-primary text-white font-medium rounded-md mt-10'>Create</button>
                                <Link to='/studio'
                                    className='flex gap-2 items-center py-1 text-sm text-sky-500 font-medium rounded-md mt-10'>Go to Collection <FaAngleRight /></Link>
                            </div>

                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Resources;