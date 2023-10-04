/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { AiFillCalculator } from 'react-icons/ai';
import { FaUserCircle } from 'react-icons/fa';
import { ImCross } from 'react-icons/im';
import Modal from 'react-responsive-modal';
import CalculateMacros from '../CalculateMacros/CalculateMacros';
import SetMacrosGoal from '../SetMacrosGoal/SetMacrosGoal';

const SetGoalModal = ({ onCloseMacrosModal }) => {
    const [openCalculateMacros, setopenCalculateMacros] = useState(false);
    const [openMacrosGoal, setopenMacrosGoal] = useState(false);

    // Calculate Macros-------------
    const onOpenCalculateModal = () => setopenCalculateMacros(true);
    const onCloseCalculateModal = () => setopenCalculateMacros(false);

    // Set Manually Macros--------------
    const onOpenMacrosGoalModal = () => setopenMacrosGoal(true);
    const onCloseMacrosGoalModal = () => setopenMacrosGoal(false);

    return (
        <div className='p-8 w-[450px]'>
            {/* Calculate Macros Modal------------------------------- */}
            <Modal open={openCalculateMacros} closeIcon={<ImCross />} onClose={onCloseMacrosModal} center classNames={{ modal: "p-0 overflow-visible rounded-md w-2/5", closeButton: "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full" }}>
                <CalculateMacros onCloseCalculateModal={onCloseCalculateModal} ></CalculateMacros>
            </Modal>

            {/* Set Macros Goal Modal------------------------------- */}
            <Modal open={openMacrosGoal} closeIcon={<ImCross />} onClose={onCloseMacrosModal} center classNames={{ modal: "p-0 overflow-visible rounded-md w-2/5", closeButton: "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full" }}>
                <SetMacrosGoal onCloseMacrosGoalModal={onCloseMacrosGoalModal} ></SetMacrosGoal>
            </Modal>


            <h2 className='text-lg font-semibold'>Choose method to set goals</h2>
            <div className='grid grid-cols-2 gap-5 mt-5'>

                <div onClick={onOpenCalculateModal} className='border rounded p-8 flex flex-col gap-3 cursor-pointer justify-center items-center'>
                    <AiFillCalculator className='text-5xl text-red-400' />
                    <h2 className='font-medium'>Auto Calculate</h2>
                </div>

                <div onClick={onOpenMacrosGoalModal} className='border rounded p-8 flex flex-col gap-3 cursor-pointer justify-center items-center'>
                    <FaUserCircle className='text-5xl text-sky-400' />
                    <h2 className='font-medium'>Set Manually</h2>
                </div>

            </div>
        </div>
    );
};

export default SetGoalModal;