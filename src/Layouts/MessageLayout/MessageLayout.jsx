/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useState, useEffect, useContext } from "react";
import { BiBroadcast } from "react-icons/bi";
import {
  FaBell,
  FaClipboardCheck,
  FaDonate,
  FaEdit,
  FaEllipsisH,
  FaRegEdit,
  FaRocket,
  FaSearch,
  FaTrashAlt,
} from "react-icons/fa";
import { Link, Outlet } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import Loading from "../../Shared/Loading/Loading";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import { GrArchive } from "react-icons/gr";
import { HiOutlineArchive } from "react-icons/hi";
import NavBarRightSide from "../../Shared/NavBarRightSide/NavBarRightSide";

const MessageLayout = () => {
  const [showSearch, setShowSearch] = useState(false);
  const { user, reload } = useContext(AuthContext);
  const [allClient, setAllClient] = useState([]);
  const [client, setClient] = useState();
  const [loading, setLoading] = useState(true);
  const [chats, setChats] = useState([]);
  const [users, setUsers] = useState(null);

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
        setAllClient(res?.data?.data);
        setLoading(false);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email, reload]);

  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/chat/${user._id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        setChats(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user._id]);

  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/chat/${user._id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        setChats(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  const matchingIds = chats.map((item) => item.members[1]);
  const resultArray = allClient.filter((item) =>
    matchingIds.includes(item._id)
  );

  return (
    <div className="h-screen">
      <div className="pl-16 bg-white w-full z-50">
        <div className="flex justify-between items-center mx-5 pt-5">
          <div className="flex gap-2 w-1/4 justify-between">
            <h2 className="text-2xl font-semibold">Inbox</h2>
            <div className="flex gap-3">
              <div className="flex gap-1 text-primary items-center bg-[#F6F7FF] hover:bg-primary cursor-pointer hover:text-white font-semibold duration-500 px-4 text-sm rounded-md">
                <BiBroadcast className="text-lg" />
                <p>Broadcast</p>
              </div>
              <div className="bg-[#F6F7FF] text-primary hover:bg-primary cursor-pointer hover:text-white duration-500 p-3 rounded-md ">
                <FaRegEdit className="text-lg" />
              </div>
            </div>
          </div>
          <NavBarRightSide></NavBarRightSide>
        </div>
        <hr className="mt-3" />
      </div>

      {/* Chat section----------- */}
      {/* <div className='grid grid-cols-4 w-full'> */}
      <div className="flex w-full pl-16 ">
        <div className="w-1/4 ">
          <div className="h-14 py-5 px-3 items-center text-gray-500 flex justify-between">
            <h2 className="text-[10px]">MY MESSAGES (0)</h2>
            {showSearch ? (
              <div className="bg-[#F6F7FF] px-2 py-1 flex justify-end items-center">
                <input
                  type="search"
                  name=""
                  id=""
                  className="bg-[#F6F7FF] active focus focus:outline-none"
                />
                <FaSearch />
              </div>
            ) : (
              <button onClick={() => setShowSearch(true)}>
                <FaSearch />
              </button>
            )}
          </div>
          <hr />
          <div className="h-[475px] overflow-y-scroll">
            {loading && <Loading></Loading>}

            {resultArray &&
              resultArray?.map((client, i) => (
                <div key={i}>
                  <div className="flex justify-between items-center px-4 py-4">
                    <Link
                      to={`/inbox/${client?._id}`}
                      className="flex gap-3 items-center w-52"
                    >
                      <p
                        className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}
                      >
                        {client?.firstName?.slice(0, 2).toUpperCase()}
                      </p>
                      <p className="text-base font-semibold">
                        {client?.firstName + " " + client?.lastName}
                      </p>
                    </Link>
                    <Menu
                      align="end"
                      menuButton={
                        <MenuButton className="p-2">
                          <FaEllipsisH className="text-sm cursor-pointer text-gray-500" />
                        </MenuButton>
                      }
                      transition
                    >
                      <MenuItem>
                        <button
                          // onClick={(e) => hadleEditNote(e, note?._id)}
                          className="text-gray-600 flex gap-2 items-center"
                        >
                          <FaEdit className=" " />
                          <p className="">Edit</p>
                        </button>
                      </MenuItem>
                      <MenuItem>
                        <button
                          // onClick={(e) => hadleDeleteNote(e, note?._id)}
                          className="text-gray-600  flex gap-2 items-center"
                        >
                          <FaTrashAlt className=" " />
                          <p className="">Delete</p>
                        </button>
                      </MenuItem>
                    </Menu>
                  </div>
                  <hr />
                </div>
              ))}
            {user?.creatorId && (
              <div>
                <div className="flex justify-between items-center px-4 py-4">
                  <Link
                    to={`/inbox/${user?.creatorId}`}
                    className="flex gap-3 items-center w-52"
                  >
                    <p
                      className={`bg-[#172485] flex justify-center items-center text-white text-xs w-7 h-7 text-center rounded-full`}
                    >
                      {user?.creatorName?.slice(0, 2).toUpperCase()}
                    </p>
                    <p className="text-base font-semibold">
                      {user?.creatorName}
                    </p>
                  </Link>
                  <Menu
                    align="end"
                    menuButton={
                      <MenuButton className="p-2">
                        <FaEllipsisH className="text-sm cursor-pointer text-gray-500" />
                      </MenuButton>
                    }
                    transition
                  >
                    <MenuItem>
                      <button
                        // onClick={(e) => hadleEditNote(e, note?._id)}
                        className="text-gray-600 flex gap-2 items-center"
                      >
                        <FaEdit className=" " />
                        <p className="">Edit</p>
                      </button>
                    </MenuItem>
                    <MenuItem>
                      <button
                        // onClick={(e) => hadleDeleteNote(e, note?._id)}
                        className="text-gray-600  flex gap-2 items-center"
                      >
                        <FaTrashAlt className=" " />
                        <p className="">Delete</p>
                      </button>
                    </MenuItem>
                  </Menu>
                </div>
                <hr />
              </div>
            )}
          </div>
        </div>

        <div className="w-3/4">
          <Outlet></Outlet>
        </div>
      </div>
    </div>
  );
};

export default MessageLayout;
