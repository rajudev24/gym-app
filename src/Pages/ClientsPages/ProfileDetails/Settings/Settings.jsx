/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { TfiRulerAlt2 } from "react-icons/tfi";
import { Link, useParams } from "react-router-dom";
import {
  MdOutlineListAlt,
  MdOutlineSportsGymnastics,
  MdOutlineWatchLater,
} from "react-icons/md";
import TimezoneSelect from "react-timezone-select";
import { FaBook, FaCamera, FaDumbbell, FaLock } from "react-icons/fa";
import { FaBookOpenReader } from "react-icons/fa6";
import { CiAvocado } from "react-icons/ci";
import {
  BiLock,
  BiPulse,
  BiSolidMessageDetail,
  BiSolidPieChartAlt2,
} from "react-icons/bi";
import axios from "axios";
import { toast } from "react-hot-toast";
import { useContext } from "react";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";

const Settings = () => {
  const [selectedTimezone, setSelectedTimezone] = useState(
    Intl.DateTimeFormat().resolvedOptions().timeZone
  );
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [showTraining, setShowTraining] = useState(false);
  const [showActivities, setShowActivities] = useState(false);
  const [showMacros, setShowMacros] = useState(false);
  const [showMessages, setShowMessages] = useState(false);
  const [settingsData, setSettingsData] = useState([]);

  const handleTraining = (e) => {
    const isChecked = e.target.checked;
    setShowTraining(isChecked);
  };

  useEffect(() => {
    const checkedTarningExist =
      settingsData?.isWorkoutComments || settingsData?.isRestDayMessage;
    setShowTraining(checkedTarningExist);
    setShowActivities(settingsData?.isLogComments);
    setShowMacros(settingsData?.isMacrosGoal);
    setShowMessages(settingsData?.isLogComments);
  }, [settingsData]);

  const handleActivities = (e) => {
    const isChecked = e.target.checked;
    setShowActivities(isChecked);
  };
  const handleMacros = (e) => {
    const isChecked = e.target.checked;
    setShowMacros(isChecked);
  };
  const handleMessages = (e) => {
    const isChecked = e.target.checked;
    setShowMessages(isChecked);
  };

  const [formData, setFormData] = useState({
    weightUnit: "",
    distanceUnit: "",
    lengthUnit: "",
    dateFormat: "",
    isWorkoutComments: false,
    isRestDayMessage: false,
    isLogComments: false,
    isTask: false,
    isFoodJournal: false,
    isMacrosGoal: false,
    isVoiceMessages: false,
    isProgressPhoto: false,
    isBodyMetrics: false,
    isRearrangeWorkouts: false,
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleCheckboxChange = (e) => {
    const { name, checked } = e.target;
    setFormData({
      ...formData,
      [name]: checked,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      weightUnit: formData?.weightUnit,
      distanceUnit: formData?.distanceUnit,
      lengthUnit: formData?.lengthUnit,
      dateFormat: formData?.dateFormat,
      isWorkoutComments: formData?.isWorkoutComments,
      isRestDayMessage: formData?.isRestDayMessage,
      isLogComments: formData?.isLogComments,
      isTask: formData?.isTask,
      isFoodJournal: formData?.isFoodJournal,
      isMacrosGoal: formData?.isMacrosGoal,
      isVoiceMessages: formData?.isVoiceMessages,
      isProgressPhoto: formData?.isProgressPhoto,
      isBodyMetrics: formData?.isBodyMetrics,
      isRearrangeWorkouts: formData?.isRearrangeWorkouts,
      timeZone: selectedTimezone,
      coachId: user._id,
      clientId: id,
    };

    axios
      .post(
        "https://aperio-server.vercel.app/api/v1/settings/create-settings",
        data,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  useEffect(() => {
    axios(`https://aperio-server.vercel.app/api/v1/settings/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        if (res?.data?.status === "success") {
          setSettingsData(res.data.data);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);
  // console.log(formData);
  // console.log(settingsData);
  return (
    <div className="flex w-full">
      <div className="relative">
        <div className="w-48 py-8 border-r min-h-screen fixed top-20 px-5">
          <h2 className="text-lg font-bold px-3">Settings</h2>
          <div className="flex flex-col gap-3 justify-start text-left mt-5">
            <a
              href="#unit"
              className="text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md"
            >
              Units
            </a>
            <a
              href="#time"
              className="text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md"
            >
              Timezone
            </a>
            <a
              href="#feature"
              className="text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md"
            >
              Features
            </a>
            <a
              href="#workout"
              className="text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md"
            >
              Workout Settings
            </a>
            <a
              href="#team"
              className="text-left active:bg-[#EAEAFF] focus:bg-[#EAEAFF] px-3 py-1 rounded-md"
            >
              Team Permission
            </a>
          </div>
        </div>
      </div>
      <div>
        {/* <div id='unit' className='ml-48'> </div> */}
        <form onSubmit={handleSubmit}>
          {/* units section------------- */}
          <div id="unit" className="ml-48 p-5">
            <div className="flex gap-36 items-baseline">
              <div className="flex gap-3 items-center">
                <TfiRulerAlt2 className="text-xl text-gray-500 -rotate-90" />
                <h2 className="text-xl font-semibold">Units</h2>
              </div>
              <div className="flex gap-20">
                <div className="flex gap-5">
                  <ul className="flex flex-col gap-3">
                    <li className="text-[10px] text-gray-400 font-semibold">
                      WEIGHT UNIT
                    </li>
                    <li className="flex gap-1 items-center">
                      <input
                        name="weightUnit"
                        value="Metric (kg)"
                        type="radio"
                        className="radio-primary w-4 h-4 p-0"
                        onChange={handleInputChange}
                        checked={
                          formData.weightUnit === "Metric (kg)" ||
                          settingsData?.weightUnit === "Metric (kg)"
                        }
                      />
                      <label className="text-sm font-semibold">
                        Metric (kg)
                      </label>
                    </li>
                    <li className="flex gap-1 items-center">
                      <input
                        name="weightUnit"
                        value="US/Imperial (lb)"
                        type="radio"
                        className="radio-primary w-4 h-4 p-0"
                        onChange={handleInputChange}
                        checked={
                          formData.weightUnit === "US/Imperial (lb)" ||
                          settingsData?.weightUnit === "US/Imperial (lb)"
                        }
                      />
                      <label className="text-sm font-semibold">
                        US/Imperial (lb)
                      </label>
                    </li>
                  </ul>
                  <ul className="flex flex-col gap-3">
                    <li className="text-[10px] text-gray-400 font-semibold">
                      DISTANCE UNIT
                    </li>
                    <li className="flex gap-1 items-center">
                      <input
                        name="distanceUnit"
                        value="Metric (km)"
                        type="radio"
                        className="radio-primary w-4 h-4 p-0"
                        onChange={handleInputChange}
                        checked={
                          formData.distanceUnit === "Metric (km)" ||
                          settingsData?.distanceUnit === "Metric (km)"
                        }
                      />
                      <label className="text-sm font-semibold">
                        Metric (km)
                      </label>
                    </li>
                    <li className="flex gap-1 items-center">
                      <input
                        name="distanceUnit"
                        value="US/Imperial (miles)"
                        type="radio"
                        className="radio-primary w-4 h-4 p-0"
                        onChange={handleInputChange}
                        checked={
                          formData.distanceUnit === "US/Imperial (miles)" ||
                          settingsData?.distanceUnit === "US/Imperial (miles)"
                        }
                      />
                      <label className="text-sm font-semibold">
                        US/Imperial (miles)
                      </label>
                    </li>
                  </ul>
                  <ul className="flex flex-col gap-3">
                    <li className="text-[10px] text-gray-400 font-semibold">
                      LENGTH UNIT
                    </li>
                    <li className="flex gap-1 items-center">
                      <input
                        name="lengthUnit"
                        value="US/Imperial (miles)"
                        type="radio"
                        className="radio-primary w-4 h-4 p-0"
                        onChange={handleInputChange}
                        checked={
                          formData.lengthUnit === "US/Imperial (miles)" ||
                          settingsData?.lengthUnit === "US/Imperial (miles)"
                        }
                      />
                      <label className="text-sm font-semibold">
                        US/Imperial (miles)
                      </label>
                    </li>
                    <li className="flex gap-1 items-center">
                      <input
                        name="lengthUnit"
                        value="US/Imperial (inch)"
                        type="radio"
                        className="radio-primary w-4 h-4 p-0"
                        onChange={handleInputChange}
                        checked={
                          formData.lengthUnit === "US/Imperial (inch)" ||
                          settingsData?.lengthUnit === "US/Imperial (inch)"
                        }
                      />
                      <h2 className="text-sm font-semibold">
                        US/Imperial (inch)
                      </h2>
                    </li>
                  </ul>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border px-6 py-1 border-primary rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-10" />
          </div>

          {/* Time Section-------------- */}
          <div id="time" className="ml-48 p-5 ">
            <div className="flex gap-28 items-baseline">
              <div className="flex gap-2 items-center">
                <MdOutlineWatchLater className="text-2xl text-gray-500" />
                <h2 className="text-xl font-semibold">Timezone</h2>
              </div>

              <div className="flex gap-20">
                <div className="flex flex-col gap-10">
                  <TimezoneSelect
                    className="w-96"
                    value={selectedTimezone}
                    onChange={setSelectedTimezone}
                  />
                  <div className="flex justify-between">
                    <div>
                      <h2 className="text-sm font-semibold">Date Settings</h2>
                      <h2 className="text-sm text-gray-500">
                        Current date format
                      </h2>
                    </div>
                    <select
                      name="dateFormat"
                      value={settingsData?.dateFormat || formData.dateFormat}
                      onChange={handleInputChange}
                      className="select select-bordered w-56 focus:outline-none hover:border-primary focus:border-primary"
                    >
                      <option>MM/DD/YYYY</option>
                      <option>DD/MM/YYYY</option>
                    </select>
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border px-6 py-1 border-primary rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-10" />
          </div>

          {/* Features------------------ */}
          <div id="feature" className="ml-48 p-5 ">
            <div className="flex gap-28 items-baseline">
              <div className="flex gap-2 items-center">
                <MdOutlineListAlt className="text-2xl text-gray-500" />
                <h2 className="text-xl font-semibold">Features</h2>
              </div>

              <div className="flex gap-14">
                <div className="flex flex-col gap-5">
                  <p className="text-sm">
                    Create a custom experience for every client by disabling or
                    enabling certain features. When a feature is disabled, it
                    will not appear on your client's mobile app
                  </p>
                  <Link className="text-primary flex gap-2 items-center">
                    <FaBook />
                    <p className="text-sm font-semibold hover:underline">
                      How to disable/enable features{" "}
                    </p>
                  </Link>

                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <FaDumbbell className="text-2xl text-gray-500 -rotate-45" />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Training</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Assign workouts and track training progress
                        </p>
                        {showTraining && (
                          <>
                            <div className="flex gap-2 items-center">
                              <input
                                name="isWorkoutComments"
                                value={formData.isWorkoutComments}
                                onChange={handleCheckboxChange}
                                type="checkbox"
                                className="w-4 h-4"
                                defaultChecked={settingsData?.isWorkoutComments}
                              />
                              <p className="text-sm font-semibold">
                                Allow client to leave workout comments
                              </p>
                            </div>
                            <div className="flex gap-2 items-center">
                              <input
                                name="isRestDayMessage"
                                value={formData.isRestDayMessage}
                                onChange={handleCheckboxChange}
                                type="checkbox"
                                className="w-4 h-4"
                                defaultChecked={settingsData?.isRestDayMessage}
                              />
                              <p className="text-sm font-semibold">
                                Show rest day message
                              </p>
                            </div>
                          </>
                        )}
                      </div>
                    </div>
                    <input
                      onChange={handleTraining}
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={showTraining}
                    />
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <MdOutlineSportsGymnastics className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Log Activities</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Let your client add extra workouts or unassigned
                          activities
                        </p>
                        {showActivities && (
                          <div className="flex gap-2 items-center">
                            <input
                              name="isLogComments"
                              value={formData.isLogComments}
                              onChange={handleCheckboxChange}
                              type="checkbox"
                              className="w-4 h-4"
                              defaultChecked={settingsData?.isLogComments}
                            />
                            <p className="text-sm font-semibold">
                              Allow client to leave activity comments
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      onChange={handleActivities}
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={showActivities}
                    />
                  </div>

                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <FaBookOpenReader className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Tasks</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Schedule to-dos and deliver education material
                        </p>
                      </div>
                    </div>
                    <input
                      name="isTask"
                      value={formData.isTask}
                      onChange={handleCheckboxChange}
                      type="checkbox"
                      className="toggle toggle-primary"
                      defaultChecked={formData.isTask || settingsData?.isTask}
                    />
                  </div>

                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <CiAvocado className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Food Journal</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Monitor client food intake and easily provide feedback
                        </p>
                      </div>
                    </div>

                    <input
                      name="isFoodJournal"
                      value={formData.isFoodJournal}
                      onChange={handleCheckboxChange}
                      defaultChecked={settingsData?.isFoodJournal}
                      type="checkbox"
                      className="toggle toggle-primary"
                    />
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <BiSolidPieChartAlt2 className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Macros</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Track client nutrition using macros and daily calories
                        </p>

                        {showMacros && (
                          <div className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              name="isMacrosGoal"
                              value={formData.isMacrosGoal}
                              onChange={handleCheckboxChange}
                              id=""
                              className="w-4 h-4"
                              defaultChecked={settingsData?.isMacrosGoal}
                            />
                            <p className="text-sm font-semibold">
                              Allow client to adjust their own goal
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      onChange={handleMacros}
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={showMacros}
                    />
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <BiSolidMessageDetail className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Messages</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Message your client directly through the platform
                        </p>

                        {showMessages && (
                          <div className="flex gap-2 items-center">
                            <input
                              type="checkbox"
                              name="isVoiceMessages"
                              value={formData.isVoiceMessages}
                              onChange={handleCheckboxChange}
                              id=""
                              className="w-4 h-4"
                              defaultChecked={settingsData?.isVoiceMessages}
                            />
                            <p className="text-sm font-semibold">
                              Allow client to send voice messages
                            </p>
                          </div>
                        )}
                      </div>
                    </div>
                    <input
                      onChange={handleMessages}
                      type="checkbox"
                      className="toggle toggle-primary"
                      checked={showMessages}
                    />
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <FaCamera className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Progress Photo</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Visualize improvement with before and after photos
                        </p>
                      </div>
                    </div>
                    <input
                      name="isBodyMetrics"
                      value={formData.isBodyMetrics}
                      onChange={handleCheckboxChange}
                      defaultChecked={settingsData?.isBodyMetrics}
                      type="checkbox"
                      className="toggle toggle-primary"
                    />
                  </div>
                  <div className="flex justify-between items-start w-full">
                    <div className="flex gap-10">
                      <div className="bg-gray-300 flex justify-center items-center rounded-full w-10 h-10 text-center">
                        <BiPulse className="text-2xl text-gray-500 " />
                      </div>
                      <div className="flex flex-col gap-3">
                        <h2 className="text-base font-bold">Body Metrics</h2>
                        <p className="text-xs font-semibold text-gray-400">
                          Track client progress using various body metrics
                        </p>
                        <Link className="text-sm text-primary font-semibold hover:underline">
                          Manage Metrics
                        </Link>
                      </div>
                    </div>
                    <input
                      name="isProgressPhoto"
                      value={formData.isProgressPhoto}
                      onChange={handleCheckboxChange}
                      defaultChecked={settingsData?.isProgressPhoto}
                      type="checkbox"
                      className="toggle toggle-primary"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border px-6 py-1 border-primary rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-10" />
          </div>

          {/* Workout section------------------ */}
          <div id="workout" className="ml-48 p-5 ">
            <div className="flex gap-10 items-start">
              <div className="flex gap-2 items-start">
                <MdOutlineListAlt className="text-4xl text-gray-500" />
                <h2 className="text-xl font-semibold">
                  Client workout settings
                </h2>
              </div>

              <div className="flex gap-14">
                <div className="flex flex-col gap-5 ">
                  <div className="flex flex-col gap-2">
                    <h2 className="text-sm font-semibold">
                      Date range visible to client
                    </h2>
                    <p className="text-sm">
                      Choose range you would like your clients to have access to
                      on their training calendar
                    </p>
                  </div>
                  <div className="flex items-start justify-between">
                    <div>
                      <h2 className="font-semibold">
                        Allow clients to rearrange workouts
                      </h2>
                      <p className="text-xs font-semibold text-gray-400">
                        Grant your clients flexibility to rearrange workouts
                        within their visible range
                      </p>
                    </div>
                    <input
                      name="isRearrangeWorkouts"
                      value={formData.isRearrangeWorkouts}
                      onChange={handleCheckboxChange}
                      defaultChecked={settingsData?.isRearrangeWorkouts}
                      type="checkbox"
                      className="toggle toggle-primary"
                    />
                  </div>
                </div>
                <div>
                  <button
                    type="submit"
                    className="border px-6 py-1 border-primary rounded-md"
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
            <hr className="my-10" />
          </div>

          {/* Team permission--------------- */}
          <div id="team" className="ml-48 p-5 ">
            <div className="flex gap-20 items-start">
              <div className="flex gap-2 items-start">
                <BiLock className="text-4xl text-gray-500" />
                <h2 className="text-xl font-semibold">Team Permission</h2>
              </div>

              <div className="flex gap-14">
                <p>Add teammates to manage this client</p>
              </div>
            </div>

            <div className="border border-gray-300 rounded-md p-10 m-5 flex justify-between items-center">
              <p className="font-semibold">Grant Access</p>
              <div>
                <button
                  type="submit"
                  className="border px-6 py-1 border-primary rounded-md"
                >
                  Save
                </button>
              </div>
            </div>

            <hr className="my-10" />
          </div>
        </form>
      </div>
    </div>
  );
};

export default Settings;
