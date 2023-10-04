/* eslint-disable no-dupe-keys */
/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import React, { useContext, useEffect, useState } from "react";
import { FaArrowLeft, FaPlusCircle } from "react-icons/fa";
import { RiFileList3Line } from "react-icons/ri";
import { FiRepeat } from "react-icons/fi";
import { IoSettings } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const FormModal = ({ onCloseWorkoutModal, onCloseFormModal }) => {
  const currentDate = new Date();
  const today = currentDate.toISOString().split("T")[0];
  const [showInput, setShowInput] = useState(false);
  const [showRepeat, setShowRepeat] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [showReminderOptions, setShowReminderOptions] = useState(false);
  const { id } = useParams();
  const { user } = useContext(AuthContext);

  const [formData, setFormData] = useState({
    taskName: "",
    note: "",
    date: "",
    setReminder: "",
    showReminder: false,
    selectedTime: "",
    enableComment: false,
    frequency: "",
    repeatEvery: "",
    repeatOn: "",
    forNext: "",
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

  const [days, setDays] = useState({
    M: false,
    T: false,
    W: false,
    Th: false,
    F: false,
    Sa: false,
    Su: false,
  });
  const toggleDay = (day) => {
    setDays((prevDays) => ({
      ...prevDays,
      [day]: !prevDays[day],
    }));
  };

  const selectedDays = Object.keys(days).filter((day) => days[day]);

  const handleShowReminderChange = (e) => {
    setShowReminderOptions(e.target.checked);
  };
  const handleShowSettings = (e) => {
    e.preventDefault();
    setShowSettings(true);
  };
  const handleAddNoteClick = (e) => {
    e.preventDefault();
    setShowInput(true);
  };
  const handleShowRepeat = (e) => {
    e.preventDefault();
    setShowRepeat(true);
  };

  const generateTimeOptions = () => {
    const timeOptions = [];
    for (let hour = 0; hour < 24; hour++) {
      for (let minute = 0; minute < 60; minute += 15) {
        const period = hour < 12 ? "AM" : "PM";
        const formattedHour =
          hour === 0 || hour === 12
            ? "12"
            : (hour % 12).toString().padStart(2, "0");
        const formattedMinute = minute.toString().padStart(2, "0");
        timeOptions.push(`${formattedHour}:${formattedMinute} ${period}`);
      }
    }

    return timeOptions;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const form = {
      form: [
        {
          taskName: formData?.taskName,
          note: formData.note,
          time: formData.date,
          setReminder: formData.setReminder,
          frequency: formData.frequency,
          repeatEvery: formData.repeatEvery,
          repeatOn: selectedDays,
          forNext: formData.forNext,
          enableComment: formData.enableComment,
          showReminder: formData.showReminder,
        },
      ],
      coachId: user._id,
      clientId: id,
    };

    axios
      .post("https://aperio-server.vercel.app/api/v1/task/create-task", form, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
          onCloseWorkoutModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  return (
    <div>
      <div className="p-8">
        <button
          onClick={onCloseFormModal}
          className="text-gray-500 text-sm flex items-center gap-2"
        >
          <FaArrowLeft />
          <p className="font-semibold">Back</p>
        </button>
        <form onSubmit={handleSubmit}>
          <div className="flex gap-2 items-center my-3 font-semibold">
            <RiFileList3Line className="text-green-600 text-xl" />
            <p className="text-xl">Forms</p>
          </div>
          <div className="my-5 flex flex-col gap-5 justify-center">
            <div className="flex gap-1 flex-col justify-center">
              <div className="flex justify-between text-xs text-gray-500">
                <label className="text-[10px]">TASK NAME</label>
                <p>0/90</p>
              </div>
              <input
                name="taskName"
                value={formData.taskName}
                onChange={handleInputChange}
                type="text"
                maxLength={90}
                placeholder="Enter Task Name"
                className="px-4 py-2 rounded-md border"
              />
            </div>
            <div>
              {!showInput ? (
                <button
                  className="flex gap-2 items-center text-gray-500"
                  onClick={handleAddNoteClick}
                >
                  <FaPlusCircle className="text-gray-500" />
                  Add note
                </button>
              ) : (
                <div>
                  <label className="text-xs" htmlFor="">
                    NOTE
                  </label>{" "}
                  <br />
                  <input
                    name="note"
                    value={formData.note}
                    onChange={handleInputChange}
                    type="text"
                    placeholder="Add note"
                    className="w-full p-2 border-none
                   hover:bg-slate-100 rounded-md  focus:outline-indigo-600"
                  />
                </div>
              )}
            </div>
            <div className="flex align-middle">
              <div>
                <label className="text-[10px] text-gray-500 font-semibold">
                  SET DATE
                </label>{" "}
                <br />
                <input
                  type="date"
                  name="date"
                  value={formData.date}
                  onChange={handleInputChange}
                  defaultValue={today}
                  className="w-56 px-4 py-2 border rounded-md"
                />
              </div>
              <div className="flex justify-between mt-5 ml-4 w-72">
                <label className="cursor-pointer label">
                  <input
                    onChange={handleShowReminderChange}
                    type="checkbox"
                    className="toggle toggle-primary"
                  />
                  <span className="label-text ml-2">Set Reminder</span>
                </label>

                {showReminderOptions && (
                  <select
                    name="setReminder"
                    onChange={handleInputChange}
                    value={formData.setReminder}
                    className="mt-2 p-2 border rounded-md"
                  >
                    {generateTimeOptions().map((timeOption, index) => (
                      <option key={index} value={timeOption}>
                        {timeOption}
                      </option>
                    ))}
                  </select>
                )}
              </div>
            </div>
          </div>
          <div>
            <button onClick={handleShowRepeat} className="flex text-indigo-600">
              <div className="p-1">
                <FiRepeat className="p-1 bg-indigo-200 rounded-full text-xl" />
              </div>
              Repeat
            </button>
            {showRepeat && (
              <div className="p-4 mt-2 bg-slate-100 rounded-md">
                <div className="flex justify-between">
                  <div>
                    <label htmlFor="">Frequency</label>
                    <select
                      name="frequency"
                      value={formData.frequency}
                      onChange={handleInputChange}
                      className="select select-primary max-w-xs ml-2 focus:outline-none"
                    >
                      <option className="p-4 hover:bg-indigo-300 ">
                        Weekly
                      </option>
                      <option>Monthly</option>
                    </select>
                  </div>
                  <button
                    onClick={() => setShowRepeat(false)}
                    className="hover:text-red-500 text-slate-400 -mt-6"
                  >
                    Remove repeat
                  </button>
                </div>
                <div className="flex  mt-4">
                  <div>
                    <label htmlFor="">Every</label>
                    <select
                      name="repeatEvery"
                      value={formData.repeatEvery}
                      onChange={handleInputChange}
                      className="select select-primary max-w-xs ml-2 focus:outline-none"
                    >
                      <option>1</option>
                      <option>2</option>
                      <option>3</option>
                      <option>4</option>
                      <option>5</option>
                      <option>6</option>
                    </select>
                  </div>

                  <span className="ml-4 mt-2 mr-2">week on</span>
                  <div className="flex p-1 border-2">
                    {Object.keys(days).map((day) => (
                      <div key={day} className="ml-4">
                        <button
                          className={` p-1 ${
                            days[day]
                              ? "selected bg-indigo-200 text-indigo-500"
                              : ""
                          }`}
                          onClick={(e) => {
                            e.preventDefault();
                            toggleDay(day);
                          }}
                        >
                          {day}
                        </button>
                      </div>
                    ))}
                  </div>
                </div>
                <div className="flex  mt-4">
                  <label className="mt-2" htmlFor="">
                    For the next
                  </label>
                  <select
                    name="forNext"
                    value={formData.forNext}
                    onChange={handleInputChange}
                    className="select select-primary max-w-xs ml-2 focus:outline-none"
                  >
                    {Array.from({ length: 26 }, (_, index) => (
                      <option key={index + 1} value={index + 1}>
                        {index + 1}
                      </option>
                    ))}
                  </select>

                  <span className="ml-4 mt-2 mr-2">weeks</span>
                </div>
              </div>
            )}
          </div>
          <hr className="w-full mt-6 mb-6" />
          <div className="mt-2">
            <button
              onClick={handleShowSettings}
              className="flex hover:text-indigo-600"
            >
              <IoSettings />
              <span className="text-xs ml-1">ADVANCED SETTINGS</span>
            </button>
            {showSettings && (
              <div className="mt-4 p-4 bg-slate-100 rounded-md">
                <label className="cursor-pointer label w-60">
                  <input
                    name="enableComment"
                    value={formData.enableComment}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="toggle toggle-primary"
                  />
                  <span className="label-text">Enable comment capability</span>
                </label>
                <label className="cursor-pointer label w-56">
                  <input
                    name="showReminder"
                    value={formData.showReminder}
                    onChange={handleCheckboxChange}
                    type="checkbox"
                    className="toggle toggle-primary"
                  />
                  <span className="label-text">Show reminder if missed</span>
                </label>
              </div>
            )}
          </div>
          <div className="flex justify-end w-full px-10 py-3 gap-2 font-semibold shadow-2xl border rounded-b-md border-top">
            <button
              type="submit"
              className="px-5 py-2 text-center border rounded-md"
            >
              Save
            </button>
            <button
              type="submit"
              className="px-5 py-2 text-center bg-primary rounded-md text-white"
            >
              Save & Close
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default FormModal;
