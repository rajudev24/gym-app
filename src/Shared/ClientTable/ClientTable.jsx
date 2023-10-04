/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { navigate } from "react-big-calendar/lib/utils/constants";
import { BiDumbbell, BiSolidMessageRounded } from "react-icons/bi";
import {
  FaAngleDown,
  FaRegCalendarAlt,
  FaThLarge,
  FaUndoAlt,
  FaUser,
  FaUserFriends,
  FaUserTie,
} from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { IoIosBarcode } from "react-icons/io";

const ClientTable = ({ allClient, columns }) => {
  const { user, searchClient } = useContext(AuthContext);
  const navigate = useNavigate();
  const [check, setCheck] = useState(false);
  const [clientList, setClientList] = useState([]);
  useEffect(() => {
    setClientList(allClient);
  }, []);

  const [showCheckbox, setShowChckbox] = useState(false);
  //const [clientChecked, setClientChecked] = useState()

  // Go to Chat-------
  const handleChat = (clientId) => {
    const members = {
      senderId: user._id,
      receiverId: clientId,
    };
    const url = "https://aperio-server.vercel.app/api/v1/chat";
    axios
      .post(url, members, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res?.data?.status);
        if (res?.data?.status === "success") {
          navigate(`/inbox/${clientId}`);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };
  const [cli, setCli] = useState(false);
  const handleChange = (e) => {
    const { name, checked } = e.target;
    const list = e.target.checked;
    if (name === "allClient") {
      let tempUser = clientList.map((client) => {
        return { ...client, isChecked: checked };
      });
      setClientList(tempUser);
      setCli(!cli);
    } else {
      const tempClient = clientList.map((client) =>
        client?._id === name ? { ...client, isChecked: checked } : client
      );
      console.log(tempClient);
      setClientList(tempClient);
      setCli(!cli);
    }
  };

  return (
    <table className="table table-sm table-pin-cols overflow-x-scroll">
      {/* head */}
      <thead>
        <tr>
          {columns?.map((column, i) =>
            i === 1 ? (
              <th key={i}></th>
            ) : (
              <th
                key={i}
                className={`${i === 0 && "w-52 z-50 flex gap-2 items-center "}`}
              >
                {column?.name === "Name" && (
                  <input
                    type="checkbox"
                    onChange={handleChange}
                    name="allClient"
                    id=""
                    checked={
                      clientList.filter((client) => client?.isChecked !== true)
                        .length < 1
                    }
                  />
                )}
                <div className={`flex gap-1 font-medium text-xs items-center`}>
                  {column?.icon}
                  <p>{column?.name}</p>
                  <FaAngleDown />
                </div>
              </th>
            )
          )}
          {/* <th className="flex items-center gap-1 z-50">
            <FaUser /> Name <FaAngleDown />
          </th>
          <th></th>
          <th>Last Activity</th>
          <th>Last 7d Traning</th>
          <th>Last 30d Traning</th>
          <th>Last 7d Task</th>
          <th>Category</th>
          <th>Status</th> */}
        </tr>
      </thead>

      <tbody>
        {searchClient?.length
          ? searchClient?.map((client, i) => (
              <tr key={i}>
                <th>
                  <div className="flex gap-3 items-center w-52">
                    <p
                      className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}
                    >
                      {client?.firstName?.slice(0, 2).toUpperCase()}
                    </p>
                    <Link
                      to={`/profile/${client?._id}`}
                      className="text-base font-semibold"
                    >
                      {client?.firstName + " " + client?.lastName}
                    </Link>
                  </div>
                </th>
                <td className="text-lg text-gray-600 flex gap-2">
                  <Link to={`/profile/${client?._id}/traning`}>
                    <FaRegCalendarAlt />
                  </Link>
                  <Link onClick={() => handleChat(client?._id)}>
                    <BiSolidMessageRounded />
                  </Link>
                </td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>0%</td>
                <td>{client?.category}</td>
                <td>{client?.status}</td>
              </tr>
            ))
          : clientList?.map((client, i) => (
              <tr key={i}>
                <th>
                  <div className="flex">
                    {cli ? (
                      <>
                        <input
                          onChange={handleChange}
                          type="checkbox"
                          checked={client.isChecked || false}
                          name={client?._id}
                          id=""
                        />
                        <Link
                          to={`/profile/${client?._id}`}
                          className="text-base font-semibold"
                        >
                          {client?.firstName + " " + client?.lastName}
                        </Link>
                      </>
                    ) : (
                      <div
                        onMouseOver={() => setShowChckbox(client?._id)}
                        onMouseOut={() => setShowChckbox("")}
                        className="flex gap-3 items-center w-52"
                      >
                        {showCheckbox === client?._id ? (
                          <input
                            onChange={handleChange}
                            type="checkbox"
                            checked={client.isChecked || false}
                            name={client?._id}
                            id=""
                          />
                        ) : (
                          <p
                            className={`bg-[#172485]   justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}
                          >
                            {client?.firstName?.slice(0, 2).toUpperCase()}
                          </p>
                        )}
                        <Link
                          to={`/profile/${client?._id}`}
                          className="text-base font-semibold"
                        >
                          {client?.firstName + " " + client?.lastName}
                        </Link>
                      </div>
                    )}
                  </div>
                </th>
                <td className=" text-gray-600 flex gap-2">
                  <Link
                    to={`/profile/${client?._id}/traning`}
                    className="border border-base-100 duration-300 hover:border-primary rounded-md p-2"
                  >
                    <FaRegCalendarAlt />
                  </Link>
                  <button
                    onClick={() => handleChat(client?._id)}
                    className="border border-base-100 duration-300 hover:border-primary rounded-md p-2"
                  >
                    <BiSolidMessageRounded />
                  </button>
                </td>
                <td>--</td>
                <td>--</td>
                <td>--</td>
                <td>0%</td>
                <td>{client?.category}</td>
                <td>{client?.status}</td>
              </tr>
            ))}
      </tbody>
    </table>
  );
};

export default ClientTable;
