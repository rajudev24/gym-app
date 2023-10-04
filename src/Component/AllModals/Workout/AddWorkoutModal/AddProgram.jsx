/* eslint-disable no-unused-vars */
import { FaSearch } from "react-icons/fa";
import React, { useContext, useEffect, useState } from 'react';
import axios from "axios";
import Loading from "../../../../Shared/Loading/Loading";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";


export default function AddProgram() {
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const { user } = useContext(AuthContext)


  // Get all Workouts---------
  useEffect(() => {
    const url = "https://aperio-server.vercel.app/api/v1/exercise/get-all-exercise";
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res?.data?.data);
        setExercises(res?.data?.data);
        setLoading(false)
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);


  const workouts = [
    {
      name: 'Full Body EMOM 5x4 -Demo',
      exercise: '25',
      description: 'Four movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.',
      section: [
        {
          name: 'Full Body Cool Down',
        },
        {
          name: 'Full Body Warm Up',
        },
        {
          name: 'TABATA 20:10 8x8',
        },
      ]
    },
    {
      name: 'HIIT-TABATA 20:10 8x8 - Demo',
      exercise: '25',
      description: 'Two movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.',
      section: [
        {
          name: 'Full Body Cool Down',
        },
        {
          name: 'Full Body Warm Up',
        },
        {
          name: 'TABATA 20:10 8x8',
        },
        {
          name: 'TABATA 20:10 8x8',
        },
        {
          name: 'TABATA 20:10 8x8',
        },
        {
          name: 'TABATA 20:10 8x8',
        },
      ]
    },
    {
      name: 'Lower Body 40:20 5x5 - Demo',
      exercise: '14',
      description: 'Five movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.',
      section: [
        {
          name: 'Full Body Cool Down',
        },
        {
          name: 'Full Body Warm Up',
        },
        {
          name: 'TABATA 20:10 8x8',
        },
      ]
    },
  ]


  return (
    <>
      <div className="px-4" >
        <h1 className="font-bold">Select A Program</h1>
        <div className="mt-4 flex justify-between ">
          <div className="">
            <label className="text-slate-600 text-xs" >SEARCH</label>
            <div className='bg-base-200 w-80 px-2 py-1 rounded-sm items-center flex mt-1'>
              <FaSearch className="text-slate-400" />
              <input type="search" placeholder='Search program' className='focus:outline-none px-3 bg-transparent w-full' />
            </div>

            <div className="mt-4">
              <label className="text-slate-500 text-[10px] font-medium" >MOST RECENTS</label>
              <div className="h-80 w-full rounded-md border overflow-y-scroll">
                {
                  workouts?.map((item, i) =>
                    <div key={i}>
                      <div
                        // onClick={() => handleExercise(item)} 
                        className='px-5 py-5 flex justify-between items-center cursor-pointer'>
                        <div className=''>
                          <h2 className='text-base font-semibold'>{item?.name}</h2>
                          <p className='text-sm'>{item?.exercise} Exercises . {item?.section?.length} Sections</p>
                        </div>
                        {/* <div className='flex gap-3 items-center'>
                          <div className='w-7 h-7 rounded-full p-1 flex justify-center items-center bg-primary'>
                            <h2 className='text-sm font-semibold text-white'>PR</h2>
                          </div>
                          <p className='text-sm font-semibold'>2d</p>
                        </div> */}
                      </div>
                      <hr />
                    </div>
                  )
                }
              </div>
            </div>
          </div>

          <div className="">
            <div className="flex justify-between ">
              <p className="text-xs">16 DAYS</p>
              <img width={30} height={20} src="/src/assets/logo.png" alt="" />
              <div className='w-7 h-7 rounded-full p-1 flex justify-center items-center bg-primary'>
                <h2 className='text-sm font-semibold text-white flex'>
                  {user?.firstName?.slice(0, 1)}{user?.lastName?.slice(0, 1)}
                </h2>
              </div>
            </div>
            <div className="h-96 w-80 mt-2 rounded-md border overflow-y-scroll p-4">
              {
                loading && <Loading />
              }
              {
                exercises?.map((item, i) =>
                  <div key={i} className="py-2">
                    <div className='p-3 rounded-md shadow-md flex justify-between'>
                      <h2 className='font-semibold'>{item?.exerciseName}</h2>
                      <p className='text-xs'>{item?.trackingField}</p>
                    </div>
                  </div>
                )
              }
            </div>

          </div>
        </div>


      </div>
      <div className="flex justify-between mt-8 bg-zinc-100 p-4">
        <button className="btn border-2">Button</button>
        <button className="btn btn-primary px-8 text-white">Assign</button>
      </div>
    </>
  )
}
