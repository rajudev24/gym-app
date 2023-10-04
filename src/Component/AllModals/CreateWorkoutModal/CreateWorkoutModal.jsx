/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useDrag, useDrop } from "react-dnd";
import { deepCopy } from "../../../utils/deepCopy";
import {
  FaAngleRight,
  FaBars,
  FaCog,
  FaDumbbell,
  FaEdit,
  FaEllipsisH,
  FaEye,
  FaFilter,
  FaPen,
  FaPlus,
  FaRegCopy,
  FaRegSave,
  FaRegTimesCircle,
  FaRegTrashAlt,
  FaSearch,
  FaThLarge,
  FaTrashAlt,
  FaUndo,
} from "react-icons/fa";
import Loading from "../../../Shared/Loading/Loading";
import Select from "react-select";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { TbArrowFork } from "react-icons/tb";
import { AllSets, TrackingFields, setTypes } from "../../../utils/";
import TimeField from "react-simple-timefield";
import { ImCross } from "react-icons/im";
import Modal from "react-responsive-modal";
import AddWorkoutModal from "../AddWorkoutModal/AddWorkoutModal";
import ViewExerciseModal from "../ViewExerciseModal/ViewExerciseModal";
import { FaAngleDown } from "react-icons/fa6";

const Exercise = ({ exercise }) => {
  const [, drag] = useDrag(() => ({
    type: "EXERCISE",
    item: { exercise },
  }));
  return (
    <div
      ref={drag}
      className="border rounded-md hover:border-primary cursor-pointer"
    >
      <img
        src={exercise.imageUrls[0]}
        alt=""
        className="h-24 w-full object-cover rounded-t-md"
      />
      <h2 className="p-2 text-sm font-medium hover:text-primary">
        {exercise.exerciseName}
      </h2>
    </div>
  );
};

const CreateWorkoutModal = ({ onCloseCreateWorkoutModal }) => {
  const [active, setActive] = useState(true);
  const [show, setShow] = useState(true);
  const [selectedExercises, setSelectedExercises] = useState([]);
  const [loading, setLoading] = useState(true);
  const [exercises, setExercises] = useState([]);
  const [sets, setSets] = useState([0]);
  const [trackingField, settrackingField] = useState(["Reps"]);
  const [crossShow, setCrossShow] = useState("");
  const [type, setType] = useState({
    value: "Regular",
    sign: "R",
    color: "#faf74c",
  });

  // state data
  const [trainingSetsData, setTrainingSetsData] = useState({});
  const [exercisesData, setExercisesData] = useState({});
  const [workoutData, setWorkoutData] = useState({});

  // FIXME: Drap exercise item
  const [{ isOver }, drop] = useDrop(() => ({
    accept: "EXERCISE",
    drop: (item) => {
      const itemExercise = deepCopy(item.exercise);
      itemExercise.sets = [
        {
          type: {
            value: "Regular",
            sign: "R",
            color: "#faf74c",
            title: "Set",
          },
          restTime: { value: "00:00", title: "Rest" },
          reps: { value: 0, title: "Reps" },
          heartRate: { value: 0, title: "Heart Rate" },
        },
      ];
      setSelectedExercises((prevExercises) => [...prevExercises, itemExercise]);
    },
    collect: (monitor) => ({
      isOver: monitor.isOver(),
    }),
  }));
  const isActive = isOver;
  let backgroundColor = "#222";
  if (isActive) {
    backgroundColor = "darkgreen";
  } else if (drop) {
    backgroundColor = "darkkhaki";
  }

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
        setExercises(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {});
  }, []);

  // Set all exercises------------
  const options = exercises?.map((exercise) => ({
    value: exercise?._id,
    label: exercise?.exerciseName,
    imageUrl: exercise?.imageUrls[0],
  }));

  // Exercise Change options--------
  const [selectedOption, setSelectedOption] = useState();
  const [selectedOptonIndex, setSelectedOptionIndex] = useState(0);
  const handleChange = (selectedOption, index) => {
    setSelectedOption(selectedOption);
    setSelectedOptionIndex(index);
  };

  const handleDrop = (event) => {
    event.preventDefault();
    const droppedFiles = Array.from(event.dataTransfer.files);
  };

  const handleDragOver = (event) => {
    event.preventDefault();
  };

  const hadleSet = (value) => {};

  const deleteSet = (value) => {
    if (value !== 0) {
      const newSets = sets.filter((item) => item !== value);
      setSets(newSets);
    }
  };

  const [showTrackingField, setShowTrackingField] = useState();
  // Handle Teacking field Show hide--------
  const showTracking = (exercise) => {
    // settrackingField(() => {
    const keys = Object.keys(exercise.sets);
    // });
    setShowTrackingField(exercise?._id);
  };

  const hideTracking = () => {
    setShowTrackingField(false);
    settrackingField(["Reps"]);
    setSelectedTrackingFields(["Reps"]);
  };

  // handle hadleTrackingField--------
  const hadleTrackingField = (value) => {
    if (trackingField?.length < 3) {
      settrackingField([...trackingField, value]);
    }
  };
  // Delete Tracking Field -------
  const deleteTrackingField = (item) => {
    if (trackingField?.length > 1) {
      const restField = trackingField?.filter((field) => field !== item);
      settrackingField(restField);
    }
  };

  const [openViewExercis, setOpenViewExercis] = useState(false);
  const [viewExercise, setViewExercise] = useState();

  // open Workout Modal-----------
  const onOpenViewExerciseModal = (exercise) => {
    setViewExercise(exercise);
    setOpenViewExercis(true);
  };
  const onCloseViewExerciseModal = () => setOpenViewExercis(false);

  const [selectedTrackingFields, setSelectedTrackingFields] = useState({
    trackingField,
    i: 0,
  });
  // Save Selected Fields
  const saveFields = (index) => {
    setShowTrackingField(false);
    setSelectedTrackingFields({ trackingField, i: index });
  };

  // Input field format for four digit---------------
  const [formattedValue, setFormattedValue] = useState("");

  const handleInputChange = (e) => {
    const inputValue = e.target.value;

    const formattedInput = inputValue.replace(/\D/g, "");

    const truncatedValue = formattedInput.slice(0, 4);

    const formattedValueWithHyphens = truncatedValue
      .split("")
      .map((char, index) => {
        if (index === 1 || index === 2 || index === 3) {
          return ` - ${char}`;
        }
        return char;
      })
      .join("");

    setFormattedValue(formattedValueWithHyphens);
  };

  // Delelte Exercise form selected Exercise-------
  const deleteExercise = (exercise) => {
    const count = selectedExercises.filter(
      (item) => item?._id === exercise?._id
    ).length;

    if (count > 1) {
      const newArray = selectedExercises.filter((obj, index) => {
        if (obj?._id === exercise?._id) {
          return (
            index ===
            selectedExercises.findIndex((item) => item?._id === exercise?._id)
          );
        }
        return true;
      });
      setSelectedExercises(deepCopy(newArray));
      return;
    }

    const restExercise = selectedExercises?.filter(
      (item) => item?._id !== exercise?._id
    );
    setSelectedExercises(restExercise);
  };

  // FIXME: Change exercise
  const changeExercise = (selectedOption, index) => {
    setSelectedExercises((prevState) => {
      const newState = JSON.parse(JSON.stringify(prevState));
      const exercise = exercises.find(
        (item) => item._id === selectedOption.value
      );
      newState[index] = exercise;
      newState[index].sets = [
        {
          type: {
            value: "Regular",
            sign: "R",
            color: "#faf74c",
            title: "Set",
          },
          restTime: { value: "00:00", title: "Rest" },
          reps: { value: 0, title: "Reps" },
          heartRate: { value: 0, title: "Heart Rate" },
        },
      ];
      return newState;
    });
  };

  // FIXME: Duplicate Exercise
  const duplicateExercise = (exercise) => {
    setSelectedExercises((prevState) => {
      const newSate = deepCopy(prevState);
      newSate.push(deepCopy(exercise));
      return newSate;
    });
  };

  const addNoteToExercise = (note, index) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);
      if (newState[index]) {
        newState[index].note = note;
      }
      return newState;
    });
  };

  const addNewSet = (index) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);

      if (newState[index]) {
        const firstSet = newState[index].sets[0];
        newState[index].sets.push(deepCopy(firstSet));
      }

      return newState;
    });
  };

  const setToggleEachSide = (value, index) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);

      if (newState[index]) {
        newState[index].eachSide = value;
      }

      return newState;
    });
  };

  const deleteSetFromExercise = (index, setIndex) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);
      if (newState[index]) {
        newState[index].sets.splice(setIndex, 1);
      }
      return newState;
    });
  };

  const changeRestTime = (index, setIndex, value) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);
      if (newState[index]) {
        if (newState[index].sets[setIndex]) {
          newState[index].sets[setIndex].restTime.value = value;
        }
      }
      return newState;
    });
  };

  const changeSetType = (index, setIndex, type) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);
      if (newState[index]) {
        if (newState[index].sets[setIndex]) {
          newState[index].sets[setIndex].type = deepCopy(type);
        }
      }
      return newState;
    });
  };

  const updateSetItemValue = (index, setIndex, key, value) => {
    setSelectedExercises((prevState) => {
      const newState = deepCopy(prevState);
      if (newState[index]) {
        if (newState[index].sets[setIndex]) {
          newState[index].sets[setIndex][key].value = value;
        }
      }
      return newState;
    });
  };

  // FIXME: Before return
  return (
    <div className="max-h-screen relative">
      {/* Add Workout Modal------------------------------- */}
      <Modal
        open={openViewExercis}
        closeIcon={<ImCross />}
        onClose={onCloseViewExerciseModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md min-w-[850px]",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        {/* <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient> */}
        <ViewExerciseModal
          onCloseViewExerciseModal={onCloseViewExerciseModal}
          exercise={viewExercise}
        ></ViewExerciseModal>
      </Modal>

      <div className="flex shadow-xl">
        {/* Left Side-------- */}
        <div
          className={`w-2/5 p-5 shadow-inner border-r ${
            show ? "block" : "hidden"
          }`}
        >
          <div className="border border-primary rounded-md flex justify-between">
            <button
              onClick={() => setActive(!active)}
              className={`px-3 rounded-md py-1 active ${
                active && "bg-primary text-white"
              } focus:bg-primary w-full text-primary focus:text-white`}
            >
              Exercises
            </button>
            <button
              onClick={() => setActive(!active)}
              className="px-3 rounded-md py-1 focus:bg-primary w-full text-primary focus:text-white"
            >
              Sections
            </button>
          </div>
          <div className="my-5 bg-gray-100 w-full px-4 py-2 border rounded-md items-center text-sm flex">
            <FaSearch className="text-slate-400" />
            <input
              type="search"
              placeholder="Search program"
              className="focus:outline-none px-3 bg-transparent w-full"
            />
            <FaFilter className="text-slate-400" />
          </div>
          <div>
            <div className="flex justify-between mb-3">
              <h2 className="text-[10px] font-medium">MOST RECENT (1523)</h2>
              <div className="text-sm flex gap-2">
                <FaBars />
                <FaThLarge />
              </div>
            </div>
            {/* exercise section------- */}

            <div>
              {loading && <Loading />}
              <div className="grid grid-cols-2 gap-3 h-80 overflow-y-scroll pr-2">
                {exercises?.map((exercise) => (
                  <Exercise key={exercise._id} exercise={exercise} />
                ))}
              </div>
            </div>
          </div>
        </div>

        <button
          onClick={() => setShow(!show)}
          className={`p-1 border rounded-full absolute top-1/2 ${
            show ? "left-[348px]" : "-left-3"
          }  bg-white z-50`}
        >
          <FaAngleRight />
        </button>

        {/* Right Side----------- */}
        <div
          className={`${
            show ? "w-3/5" : "w-full"
          } relative max-h-screen overflow-y-scroll`}
        >
          <div className="bg-white fixed top-0 z-10 w-3/5">
            <div className="p-7 flex justify-between items-center">
              <div className="w-3/5 px-4 py-1 border rounded-sm text-lg items-center flex">
                <FaSearch className="text-gray-400" />
                <input
                  onChange={(e) =>
                    setWorkoutData({
                      ...workoutData,
                      title: e.target.value,
                      author: "thisCoachIdHere",
                      tags: [],
                      share: 0,
                    })
                  }
                  type="text"
                  placeholder="Name your Workout"
                  className="focus:outline-none px-3 bg-transparent w-full"
                />
              </div>

              <Menu
                align="end"
                menuStyle={{ backgroundColor: "#222222" }}
                menuButton={
                  <MenuButton>
                    <FaEllipsisH className="text-gray-400" />
                  </MenuButton>
                }
                transition
              >
                <MenuItem
                  // onClick={onOpenWorkoutModal}
                  className="hover:bg-[#2b2b2c] text-sm text-gray-400 font-medium flex gap-2 items-center"
                >
                  <FaRegSave />
                  <p>Save Workout</p>
                </MenuItem>
                <MenuItem
                  // onClick={onOpenProgramModal}
                  className="hover:bg-[#2b2b2c] text-sm text-gray-400 font-medium flex gap-2 items-center"
                >
                  <FaCog />
                  <p>Workouts Settings</p>
                </MenuItem>
              </Menu>
            </div>
          </div>

          <div className="p-7 mt-16 flex gap-2 flex-col">
            <label className="text-[10px] font-semibold">DESCRIPTION</label>
            <textarea
              onChange={(e) =>
                setWorkoutData({ ...workoutData, description: e.target.value })
              }
              placeholder="Add a descripton"
              className="focus:outline-none w-3/5 h-9 border px-4 rounded-sm py-1"
            ></textarea>
          </div>

          {/* FIXME: Drag and Drop section start---------- */}

          <div className="px-7">
            <div
              className={`p-7 border border-dashed border-primary rounded-md flex justify-center ${
                isOver ? "bg-gray-100" : ""
              }`}
              ref={drop}
            >
              <div className="flex items-center w-1/2 gap-2">
                <div className="bg-sky-50 p-2 rounded-sm">
                  <FaDumbbell className="text-2xl text-gray-400" />
                </div>
                <h2 className="text-gray-400">
                  Drag exercises from the left to add
                </h2>
              </div>
            </div>
          </div>

          {/* Drag and drop file--------- */}
          {selectedExercises?.map((exercise, index) => (
            <div key={index} className="m-7 p-5 border rounded-md shadow-lg ">
              <div className="flex gap-2 items-center">
                {selectedOptonIndex === index ? (
                  <img
                    src={
                      selectedOption?.imageUrl
                        ? selectedOption?.imageUrl
                        : exercise?.imageUrls[0]
                    }
                    alt=""
                    className="w-10 rounded-sm object-cover"
                  />
                ) : (
                  <img
                    src={exercise?.imageUrls[0]}
                    alt=""
                    className="w-10 rounded-sm object-cover"
                  />
                )}
                {/* FIXME: Select JSX */}
                <Select
                  className="w-full"
                  onChange={(selectedOption) => {
                    changeExercise(selectedOption, index);
                    // handleChange(selectedOption, index);
                  }}
                  value={{
                    label: exercise.exerciseName,
                    value: exercise._id,
                    imageUrl: exercise.imageUrls?.[0],
                  }}
                  // defaultValue={options[0]}
                  imgSrc={(option) => option?.imageUrl}
                  options={options}
                />

                <div className="hover:bg-sky-100 rounded-sm p-2 cursor-pointer">
                  <FaUndo className="text-gray-400" />
                </div>
                <div className="hover:bg-sky-100 rounded-sm cursor-pointer text-sm">
                  <Menu
                    align="end"
                    menuButton={
                      <MenuButton className="p-1">
                        <FaEllipsisH className="text-gray-400 text-lg" />
                      </MenuButton>
                    }
                    transition
                  >
                    <MenuItem onClick={() => onOpenViewExerciseModal(exercise)}>
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
                        onClick={() => showTracking(exercise)}
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
                        <p className="">Add Alternate Exercises</p>
                      </div>
                    </MenuItem>
                    <MenuItem>
                      <div
                        onClick={() => duplicateExercise(exercise)}
                        className="text-gray-600 flex gap-2 items-center"
                      >
                        <FaRegCopy className=" " />
                        <p className="">Duplicate</p>
                      </div>
                    </MenuItem>
                    <MenuItem onClick={() => deleteExercise(exercise)}>
                      <div className="text-gray-600 flex gap-2 items-center">
                        <FaRegTrashAlt className=" " />
                        <p className="">Delete</p>
                      </div>
                    </MenuItem>
                  </Menu>
                </div>
              </div>

              <div
                className={`bg-slate-100 p-3 rounded-md my-3 ${
                  showTrackingField === exercise?._id ? "block" : "hidden"
                }`}
              >
                <div className="flex justify-between items-center">
                  <h2 className="text-[10px] font-medium">
                    SELECT TRACKING FIELDS
                  </h2>
                  <div className="flex gap-3">
                    <button
                      onClick={hideTracking}
                      className="text-sm text-red-600 hover:underline"
                    >
                      Cancel
                    </button>
                    <button
                      onClick={() => saveFields(index)}
                      className="text-sm px-3 text-primary font-medium border border-primary rounded-md hover:bg-primary hover:text-white duration-300"
                    >
                      Save
                    </button>
                  </div>
                </div>

                <div className="flex justify-between mt-5">
                  <div className="flex gap-2 items-center">
                    {trackingField?.map((item, i) => (
                      <div
                        key={i}
                        onMouseOver={() => setCrossShow(item)}
                        onMouseOut={() => setCrossShow("")}
                        className="px-2 flex items-center rounded-md shadow-md bg-white border border-gray-400 relative"
                      >
                        {trackingField?.length > 1 && (
                          <button
                            onClick={() => deleteTrackingField(item)}
                            className={`absolute -top-2 -right-2 bg-black text-[5px] p-1 text-white rounded-full ${
                              crossShow === item ? "block" : "hidden"
                            }`}
                          >
                            <ImCross />
                          </button>
                        )}
                        <p>
                          <span className="font-semibold text-gray-500">
                            {i + 1}.{" "}
                          </span>{" "}
                          {item}
                        </p>
                      </div>
                    ))}
                  </div>

                  <Menu
                    align="end"
                    menuButton={
                      <MenuButton
                        className={`${trackingField?.length === 3 && "hidden"}`}
                      >
                        <div className="px-6 py-2 bg-white hover:bg-gray-100 duration-500 text-gray-500 rounded-md text-xs border">
                          <FaPlus />
                        </div>
                      </MenuButton>
                    }
                    transition
                  >
                    {TrackingFields?.map((item, i) => (
                      <MenuItem
                        key={i}
                        className="text-base"
                        onClick={() => hadleTrackingField(item?.name)}
                      >
                        <p className="text-sm font-semibold">{item?.name}</p>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>

              {/* Set Tracking fields.------ */}
              <div className="my-3">
                <div className="flex justify-around text-xs text-gray-500 mb-2">
                  <p>Set</p>
                  {/* {selectedTrackingFields?.trackingField?.map((field, i) => (
                    <p key={i}>{field}</p>
                  ))} */}
                  {Object.keys(exercise.sets[0]).map((item, idx) => {
                    if (item === "type" || item === "restTime") return null;
                    return <p key={idx}>{exercise.sets[0][item].title}</p>;
                  })}
                  <p>Rest</p>
                </div>
                <div className="">
                  {/* FIXME: Set Section Start */}
                  {exercise.sets.map((singleSet, setIndex) => {
                    return (
                      <div
                        key={setIndex}
                        className="border hover:bg-slate-100 rounded-md py-2 flex justify-around items-center text-sm relative"
                      >
                        <FaRegTimesCircle
                          onClick={() => deleteSetFromExercise(index, setIndex)}
                          className="absolute cursor-pointer text-lg -left-[10px] top-[14px] text-primary"
                        />
                        <Menu
                          align="center"
                          menuStyle={{ minWidth: "10px" }}
                          menuButton={
                            <MenuButton className="p-1">
                              {/* <FaEllipsisH className="text-gray-400 text-lg" /> */}
                              <div className="px-2 hover:bg-white  flex items-center gap-2">
                                <p
                                  style={{ color: `${singleSet?.type?.color}` }}
                                  className="font-bold"
                                >
                                  {singleSet?.type?.sign}
                                </p>
                                <FaAngleDown />
                              </div>
                            </MenuButton>
                          }
                          transition
                        >
                          {setTypes?.map((type, i) => (
                            <MenuItem
                              key={i}
                              onClick={() => {
                                changeSetType(index, setIndex, type);
                                // setType(type)
                              }}
                              className="px-5"
                            >
                              <div className="flex gap-2 items-center">
                                <h2
                                  style={{ color: `${type?.color}` }}
                                  className={`text-sm font-bold `}
                                >
                                  {type?.sign}
                                </h2>
                                <p>{type?.value}</p>
                              </div>
                            </MenuItem>
                          ))}
                        </Menu>

                        <div>
                          {/* {selectedTrackingFields?.trackingField?.map(
                            (type, i) => (
                              <React.Fragment key={i}>
                                {type === "Time" ? (
                                  <TimeField
                                    showSeconds
                                    value={0}
                                    style={{
                                      width: 75,
                                      color: "#333",
                                    }}
                                    // onChange={this.onTimeChange}
                                    onChange={(e) =>
                                      setTrainingSetsData({
                                        ...trainingSetsData,
                                        rest: e.target.value,
                                      })
                                    }
                                    className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
                                  />
                                ) : (
                                  <input
                                    onChange={(e) => {
                                      setTrainingSetsData({
                                        ...trainingSetsData,
                                        reps: e.target.value,
                                      });
                                      setExercisesData({
                                        ...exercisesData,
                                        exercise: exercise._id,
                                        author_id: "thisCoachIdHere",
                                      });
                                    }}
                                    type="text"
                                    id=""
                                    className="px-4 py-[2px] w-16 hover:border-primary border border-base-100 focus:border-primary rounded-sm focus:border focus:outline-none"
                                    placeholder="-"
                                    maxLength={3}
                                  />
                                )}
                              </React.Fragment>
                            )
                          )} */}
                          {Object.keys(singleSet)?.map((setItemKey, i) => {
                            console.log(setItemKey);
                            if (
                              setItemKey === "type" ||
                              setItemKey === "restTime"
                            ) {
                              return null;
                            }

                            console.log("After", setItemKey);
                            return (
                              <React.Fragment key={i}>
                                {
                                  // <TimeField
                                  //   showSeconds
                                  //   value={0}
                                  //   style={{
                                  //     width: 75,
                                  //     color: "#333",
                                  //   }}
                                  //   // onChange={this.onTimeChange}
                                  //   onChange={(e) =>
                                  //     setTrainingSetsData({
                                  //       ...trainingSetsData,
                                  //       rest: e.target.value,
                                  //     })
                                  //   }
                                  //   className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
                                  // />
                                }
                                <input
                                  onChange={(e) => {
                                    // setTrainingSetsData({
                                    //   ...trainingSetsData,
                                    //   reps: e.target.value,
                                    // });
                                    // setExercisesData({
                                    //   ...exercisesData,
                                    //   exercise: exercise._id,
                                    //   author_id: "thisCoachIdHere",
                                    // });
                                    updateSetItemValue(
                                      index,
                                      setIndex,
                                      setItemKey,
                                      e.target.value
                                    );
                                  }}
                                  type="text"
                                  id=""
                                  className="px-4 py-[2px] w-16 hover:border-primary border border-base-100 focus:border-primary rounded-sm focus:border focus:outline-none"
                                  placeholder="-"
                                  maxLength={3}
                                  value={singleSet[setItemKey]?.value}
                                />
                              </React.Fragment>
                            );
                          })}
                        </div>

                        <TimeField
                          value={singleSet?.restTime?.value}
                          style={{
                            width: 60,
                            color: "#333",
                          }}
                          // onChange={this.onTimeChange}
                          onChange={(e) => {
                            changeRestTime(index, setIndex, e.target.value);
                            // setTrainingSetsData({
                            //   ...trainingSetsData,
                            //   rest: e.target.value,
                            // })
                          }}
                          className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
                        />
                      </div>
                    );
                  })}
                  {/* Set Section End */}
                </div>
              </div>

              <div className="flex justify-between">
                <div className="flex gap-4 items-center">
                  <div className="text-xs flex gap-3 items-center">
                    <input
                      onChange={(e) => {
                        setToggleEachSide(e.target.checked, index);
                        // setExercisesData({
                        //   ...exercisesData,
                        //   each_side: e.target.checked,
                        // })
                      }}
                      type="checkbox"
                      name=""
                      id=""
                    />
                    <p>Each Side</p>
                  </div>

                  <input
                    type="text"
                    value={formattedValue}
                    onChange={handleInputChange}
                    placeholder="X - X - X - X"
                    className="px-2 text-center w-24 font-semibold text-sm py-1 hover:border-primary hover:border hover:bg-transparent focus:outline-none focus:bg-transparent bg-gray-100 border rounded-sm "
                  />
                </div>

                <div className="text-xs  flex items-center">
                  <button
                    onClick={() => {
                      // setSets([...sets, sets?.length - 1 + 1])
                      addNewSet(index);
                    }}
                    className="px-3 py-2 border rounded-l-md hover:border-primary hover:border-l"
                  >
                    Add Set
                  </button>

                  <Menu
                    align="end"
                    menuButton={
                      <MenuButton className="h-full">
                        <button className="px-3 py-2 border border-l-0 hover:border-primary hover:border-l bg-slate-100 h-full text-gray-400 rounded-r-md">
                          <FaPlus />
                        </button>
                      </MenuButton>
                    }
                    transition
                  >
                    {AllSets?.map((set, i) => (
                      <MenuItem key={i} className="text-base">
                        <button
                          onClick={(e) => hadleSet(set?.value)}
                          className="text-gray-600"
                        >
                          <p className="">+ {set?.item}</p>
                        </button>
                      </MenuItem>
                    ))}
                  </Menu>
                </div>
              </div>
              <input
                onChange={(e) => {
                  // setExercisesData({ ...exercisesData, note: e.target.value })
                  addNoteToExercise(e.target.value, index);
                }}
                type="text"
                className="px-3 w-full mt-2 py-2 border border-gray-100 focus:outline-none focus:border-primary bg-gray-100 rounded-md text-xs"
                placeholder="Add note for this exercise"
              />
            </div>
          ))}

          {/* Drag and Dropt Section end--------- */}
          <div className="pt-3 pb-10 flex gap-3 w-full px-7">
            <button className="flex gap-2 px-8 py-2 bg-sky-50 items-center duration-500 justify-center hover:bg-primary text-primary hover:text-white w-full rounded-sm">
              {" "}
              <FaPlus className="text-xs" /> Add Exercise
            </button>
            <button className="flex gap-2 px-8 py-2 bg-sky-50 items-center duration-500 justify-center hover:bg-primary text-primary hover:text-white w-full rounded-sm">
              {" "}
              <FaPlus className="text-xs" /> Add Section
            </button>
          </div>
        </div>
      </div>

      {/* bottom section----------- */}
      <hr className="w-full" />
      <div className="w-full z-50 flex justify-end rounded-b-lg bg-white shadow-2xl px-5 py-3">
        <div className="flex gap-2 ">
          <button className="border rounded-md px-5 py-1 text-gray-500">
            Save
          </button>
          <button
            onClick={() =>
              submitHandler(trainingSetsData, exercisesData, workoutData)
            }
            className="bg-primary rounded-md px-5 py-1 text-white"
          >
            Save & Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default CreateWorkoutModal;

//
const submitHandler = async (trainingSetsData, exercisesData, workoutData) => {
  const { data } = await axios.post(
    "https://aperio-server.vercel.app/api/v1/workout/create-workout",
    {
      training_sets: { ...trainingSetsData },
      exercises: { ...exercisesData },
      workout: { ...workoutData },
    }
  );
};
