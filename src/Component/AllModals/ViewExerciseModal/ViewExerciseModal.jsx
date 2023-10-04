/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import React, { useState } from 'react';
import { FaLink, FaPlus, FaShareAlt } from 'react-icons/fa';
import { TrackingFields } from '../../../utils'
import { ImCross } from 'react-icons/im';
import { BsCameraVideo } from 'react-icons/bs';
import { BiImageAdd } from "react-icons/bi";

const ViewExerciseModal = ({ onCloseViewExerciseModal, exercise }) => {
    const [trackingField, settrackingField] = useState(['Reps']);
    const [crossShow, setCrossShow] = useState('');
    const [showLinkField, setShowLinkField] = useState(false);

    // handle hadleTrackingField--------
    const hadleTrackingField = (value) => {
        if (trackingField?.length < 3) {
            settrackingField([...trackingField, value])
        }
    }

    // Delete Tracking Field -------
    const deleteTrackingField = (item) => {
        if (trackingField?.length > 1) {
            const restField = trackingField?.filter(field => field !== item);
            settrackingField(restField)
        }
    }

    return (
        <div>
            <div className='flex justify-between'>
                <div className='w-1/2 '>
                    <div className='p-5 flex justify-between gap-5 items-center w-full rounded-t-md bg-white shadow-lg'>
                        <input type="text" defaultValue='Medicine Ball Full Twist' className='px-5 py-1 bg-slate-50 font-semibold text-xl w-full focus:outline-none rounded-md' />
                        <FaShareAlt className='text-lg' />
                    </div>
                    <div className='px-5 flex flex-col gap-3 mt-4 h-96  overflow-y-scroll'>
                        <div className="form-control w-full outline-none">
                            <label className="label">
                                <span className="label-text-alt font-medium text-[10px]">PRIMARY FOCUS</span>
                            </label>
                            <select className="border px-3 py-2 rounded-md focus:outline-none ">
                                <option>--</option>
                                <option>Star Wars</option>
                                <option>Harry Potter</option>
                                <option>Lord of the Rings</option>
                                <option>Planet of the Apes</option>
                                <option>Star Trek</option>
                            </select>
                        </div>

                        <div>
                            <label className="label">
                                <span className="label-text-alt font-medium text-[10px]">TRACKING FIELD</span>
                            </label>
                            <div className='bg-slate-100 p-5 rounded-md'>
                                <select className="border px-3 py-2 rounded-md focus:outline-none w-full text-sm font-medium">
                                    <option>Timed</option>
                                    <option>Star Wars</option>
                                    <option>Harry Potter</option>
                                    <option>Lord of the Rings</option>
                                    <option>Planet of the Apes</option>
                                    <option>Star Trek</option>
                                </select>

                                <div className="flex justify-between mt-5">
                                    <div className="flex gap-2 items-center">
                                        {
                                            trackingField?.map((item, i) =>
                                                // console.log(item)
                                                <div key={i}
                                                    onMouseOver={() => setCrossShow(item)}
                                                    onMouseOut={() => setCrossShow('')}
                                                    className="px-2 flex items-center rounded-md shadow-md bg-white border border-gray-400 relative">

                                                    {
                                                        trackingField?.length > 1 &&
                                                        <button onClick={() => deleteTrackingField(item)} className={`absolute -top-2 -right-2 bg-black text-[5px] p-1 text-white rounded-full ${crossShow === item ? 'block' : 'hidden'}`}><ImCross /></button>
                                                    }
                                                    <p>{item}</p>
                                                </div>
                                            )
                                        }

                                    </div>

                                    <Menu align='end' menuButton={<MenuButton className={`${trackingField?.length === 3 && 'hidden'}`}>
                                        <button className="px-6 py-2 bg-white hover:bg-gray-100 duration-500 text-gray-500 rounded-md text-[10px] border"><FaPlus /></button>
                                    </MenuButton>} transition>
                                        {
                                            TrackingFields?.map((item, i) =>
                                                <MenuItem key={i} className='text-base' onClick={() => hadleTrackingField(item?.name)}>
                                                    <p className='text-sm font-semibold'>{item?.name}</p>
                                                </MenuItem>
                                            )
                                        }
                                    </Menu>
                                </div>
                            </div>
                        </div>

                        <div>
                            <label className='text-[10px] font-semibold'>INSTRUCTIONS <span className='text-[8px]'>(Separate each step on a new line)</span></label>
                            <div className='border rounded-md p-5 h-56 overflow-y-scroll'>
                                <ol className='list-decimal ml-5 text-justify text-sm'>
                                    <li>
                                        For this exercise you will need a medicine ball and a partner. Stand back to back with your partner, spaced 2-3 feet apart. This will be your starting position.
                                    </li>
                                    <br />
                                    <li>
                                        Hold the ball in front of the trunk. Open the hips and turn the shoulders at the same time as your partner.
                                    </li>
                                    <br />
                                    <li>
                                        For full rotation, you and your partner should twist in the same direction, i.e. counter-clockwise.
                                    </li>
                                    <br />
                                    <li>
                                        Pass the ball to your partner, and both of you can now twist in the opposite direction to repeat the procedure.
                                    </li>
                                </ol>
                            </div>
                        </div>

                        <div>
                            <label className='text-[10px] font-semibold'>TAGS</label>
                            <input
                                className="w-full rounded-md px-3 py-2 border focus:border-indigo-600 focus:outline-none"
                                type="text"
                                placeholder="Add an Exercise Tag"
                            />
                        </div>

                        <div>
                            {showLinkField ? (
                                <button
                                    onClick={() => setShowLinkField(false)}
                                    className="flex gap-2 items-center my-3 text-sm"
                                >
                                    <div className="bg-gray-200 p-2 rounded-full">
                                        <FaLink />
                                    </div>
                                    <p className="font-semibold">Delete Link</p>
                                </button>
                            ) : (
                                <button
                                    onClick={() => setShowLinkField(true)}
                                    className="flex gap-2 items-center my-3 text-sm"
                                >
                                    <div className="bg-gray-200 p-2 rounded-full">
                                        <FaLink />
                                    </div>
                                    <p className="font-semibold">Add Link</p>
                                </button>
                            )}
                            {showLinkField && (
                                <input
                                    className="w-full rounded-md p-2 border focus:border-indigo-600 focus:outline-none"
                                    type="text"
                                    placeholder="Add Link"
                                />
                            )}
                        </div>
                    </div>
                </div>

                {/* Right side Mobile view------------ */}
                <div className='w-1/2 bg-gray-100'>
                    <div className='p-5'>
                        <div>
                            <h1 className="mb-4 text-xl font-semibold">Media</h1>
                            <label className="text-[10px] font-semibold text-gray-700" htmlFor="">
                                VIDEO
                            </label>
                            <input

                                className="w-full rounded-md text-[10px] px-3 py-2 border focus:border-indigo-600 focus:outline-none"
                                type="text"
                                placeholder="Vimeo or Youtube Link"
                            />
                        </div>
                        <div className=" text-gray-600 mt-3 font-semibold ">
                            <label htmlFor="upload-video"
                                className="flex gap-2 items-center cursor-pointer" >
                                <div className="w-8 h-8 p-1 flex justify-center items-center bg-gray-300 rounded-full">
                                    <BsCameraVideo className='text-lg' />
                                </div>
                                <p className='text-sm'>Upload Video</p>
                            </label>
                            <input
                                // onChange={handleVideo}
                                type="file"
                                multiple
                                id="upload-video"
                                accept="video/*"
                                className="px-3 py-3 border w-full rounded-md hidden" />
                        </div>
                        <div className='mt-3'>
                            <p className='text-[10px] font-semibold'>Photos</p>
                            <div className='grid grid-cols-4 gap-3 w-full mt-2'>
                                {
                                    exercise?.imageUrls?.map((img, i) =>
                                        <div key={i}>
                                            <img src={img} alt="" className='object-cover' />
                                        </div>
                                    )
                                }
                                <label htmlFor="upload-photo"
                                    className="flex justify-center items-center gap-2 cursor-pointer border rounded-md bg-white border-dashed border-gray-400" >
                                    <BiImageAdd className='text-3xl text-gray-400' />
                                </label>
                                <input
                                    // onChange={handleVideo}
                                    type="file"
                                    id="upload-photo"
                                    accept="image/*"
                                    className="px-3 py-3 border w-full rounded-md hidden" />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <hr />
            <div className='px-10 py-3 flex justify-end'>
                <div className="flex gap-2 ">
                    <button className="border rounded-md px-5 py-1 text-gray-500">
                        Save
                    </button>
                    <button className="bg-primary rounded-md px-5 py-1 text-white">
                        Save & Close
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ViewExerciseModal;