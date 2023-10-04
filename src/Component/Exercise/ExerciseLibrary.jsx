/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { useEffect, useState } from "react";
import {
  BsCheck2Circle,
  BsFillShareFill,
  BsThreeDotsVertical,
} from "react-icons/bs";
import { FaCopy, FaEdit, FaTrashAlt } from "react-icons/fa";
import axios from "axios";
import { format } from "timeago.js";
import Loading from "../../Shared/Loading/Loading";
import { capitalizeFirstLetter } from "../../utils";
import logo from '../../assets/logo3.png'

export default function ExerciseLibrary() {
  const [exercisees, setExercises] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const url = "https://aperio-server.vercel.app/api/v1/exercise/get-all-exercise";
    axios(url, {
      method: "GET",
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        setExercises(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <div className="overflow-x-auto mt-8 h-[450px]">
      {loading ? (
        <Loading />
      ) : (
        <table className="table table-xs table-pin-rows table-pin-cols">
          <thead>
            <tr>
              <th>
                <label>
                  <input
                    type="checkbox"
                    className="checkbox checkbox-primary w-5 h-5 rounded-md"
                  />
                </label>
              </th>
              <th>Exercises</th>
              <th>Tags</th>
              <th>Primary Focus</th>
              <th>Category</th>
              <th>Most Recent</th>
              <th>Custom</th>
            </tr>
          </thead>
          <tbody className="h-10 overflow-x-auto">
            {exercisees?.map((exercise, i) => (
              <tr key={i}>
                <th>
                  <label>
                    <input
                      type="checkbox"
                      className="checkbox checkbox-primary w-5 h-5 rounded-md"
                    />
                  </label>
                </th>
                <td>
                  <div className="flex items-center space-x-3 my-3">
                    <div className="">
                      <div className="mask  w-12 h-12">
                        <img
                          src={exercise.imageUrls[0]}
                          alt="exercise images"
                          className="rounded-md"
                        />
                      </div>
                    </div>
                    <div>
                      <div className="font-bold">{exercise.exerciseName} </div>
                    </div>
                  </div>
                </td>
                <td>
                  <div className="flex items-center space-x-3">--</div>
                </td>
                <td>
                  <span>{exercise?.primaryFocus} </span>
                </td>
                <td> {capitalizeFirstLetter(exercise?.trackingField)} </td>
                <td>
                  <span>{format(exercise.createdAt)} </span>
                </td>
                <td>
                  <div className="flex justify-around w-42">
                    <BsCheck2Circle className="text-2xl text-green-600" />
                    <div className="rounded-full border p-1 w-8 h-8">
                      <img
                        className="object-cover"
                        width={30}
                        src={logo}
                        alt=""
                      />
                    </div>
                    <div className="flex justify-center items-center bg-indigo-100 w-6 h-6 rounded-full">
                      <BsFillShareFill className="text-indigo-600" />
                    </div>

                    <Menu
                      align="end"
                      menuButton={
                        <MenuButton className="p-2">
                          <BsThreeDotsVertical className="text-xl" />
                        </MenuButton>
                      }
                      menuStyle={{ background: "#1F2937" }}
                      transition
                      className="flex gap-10"
                    >
                      <MenuItem className="hover:bg-gray-600">
                        <button
                          // onClick={(e) => hadleEditNote(e, note?._id)}
                          className="flex text-white gap-3 items-center"
                        >
                          <FaEdit className="text-base" />
                          <p className="font-semibold text-sm">Edit</p>
                        </button>
                      </MenuItem>
                      <MenuItem className="hover:bg-gray-600 my-2">
                        <button
                          // onClick={(e) => hadleDeleteNote(e, note?._id)}
                          className="flex text-white gap-3 items-center"
                        >
                          <FaCopy className="text-base" />
                          <p className="font-semibold text-sm">Duplicate</p>
                        </button>
                      </MenuItem>
                      <MenuItem className="hover:bg-gray-600">
                        <button
                          // onClick={(e) => hadleDeleteNote(e, note?._id)}
                          className="flex text-white gap-3 items-center"
                        >
                          <FaTrashAlt className="text-base" />
                          <p className="font-semibold text-sm">Delete</p>
                        </button>
                      </MenuItem>
                    </Menu>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
