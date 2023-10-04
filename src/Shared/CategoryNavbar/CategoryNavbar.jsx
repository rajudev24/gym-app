/* eslint-disable react/prop-types */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import React, { useState, useContext, useEffect } from "react";
import {
  FaAngleDown,
  FaBell,
  FaClipboardCheck,
  FaRocket,
  FaSearch,
  FaUserFriends,
  FaUserPlus,
  FaThLarge,
  FaUndoAlt,
  FaUser,
  FaUserTie,
} from "react-icons/fa";
import { BiDumbbell } from "react-icons/bi";
import { IoIosBarcode } from "react-icons/io";
import { FaTableCells } from "react-icons/fa6";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import ToggleLeftContext from "../../Context/ToggleLeftContext";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import AddSingleClient from "../../Component/AllModals/AddSingleClient/AddSingleClient";
import AddMultipleClient from "../../Component/AllModals/AddMultipleClient/AddMultipleClient";
import { useLocation } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import NavBarRightSide from "../NavBarRightSide/NavBarRightSide";
import TogglePopUp from "../TogglePopUp/TogglePopUp";
import { useRef } from "react";
import { FaChevronDown } from "react-icons/fa";
import TogglePopUpAssigned from "../TogglePopUp/TogglePopUpAssigned";

const CategoryNavbar = ({ applyFilters, columns }) => {
  const toggleLeft = useContext(ToggleLeftContext);
  const [open, setOpen] = useState(false);
  const [hide, setHide] = useState(true);
  const [openMultiple, setOpenMultiple] = useState(false);
  const { user, reload, setSearchClient } = useContext(AuthContext);
  const [allClient, setAllClient] = useState([]);
  const [connectedClient, setConnectedClient] = useState([]);
  const [pendingClient, setPendingClient] = useState([]);
  const [offlineClient, setOfflineClient] = useState([]);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedStatus, setSelectedStatus] = useState("All");
  const [lastActivity, setLastActivity] = useState(false);
  const [lastAssigned, setLastAssigned] = useState(false);

  let lastActivityRef = useRef(null);
  let lastAssignedRef = useRef(null);

  useEffect(() => {
    let handleLastAssigned = (e) => {
      if (!lastAssignedRef.current.contains(e.target)) {
        setLastAssigned(false);
      }
    };

    document.addEventListener("mousedown", handleLastAssigned);
    return () => {
      document.removeEventListener("mousedown", handleLastAssigned);
    };
  });

  useEffect(() => {
    let handleLastActivity = (e) => {
      if (!lastActivityRef.current.contains(e.target)) {
        setLastActivity(false);
      }
    };

    document.addEventListener("mousedown", handleLastActivity);
    return () => {
      document.removeEventListener("mousedown", handleLastActivity);
    };
  });

  useEffect(() => {
    let handleLastAssigned = (e) => {
      if (!lastAssignedRef.current.contains(e.target)) {
        setLastAssigned(false);

        //console.log(lastAssignedRef.current);
      }
    };

    document.addEventListener("mousedown", handleLastAssigned);
    return () => {
      document.removeEventListener("mousedown", handleLastAssigned);
    };
  });

  const handleCategoryChange = (event) => {
    const newCategory = event.target.value;
    setSelectedCategory(newCategory);
    applyFilters(null, newCategory === "All" ? null : newCategory);
  };

  const handleStatusChange = (event) => {
    const newStatus = event.target.value;
    setSelectedStatus(newStatus);
    applyFilters(newStatus === "All" ? null : newStatus, null);
  };

  const handleFilter = () => {
    setHide(!hide);
  };

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const openMultipleClientModal = () => setOpenMultiple(true);
  const closeMultipleClientModal = () => setOpenMultiple(false);

  const location = useLocation();
  const paths = location?.pathname;

  // Search Client----------------
  const handleSearch = (e) => {
    const name = e.target.value;
    console.log(name);
    const url = name
      ? `https://aperio-server.vercel.app/api/v1/user/search-user/${name}`
      : `https://aperio-server.vercel.app/api/v1/user/underCreator/${user?._id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        console.log(res?.data?.data);
        setSearchClient(res?.data?.data);
      })
      .catch((error) => {
        setSearchClient([]);
      });
  };

  // Get all client---------
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
        setAllClient(allClient);

        const pendingClient = allClient?.filter(
          (client) => client?.status === "Pending"
        );
        setPendingClient(pendingClient);

        const connectedClient = allClient?.filter(
          (client) => client?.status === "Connected"
        );
        setConnectedClient(connectedClient);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email]);

  return (
    <div className="z-50">
      <div className="flex justify-between items-center">
        <div className="flex gap-2 items-center">
          <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
          {paths === "/" && (
            <h2 className="text-2xl font-semibold">
              All Clients ({allClient?.length})
            </h2>
          )}
          {paths === "/connected" && (
            <h2 className="text-2xl font-semibold">
              Connected ({connectedClient?.length})
            </h2>
          )}
          {paths === "/pending" && (
            <h2 className="text-2xl font-semibold">
              Pending ({pendingClient?.length})
            </h2>
          )}
          {paths === "/offline" && (
            <h2 className="text-2xl font-semibold">
              Offline ({offlineClient?.length})
            </h2>
          )}
          {paths === "/watting" && (
            <h2 className="text-2xl font-semibold">Waiting Activation (0)</h2>
          )}
          {paths === "/needprogramming" && (
            <h2 className="text-2xl font-semibold">Need Programming (0)</h2>
          )}
          {paths === "/entireteam" && (
            <h2 className="text-2xl font-semibold">Your Entire Team ()</h2>
          )}
        </div>
        <NavBarRightSide></NavBarRightSide>
      </div>
      <div className="mt-5 flex gap-3 items-center">
        <div
          className={
            hide
              ? "flex items-center bg-[#eceeef] px-2 py-1 rounded-md text-sm max-w-fit"
              : "hidden"
          }
        >
          <p>Category:</p>
          <select
            onChange={handleCategoryChange}
            value={selectedCategory}
            className="bg-transparent font-medium text-gray-600 max-w-fit focus:outline-none"
          >
            <option>All</option>
            <option>Online</option>
            <option>In-Person</option>
            <option>Hybrid</option>
          </select>
        </div>
        <div
          className={
            hide
              ? "flex items-center bg-[#eceeef] px-2 py-1 rounded-md text-sm max-w-fit"
              : "hidden"
          }
        >
          <p>Status:</p>
          <select
            onChange={handleStatusChange}
            value={selectedStatus}
            className="bg-transparent font-medium text-gray-600 max-w-fit focus:outline-none"
          >
            <option>All</option>
            <option>Connected</option>
            <option>Pending</option>
            <option>Offline</option>
          </select>
        </div>
        <div
          className={
            hide
              ? "flex items-center bg-[#eceeef] px-2 py-1 rounded-md text-sm max-w-fit"
              : "hidden"
          }
        >
          <div className="menu-container" ref={lastActivityRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setLastActivity(!lastActivity);
              }}
            >
              <p className="flex  justify-between items-center gap-2 text-[#6f7076]">
                <span>Last Activity</span>{" "}
                <FaChevronDown className="text-[11px] "></FaChevronDown>
              </p>
            </div>
            <div
              className={`dropdown-menu relative ${
                lastActivity ? "active" : "inactive"
              }`}
            >
              <div className="absolute top-2 rounded-[5px]">
                <TogglePopUp></TogglePopUp>

                <div className="flex justify-end gap-[5px] bg-[#fafbfc] border border-solid border-t-[#dfe4e5] py-3 px-[15px] ">
                  <button
                    className="text-[13px] shadow-md text-[#818da1] font-semibold border border-solid border-[#d6dae4] bg-[#ffffff] p-2 w-[110px] rounded-[5px]"
                    onClick={() => {
                      setLastActivity(!lastActivity);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-[13px] shadow-md text-[#ffffff] font-semibold border border-solid border-[#d6dae4] bg-[#5c5bbd] p-2 w-[110px] rounded-[5px]"
                    onClick={() => {
                      setLastActivity(!lastActivity);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*  <select className="bg-transparent font-medium text-gray-600 max-w-fit focus:outline-none">
            <option>All</option>
            <option>Connected</option>
            <option>Pending</option>
            <option>Offline</option>
          </select> */}
        </div>
        <div
          className={
            hide
              ? "flex items-center bg-[#eceeef] px-2 py-1 rounded-md text-sm max-w-fit"
              : "hidden"
          }
        >
          <div className="menus-container" ref={lastAssignedRef}>
            <div
              className="menu-trigger"
              onClick={() => {
                setLastAssigned(!lastAssigned);
              }}
            >
              <p className="flex  justify-between items-center gap-2 text-[#6f7076]">
                <span>Last Assing workout</span>{" "}
                <FaChevronDown className="text-[11px] "></FaChevronDown>
              </p>
            </div>
            <div
              className={`dropdown-menu relative ${
                lastAssigned ? "active" : "inactive"
              }`}
            >
              <div className="absolute top-2 rounded-[5px]">
                <TogglePopUpAssigned></TogglePopUpAssigned>

                <div className="flex justify-end gap-[5px] bg-[#fafbfc] border border-solid border-t-[#dfe4e5] py-3 px-[15px] ">
                  <button
                    className="text-[13px] shadow-md text-[#818da1] font-semibold border border-solid border-[#d6dae4] bg-[#ffffff] p-2 w-[110px] rounded-[5px]"
                    onClick={() => {
                      setLastAssigned(!lastAssigned);
                    }}
                  >
                    Cancel
                  </button>
                  <button
                    className="text-[13px] shadow-md text-[#ffffff] font-semibold border border-solid border-[#d6dae4] bg-[#5c5bbd] p-2 w-[110px] rounded-[5px]"
                    onClick={() => {
                      setLastAssigned(!lastAssigned);
                    }}
                  >
                    Save
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
        {hide ? (
          <button
            onClick={handleFilter}
            className="text-primary text-sm font-semibold"
          >
            Hide Filter
          </button>
        ) : (
          <button
            onClick={handleFilter}
            className="text-primary text-sm font-semibold"
          >
            Show Filter
          </button>
        )}
      </div>
      <div className="mt-5 flex justify-between items-center">
        <div className="bg-base-200 w-72 px-2 py-1 active:border-primary focus:border-primary border hover:border-primary rounded-sm items-center flex">
          <FaSearch className="text-gray-400" />
          <input
            onChange={handleSearch}
            type="search"
            placeholder="Search... "
            className="focus:outline-none px-3 bg-transparent w-full"
          />
        </div>
        <div className="flex gap-4">
          <div className="border rounded-sm flex ">
            <button
              onClick={onOpenModal}
              className="text-gray-600 text-sm flex gap-1 items-center px-2"
            >
              <FaUserPlus className="text-sm " />
              <p className="text-sm">Add Client</p>
            </button>

            {/* Add Single Client Modal Start------------------------------- */}
            <Modal
              open={open}
              closeIcon={<ImCross />}
              onClose={onCloseModal}
              center
              classNames={{
                modal: "p-5 overflow-visible rounded-md w-2/5",
                closeButton:
                  "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
              }}
            >
              <AddSingleClient onCloseModal={onCloseModal}></AddSingleClient>
            </Modal>

            {/* Add Multiple Clients Modal Start--------------------------- */}

            <Modal
              open={openMultiple}
              closeIcon={<ImCross />}
              onClose={closeMultipleClientModal}
              center
              classNames={{
                modal: "p-0 max-w-5xl overflow-visible rounded-md",
                closeButton:
                  "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
              }}
            >
              <AddMultipleClient
                closeMultipleClientModal={closeMultipleClientModal}
              ></AddMultipleClient>
            </Modal>
            {/* Add Multiple Clients Modal End--------------------------- */}

            <Menu
              align="end"
              menuButton={
                <MenuButton className="p-2 border-l">
                  <FaAngleDown />{" "}
                </MenuButton>
              }
              transition
            >
              <MenuItem onClick={onOpenModal}>
                <button className="text-gray-600  flex gap-2 items-center">
                  <FaUserPlus className=" " />
                  <p className="">Add Single Client</p>
                </button>
              </MenuItem>
              <MenuItem>
                <button
                  onClick={() => openMultipleClientModal()}
                  className="text-gray-600  flex gap-2 items-center"
                >
                  <FaUserFriends className=" " />
                  <p className="">Add Multiple Client</p>
                </button>
              </MenuItem>
            </Menu>
          </div>
          <div className="border rounded-sm flex">
            <Menu
              align="end"
              menuButton={
                <MenuButton className="p-2 flex gap-1 text-gray-400">
                  <FaTableCells />
                  <FaAngleDown />
                </MenuButton>
              }
              transition
            >
              {columns?.map((column, i) => (
                <div key={i} className="px-5 py-2">
                  <div className="text-gray-600 flex gap-4 items-center">
                    {column?.status ? (
                      <input
                        type="checkbox"
                        name=""
                        id=""
                        checked={column?.status}
                      />
                    ) : (
                      <input type="checkbox" name="" id="" />
                    )}
                    <div className="flex items-center gap-2">
                      <div className="text-sm text-gray-500">
                        {column?.icon}
                      </div>
                      <p className="text-sm">{column?.name}</p>
                    </div>
                  </div>
                </div>
              ))}
            </Menu>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryNavbar;
