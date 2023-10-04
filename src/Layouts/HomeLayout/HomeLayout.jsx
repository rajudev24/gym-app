/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router-dom";
import Drawer from "react-modern-drawer";
import "react-modern-drawer/dist/index.css";
import ToggleLeftContext from "../../Context/ToggleLeftContext";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { FaCog } from "react-icons/fa";
import logo from "../../assets/logo.jpeg";

const HomeLayout = () => {
  const [isLeftOpen, setIsLeftOpen] = useState(true);
  const { user } = useContext(AuthContext);
  const [allClient, setAllClient] = useState([]);
  const [connectedClient, setConnectedClient] = useState([]);
  const [pendingClient, setPendingClient] = useState([]);
  const [offlineClient, setOfflineClient] = useState([]);

  const toggleLeft = () => {
    setIsLeftOpen((prev) => !prev);
  };

  // Get all client---------
  useEffect(() => {
    axios(
      `https://aperio-server.vercel.app/api/v1/user/underCreator/${user?._id}`,
      {
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

        const offlineClient = allClient?.filter(
          (client) => client?.status === "Offline"
        );
        setOfflineClient(offlineClient);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email]);

  const location = useLocation();
  const paths = location?.pathname;

  return (
    <div className="flex justify-between w-full ">
      <div className={`bg-secondary ${isLeftOpen ? "ml-[280px]" : "ml-16"}`}>
        <div className="flex flex-col bg-secondary font-semibold text-sm ">
          <Drawer
            open={isLeftOpen}
            onClose={toggleLeft}
            direction="left"
            size={220}
            style={{ backgroundColor: "#F1A0FF", boxShadow: "none" }}
            enableOverlay={false}
            className="ml-[64px] py-5 px-2"
          >
            <div className="flex flex-col">
              <div className="flex flex-col gap-2">
                <h2 className="text-2xl px-4 text-white mb-5">Clients</h2>
                <Link
                  to="/"
                  className={`flex justify-between items-center focus:text-white hover:text-white ${
                    paths === "/" && "bg-primary text-white"
                  } focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2`}
                >
                  <p>All Clients</p>
                  <p>{allClient?.length}</p>
                </Link>
                <Link
                  to="/connected"
                  className={`flex justify-between items-center focus:text-white hover:text-white ${
                    paths === "/connected" && "bg-primary text-white"
                  } focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2`}
                >
                  <p>Connected</p>
                  <p>{connectedClient?.length}</p>
                </Link>
                <Link
                  to="/pending"
                  className={`flex justify-between items-center focus:text-white hover:text-white ${
                    paths === "/pending" && "bg-primary text-white"
                  } focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2`}
                >
                  <p>Pending</p>
                  <p>{pendingClient?.length}</p>
                </Link>
                <Link
                  to="/offline"
                  className={`flex justify-between items-center focus:text-white hover:text-white ${
                    paths === "/offline" && "bg-primary text-white"
                  } focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2`}
                >
                  <p>Offline</p>
                  <p>{offlineClient?.length}</p>
                </Link>
                <Link
                  to="/watting"
                  className={`flex justify-between items-center focus:text-white hover:text-white ${
                    paths === "/watting" && "bg-primary text-white"
                  } focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2`}
                >
                  <p>Watting Activation</p>
                  <p>{0}</p>
                </Link>
                <Link
                  to="/needprogramming"
                  className={`flex justify-between items-center focus:text-white hover:text-white ${
                    paths === "/needprogramming" && "bg-primary text-white"
                  } focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2`}
                >
                  <p>Need Programming</p>
                  <p>{0}</p>
                </Link>
                {/* <Link to='/entireteam' className='flex justify-between items-center focus:text-white hover:text-white focus:bg-primary active:bg-primary hover:bg-primary rounded-full px-4 py-2'>
                                    <p>Your Entire Team</p>
                                    <p>32</p>
                                </Link> */}
                <hr className="mx-4 my-3" />

                {/* show hide ------------- */}
                <div className="collapse">
                  <input type="checkbox" />
                  <div className="collapse-title flex justify-between items-center text-sm w-full px-4">
                    Show More
                    <FaCog />
                  </div>
                  <div className="collapse-content">
                    <Link className="flex justify-between items-center">
                      <p>Archive</p>
                      <div className="flex items-center gap-4">
                        <img
                          src={logo}
                          alt=""
                          className="w-6 h-6 rounded-full"
                        />
                        <p>8</p>
                      </div>
                    </Link>
                  </div>
                </div>
              </div>
              <div className="flex flex-col items-center justify-center mt-10">
                <h2 className="text-xs font-semibold">YOUR INVITE LINK</h2>
                <button className="px-4 py-1 bg-primary text-white mt-5">
                  Copy Linked
                </button>
              </div>
            </div>
          </Drawer>
        </div>
      </div>
      <ToggleLeftContext.Provider value={toggleLeft}>
        <Outlet />
      </ToggleLeftContext.Provider>
    </div>
  );
};

export default HomeLayout;
