/* eslint-disable no-unused-vars */
import React from 'react';
import { FcViewDetails } from 'react-icons/fc';
import { HiOutlineDocument } from 'react-icons/hi';
import { Link } from 'react-router-dom';

const Documents = () => {
    const data = [1, 2, 3, 4]
    return (
        <div className='p-5 '>

            <div className='flex justify-center items-center w-full h-screen'>
                <div className='flex flex-col gap-2 justify-center items-center'>
                    <div className='flex gap-2 px-4 py-1 shadow border rounded items-center w-48'>
                        <HiOutlineDocument className='text-4xl text-gray-400' />
                        <hr className='rounded border-4 w-32' />
                    </div>
                    <div className='flex gap-2 px-4 py-1 shadow border rounded items-center w-48'>
                        <HiOutlineDocument className='text-4xl text-gray-400' />
                        <hr className='rounded border-4 w-32' />
                    </div>
                    <p className='w-72 text-center text-xs font-semibold text-gray-400 mt-5'>All documents submitted by your client will appear here</p>
                </div>
            </div>



            {/* <div className='flex justify-between items-center px-10 w-4/5 pb-3 text-gray-500 pt-5 text-xs font-semibold'>
                <h2>Document</h2>
                <h2>Submitted Date</h2>
            </div>
            <hr />
            <div className='py-5'>
                {
                    data?.map(element =>
                        <div key={element}>
                            <div className='flex justify-between items-center px-10 w-4/5 text-gray-500 text-xs font-semibold'>
                                <Link className='flex items-center gap-1 '>
                                    <FcViewDetails className='text-3xl' />
                                    <h2 className='font-semibold'>BioFeedback</h2>
                                </Link>
                                <h2 className='text-xs font-semibold'>Mar 03, 2023</h2>
                            </div>
                            <hr className='my-3' />
                        </div>
                    )
                }
            </div> */}
        </div>
    );
};

export default Documents;