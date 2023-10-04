/* eslint-disable no-unused-vars */
import React from 'react';
import 'react-responsive-modal/styles.css';
import Addnotes from '../../../../Component/ProfileComponents/AddNotes/Addnotes';
import AddLimitation from '../../../../Component/ProfileComponents/AddLimitation/AddLimitation';
import AddGoals from '../../../../Component/ProfileComponents/AddGoals/AddGoals';
import AddBodyMetrics from '../../../../Component/ProfileComponents/AddBodyMetrics/AddBodyMetrics';
import UpdateProfile from '../../../../Component/ProfileComponents/UpdateProfile/UpdateProfile';
import ProgressPhoto from '../../../../Component/ProfileComponents/ProgressPhoto/ProgressPhoto';
import Training from '../../../../Component/ProfileComponents/Training/Training';


const Profile = () => {

   return (
      <div className='p-5 w-full'>
         <div className='grid lg:grid-cols-2 grid-cols-1 gap-3 overflow-y-visible'>
            <div>
               {/* Traning------------------- */}
               <Training />

               <div className='flex items-center justify-between my-4' >
                  <p className='text-xs text-primary' >Last Workout : <span className='text-sm text-gray-800 font-medium'>Aperio Intro</span></p>
                  <button className="px-3 py-1 rounded-full bg-gray-100 text-sm text-gray-500">Check result</button>
               </div>

               {/* Add Body Metrics part---------------- */}
               <AddBodyMetrics />
            </div>

            <div className='grid lg:grid-cols-2 gap-3'>
               <div className='flex flex-col gap-3 w-full'>
                  {/* Add Note part------------------- */}
                  <Addnotes />
                  {/* Add Limitation/Injury part-------- */}
                  <AddLimitation />
                  {/* Add Goal part------------------- */}
                  <AddGoals />
                  {/* Add Photo Progress part------------------------- */}
                  <ProgressPhoto />
               </div>

               {/* Add Profile Update Prt---------------- */}
               <div className='w-full'>
                  {/*  Profile--------------- */}
                  <UpdateProfile />

                  {/* update part------------------ */}
                  <div className='mt-5'>
                     <div className='bg-slate-50 border rounded-md'>
                        <div className='flex items-center '>
                           <h5 className='text-base font-medium text-slate-700 mx-2 my-2 flex gap-1 items-center'>
                              Update</h5>
                           {/* <FaStar  className='text-lg text-gray-400'></FaStar> */}
                        </div>
                        <hr className=" border-gray-300" />
                        <div className='p-2 h-56 bg-white rounded-md'>
                           <h2>Test</h2>
                        </div>
                     </div>
                  </div>

               </div>

            </div>
         </div>
      </div>
   );
};

export default Profile;