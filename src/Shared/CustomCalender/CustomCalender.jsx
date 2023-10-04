/* eslint-disable no-unused-vars */
import React, { useState } from 'react';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Menu, MenuButton, MenuItem } from '@szhsin/react-menu';
import '@szhsin/react-menu/dist/index.css';
import '@szhsin/react-menu/dist/transitions/slide.css';
import { FaAngleDoubleLeft, FaAngleDoubleRight, FaPlus, FaPlusCircle } from "react-icons/fa";
import { format } from 'date-fns';
import '../CustomCalender/CustomCalender.css'
import Modal from 'react-responsive-modal';
import { ImCross } from 'react-icons/im';
import AddProgram from '../../Component/AllModals/Workout/AddWorkoutModal/AddProgram';
import AddWorkoutModal from '../../Component/AllModals/AddWorkoutModal/AddWorkoutModal';



const CustomCalender = () => {
    const [selectedDate, setSelectedDate] = useState(null);
    const [currentMonth, setCurrentMonth] = useState(moment());
    const [openProgramm, setOpenProgramm] = useState(false);
    const [openWorkout, setOpenWorkout] = useState(false)
    const [hoverDate, setHoverDate] = useState();
    const [data, setData] = useState([])


    // open Workout Modal-----------
    const onOpenWorkoutModal = () => setOpenWorkout(true);
    const onCloseWorkoutModal = () => setOpenWorkout(false);

    // open PromramModal-----------------
    const onOpenProgramModal = () => setOpenProgramm(true);
    const onCloseProgramModal = () => setOpenProgramm(false);

    const handleAddClick = (date) => {
        setSelectedDate(date);
        // You can implement your logic to add events to this date
        console.log(`Add button clicked for ${date}`);
    };

    // go to previous month------
    const goToPreviousMonth = () => {
        setCurrentMonth(currentMonth.clone().subtract(1, 'month'));
    };

    // go to next Month-------
    const goToNextMonth = () => {
        setCurrentMonth(currentMonth.clone().add(1, 'month'));
    };

    // go to current Month--------
    const goToToday = () => {
        setCurrentMonth(moment()); // Set current month to the current date
    };

    // button show and hidden------
    const handlebutton = (date) => {
        const fDate = format(new Date(date), 'PP');
        setHoverDate(fDate)
    }

    // const data = [
    //     {
    //         title: 'New data1',
    //         date: 'Aug 22, 2023'
    //     },
    //     {
    //         title: 'Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quisquam eos placeat',
    //         date: 'Aug 25, 2023'
    //     },
    //     {
    //         title: 'New data2',
    //         date: 'Aug 25, 2023'
    //     },
    //     {
    //         title: 'New data3',
    //         date: 'Aug 28, 2023'
    //     },
    //     {
    //         title: 'New data4',
    //         date: 'Aug 20, 2023'
    //     },
    //     {
    //         title: 'New data5',
    //         date: 'Aug 20, 2023'
    //     },
    //     {
    //         title: 'New data5',
    //         date: 'Sep 20, 2023'
    //     },

    // ]

    const daysInMonth = currentMonth.daysInMonth();
    const startDate = moment(currentMonth).startOf('month');

    const calendarRows = [];

    const weeks = currentMonth?._locale?._weekdaysShort
    const firstDayOfMonthIndex = currentMonth.startOf('month').day();

    for (let i = 0; i < daysInMonth; i++) {
        const date = moment(startDate).add(i, 'days');
        const newDate = new Date()

        const today = format(new Date(newDate), 'PP')
        const thisDay = format(new Date(date?._d), 'PP')



        calendarRows.push(
            <div key={i}>
                <div className='flex justify-between '>
                    <span className={`text-lg font-semibold ${today === thisDay ? 'bg-primary rounded-full text-white w-7 h-7 text-base p-2 flex justify-center items-center' : 'bg-gray-200 rounded-full w-7 h-7 text-base p-2 flex justify-center items-center'}`}>{date.date()}</span>

                    {/* <button onClick={() => handleAddClick(date)}>click me</button> */}

                    <Menu align='end' menuStyle={{ backgroundColor: '#222222' }} menuButton={<MenuButton>
                        <FaPlusCircle className={`hover:text-gray-400 text-gray-300`} />
                    </MenuButton>} transition>
                        <MenuItem onClick={onOpenWorkoutModal} className='hover:bg-[#2b2b2c] text-gray-400 font-medium'>
                            <p>Add Workout</p>
                        </MenuItem>
                        <MenuItem onClick={onOpenProgramModal} className='hover:bg-[#2b2b2c] text-gray-400 font-medium my-2'>
                            <p>Add Program</p>
                        </MenuItem>
                    </Menu>
                </div>

                <div className='mt-2'>
                    {
                        data?.map((item, i) =>
                            <div key={i}>
                                {
                                    format(new Date(item?.date), 'PP') === format(new Date(date?._d), 'PP') &&
                                    <button className='px-2 py-1 border rounded-md w-full bg-white mb-1'>{item?.title?.length > 10 ? item?.title.slice(0, 10) + '...' : item?.title}</button>
                                }
                            </div>
                        )
                    }
                </div>

            </div>
        );
    }



    return (
        <div className='min-h-screen flex flex-col p-3'>

            {/* Add Workout Modal------------------------------- */}
            <Modal open={openWorkout} closeIcon={<ImCross />} onClose={onCloseWorkoutModal} center classNames={{ modal: 'p-0 overflow-visible rounded-md w-3/4', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                {/* <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient> */}
                <AddWorkoutModal onCloseWorkoutModal={onCloseWorkoutModal}></AddWorkoutModal>
            </Modal>


            {/* Add Program Modal---------- */}
            <Modal open={openProgramm} closeIcon={<ImCross />} onClose={onCloseProgramModal} center classNames={{ modal: 'p-5 overflow-visible rounded-md w-3/4', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                {/* <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient> */}
                <AddProgram onCloseProgramModal={onCloseProgramModal}></AddProgram>
            </Modal>

            <div className="custom-calendar border rounded-md">
                <div className='flex justify-between items-center mb-10'>
                    <div className='flex items-center text-sm'>
                        <button onClick={goToPreviousMonth} className='border px-5 py-1 rounded-l-sm flex items-center gap-2'><FaAngleDoubleLeft /> Previous</button>
                        <button onClick={goToToday} className='border px-5 py-1 border-x-0 flex gap-2 items-center'><FaAngleDoubleLeft /> Today <FaAngleDoubleRight /></button>
                        <button onClick={goToNextMonth} className='border px-5 py-1 rounded-r-sm flex gap-2 items-center'>Next <FaAngleDoubleRight /></button>
                    </div>
                    <div className="calendar-header">
                        {currentMonth.format('MMMM YYYY')}
                    </div>
                    <div className='flex gap-2 items-center text-sm'>
                        <button className='border px-5 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white'>1 Week</button>
                        <button className='border px-5 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white'>2 Week</button>
                        <button className='border px-5 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white'>4 Week</button>
                    </div>
                </div>


                <div className="grid grid-cols-7 gap-2 w-full">
                    {weeks.map((dayName, i) => (
                        <h2
                            key={i}
                            className={`text-lg font-semibold text-center border`}
                        >
                            {dayName}
                        </h2>
                    ))}

                    {Array.from({ length: firstDayOfMonthIndex }, (_, i) => (
                        <div key={i} className="border p-2 h-52 bg-gray-100 rounded-sm"></div>
                    ))}
                    {calendarRows.map((calendarRow, i) => (
                        <div
                            key={i}
                            className={`border p-2 h-52 ${moment(startDate).add(i, 'days').isSame(moment(), 'day') ? 'bg-gray-200' : 'bg-slate-100'} rounded-sm`}
                        >
                            {calendarRow}

                        </div>
                    ))}

                </div>
            </div>
        </div>
    );
};

export default CustomCalender;