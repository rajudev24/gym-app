/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import "react-big-calendar/lib/css/react-big-calendar.css";
import moment from "moment";
import { FocusableItem, Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import "@szhsin/react-menu/dist/index.css";
import "@szhsin/react-menu/dist/transitions/slide.css";
import {
  FaAngleDoubleLeft,
  FaAngleDoubleRight,
  FaEllipsisH,
  FaEye,
  FaFilter,
  FaPen,
  FaPlus,
  FaPlusCircle,
  FaRegCopy,
  FaRegEyeSlash,
  FaRegSave,
  FaRegTrashAlt,
  FaUndo,
} from "react-icons/fa";
import { format } from "date-fns";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import { LuClipboardList } from "react-icons/lu";
import AddWorkoutModal from "../../AllModals/AddWorkoutModal/AddWorkoutModal";
import AddProgram from "../../AllModals/Workout/AddWorkoutModal/AddProgram";
import { AiOutlinePrinter } from "react-icons/ai";
import axios from "axios";
import { TbArrowFork } from "react-icons/tb";
import Select from "react-select";
import CalenderButton from "../../../Shared/CalenderButton/CalenderButton";
import ViewExerciseModal from "../../AllModals/ViewExerciseModal/ViewExerciseModal";
import CreateWorkoutModal from "../../AllModals/CreateWorkoutModal/CreateWorkoutModal";
import ExerciseDetailsShow from "../../../Shared/ExerciseDetailsShow/ExerciseDetailsShow";

const TrainingCalender = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [currentMonth, setCurrentMonth] = useState(moment());
  const [openProgramm, setOpenProgramm] = useState(false);
  const [openWorkout, setOpenWorkout] = useState(false);
  const [hoverDate, setHoverDate] = useState();
  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [data, setData] = useState([])
  const [hidden, setHidden] = useState(true);
  const [exercise, setExercise] = useState();
  // my work
  const [exerciseVal, setExerciseVal] = useState([]);
  // const [reps, setReps] = useState(0);
  // const [sets, setSets] = useState([0]);
  // let set;
  // Get all Workouts---------
  useEffect(() => {
    const url =
      "https://aperio-server.vercel.app/api/v1/exercise/get-all-exercise";
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setExercises(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // open Workout Modal-----------
  const onOpenWorkoutModal = () => setOpenWorkout(true);
  const onCloseWorkoutModal = () => setOpenWorkout(false);

  // open PromramModal-----------------
  const onOpenProgramModal = () => setOpenProgramm(true);
  const onCloseProgramModal = () => setOpenProgramm(false);

  const [openViewExercis, setOpenViewExercis] = useState(false);
  // open Workout Modal-----------
  const onOpenViewExerciseModal = (exercise) => {
    setOpenViewExercis(true);
  };
  const onCloseViewExerciseModal = () => setOpenViewExercis(false);

  const handleAddClick = (date) => {
    setSelectedDate(date);
    // You can implement your logic to add events to this date
    console.log(`Add button clicked for ${date}`);
  };

  // go to previous month------
  const goToPreviousMonth = () => {
    setCurrentMonth(currentMonth.clone().subtract(1, "month"));
  };

  // go to next Month-------
  const goToNextMonth = () => {
    setCurrentMonth(currentMonth.clone().add(1, "month"));
  };

  // go to current Month--------
  const goToToday = () => {
    setCurrentMonth(moment()); // Set current month to the current date
  };

  // button show and hidden------
  const handlebutton = (date) => {
    const fDate = format(new Date(date), "PP");
    setHoverDate(fDate);
  };
  const predata = [
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
    {
      label: "my additon",
      date: "Sep 1, 2023",
    },
  ];

  const [data, setData] = useState(predata);

  // console.log("er", exerciseVal);
  // console.log("pushed data", data);
  const [filter, setFilter] = useState("");

  const daysInMonth = currentMonth.daysInMonth();
  const startDate = moment(currentMonth).startOf("month");

  const calendarRows = [];

  const weeks = currentMonth?._locale?._weekdaysShort;
  const firstDayOfMonthIndex = currentMonth.startOf("month").day();

  // Set all exercises------------
  const options = exercises?.map((exercise) => ({
    value: exercise?._id,
    label: exercise?.exerciseName,
    imageUrl: exercise?.imageUrls[0],
  }));

  const [showTrackingField, setShowTrackingField] = useState(false);
  // Handle Teacking field Show hide--------

  for (let i = 0; i < daysInMonth; i++) {
    const date = moment(startDate).add(i, "days");
    const newDate = new Date();

    const today = format(new Date(newDate), "PP");
    const thisDay = format(new Date(date?._d), "PP");

    calendarRows.push(
      <div key={i}>
        <div className="flex justify-between ">
          <span
            className={`font-semibold ${
              today === thisDay
                ? "bg-primary rounded-full text-white w-6 h-6 text-base p-2 flex justify-center items-center"
                : "bg-gray-200 rounded-full w-6 h-6 text-base p-2 flex justify-center items-center"
            }`}
          >
            {date.date()}
          </span>

          {/* <button onClick={() => handleAddClick(date)}>click me</button> */}

          <Menu
            align="end"
            menuStyle={{ backgroundColor: "#222222" }}
            menuButton={
              <MenuButton>
                <FaPlusCircle
                  className={`hover:text-primary duration-500 text-gray-300`}
                />
              </MenuButton>
            }
            transition
          >
            <MenuItem
              onClick={onOpenWorkoutModal}
              className="hover:bg-[#2b2b2c] text-gray-400 font-medium"
            >
              <p>Add Workout</p>
            </MenuItem>
            <MenuItem
              onClick={onOpenProgramModal}
              className="hover:bg-[#2b2b2c] text-gray-400 font-medium my-2"
            >
              <p>Add Program</p>
            </MenuItem>
          </Menu>
        </div>

        <div className="mt-2">
          {data?.map((item, i) => (
            <div key={i} className="">
              {format(new Date(item?.date), "PP") ===
                format(new Date(date?._d), "PP") && (
                <div className="bg-white rounded-md border px-1 py-1 hover:border-primary duration-300 cursor-pointer">
                  <div className="text-sm mb-2 px-1 flex justify-between items-center">
                    <button
                      onClick={onOpenViewExerciseModal}
                      className="text-primary font-medium relative"
                    >
                      {item?.label.length > 8
                        ? item?.label.slice(0, 8) + "..."
                        : item?.label}
                      {/* <p className="absolute top-[35px] left-1 text-slate-500 text-[12px]">
                        {sets && `${sets.length}x`}
                      </p> */}
                    </button>

                    <div className="flex gap-1 items-center">
                      {/* <input type="checkbox" name="" id="" className='border-none' /> */}
                      <Menu
                        align="start"
                        menuStyle={{
                          backgroundColor: "#222222",
                          minWidth: "auto",
                        }}
                        menuButton={
                          <MenuButton>
                            <FaEllipsisH className="text-gray-400" />
                          </MenuButton>
                        }
                        transition
                      >
                        <MenuItem className="hover:bg-[#222222] flex flex-col gap-3 items-start hover:rounded-md text-sm text-white font-medium px-4">
                          <button className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                            <LuClipboardList className="text-base" />
                            <p>Log Workout</p>
                          </button>
                          <button className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                            <AiOutlinePrinter className="text-base" />
                            <p>Print Workout</p>
                          </button>
                          <button className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                            <FaRegSave className="text-base" />
                            <p>Save to library</p>
                          </button>
                          <button className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                            <FaRegEyeSlash className="text-base" />
                            <p>Hide from Client</p>
                          </button>
                          <button className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                            <FaRegCopy className="text-base" />
                            <p>Copy</p>
                          </button>
                          <button className="hover:text-primary duration-300 flex gap-2 items-center hover:rounded-md text-white font-medium">
                            <FaRegTrashAlt className="text-base" />
                            <p>Delete</p>
                          </button>
                        </MenuItem>
                      </Menu>
                    </div>
                  </div>

                  {/* Exercise show Button---------- */}
                  <ExerciseDetailsShow
                    item={item}
                    options={options}
                    exerciseVal={exerciseVal}
                    setShowTrackingField={setShowTrackingField}
                    showTrackingField={showTrackingField}
                  />

                  {/* <button className='font-medium hover:border-secondary duration-300 shadow-lg px-2 py-1 border rounded-md w-full bg-white mb-1'>
                      {item?.label?.length > 10 ? item?.label.slice(0, 10) + '...' : item?.label}
                    </button> */}

                  <div className="flex justify-between items-end">
                    <button className="text-[11px] hover:text-primary duration-500 text-gray-500">
                      + 22 more exercise..
                    </button>
                    {/* bottom + icon */}
                    <Menu
                      align="end"
                      arrow={true}
                      direction="right"
                      unmountOnClose={true}
                      menuStyle={{ minWidth: "auto", padding: "0" }}
                      menuButton={
                        <MenuButton>
                          <FaPlusCircle className="hover:text-primary text-sm duration-500 text-gray-300" />
                        </MenuButton>
                      }
                      className="relative"
                    >
                      <MenuItem
                        // + e click korle aita open hocche--then search exercise select korle exercise box open hocche
                        onClick={() => setExercise()}
                        className="text-white bg-black rounded-full absolute flex justify-center items-center -right-2 -top-2 p-[6px] font-normal"
                      >
                        <ImCross className="text-[10px]" />
                      </MenuItem>

                      <div className="p-5 flex flex-col gap-4">
                        {exercise ? (
                          <div>
                            <div className="flex gap-2 items-center">
                              <Select
                                className="w-96"
                                defaultValue={options[0]}
                                imgSrc={(option) => option?.imageUrl}
                                options={options}
                                // value={exerciseVal}
                                onChange={(e) =>
                                  setExerciseVal({
                                    label: e.label,
                                    date: "Sep 5, 2023",
                                  })
                                }
                              />

                              <div className="hover:bg-sky-100 rounded-sm p-2 cursor-pointer">
                                <FaUndo className="text-gray-400" />
                              </div>
                              <div className="hover:bg-sky-100 rounded-sm cursor-pointer text-sm">
                                <Menu
                                  align="end"
                                  unmountOnClose={true}
                                  menuButton={
                                    <MenuButton className="p-1">
                                      <FaEllipsisH className="text-gray-400 text-lg" />
                                    </MenuButton>
                                  }
                                  transition
                                >
                                  <MenuItem
                                  // onClick={() => onOpenViewExerciseModal(exercise)}
                                  >
                                    <div
                                      // onClick={(e) => hadleEditNote(e, note?._id)}
                                      className="text-gray-600 flex gap-2 items-center"
                                    >
                                      <FaEye className=" " />
                                      <p className="">View Exercise</p>
                                    </div>
                                  </MenuItem>
                                  <MenuItem>
                                    <div
                                      onClick={() => setShowTrackingField(true)}
                                      className="text-gray-600 flex gap-2 items-center"
                                    >
                                      <FaPen className=" " />
                                      <p className="">Customize fields</p>
                                    </div>
                                  </MenuItem>
                                  <MenuItem>
                                    <div
                                      // onClick={(e) => hadleEditNote(e, note?._id)}
                                      className="text-gray-600 flex gap-2 items-center"
                                    >
                                      <TbArrowFork className=" " />
                                      <p className="">
                                        Add Alternate Exercises
                                      </p>
                                    </div>
                                  </MenuItem>
                                </Menu>
                              </div>
                            </div>
                            <CalenderButton
                              showTrackingField={showTrackingField}
                              setShowTrackingField={setShowTrackingField}
                              // setSets={setSets}
                              // sets={sets}
                              // reps={reps}
                              // setReps={setReps}
                            />
                          </div>
                        ) : (
                          <Menu
                            align="start"
                            unmountOnClose={true}
                            menuStyle={{ minWidth: "auto", padding: "0" }}
                            menuButton={
                              <MenuButton>
                                <div className="w-96 text-sm px-4 border rounded-md hover:border-primary flex justify-between items-center">
                                  <input
                                    type="search"
                                    name=""
                                    placeholder={
                                      exercise
                                        ? exercise?.exerciseName
                                        : "Search for your Exercise"
                                    }
                                    id=""
                                    className="w-full text-gray-900 py-2 focus:outline-none focus:border-primary font-semibold"
                                  />
                                  <FaFilter className="text-gray-400 text-lg" />
                                </div>
                              </MenuButton>
                            }
                            transition
                          >
                            <MenuItem className="p-0 hover:bg-transparent">
                              <div className="w-96 h-80 overflow-y-scroll text-sm p-5 border rounded-md hover:border-primary flex flex-col gap-4">
                                {exercises?.map((exercise) => (
                                  <div
                                    onClick={() => setExercise(exercise)}
                                    key={exercise?._id}
                                    className="flex gap-2 hover:bg-gray-100 items-center"
                                  >
                                    <img
                                      src={exercise?.imageUrls[0]}
                                      alt=""
                                      className="w-10 object-cover rounded-md"
                                    />
                                    <h2 className="font-semibold text-sm hover:text-primary duration-300">
                                      {exercise?.exerciseName}
                                    </h2>
                                  </div>
                                ))}
                              </div>
                            </MenuItem>
                          </Menu>
                        )}
                        <hr />
                        <div>
                          <button
                            className="px-5 text-white text-lg font-medium rounded-md py-1 bg-primary"
                            onClick={() =>
                              setData(
                                (prev) => exerciseVal && [...prev, exerciseVal]
                              )
                            }
                          >
                            Add
                          </button>
                        </div>
                      </div>
                    </Menu>
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    );
  }

  const [active, setActive] = useState(false);

  return (
    <div className="min-h-screen flex flex-col p-3">
      {/* Add Workout Modal------------------------------- */}
      <Modal
        open={openWorkout}
        closeIcon={<ImCross />}
        onClose={onCloseWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-3/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        {/* <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient> */}
        <AddWorkoutModal
          onCloseWorkoutModal={onCloseWorkoutModal}
        ></AddWorkoutModal>
      </Modal>

      {/* Add Program Modal---------- */}
      <Modal
        open={openProgramm}
        closeIcon={<ImCross />}
        onClose={onCloseProgramModal}
        center
        classNames={{
          modal: "p-5 overflow-visible rounded-md w-3/4",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        {/* <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient> */}
        <AddProgram onCloseProgramModal={onCloseProgramModal}></AddProgram>
      </Modal>

      {/* Add Workout Modal------------------------------- */}
      <Modal
        open={openViewExercis}
        closeIcon={<ImCross />}
        onClose={onCloseViewExerciseModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md min-w-[900px]",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50",
        }}
      >
        <CreateWorkoutModal
          onCloseViewExerciseModal={onCloseViewExerciseModal}
        ></CreateWorkoutModal>
      </Modal>

      <div className="custom-calendar border rounded-md">
        <div className="flex justify-between items-center">
          <div className="flex items-center text-sm">
            <button
              onClick={goToPreviousMonth}
              className="border active:bg-primary active:text-white px-2 py-1 rounded-l-sm flex items-center gap-2"
            >
              <FaAngleDoubleLeft /> Previous
            </button>
            <button
              onClick={goToToday}
              className="border active:bg-primary active:text-white px-2 py-1 border-x-0 flex gap-2 items-center"
            >
              <FaAngleDoubleLeft /> Today <FaAngleDoubleRight />
            </button>
            <button
              onClick={goToNextMonth}
              className="border active:bg-primary active:text-white px-2 py-1 rounded-r-sm flex gap-2 items-center"
            >
              Next <FaAngleDoubleRight />
            </button>
          </div>

          <div className="calendar-header">
            {currentMonth.format("MMMM YYYY")}
          </div>

          <div className="flex gap-2 items-center text-sm">
            <button className="border px-3 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white">
              1 Week
            </button>
            <button className="border px-3 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white">
              2 Week
            </button>
            <button className="border px-3 py-1 active:bg-gray-900 focus:bg-gray-900 rounded-full active:text-white text-black focus:text-white">
              4 Week
            </button>
          </div>
        </div>
        <div className="mt-2 mb-5 flex gap-2">
          <button
            onClick={() => setActive(false)}
            className={`px-5 py-1 border rounded-sm border-primary font-semibold text-sm ${
              !active && "bg-primary text-white"
            }`}
          >
            Assignment
          </button>
          <button
            onClick={() => setActive(true)}
            className={`px-5 py-1 border rounded-sm font-semibold text-sm ${
              active && "bg-primary text-white"
            }`}
          >
            History
          </button>
        </div>

        <div className="grid grid-cols-7 gap-2 w-full">
          {weeks.map((dayName, i) => (
            <h2 key={i} className={`text-lg font-semibold text-center border`}>
              {dayName}
            </h2>
          ))}

          {Array.from({ length: firstDayOfMonthIndex }, (_, i) => (
            <div
              key={i}
              className="border p-2 h-56 bg-gray-100 rounded-sm"
            ></div>
          ))}
          {calendarRows.map((calendarRow, i) => (
            <div
              key={i}
              className={`border p-1 min-h-[200px] ${
                moment(startDate).add(i, "days").isSame(moment(), "day")
                  ? "bg-gray-200"
                  : "bg-slate-100"
              } rounded-sm`}
            >
              {calendarRow}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrainingCalender;
