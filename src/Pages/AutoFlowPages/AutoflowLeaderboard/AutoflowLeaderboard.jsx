/* eslint-disable no-unused-vars */
import React from 'react';
import community from '../../../assets/Community .svg'
import trophy from '../../../assets/trophy.png'
import { FaPlus } from 'react-icons/fa';

const AutoflowLeaderboard = () => {
    return (
        <div className='p-5'>
            <div className='w-2/3 mx-auto grid grid-cols-2 gap-5 justify-between items-center h-screen'>
                <div className={`border flex flex-col gap-4 justify-center items-center font-medium p-5 text-center text rounded-md w-full`}>
                    <img src={community} alt="" className='w-40' />
                    <h2 className='text-xl text-blue-950'>Community Forums</h2>
                    <p className='text-sm px-5 text-gray-500'>Connect and showcase the leaderboard in one of your community forums</p>
                    <button className="flex gap-2 p-1 px-6 py-2 items-center border border-primary text-primary rounded-md hover:bg-primary duration-300 hover:text-white">
                        <FaPlus />
                        <p className="text-sm font-medium">Connect Forum</p>
                    </button>
                </div>
                <div className={`border flex flex-col gap-4 justify-center items-center font-medium p-5 text-center text rounded-md w-full`}>
                    <img src={trophy} alt="" className='w-40 rotate-45' />
                    <h2 className='text-xl text-blue-950'>Leaderboard</h2>
                    <p className='text-sm px-5 text-gray-500'>Create a competitive leaderboard to motivate members of this Autoflow</p>
                    <button className="flex gap-2 p-1 px-6 py-2 items-center border border-primary text-primary rounded-md hover:bg-primary duration-300 hover:text-white">
                        <FaPlus />
                        <p className="text-sm font-medium">Add New Leaderboard</p>
                    </button>
                </div>

            </div>
        </div>
    );
};

export default AutoflowLeaderboard;