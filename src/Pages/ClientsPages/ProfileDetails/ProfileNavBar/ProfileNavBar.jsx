/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import {
  FaAngleDown,
  FaBell,
  FaClipboardCheck,
  FaRocket,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import { Link, useLocation, useParams } from "react-router-dom";
import ToggleLeftContext from "../../../../Context/ToggleLeftContext";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import { Menu, MenuButton, MenuItem } from "@szhsin/react-menu";
import AddProgram from "../../../../Component/AllModals/Workout/AddWorkoutModal/AddProgram";
import NavBarRightSide from "../../../../Shared/NavBarRightSide/NavBarRightSide";

const ProfileNavBar = () => {
  const toggleLeft = useContext(ToggleLeftContext);
  const { reload } = useContext(AuthContext);
  const [client, setClient] = useState();
  const [open, setOpen] = useState(false);
  const location = useLocation();
  const paths = location?.pathname.split("/");
  const path = paths[paths?.length - 1];
  const { id } = useParams();
  // console.log(id);

  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  // Get Single Client---------------
  useEffect(() => {
    axios(`https://aperio-server.vercel.app/api/v1/user/get-a-user/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setClient(res?.data?.data);
      })
      .catch((error) => {
        // console.log(error);
      });
  }, [id, reload]);

  return (
    <div>
      <div className="flex w-full gap-3 items-center z-50">
        <div className="flex items-center">
          <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
        </div>
        {/* <img src="https://www.cartonionline.com/gif/CARTOON/tom&jerry/tom_e_jerry.png" alt="" className='rounded-full object-cover w-14 h-14 border-2 bg-gray-100' /> */}
        <div>
          <h2 className="bg-[#172485] text-2xl flex font-bold justify-center items-center text-white w-12 h-12 text-center rounded-full">
            {client?.firstName?.slice(0, 2).toUpperCase()}
          </h2>
        </div>

        <div className="w-full">
          <div className="flex justify-between items-center w-full">
            <h2 className="text-2xl font-bold">
              {client?.firstName + " " + client?.lastName}
            </h2>
            <NavBarRightSide></NavBarRightSide>
          </div>

          <div className="flex text-gray-400 gap-8 text-sm mt-2">
            <Link
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === id &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Overview
            </Link>
            <Link
              to={`/profile/${id}/traning`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "traning" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Training
            </Link>

            <Link
              to={`/profile/${id}/task`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "task" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Tasks
            </Link>

            <Link
              to={`/profile/${id}/metrics`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "metrics" &&
                "text-secondary font-medium underline underline-offset-8"
              } ${
                path === "exercise" &&
                "text-secondary font-medium underline underline-offset-8"
              } `}
            >
              Metrics
            </Link>

            <Link
              to={`/profile/${id}/food-journal`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "food-journal" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Food Journal
            </Link>

            <Link
              to={`/profile/${id}/macros`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "macros" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Macros
            </Link>

            <Link
              to={`/profile/${id}/studio`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "studio" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Studio
            </Link>

            <Link
              to={`/profile/${id}/documents`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "documents" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Documents
            </Link>

            <Link
              to={`/profile/${id}/settings`}
              className={`hover:text-secondary focus:text-secondary decoration-[3px] active:text-secondary decoration-secondary ${
                path === "settings" &&
                "text-secondary font-medium underline underline-offset-8"
              }`}
            >
              Settings
            </Link>

            {/* <div className='border rounded-sm flex -ml-4 -mt-2'>
                            <button onClick={onOpenModal} className='text-gray-600 text-sm flex gap-1 items-center px-2'>
                                <p className='text-sm'>Add Workout</p>
                            </button>

                            <Modal open={open} closeIcon={<ImCross />} onClose={onCloseModal} center classNames={{ modal: 'p-5 overflow-visible rounded-md w-3/4', closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full' }}>
                                
                                <AddProgram onCloseModal={onCloseModal}></AddProgram>
                            </Modal>


                            <Modal closeIcon={<ImCross />} center classNames={
                                {
                                    modal: 'p-0 max-w-5xl overflow-visible rounded-md',
                                    closeButton: '-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full'
                                }}>

                            </Modal>

                            <Menu align='end' menuButton={<MenuButton className='p-2 border-l'><FaAngleDown /> </MenuButton>} transition>
                                <MenuItem onClick={onOpenModal} >
                                    <button className='text-gray-600  flex gap-2 items-center'>
                                        <p className=''>Add Workout</p>
                                    </button>
                                </MenuItem>
                                <MenuItem onClick={onOpenModal}>
                                    <button className='text-gray-600  flex gap-2 items-center'>

                                        <p className=''>Add Program</p>
                                    </button>
                                </MenuItem>
                            </Menu>

                        </div> */}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfileNavBar;
