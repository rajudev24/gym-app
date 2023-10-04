/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import React from "react";
import {
  FaCopy,
  FaEllipsisH,
  FaEye,
  FaPen,
  FaRegCopy,
  FaRegTrashAlt,
  FaTrashAlt,
  FaUndo,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { TbArrowFork } from "react-icons/tb";
import Select from "react-select";
import CalenderButton from "../CalenderButton/CalenderButton";

const ExerciseDetailsShow = ({
  item,
  options,
  setShowTrackingField,
  showTrackingField,
  exerciseVal,
}) => {
  //   console.log("exDtils", item);
  return (
    <Menu
      align="end"
      arrow={true}
      direction="right"
      unmountOnClose={true}
      menuStyle={{ minWidth: "auto", padding: "0" }}
      menuButton={
        <MenuButton className="w-full">
          <button className="font-medium hover:border-secondary duration-300 shadow-lg px-2 py-1 border rounded-md w-full bg-white mb-1">
            {item?.label.length > 10
              ? item?.label.slice(0, 10) + "..."
              : item?.label}
          </button>
        </MenuButton>
      }
      className="relative"
    >
      <MenuItem
        // onClick={() => setExercise()}
        className="text-white bg-black rounded-full absolute flex justify-center items-center -right-2 -top-2 p-[6px] font-normal"
      >
        <ImCross className="text-[10px]" />
      </MenuItem>

      <div className="p-5">
        <div className="flex gap-2 items-center">
          <Select
            className="w-96"
            defaultValue={item}
            // defaultValue={options[0]}
            options={options}
            // onChange={(e) => console.log(e.label)}
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
                  <p className="">Add Alternate Exercises</p>
                </div>
              </MenuItem>
            </Menu>
          </div>
        </div>
        <CalenderButton
          showTrackingField={showTrackingField}
          setShowTrackingField={setShowTrackingField}
        />
      </div>
      {/* <div className='px-5'>
                <CalenderButton setShowTrackingField={setShowTrackingField} showTrackingField={showTrackingField} />
            </div> */}
      <hr className="mt-3" />
      <div className="px-5 py-3 flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <div className="p-2 rounded-full bg-gray-200">
            <FaRegCopy className="text-gray-600" />
          </div>
          <div className="p-2 rounded-full bg-gray-200">
            <FaRegTrashAlt className="text-gray-600" />
          </div>
        </div>
        <button className="px-8 text-white text-lg font-medium rounded-md py-1 bg-primary">
          Save
        </button>
      </div>
    </Menu>
  );
};

export default ExerciseDetailsShow;
