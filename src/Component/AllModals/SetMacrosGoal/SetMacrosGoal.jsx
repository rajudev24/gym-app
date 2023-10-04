/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';

const SetMacrosGoal = ({ onCloseMacrosGoalModal }) => {
    const [showMacros, setShowMacros] = useState(false);


    return (
        <div>
            <div className='p-5'>
                <div className='flex gap-3 items-center'>
                    <FaArrowLeft onClick={onCloseMacrosGoalModal} className='cursor-pointer text-lg hover:text-primary duration-300' />
                    <h2 className='text-lg font-medium'>Set Macro Goals</h2>
                </div>
                <div className='font-normal w-56 mx-auto '>
                    <div className='flex gap-1 justify-center p-1 rounded-sm bg-slate-300'>
                        <button className='px-5 bg-[#030c1f] focus:text-white text-white rounded-sm'>Percent(%)</button>
                        <button className='px-5 focus:bg-[#030c1f] focus:text-white rounded-sm'>Gram(g)</button>
                    </div>
                </div>
                <div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">PROTEIN (G)</span>
                        </label>
                        <input type="text" placeholder="PROTEIN" className="focus:outline-none focus:border-primary text-sm w-full px-3 py-2 rounded border" />
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">CARBS (G)</span>
                        </label>
                        <input type="text" placeholder="CARBS" className="focus:outline-none focus:border-primary text-sm w-full px-3 py-2 rounded border" />
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">FAT (G)</span>
                        </label>
                        <input type="text" placeholder="FAT" className="focus:outline-none focus:border-primary text-sm w-full px-3 py-2 rounded border" />
                    </div>
                    <div className='bg-gray-200 p-5 rounded mt-5 flex justify-center text-center'>
                        <div>
                            <p className='text-sm font-medium'>Total Calories Goal</p>
                            <h2 className='text-3xl text-primary'>-Cal</h2>
                        </div>
                    </div>
                </div>
                <div className='flex justify-between items-center mt-5'>
                    <button onClick={() => setShowMacros(true)} className='flex gap-1 items-center text-primary text-xs font-semibold'>
                        <FaCog className='text-base' />
                        <h2 className='text-[10px] underline '>ADD REST DAY MACROS</h2>
                    </button>
                    {
                        showMacros &&
                        <button onClick={() => setShowMacros(false)} className='text-sm font-medium text-red-600'>Cancel</button>
                    }
                </div>
                <div className={`${showMacros ? 'block' : 'hidden'} border rounded p-5 mt-5`}>
                    <div className=''>
                        <div className="form-control">
                            <label className="label justify-normal gap-2 cursor-pointer">
                                <input type="radio" name="radio-10" className="radio radio-primary w-4 h-4" checked />
                                <span className="label-text">Days with no Workout</span>
                            </label>
                        </div>
                        <div className="form-control">
                            <label className="label justify-normal gap-2 cursor-pointer">
                                <input type="radio" name="radio-10" className="radio radio-primary w-4 h-4" />
                                <span className="label-text">Specific days of week</span>
                            </label>
                        </div>
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">PROTEIN (G)</span>
                        </label>
                        <input type="text" placeholder="PROTEIN" className="focus:outline-none focus:border-primary text-sm w-full px-3 py-2 rounded border" />
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">CARBS (G)</span>
                        </label>
                        <input type="text" placeholder="CARBS" className="focus:outline-none focus:border-primary text-sm w-full px-3 py-2 rounded border" />
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">FAT (G)</span>
                        </label>
                        <input type="text" placeholder="FAT" className="focus:outline-none focus:border-primary text-sm w-full px-3 py-2 rounded border" />
                    </div>
                    <div className='bg-gray-200 p-5 rounded mt-5 flex justify-center text-center'>
                        <div>
                            <p className='text-sm font-medium'>Total Calories Goal</p>
                            <h2 className='text-3xl text-primary'>-Cal</h2>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='flex items-center justify-end w-full px-5 py-3'>
                <input type="submit" value="Submit" className='px-6 py-1 cursor-pointer bg-primary rounded text-white' />
            </div>
        </div>
    );
};

export default SetMacrosGoal;