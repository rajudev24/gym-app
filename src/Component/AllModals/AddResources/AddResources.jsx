/* eslint-disable no-unused-vars */
import React from 'react';
import { FaLink } from 'react-icons/fa';
import { GrNotes } from "react-icons/gr";
import { RiFileList3Line } from 'react-icons/ri';
import { IoDocumentTextOutline } from "react-icons/io5";

const AddResources = () => {
    return (
        <div className='p-5'>
            <div>
                <h2 className='text-xl font-bold text-blue-950'>Add Resource</h2>
                <p className='text-sm text-gray-600'>Which type of resource do you want to add?</p>
            </div>
            <div className='grid grid-cols-3 gap-8 mt-8'>
                <div className='flex flex-col gap-5 justify-center items-center border rounded-md p-5 h-48'>
                    <div className='flex justify-center border rounded-md p-5 w-20'>
                        <FaLink className='text-3xl text-gray-400' />
                    </div>
                    <h2 className='font-semibold text-blue-950'>Link</h2>
                </div>
                <div className='flex flex-col gap-5 justify-center items-center border rounded-md p-5 h-48'>
                    <div className='flex justify-center border rounded-md p-5 w-20'>
                        <IoDocumentTextOutline className='text-3xl text-gray-400' />
                    </div>
                    <h2 className='font-semibold text-blue-950'>Document</h2>
                </div>
                <div className='flex flex-col gap-5 justify-center items-center border rounded-md p-5 h-48'>
                    <div className='flex justify-center border rounded-md p-5 w-20'>
                        <RiFileList3Line className='text-3xl text-gray-400' />
                    </div>
                    <h2 className='font-semibold text-blue-950'>Form</h2>
                </div>

            </div>
        </div>
    );
};

export default AddResources;