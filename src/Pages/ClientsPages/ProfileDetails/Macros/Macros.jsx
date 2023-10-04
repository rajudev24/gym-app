/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { GiAppleSeeds } from "react-icons/gi";
import emptyMacros from '../../../../assets/empty_food_journal.svg'
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import ViewExerciseModal from '../../../../Component/AllModals/ViewExerciseModal/ViewExerciseModal';
import SetGoalModal from '../../../../Component/AllModals/SetGoalModal/SetGoalModal';

const Macros = () => {
    const [openMacros, setopenMacros] = useState(false);

    const onOpenMacrosModal = () => setopenMacros(true);
    const onCloseMacrosModal = () => setopenMacros(false);



    return (
        <div className='p-3 w-5/6 mt-10 mb-5 mx-auto min-h-screen'>
            {/* Set Goal Modal------------------------------- */}
            <Modal open={openMacros} closeIcon={<ImCross />} onClose={onCloseMacrosModal} center classNames={{ modal: "p-0 overflow-visible rounded-md ", closeButton: "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full" }}>
                <SetGoalModal onCloseMacrosModal={onCloseMacrosModal}></SetGoalModal>
            </Modal>


            <div className='flex justify-between'>
                <h2 className='text-2xl font-semibold'>Macros Report</h2>
                <div className='flex gap-2 items-center bg-[#F2F9FF] px-3 py-2 rounded-md'>
                    <GiAppleSeeds className='text-red-600 text-3xl bg-white p-1 rounded-sm shadow-lg' />
                    <h2 className='font-semibold text-sm'>Your client can integrate MyfitnessPal / Cronometer to pull in daily macros data</h2>
                </div>
            </div>
            <div className='flex flex-col gap-5 justify-center items-center h-screen'>
                <div className='flex flex-col gap-3 justify-center items-center'>
                    <img src={emptyMacros} alt="" />
                    <p className='text-sm text-gray-400 w-2/3 text-center'>Macros tracking for this client hasn't been set up yet!</p>
                </div>
                <div>
                    <button onClick={onOpenMacrosModal} className='bg-primary px-20 text-sm py-2 rounded-md font-semibold text-white'>Set goal</button>
                </div>
            </div>
        </div>
    );
};

export default Macros;