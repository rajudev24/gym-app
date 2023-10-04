/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import { Link, Outlet, useLocation } from 'react-router-dom';
import Drawer from 'react-modern-drawer'
import 'react-modern-drawer/dist/index.css'
import ToggleLeftContext from '../../Context/ToggleLeftContext';
import { FaArrowLeftLong } from 'react-icons/fa6';
import { FaAngleDown } from 'react-icons/fa';
import { Accordion, AccordionBody, AccordionHeader, AccordionItem, } from 'react-headless-accordion';

const SettingLayout = () => {
    const [isLeftOpen, setIsLeftOpen] = useState(true)

    const toggleLeft = () => {
        setIsLeftOpen((prev) => !prev)
    }

    const location = useLocation();
    const path = location?.pathname.split('/')[2];
    // console.log(path);

    return (
        <div className='flex w-full z-10'>
            <div className={`bg-secondary ${isLeftOpen ? 'ml-[281px]' : 'ml-16'}`}>

                <div className='flex flex-col bg-secondary text-white'>
                    <Drawer
                        open={isLeftOpen}
                        onClose={toggleLeft}
                        direction='left'
                        size={220}
                        style={{ backgroundColor: '#F1A0FF', boxShadow: 'none' }}
                        enableOverlay={false}
                        className='ml-[61px] py-5 px-2'
                    >
                        <Link to='/menu' className='text-2xl flex gap-3 items-center px-4 py-4'>
                            <FaArrowLeftLong />
                            <h1>Setting</h1>
                        </Link>
                        <Accordion className="text-base font-semibold px-5">
                            <AccordionItem isActive={path === 'account' && true}>
                                <AccordionHeader className="w-full flex justify-between items-center">
                                    <div className="flex gap-2 my-2">
                                        <h3 className="">Your Account</h3>
                                    </div>
                                    <FaAngleDown />
                                </AccordionHeader>

                                <AccordionBody className="px-2 rounded-md">
                                    <div className="accordion-body py-2 flex flex-col gap-4">
                                        <Link to='/setting/account' className={`hover:text-black duration-300 ${path === 'account' && 'text-black'}`}>
                                            <span className="">Account Details</span>
                                        </Link>
                                        <Link to='/setting/notification' className={`hover:text-black duration-300 ${path === 'notification' && 'text-black'}`}>
                                            <span className="">Notifications</span>
                                        </Link>
                                        <Link to='/setting/defaultsetting' className={`hover:text-black duration-300 ${path === 'defaultsetting' && 'text-black'}`}>
                                            <span className="">Default Settings</span>
                                        </Link>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>

                            <AccordionItem isActive={path === 'teammates' && true}>
                                <AccordionHeader className="w-full flex justify-between items-center">
                                    <div className="flex gap-2 my-2">
                                        <h3 className="">Workspace</h3>
                                    </div>
                                    <FaAngleDown />
                                </AccordionHeader>

                                <AccordionBody className="px-2 rounded-md">
                                    <div className=" py-2 flex flex-col gap-4">
                                        <Link to='/setting/teamsetting' className={`hover:text-black duration-300 ${path === 'teamsetting' && 'text-black'}`}>
                                            <span className="">Team Settings</span>
                                        </Link>
                                        <Link to='/setting/teammates' className={`hover:text-black duration-300 ${path === 'teammates' && 'text-black'}`}>
                                            <span className="">Teammates</span>
                                        </Link>
                                        <Link to='/setting/custombranding' className={`hover:text-black duration-300 ${path === 'custombranding' && 'text-black'}`}>
                                            <span className="">Custom Branding</span>
                                        </Link>
                                    </div>
                                </AccordionBody>
                            </AccordionItem>
                        </Accordion>

                        <Link to='/setting/billing' className={`font-semibold flex gap-3 items-center focus:bg-primary active:bg-primary hover:bg-primary hover:text-black duration-300 rounded-md px-4 py-3 ${path === 'billing' && 'text-white bg-primary duration-300'}`}>
                            <p>Billing</p>
                        </Link>
                    </Drawer>
                </div>
            </div>
            <ToggleLeftContext.Provider value={toggleLeft}>
                <Outlet />
            </ToggleLeftContext.Provider>
        </div>
    );
};

export default SettingLayout;