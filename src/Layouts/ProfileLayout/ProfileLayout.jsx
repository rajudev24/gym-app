/* eslint-disable no-unused-vars */
import React from 'react';
import { Outlet } from 'react-router-dom'
import ProfileNavBar from '../../Pages/ClientsPages/ProfileDetails/ProfileNavBar/ProfileNavBar';

const ProfileLayout = () => {

    return (
        <div className='w-full relative'>
            <div className='sticky top-0 bg-white z-50'>
                <div className='px-5 pt-5'>
                    <ProfileNavBar />
                </div>
                <hr className='mt-1' />
            </div>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default ProfileLayout;