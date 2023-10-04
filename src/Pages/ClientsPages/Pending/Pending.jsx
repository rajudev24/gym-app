/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { BiSolidMessageRounded } from "react-icons/bi";
import { FaAngleDown, FaRegCalendarAlt, FaUser } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import CategoryNavbar from "../../../Shared/CategoryNavbar/CategoryNavbar";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import Loading from "../../../Shared/Loading/Loading";

const Pending = () => {
  const { user, reload, searchClient } = useContext(AuthContext);
  const [pendingClient, setPendingClient] = useState([]);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

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
        const allClient = res?.data?.data;
        const pendingClient = allClient?.filter(
          (client) => client?.status === "Pending"
        );
        setPendingClient(pendingClient);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email, reload]);

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
        setLoading(false);
      });
  };

  return (
    <div className="mx-4 pt-4  w-full">
      <CategoryNavbar></CategoryNavbar>

      {/* Table----------------------- */}
      {loading ? (
        <Loading />
      ) : (
        <div className="h-[420px] mt-5">
          <div className="">
            <table className="table table-sm table-pin-rows table-pin-cols overflow-x-scroll">
              {/* head */}
              <thead>
                <tr>
                  {/* <th>SL</th> */}
                  <th className="flex items-center gap-1 z-50">
                    <FaUser /> Name <FaAngleDown />
                  </th>
                  <th></th>
                  <th>Last Activity</th>
                  <th>Last 7d Traning</th>
                  <th>Last 30d Traning</th>
                  <th>Last 7d Task</th>
                  <th>Category</th>
                  <th>Status</th>
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
                          {/* <Link onClick={handleChat(client?._id)}>
                          <BiSolidMessageRounded />
                        </Link> */}
                        </td>
                        <td>--</td>
                        <td>--</td>
                        <td>--</td>
                        <td>0%</td>
                        <td>{client?.category}</td>
                        <td>{client?.status}</td>
                      </tr>
                    ))
                  : pendingClient?.map((client, i) => (
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
                          {/* <Link >
                          
                        </Link> */}
                          <button onClick={() => handleChat(client?._id)}>
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
          </div>
        </div>
      )}
    </div>
  );
};

export default Pending;
