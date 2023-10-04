/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React from 'react';
import { useForm } from 'react-hook-form';

const WorkoutCollection = () => {
    const { register, handleSubmit, watch, formState: { errors }, reset } = useForm();

    const onSubmit = (data) => {
        console.log(data);
    }

    return (
        <div className='p-5'>
            <div className='flex justify-between items-center'>
                <h2 className='text-xl font-bold text-blue-950'>Create new collection</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className='mt-5'>
                <div >
                    <label className='text-[10px] text-gray-500'>NAME
                    </label>
                    <div className='text-sm mt-2'>
                        <input {...register("collection_name", { required: true })} placeholder='Collection Name' type="text" id="" className=' px-3 py-2 border  focus:outline-none w-full rounded-md' />
                    </div>
                </div>
                <div >
                    <label className='text-[10px] text-gray-500'>Type
                    </label>
                    <div className='text-sm mt-2'>
                        <input {...register("collection_type", { required: true })} placeholder='Add a label for the Collection Type' type="text" id="" className=' px-3 py-2 border  focus:outline-none w-full rounded-md' />
                    </div>
                </div>

                <div className='w-full mt-5 justify-end flex'>
                    <button type='submit' className='px-8 py-2 text-sm rounded-md bg-primary hover:bg-[#4b27b1] duration-300 text-white font-medium'>Create</button>
                </div>
            </form>
        </div>
    );
};

export default WorkoutCollection;