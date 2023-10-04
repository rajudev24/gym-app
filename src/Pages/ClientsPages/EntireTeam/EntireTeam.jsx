/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import CategoryNavbar from "../../../Shared/CategoryNavbar/CategoryNavbar";
import { BiSolidMessageRounded } from "react-icons/bi";
import { Link } from "react-router-dom";
import { FaAngleDown, FaRegCalendarAlt, FaUser } from "react-icons/fa";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const EntireTeam = () => {
  const { user, reload, searchClient } = useContext(AuthContext);
  const [allClient, setAllClient] = useState([]);

  // Get All Client--------------------
  useEffect(() => {
    axios(
      `https://aperio-server.vercel.app/api/v1/user/underCreator/${user?._id}`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      }
    )
      .then((res) => {
        // console.log(res?.data?.data);
        setAllClient(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email, reload]);

  return (
    <div className="-ml-3 px-7 pt-4 w-full">
      <CategoryNavbar></CategoryNavbar>

      {/* Table----------------------- */}
      <div className="h-[420px] mt-5">
        <div className="">
          <table className="table table-sm table-pin-rows table-pin-cols">
            {/* head */}
            <thead>
              <tr>
                <th>SL</th>
                <th className="flex items-center gap-1">
                  <FaUser /> Name <FaAngleDown />
                </th>
                <th></th>
                <th>Last Activity</th>
                <th>Last 7d Traning</th>
                <th>Last 30d Traning</th>
                <th>Last 7d Task</th>
                <th>Category</th>
                <th>Status</th>
                <th>Owner</th>
              </tr>
            </thead>
            <tbody className="">
              {/* row 1 */}
              {searchClient?.length
                ? searchClient?.map((client, i) => (
                    <tr key={i}>
                      <th>
                        <p
                          className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}
                        >
                          {client?.clientFirstName?.slice(0, 2).toUpperCase()}
                        </p>
                      </th>
                      <td>
                        <Link
                          to={`/profile/${client?._id}`}
                          className="text-sm font-semibold"
                        >
                          {client?.clientFirstName +
                            " " +
                            client?.clientLastName}
                        </Link>
                      </td>
                      <td className="text-lg text-gray-600 flex gap-2">
                        <Link to={`/profile/${client?._id}/traning`}>
                          <FaRegCalendarAlt />
                        </Link>
                        <BiSolidMessageRounded />
                      </td>
                      <td>Pending</td>
                      <td>--</td>
                      <td>--</td>
                      <td>0%</td>
                      <td>{client?.status}</td>
                      <td>Blue</td>
                    </tr>
                  ))
                : allClient?.map((client, i) => (
                    <tr key={i}>
                      <th>
                        <p
                          className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}
                        >
                          {client?.clientFirstName?.slice(0, 2).toUpperCase()}
                        </p>
                      </th>
                      <td>
                        <Link
                          to={`/profile/${client?._id}`}
                          className="text-sm font-semibold"
                        >
                          {client?.clientFirstName +
                            " " +
                            client?.clientLastName}
                        </Link>
                      </td>
                      <td className="text-lg text-gray-600 flex gap-2">
                        <Link to={`/profile/${client?._id}/traning`}>
                          <FaRegCalendarAlt />
                        </Link>
                        <BiSolidMessageRounded />
                      </td>
                      <td>Pending</td>
                      <td>--</td>
                      <td>--</td>
                      <td>0%</td>
                      <td>{client?.status}</td>
                      <td>Blue</td>
                    </tr>
                  ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default EntireTeam;
