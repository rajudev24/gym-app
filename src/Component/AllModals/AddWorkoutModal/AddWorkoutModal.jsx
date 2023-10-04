/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaPlus, FaSearch, FaTag } from "react-icons/fa";
import "./AddWorkoutModal.css";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import CreateWorkoutModal from "../CreateWorkoutModal/CreateWorkoutModal";
import AddSingleClient from "../AddSingleClient/AddSingleClient";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";

const AddWorkoutModal = () => {
  const [openCreateWorkout, setOpenCreateWorkout] = useState(false);
  const [exercise, setExercise] = useState({
    name: "Full Body EMOM 5x4 -Demo",
    exercise: "25",
    description:
      "Four movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.",
    section: [
      {
        name: "Full Body Cool Down",
      },
      {
        name: "Full Body Warm Up",
      },
      {
        name: "TABATA 20:10 8x8",
      },
    ],
  });

  const [exercises, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  // open Workout Modal-----------
  const onOpenWorCreatekoutModal = () => setOpenCreateWorkout(true);
  const onCloseCreateWorkoutModal = () => setOpenCreateWorkout(false);

  const workouts = [
    {
      name: "Full Body EMOM 5x4 -Demo",
      exercise: "25",
      description:
        "Four movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.",
      section: [
        {
          name: "Full Body Cool Down",
        },
        {
          name: "Full Body Warm Up",
        },
        {
          name: "TABATA 20:10 8x8",
        },
      ],
    },
    {
      name: "HIIT-TABATA 20:10 8x8 - Demo",
      exercise: "25",
      description:
        "Two movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.",
      section: [
        {
          name: "Full Body Cool Down",
        },
        {
          name: "Full Body Warm Up",
        },
        {
          name: "TABATA 20:10 8x8",
        },
        {
          name: "TABATA 20:10 8x8",
        },
        {
          name: "TABATA 20:10 8x8",
        },
        {
          name: "TABATA 20:10 8x8",
        },
      ],
    },
    {
      name: "Lower Body 40:20 5x5 - Demo",
      exercise: "14",
      description:
        "Five movements per round, alternating. Work 20 seconds, rest 10 seconds. Two minutes rest between rounds.",
      section: [
        {
          name: "Full Body Cool Down",
        },
        {
          name: "Full Body Warm Up",
        },
        {
          name: "TABATA 20:10 8x8",
        },
      ],
    },
  ];

  // Handle Exercise------
  const handleExercise = (item) => {
    console.log(item);
    setExercise(item);
  };

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

  return (
    <div>
      {/* Create New Workout modal-------- */}
      <Modal
        open={openCreateWorkout}
        closeIcon={<ImCross />}
        onClose={onCloseCreateWorkoutModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md min-w-[900px]",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full z-50",
        }}
      >
        <CreateWorkoutModal
          onCloseCreateWorkoutModal={onCloseCreateWorkoutModal}
        ></CreateWorkoutModal>
      </Modal>

      <div className="flex justify-between">
        <div className="p-5 w-1/2">
          <div className="flex justify-between items-center w-full">
            <h2 className="font-semibold text-xl">Find a Workout</h2>
            <button
              onClick={onOpenWorCreatekoutModal}
              className="flex gap-2 border rounded-md border-primary px-5 py-1 items-center text-sm text-primary"
            >
              <FaPlus />
              Create New
            </button>
          </div>
          <div className="mt-5 flex gap-2 items-baseline">
            <div className="bg-gray-100 w-60 px-4 py-2 border rounded-sm items-center text-sm flex mt-1">
              <FaSearch className="text-slate-400" />
              <input
                type="search"
                placeholder="Search program"
                className="focus:outline-none px-3 bg-transparent w-full"
              />
            </div>
            <button className="flex gap-2 border rounded-sm px-4 py-2 items-center text-sm text-gray-400">
              <FaTag />
              Tag
            </button>
          </div>
          <div className="mt-5">
            <h2 className="text-[10px] font-semibold my-4">MOST RECENT (3)</h2>
            <div className="border rounded-md h-[460px] overflow-y-scroll">
              {workouts?.map((item, i) => (
                <div key={i}>
                  <div
                    onClick={() => handleExercise(item)}
                    className="px-5 py-5 flex justify-between items-center cursor-pointer"
                  >
                    <div className="">
                      <h2 className="text-lg font-semibold">{item?.name}</h2>
                      <p className="text-sm">
                        {item?.exercise} Exercises . {item?.section?.length}{" "}
                        Sections
                      </p>
                    </div>
                    <div className="flex gap-3 items-center">
                      <div className="w-7 h-7 rounded-full p-1 flex justify-center items-center bg-primary">
                        <h2 className="text-sm font-semibold text-white">PR</h2>
                      </div>
                      <p className="text-sm font-semibold">2d</p>
                    </div>
                  </div>
                  <hr />
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Right side Mobile view------------ */}
        <div className="w-1/2 bg-gray-200">
          <div className="p-5">
            <div className="mockup-phone border-gray-100 bg-white">
              <div className="camera bg-white"></div>
              <div className="display bg-white">
                <div className="artboard phone-1 ">
                  <div className="bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 pb-5 pt-10 px-5">
                    <h2 className="text-2xl font-bold text-white">
                      {exercise?.name}
                    </h2>
                    <p className="text-xs mt-2 font-bold text-gray-200">
                      {exercise?.exercise} EXERCISES .{" "}
                      {exercise?.section.length} SECTIONS
                    </p>
                  </div>
                  <div className="px-4 py-2 bg-slate-50">
                    <h2 className="text-sm font-semibold">Description</h2>
                    <p className="text-sm text-justify">
                      {" "}
                      {exercise?.description}
                    </p>
                  </div>

                  <div className="overflow-y-scroll h-80 flex flex-col gap-4 mt-4 pb-10">
                    {loading && <Loading />}
                    {exercises?.map((item, i) => (
                      <div key={i}>
                        <div className=" flex gap-2">
                          <img
                            src={item?.imageUrls[0]}
                            alt=""
                            className="w-12 rounded-md"
                          />
                          <div>
                            <h2 className="font-semibold">
                              {item?.exerciseName}
                            </h2>
                            <p className="text-xs">{item?.trackingField}</p>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <hr />
      <div className="px-10 py-3 flex justify-end">
        <button className="px-7 py-1 bg-primary rounded-sm text-white">
          Select
        </button>
      </div>
    </div>
  );
};

export default AddWorkoutModal;
