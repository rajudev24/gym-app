/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { FaArrowLeft, FaCog } from 'react-icons/fa';

const CalculateMacros = ({ onCloseCalculateModal }) => {
    const [showMacros, setShowMacros] = useState(false)

    return (
        <div>
            <div className='p-8'>
                <div className='flex gap-3 items-center'>
                    <FaArrowLeft onClick={onCloseCalculateModal} className='cursor-pointer text-lg hover:text-primary duration-300' />
                    <h2 className='text-lg font-medium'>Calculate Macros</h2>
                </div>
                <div className='w-full'>
                    <div className='flex justify-between gap-3'>
                        <div>
                            <label className="label pb-1">
                                <span className="label-text text-[10px] font-semibold">AGE</span>
                            </label>
                            <input type="text" placeholder="Eg: 20 " maxLength={3} className="focus:outline-none focus:border-primary font-semibold text-sm w-20 px-4 py-3 rounded border" />
                        </div>
                        <div className='w-full'>
                            <label className="label pb-1">
                                <span className="label-text text-[10px] font-semibold">GENDER</span>
                            </label>
                            <select className="focus:outline-none focus:border-primary text-sm w-full p-3 rounded border font-medium">
                                <option selected disabled>Select...</option>
                                <option>Male</option>
                                <option>Female</option>
                                <option>Other</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between items-end gap-3 w-full'>
                        <div className='w-full'>
                            <label className="label pb-1">
                                <span className="label-text text-[10px] font-semibold">HEIGHT</span>
                            </label>
                            <input type="text" placeholder="Height" className="focus:outline-none focus:border-primary font-semibold text-sm w-full p-3 rounded border" />
                        </div>
                        <div>
                            <select className="focus:outline-none focus:border-primary text-sm w-32 p-3 rounded border font-medium">
                                <option className='text-base'>cm</option>
                                <option className='text-base'>in</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between items-end gap-3 w-full'>
                        <div className='w-full'>
                            <label className="label pb-1">
                                <span className="label-text text-[10px] font-semibold">WEIGHT</span>
                            </label>
                            <input type="text" placeholder="Height" className="focus:outline-none focus:border-primary font-semibold text-sm w-full p-3 rounded border" />
                        </div>
                        <div>
                            <select className="focus:outline-none focus:border-primary text-sm w-32 p-3 rounded border font-medium">
                                <option className='text-base'>kg</option>
                                <option className='text-base'>lb</option>
                            </select>
                        </div>
                    </div>
                    <div className='flex justify-between items-end gap-3 w-full'>
                        <div className='w-full'>
                            <label className="label pb-1">
                                <span className="label-text text-[10px] font-semibold">BODY FAT</span>
                            </label>
                            <input type="text" placeholder="Height" className="focus:outline-none focus:border-primary font-semibold text-sm w-full p-3 rounded border" />
                        </div>
                        <div>
                            <select className="focus:outline-none focus:border-primary text-sm w-32 p-3 rounded border font-medium">
                                <option className='text-base'>%</option>
                            </select>
                        </div>
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">ACTIVITY LEVEL</span>
                        </label>
                        <select className="focus:outline-none focus:border-primary text-sm w-full p-3 rounded border font-medium">
                            <option selected disabled>Choose Activity Level...</option>
                            <option>Sedentary (little or no exercise)</option>
                            <option>Lightly active (exercise 1-3 days/week)</option>
                            <option>Moderately active (exercise 3-5 days/week)</option>
                            <option>Very active (intense exercise 6-7 days a week)</option>
                            <option>Extremely active (2+ hrs of intense physical activity daily)</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">GOAL</span>
                        </label>
                        <select className="focus:outline-none focus:border-primary text-sm w-full p-3 rounded border font-medium">
                            <option selected disabled>Choose Goal...</option>
                            <option>Lose weight</option>
                            <option>Maintain weight and build muscle</option>
                            <option>Gain weight and build muscle</option>
                        </select>
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
                            <span className="label-text text-[10px] font-semibold">ACTIVITY LEVEL</span>
                        </label>
                        <select className="focus:outline-none focus:border-primary text-sm w-full p-3 rounded border font-medium">
                            <option selected disabled>Choose Activity Level...</option>
                            <option>Sedentary (little or no exercise)</option>
                            <option>Lightly active (exercise 1-3 days/week)</option>
                            <option>Moderately active (exercise 3-5 days/week)</option>
                            <option>Very active (intense exercise 6-7 days a week)</option>
                            <option>Extremely active (2+ hrs of intense physical activity daily)</option>
                        </select>
                    </div>
                    <div className='w-full'>
                        <label className="label pb-1">
                            <span className="label-text text-[10px] font-semibold">GOAL</span>
                        </label>
                        <select className="focus:outline-none focus:border-primary text-sm w-full p-3 rounded border font-medium">
                            <option selected disabled>Choose Goal...</option>
                            <option>Lose weight</option>
                            <option>Maintain weight and build muscle</option>
                            <option>Gain weight and build muscle</option>
                        </select>
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

export default CalculateMacros;