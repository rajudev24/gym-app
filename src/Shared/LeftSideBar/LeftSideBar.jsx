/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useRef, useState } from "react";
import logo from "../../assets/logo.jpeg";
import logo2 from "../../assets/logo2.png";
import { FaAngleRight, FaCog, FaIdCard, FaUserFriends } from "react-icons/fa";
import { BiLogIn, BiSolidBrush } from "react-icons/bi";
import { RiBook3Line, RiMessage2Line } from "react-icons/ri";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import {
  ControlledMenu,
  MenuItem,
  useHover,
  useMenuState,
} from "@szhsin/react-menu";
import { HiBars3 } from "react-icons/hi2";
import axios from "axios";
// import '@szhsin/react-menu/dist/index.css';
// import '@szhsin/react-menu/dist/transitions/slide.css';

const LeftSideBar = () => {
  const ref = useRef(null);
  const [menuState, toggle] = useMenuState({ transition: true });
  const { anchorProps, hoverProps } = useHover(menuState.state, toggle);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("userToken");
    navigate("/login");
  };

  const location = useLocation();
  const path = location?.pathname.split("/")[1];

  const [client, setClient] = useState();

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
        setClient(res?.data?.data[0]);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email]);

  return (
    <div>
      <div className="flex flex-col justify-between items-center px-[14px] py-5 bg-[#c964db] h-screen z-50 fixed top-0">
        <div className="flex flex-col gap-8 items-center ">
          <div className="w-9 h-9">
            <Link to="/">
              <img
                src={logo}
                alt=""
                className="w-full mx-auto object-cover rounded-md"
              />
            </Link>
          </div>

          <Link to="/">
            <FaUserFriends className="text-2xl text-neutral" />
          </Link>

          <Link to="/exersise">
            <RiBook3Line className="text-3xl text-neutral" />
          </Link>

          <Link to={`/inbox/${client?._id}`}>
            <RiMessage2Line className="text-3xl text-neutral" />
          </Link>

          <Link to="/menu">
            <HiBars3 className="text-4xl text-neutral" />
          </Link>

          {/* <button onClick={handleLogout}>
                        <BiLogIn className='text-3xl text-neutral' />
                    </button> */}
        </div>
        <div>
          <div
            ref={ref}
            {...anchorProps}
            className="w-9 h-9 p-2 border border-white rounded-full"
          >
            <img
              src={logo2}
              alt=""
              className="w-full mx-auto object-cover rounded-md"
            />
            {/* <div className='bg-green-300 p-1 rounded-full flex justify-center items-center text-white w-9 h-9 cursor-pointer'>
                                <p className='font-semibold text-lg'>{user?.name?.split(' ')[0].slice(0, 1) + user?.name?.split(' ')[1]?.slice(0, 1)}</p>
                            </div> */}
          </div>

          <ControlledMenu
            {...hoverProps}
            {...menuState}
            anchorRef={ref}
            onClose={() => toggle(false)}
            arrow={true}
            direction="right"
            align="end"
            // style={{ width: '350px' }}
          >
            <div className="p-3 flex flex-col gap-1">
              <h2 className="px-4 text-sm font-semibold">
                Apeiro Personal Training
              </h2>
              <hr className="my-2" />
              <div className="pl-4 gap-2 flex items-center hover:text-primary cursor-pointer">
                <h2 className="text-sm font-semibold">
                  Apeiro Personal Training
                </h2>
                <FaAngleRight className="text-lg" />
              </div>
              <hr className="my-2" />
              <MenuItem className="px-0">
                <Link
                  to="/setting/account"
                  className="text-sm px-3 hover:text-primary items-center flex gap-2 font-semibold"
                >
                  <FaCog />
                  <p>Settings</p>
                </Link>
              </MenuItem>
              <MenuItem className="px-0">
                <Link
                  to="/setting/custombranding"
                  className="text-sm px-3 hover:text-primary items-center flex gap-2 font-semibold"
                >
                  <BiSolidBrush className="text-lg" />
                  <p>Custom Branding</p>
                </Link>
              </MenuItem>
              <MenuItem className="px-0">
                <Link
                  to="/setting/billing"
                  className="text-sm px-3 hover:text-primary items-center flex gap-2 font-semibold"
                >
                  <FaIdCard />
                  <p>Billing</p>
                </Link>
              </MenuItem>
              <hr />
              <button
                onClick={handleLogout}
                className="text-sm hover:text-primary font-semibold px-3 text-start"
              >
                Logout
              </button>
            </div>
          </ControlledMenu>
        </div>
      </div>
    </div>
  );
};

export default LeftSideBar;
