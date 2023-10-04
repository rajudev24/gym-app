/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidVideos } from 'react-icons/bi';
import { FaDumbbell, FaLink } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { RiFileList3Line } from 'react-icons/ri';

const OnDemandWorkoutModal = ({ closeWorkoutModal }) => {

    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-semibold text-blue-950'>Create an on-demand workout</h2>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-8'>
                <button className='flex flex-col gap-2 hover:border-primary justify-center items-center border rounded-md px-2 py-3'>
                    <div className='flex justify-center border rounded-full p-3 bg-slate-200'>
                        <FaDumbbell className='text-3xl hover:text-primary text-gray-400 -rotate-45' />
                    </div>
                    <h2 className='font-medium text-lg'>Regular Workout</h2>
                    <p className='text-center px-5'>Add a workout from your Library that your clients can track</p>
                </button>
                <button className='flex flex-col gap-2 hover:border-primary justify-center items-center border rounded-md px-2 py-3'>
                    <div className='flex justify-center border rounded-full p-3 bg-slate-200'>
                        <BiSolidVideos className='text-3xl hover:text-primary text-gray-400 ' />
                    </div>
                    <h2 className='font-medium text-lg'>Video Workout</h2>
                    <p className='text-center'>Add a video for on-demand access, perfect for skills training or recorded workout routines</p>
                </button>

            </div>
        </div>
    );
};

export default OnDemandWorkoutModal;