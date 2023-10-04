/* eslint-disable no-unused-vars */
import React from 'react';
import ProfileNavBar from '../../Pages/ClientsPages/ProfileDetails/ProfileNavBar/ProfileNavBar';
import { Outlet } from 'react-router-dom';
import AutoFlowNavbar from '../../Pages/AutoFlowPages/AutoFlowNavbar/AutoFlowNavbar';

const AutoFlowLayout = () => {
    return (
        <div className='w-full relative'>
            <div className='sticky top-0 bg-white z-50'>
                <div className='px-5 pt-5'>
                    <AutoFlowNavbar />
                </div>
                <hr className='mt-1' />
            </div>
            <div className=''>
                <Outlet></Outlet>
            </div>
        </div>
    );
};

export default AutoFlowLayout;