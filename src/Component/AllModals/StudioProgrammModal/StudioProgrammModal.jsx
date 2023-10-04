/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';
import { BiSolidVideos } from 'react-icons/bi';
import { FaBookOpen, FaDumbbell, FaLink } from 'react-icons/fa';
import { IoDocumentTextOutline } from 'react-icons/io5';
import { RiFileList3Line } from 'react-icons/ri';

const StudioProgrammModal = ({ closeStudioProgramModal }) => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }


    return (
        <div className='p-7'>
            <div>
                <h2 className='text-xl font-semibold'>Create Program</h2>
                <p className='text-sm'>Please select how you would like to start</p>
            </div>
            <div className='grid grid-cols-2 gap-5 mt-8'>
                <button className='flex flex-col gap-1 hover:border-primary justify-center items-center border rounded-md px-2 py-3'>

                    <FaBookOpen className='text-6xl hover:text-primary text-gray-300 ' />

                    <h2 className='font-medium text-lg'>Copy From Library</h2>
                    <p className='text-center px-5 text-sm text-gray-400'>Choose one from your Program library</p>
                </button>
                <button className='flex flex-col gap-1 hover:border-primary justify-center items-center border rounded-md px-2 py-3'>

                    <RiFileList3Line className='text-6xl hover:text-primary text-gray-300 ' />
                    <h2 className='font-medium text-lg'>New Program</h2>
                    <p className='text-center text-sm text-gray-400'>Create you own</p>
                </button>

            </div>
        </div>
    );
};

export default StudioProgrammModal;