/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import resource from '../../../../assets/collection_area_cover_img.png'
import workout from '../../../../assets/add_workout_collections_banner.svg'
import studio from '../../../../assets/add_studio_program_banner.png'
import { Link } from 'react-router-dom';
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import ProfileModal from '../../../../Component/AllModals/ProfileModal/ProfileModal';
import ChooseCollectionModal from '../../../../Component/AllModals/ChooseCollectionModal/ChooseCollectionModal';

const Studio = () => {
    const [openChooseCollection, setOpenChooseCollection] = useState(false);


    // ChooseCollection Modal---------------------------
    const openChooseCollectionModal = () => setOpenChooseCollection(true);
    const closeChooseCollectionModal = () => setOpenChooseCollection(false);


    return (
        <div className='p-5'>
            {/* Profile Modal Start------------------------ */}
            <Modal open={openChooseCollection} closeIcon={<ImCross />} onClose={closeChooseCollectionModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-1/2', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                <ChooseCollectionModal closeChooseCollectionModal={closeChooseCollectionModal}></ChooseCollectionModal>
            </Modal>


            <div>
                <h2 className='text-xl font-semibold'>Resource Collections</h2>
                <div className='bg-[#F0F8FF] rounded-md h-60 w-3/5 relative mt-5 p-10'>
                    <img src={resource} alt="" className='w-2/5 absolute bottom-0 left-5' />
                    <div className='flex justify-end'>
                        <div className='w-1/2'>
                            <h2 className='font-bold'>Assign a Resource Collection</h2>
                            <p className='text-sm font-semibold text-gray-500'>Empower your client with a collection of resources (links and documents)</p>

                            <button onClick={openChooseCollectionModal} className='px-14 py-2 text-sm bg-primary text-white font-medium rounded-md mt-10'>Choose Collection</button>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='text-xl font-semibold'>Workout Collections</h2>
                <div className='bg-[#FFF5F0] rounded-md h-60 w-3/5 relative mt-5 p-10'>
                    <img src={workout} alt="" className='w-1/2 absolute bottom-0 left-8' />
                    <div className='flex justify-end'>
                        <div className='w-1/2'>
                            <h2 className='font-bold'>Assign a Workout Collection</h2>
                            <p className='text-sm font-semibold text-gray-500'>Offer on-demand workouts that your clients can browse and start anytime</p>

                            <Link to='/studio/workout'>
                                <button className='px-14 py-2 text-sm bg-primary text-white font-medium rounded-md mt-10'>Choose Collection</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
            <div className='mt-10'>
                <h2 className='text-xl font-semibold'>Workout Collections</h2>
                <div className='bg-[#f6f7f7] rounded-md h-60 w-3/5 relative mt-5 p-10'>
                    <img src={studio} alt="" className='w-1/2 absolute bottom-0 left-8' />
                    <div className='flex justify-end'>
                        <div className='w-1/2'>
                            <h2 className='font-bold'>Add Studio Programs</h2>
                            <p className='text-sm font-semibold text-gray-500'>Add flexible programs your client can start and stop anytime, without you lifting a finger.</p>

                            <Link to='/studio/studioprogram'>
                                <button className='px-14 py-2 text-sm bg-primary text-white font-medium rounded-md mt-10'>Add a Studio Program</button>
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Studio;