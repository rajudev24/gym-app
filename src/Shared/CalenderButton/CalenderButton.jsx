/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import React, { useState } from "react";
import {
  FaAngleDown,
  FaPlus,
  FaPlusCircle,
  FaRegTimesCircle,
} from "react-icons/fa";
import { AllSets, setTypes, TrackingFields } from "../../utils";
import { RiFileList2Line } from "react-icons/ri";
import TimeField from "react-simple-timefield";
import { ImCross } from "react-icons/im";

const CalenderButton = ({
  setShowTrackingField,
  showTrackingField,
  //   sets,
  //   setSets,
  //   reps,
  //   setReps,
}) => {
  const [formattedValue, setFormattedValue] = useState("");
  const [sets, setSets] = useState([0]);
  const [noteShow, setNoteShow] = useState(false);
  const [trackingField, settrackingField] = useState(["Reps"]);
  const [type, setType] = useState({
    value: "Regular",
    sign: "R",
    color: "#faf74c",
  });
  const [crossShow, setCrossShow] = useState("");

  // delete set----
  const deleteSet = (value) => {
    if (value !== 0) {
      const newSets = sets.filter((item) => item !== value);
      setSets(newSets);
    }
  };

  const [selectedTrackingFields, setSelectedTrackingFields] =
    useState(trackingField);
  // Save Selected Fields
  const saveFields = () => {
    setShowTrackingField(false);
    setSelectedTrackingFields(trackingField);
  };

  // hide tracking field------
  const hideTracking = () => {
    setShowTrackingField(false);
    settrackingField(["Reps"]);
    setSelectedTrackingFields(["Reps"]);
  };

  // Delete Tracking Field -------
  const deleteTrackingField = (item) => {
    if (trackingField?.length > 1) {
      const restField = trackingField?.filter((field) => field !== item);
      settrackingField(restField);
    }
  };

  // handle hadleTrackingField--------
  const hadleTrackingField = (value) => {
    if (trackingField?.length < 3) {
      settrackingField([...trackingField, value]);
    }
  };

  // Input field format for four digit---------------
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

  return (
    <div>
      {showTrackingField && (
        <div className={`bg-slate-100 p-3 rounded-md my-3 `}>
          <div className="flex justify-between items-center">
            <h2 className="text-[10px] font-medium">SELECT TRACKING FIELDS</h2>
            <div className="flex gap-3">
              <button
                onClick={hideTracking}
                className="text-sm text-red-600 hover:underline"
              >
                Cancel
              </button>
              <button
                onClick={() => saveFields()}
                className="text-sm px-3 text-primary font-medium border border-primary rounded-md hover:bg-primary hover:text-white duration-300"
              >
                Save
              </button>
            </div>
          </div>

          <div className="flex justify-between mt-5">
            <div className="flex gap-2 items-center">
              {trackingField?.map((item, i) => (
                // je field add korbo seta holo item console.log(item)
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
              unmountOnClose={true}
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
      )}

      {/* Set Tracking fields.------ */}
      <div className="my-3">
        <div className="flex justify-around text-xs text-gray-500 mb-2">
          <p>Set</p>
          {selectedTrackingFields?.map((field, i) => (
            <p key={i}>{field}</p>
          ))}
          <p>Rest</p>
        </div>
        <div className="">
          {sets?.map((item, i) => (
            <div
              key={i}
              className="border hover:bg-slate-100 rounded-md py-2 flex justify-around items-center text-sm relative"
            >
              <FaRegTimesCircle
                onClick={() => deleteSet(item)}
                className="absolute text-lg -left-[10px] top-[14px] text-primary"
              />
              <Menu
                align="center"
                unmountOnClose={true}
                menuStyle={{ minWidth: "10px" }}
                menuButton={
                  <MenuButton className="p-1">
                    {/* <FaEllipsisH className="text-gray-400 text-lg" /> */}
                    <div className="px-2 hover:bg-white  flex items-center gap-2">
                      <p
                        style={{ color: `${type?.color}` }}
                        className="font-bold"
                      >
                        {type?.sign}
                        {/* ai data save hobe */}
                      </p>
                      <FaAngleDown />
                    </div>
                  </MenuButton>
                }
                transition
              >
                {/* set */}
                {setTypes?.map((type, i) => (
                  <MenuItem
                    key={i}
                    onClick={() => setType(type)}
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
              {/* reps */}
              {selectedTrackingFields?.map((type, i) => (
                <>
                  {console.log("track", type)}
                  {type === "Time" ? (
                    <TimeField
                      showSeconds
                      value={0}
                      style={{
                        width: 75,
                        color: "#333",
                      }}
                      //ai data save hobe
                      // onChange={this.onTimeChange}
                      // onChange={(e) => setTrainingSetsData({ ...trainingSetsData, rest: e.target.value })}
                      className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
                    />
                  ) : (
                    <input
                      onChange={
                        (e) => console.log(e)
                        //setReps(e.target.value)

                        //setReps(e.target.value)
                        //  {   // setTrainingSetsData({ ...trainingSetsData, reps: e.target.value });
                        //     // setExercisesData({ ...exercisesData, exercise: exercise._id, author_id: "thisCoachIdHere" });}
                      }
                      //   value={reps}
                      type="text"
                      id=""
                      className="px-4 py-[2px] w-16 hover:border-primary border border-base-100 focus:border-primary rounded-sm focus:border focus:outline-none"
                      placeholder="-"
                      maxLength={3}
                    />
                  )}
                </>
              ))}
              <TimeField
                value={0}
                style={{
                  width: 60,
                  color: "#333",
                }}
                // ai data save hobe
                // onChange={this.onTimeChange}
                // onChange={(e) => setTrainingSetsData({ ...trainingSetsData, rest: e.target.value })}
                className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary  rounded-sm focus:border focus:outline-none"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="flex justify-between mt-5">
        {noteShow ? (
          <button
            onClick={() => setNoteShow(false)}
            className="flex gap-1 text-gray-500 text-xs items-center"
          >
            <RiFileList2Line className="text-lg" />
            <h2 className="font-semibold">Remove note</h2>
          </button>
        ) : (
          <button
            onClick={() => setNoteShow(true)}
            className="flex gap-1 text-gray-500 text-xs items-center"
          >
            <FaPlusCircle />
            <h2 className="font-semibold">Add note</h2>
          </button>
        )}
        <div className="text-xs flex gap-3 items-center">
          <input
            // onChange={(e) => setExercisesData({ ...exercisesData, each_side: e.target.checked })}
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

        <div className="text-xs flex items-center">
          <button
            onClick={() => setSets([...sets, sets?.length - 1 + 1])}
            className="px-3 py-2 border rounded-l-md hover:border-primary hover:border-l"
          >
            Add Set
          </button>
          {/* <p>{sets.length}x</p> yes 4x*/}
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
                <div
                  // onClick={(e) => hadleSet(set?.value)}
                  className="text-gray-600"
                >
                  <p className="">+ {set?.item}</p>
                </div>
              </MenuItem>
            ))}
          </Menu>
        </div>
      </div>
      <input
        // onChange={(e) => setExercisesData({ ...exercisesData, note: e.target.value })}
        type="text"
        className={`px-3 w-full mt-2 py-2 border border-gray-100 focus:outline-none focus:border-primary bg-gray-100 rounded-md text-xs ${
          noteShow ? "block" : "hidden"
        }`}
        placeholder="Add note"
      />
    </div>
  );
};

export default CalenderButton;
