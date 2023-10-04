/* eslint-disable no-unused-vars */
import React from 'react';
import { FaSearch } from 'react-icons/fa';

const ChooseCollectionModal = () => {
    return (
        <div className='p-5'>
            <div className='flex justify-between'>
                <h2 className='text-xl font-medium'>Choose a Collection</h2>
                <div className="bg-base-200 w-72 px-2 py-1 rounded-sm items-center flex">
                    <FaSearch className='text-gray-400' />
                    <input
                        // onChange={hadleSearch}
                        type="search"
                        placeholder="Search... "
                        className="focus:outline-none px-3 bg-transparent w-full"
                    />
                </div>
            </div>
            <h2 className='font-medium mt-10 mb-5'>All Collections (3)</h2>
            <div className='flex flex-col gap-4 h-[300px] overflow-y-scroll pr-4'>
                {
                    [1, 2, 3, 4]?.map(item =>
                        <div key={item} className='border rounded p-5'>
                            <h2 className='font-semibold'>Test</h2>
                            <div className='text-xs font-semibold text-gray-500 flex gap-2 items-center'>
                                <p>Available for 2 Clients</p>
                                <p>Resources 0</p>
                            </div>
                        </div>
                    )
                }
            </div>
            <hr className='mt-5' />
            <div className='flex justify-end px-5'>
                <div className='flex gap-3 py-2'>
                    <button className='px-6 py-1 rounded border'>Cancel</button>
                    <button className='px-6 py-1 rounded border bg-primary text-white'>Add</button>
                </div>
            </div>
        </div>
    );
};

export default ChooseCollectionModal;