/* eslint-disable no-unused-vars */
import React, { useContext, useState } from 'react';
import { Outlet } from 'react-router-dom';
import Home from '../../Pages/ClientsPages/Clients/Clients';
import logo from '../../assets/logo.svg'
import { FaBook, FaCogs, FaUserFriends, FaUsers } from "react-icons/fa";
import { HiOutlineUsers } from "react-icons/hi";
import { RiMessage2Line } from "react-icons/ri";
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import LeftSideBar from '../../Shared/LeftSideBar/LeftSideBar';
import Login from '../../Shared/Login/Login';
import { AuthContext } from '../../Context/AuthProvider/AuthProvider';
import { Dna, Oval } from 'react-loader-spinner';

const Main = () => {
    const { user, loading } = useContext(AuthContext);

    if (loading) {
        return (
            <div className='flex justify-center items-center w-full h-screen'>
                <Oval
                    visible={true}
                    height="60"
                    width="60"
                    ariaLabel="dna-loading"
                    wrapperStyle={{}}
                    strokeWidth={4}
                    wrapperClass="dna-wrapper"
                />
            </div>
        );
        // console.log("Loding............");
    }

    return (
        <div>
            {
                user ?
                    <div className='flex w-full relative'>
                        <div className='z-100'>
                            <LeftSideBar />
                        </div>
                        <div className='w-full z-0'>
                            <Outlet></Outlet>
                        </div>
                    </div>
                    :
                    <Login></Login>
            }
        </div>
    );
};

export default Main;