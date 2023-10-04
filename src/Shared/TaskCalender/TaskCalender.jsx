6; /* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { Link, useParams } from "react-router-dom";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  FaAngleLeft,
  FaAngleRight,
  FaBookReader,
  FaEllipsisH,
  FaPlus,
  FaPlusCircle,
  FaRegCopy,
  FaRegEyeSlash,
  FaRegSave,
  FaRegTrashAlt,
} from "react-icons/fa";
import { MdOutlineEventAvailable } from "react-icons/md";
import { PiCaretLeftLight, PiCaretRightLight } from "react-icons/pi";
import {
  addDays,
  daysInWeek,
  format,
  lastDayOfMonth,
  previousDay,
} from "date-fns";
import "./TaskCalender.css";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import TaskModal from "../../Component/AllModals/TaskModal/TaskModal";
import axios from "axios";
import { LuClipboardList } from "react-icons/lu";
import { AiOutlinePrinter } from "react-icons/ai";
import GeneralTaskModal from "../../Component/AllModals/TaskModal/GeneralTaskModal/GeneralTaskModal";
import { DateRange } from "react-date-range";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import { Calendar } from "react-big-calendar";

const TaskCalender = () => {
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [currentDay, setCurrentDay] = useState(moment());
  const [openProgramm, setOpenProgramm] = useState(false);
  const [openWorkout, setOpenWorkout] = useState(false);
  const [hoverDate, setHoverDate] = useState();
  const [taskData, setTaskData] = useState([]);
  const { id } = useParams();
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([]);
  const [openGeneral, setOpenGeneral] = useState(false);
  const [selectedDate, setSelectedDate] = useState("");

  // open Workout Modal-----------
  const onOpenWorkoutModal = (date) => {
    const dates = date._d;
    setSelectedDate(dates);
    setOpenWorkout(true);
  };

  const onCloseWorkoutModal = () => setOpenWorkout(false);

  // open General Modal-----------------
  const onOpenGeneralModal = () => setOpenGeneral(true);
  const onCloseGeneralModal = () => setOpenGeneral(false);

  // go to previous month------
  const [currentDaten, setCurretDaten] = useState(new Date());
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
    daysInMonth(addDays(currentDaten, -7));
  };

  // go to next Month-------
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  // go to current Month--------
  const goToToday = () => {
    setCurrentMonth(moment());
  };

  console.log("hello", moment());

  useEffect(() => {
    axios(`https://aperio-server.vercel.app/api/v1/task/${id}`, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res?.data?.data);
        const taskData = res?.data?.data;
        setTaskData(taskData);
        setLoading(false);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [id]);

  console.log(taskData);
  const data = [
    {
      label: "New data1",
      date: "Sept 9, 2023",
    },
    {
      label:
        "Lorem ipsum dolor sit amet consectetur adipisicing elit. Accusantium quisquam eos placeat",
      date: "Sept 25, 2023",
    },
    {
      label: "New data2",
      date: "Sept 25, 2023",
    },
    {
      label: "New data2",
      date: "Sept 25, 2023",
    },
    {
      label: "New data3",
      date: "Sept 3, 2023",
    },
    {
      label: "New data4",
      date: "Sept 20, 2023",
    },
    {
      label: "New data5",
      date: "Aug 20, 2023",
    },
    {
      label: "New data5 New data5New data5",
      date: "Sep 5, 2023",
    },
  ];

  const daysInMonth = currentMonth.daysInMonth();
  const startDate = moment(currentMonth).startOf("month");

  const calendarRows = [];
  const previousMonth = currentMonth.clone().subtract(1, "months");
  const daysInPreviousMonth = previousMonth.daysInMonth();
  console.log(daysInPreviousMonth);
  const weeks = currentMonth?._locale?._weekdaysShort;
  const firstDayOfMonthIndex = currentMonth.startOf("month").day();
  const [datenumber, setDatenumber] = useState(daysInMonth);
  // daysInMonth
  const weekone = () => {
    setDatenumber(daysInWeek);
  };
  const weekonetwo = () => {
    setDatenumber(daysInWeek * 2);
  };
  const weekmonth = () => {
    setDatenumber(daysInWeek * 4);
  };
  // calender difference
  const [state, setState] = useState([
    {
      startDate: currentDaten,
      endDate: addDays(currentDaten, datenumber),
      key: "selection",
    },
  ]);
  // get the current date
  // {format(currentDaten, "MMM dd")}-
  // {format(oneWeekLaterDate, "MMM dd")}
  // calculate the one week from today
  const oneWeekLaterDate = addDays(currentDaten, datenumber);
  const [weekState, setWeekState] = useState(oneWeekLaterDate);

  // calender show

  const [isAddclass, setIsAddclass] = useState(false);
  const handleCalenderShow = () => {
    setIsAddclass((current) => !current);
  };

  for (let i = 0; i < datenumber; i++) {
    const date = moment(startDate).add(i, "day");
    const newDate = new Date();

    const today = format(new Date(newDate), "PP");

    const thisDay = format(new Date(date?._d), "PP");
    console.log("tre", thisDay);

    calendarRows.push(
      <div key={i}>
        <div className="flex justify-between ">
          <span
            className={`font-semibold ${
              today === thisDay
                ? "bg-primary rounded-full text-white w-6 h-6 text-base p-2 flex justify-center items-center"
                : "bg-gray-100 rounded-full w-6 h-6 text-base p-2 flex justify-center items-center"
            }`}
          >
            {date.date()}
            {console.log(date.date())}
          </span>

          <button onClick={() => onOpenWorkoutModal(date)}>
            <FaPlusCircle className="hover:text-gray-400 text-gray-300" />
          </button>
        </div>

        <div className="mt-2">
          {data?.map((item, i) => (
            <div key={i}>
              {format(new Date(item?.date), "PP") ===
                format(new Date(date?._d), "PP") && (
                <div className="p-2 border rounded-md w-full bg-white mb-1 flex items-center justify-between gap-1">
                  <div
                    onClick={onOpenGeneralModal}
                    className="flex gap-2 items-center cursor-pointer"
                  >
                    <div className="text-xs text-amber-500 border border-amber-500 rounded-full p-1">
                      <FaBookReader />
                    </div>
                    <div>
                      <p className="text-sm">Test</p>
                      <p className="text-[10px] text-gray-400">07:45 AM</p>
                    </div>
                  </div>

                  <Menu
                    align="end"
                    menuStyle={{ backgroundColor: "#222222", minWidth: "auto" }}
                    menuButton={
                      <MenuButton>
                        <FaEllipsisH className="text-xs text-gray-400 z-50 hover:text-sky-200" />
                      </MenuButton>
                    }
                    transition
                  >
                    <MenuItem className="hover:bg-[#222222] flex flex-col gap-3 items-start hover:rounded-md text-sm text-white font-medium px-4">
                      <div className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                        <FaRegSave className="text-base" />
                        <p>Save to library</p>
                      </div>
                      <div className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                        <FaRegCopy className="text-base" />
                        <p>Copy</p>
                      </div>
                      <div className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                        <FaRegTrashAlt className="text-base" />
                        <p>Delete</p>
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  // const currentDate = new Date();
  // const letmesee = currentDate.getDay();
  // console.log("sui", letmesee);

  return (
    <div className="min-h-screen flex flex-col p-3">
      {/* Add Workout Modal------------------------------- */}
      <Modal
        open={openWorkout}
        closeIcon={<ImCross />}
        onClose={onCloseWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-2/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <TaskModal
          selectedDate={selectedDate}
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></TaskModal>
      </Modal>

      {/* General Modal------ */}
      <Modal
        open={openGeneral}
        closeIcon={<ImCross />}
        onClose={onCloseGeneralModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-2/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        {/* <TaskModal onCloseWorkoutModal={onCloseGeneralModal}></TaskModal> */}
        <GeneralTaskModal
          selectedDate={selectedDate}
          onCloseGeneralModal={onCloseGeneralModal}
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></GeneralTaskModal>
      </Modal>

      <div className="custom-calendar border rounded-md">
        <div className="flex justify-between items-center mb-10">
          <div className="flex items-center text-sm">
            <button
              onClick={goToToday}
              className="border px-5 py-1 rounded-xl cl-zink-100 bg-zinc-100 flex gap-2 mr-2 items-center hover:border-slate-950"
            >
              Today
            </button>
            <button
              onClick={goToPreviousMonth}
              className="border px-5 py-1 rounded-l-sm flex items-center gap-2"
            >
              <PiCaretLeftLight fontSize={28} />
            </button>

            <button
              onClick={handleCalenderShow}
              className="border px-5 py-1 rounded-l-sm flex items-center gap-2 hover:text-blue-500"
            >
              <MdOutlineEventAvailable fontWeight={100} fontSize={28} />
              {format(currentDaten, "MMM dd")} -
              {format(oneWeekLaterDate, "MMM dd")}
              <DateRange
                editableDateInputs={true}
                onChange={(item) => setState([item.selection])}
                moveRangeOnFirstSelection={false}
                ranges={state}
                className={isAddclass ? "block" : "hidden"}
                showMonthArrow={false}
              />
            </button>

            <button
              onClick={goToNextMonth}
              className="border px-5 py-1 rounded-r-sm flex gap-2 items-center"
            >
              <PiCaretRightLight fontWeight={100} fontSize={28} />
            </button>
          </div>
          <div className="calendar-header">
            {currentMonth.format("MMMM YYYY")}
          </div>
          <div className="flex gap-2 items-center text-sm">
            <button
              onClick={weekone}
              className="border px-5 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white"
            >
              1 Week
            </button>
            <button
              onClick={weekonetwo}
              className="border px-5 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white"
            >
              2 Week
            </button>
            <button
              onClick={weekmonth}
              className="border px-5 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white"
            >
              4 Week
            </button>
          </div>
        </div>

        <div className="grid grid-cols-7 gap-2 w-full">
          {weeks.map((dayName, i) => (
            <h2 key={i} className={`text-lg font-semibold text-center border`}>
              {dayName}
            </h2>
          ))}

          {Array.from({ length: firstDayOfMonthIndex }, (_, i) => {
            const datesi = daysInPreviousMonth - firstDayOfMonthIndex + i + 1;
            return (
              <>
                <div
                  key={i}
                  className={
                    datenumber === 7
                      ? "h-screen100 border p-2 bg-gray-100 rounded-sm "
                      : datenumber === 14
                      ? "h-screen50 border p-2 bg-gray-100 rounded-sm "
                      : "border p-2 h-56 bg-gray-100 rounded-sm "
                  }
                >
                  {datesi}
                </div>
              </>
            );
          })
            .concat(
              calendarRows.map((calendarRow, i) => (
                <div
                  key={i}
                  className={`border p-2 ${
                    moment(startDate).add(i, "days").isSame(moment(), "day")
                      ? "bg-gray-200"
                      : "bg-slate-100"
                  } rounded-sm ${
                    datenumber === 7
                      ? "h-screen100"
                      : datenumber === 14
                      ? "h-screen50"
                      : "h-56"
                  }`}
                >
                  {calendarRow}
                  {console.log}
                </div>
              ))
            )
            .slice(0, datenumber)}
        </div>
      </div>
    </div>
  );
};

export default TaskCalender;
