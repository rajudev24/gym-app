/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaSearch, FaUserPlus } from 'react-icons/fa';
import Loading from '../../../Shared/Loading/Loading';

const AutoFlowClient = () => {
    const [loading, setLoading] = useState(false);


    return (
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <div className='flex gap-4 items-center'>
                    <div className='bg-base-200 w-72 px-3 py-1 border border-primary rounded-sm items-center flex'>
                        <FaSearch className='text-gray-500' />
                        <input
                            // onChange={hadleSearch}
                            type="search" placeholder='Search' className='focus:outline-none  px-3 bg-transparent w-full' />
                    </div>
                    <button className='px-3 py-1 border text-gray-500 rounded-sm flex gap-2 items-center'>
                        <FaUserPlus />
                        Clients
                    </button>
                </div>
                <div className='flex gap-x-5'>
                    <button className='text-center pb-3 w-28 focus:text-primary focus:border-primary border-b-4'>
                        <h2 className='text-4xl'>0</h2>
                        <p className='text-[10px] font-semibold'>ACTIVE</p>
                    </button>
                    <button className='text-center pb-3 w-28 focus:text-primary focus:border-primary border-b-4'>
                        <h2 className='text-4xl'>0</h2>
                        <p className='text-[10px] font-semibold'>PAUSED</p>
                    </button>
                    <button className='text-center pb-3 w-28 focus:text-primary focus:border-primary border-b-4'>
                        <h2 className='text-4xl'>0</h2>
                        <p className='text-[10px] font-semibold'>WATTING TO START</p>
                    </button>
                    <button className='text-center pb-3 w-28 focus:text-primary focus:border-primary border-b-4'>
                        <h2 className='text-4xl'>0</h2>
                        <p className='text-[10px] font-semibold'>TOTAL</p>
                    </button>
                </div>
            </div>
            <div className='mt-8'>
                <div className="overflow-x-auto mt-8 h-96">
                    {loading ? (
                        <Loading />
                    ) : (
                        <table className="table table-xs table-pin-rows table-pin-cols">
                            <thead>
                                <tr>
                                    <th className='flex gap-5 items-center'>
                                        <input type="checkbox" className="checkbox checkbox-primary w-5 h-5 rounded-md" />
                                        Name
                                    </th>
                                    <th>Status</th>
                                    <th>Traning</th>
                                    <th>Task</th>
                                    <th>Progress</th>
                                    <th>Start Date</th>
                                    <th>End Date</th>
                                </tr>
                            </thead>
                            <tbody className="">
                                {
                                    [1, 2, 3, 4, 5,]?.map(item =>
                                        <tr key={item}>
                                            <th className='flex gap-5 items-center my-2'>
                                                <input type="checkbox" className="checkbox checkbox-primary w-5 h-5 rounded-md" />
                                                Pintu Roy
                                            </th>
                                            <td>
                                                Pending
                                            </td>
                                            <td>
                                                traning --
                                            </td>
                                            <td>
                                                task
                                            </td>
                                            <td> Progress </td>
                                            <td>
                                                Aug,08
                                            </td>
                                            <td>
                                                Aut-20
                                            </td>
                                        </tr>
                                    )
                                }
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default AutoFlowClient;