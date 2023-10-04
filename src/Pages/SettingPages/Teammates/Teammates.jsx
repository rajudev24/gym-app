/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import { useContext, useEffect } from "react";
import {
  FaBell,
  FaClipboardCheck,
  FaPlus,
  FaRocket,
  FaSearch,
} from "react-icons/fa";
import { HiOutlineMenuAlt3 } from "react-icons/hi";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import { useState } from "react";
import ToggleLeftContext from "../../../Context/ToggleLeftContext";
import AddNewExerciseModal from "../../../Component/AllModals/AddNewExerciseModal/AddNewExerciseModal";
import { Link } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import {
  FaAngleDown,
  FaLink,
  FaRegEnvelope,
  FaUser,
  FaUsersRectangle,
} from "react-icons/fa6";
import { PiTextAlignCenter } from "react-icons/pi";
import AddTeammate from "../../../Component/AllModals/AddTeammate/AddTeammate";
import NavBarRightSide from "../../../Shared/NavBarRightSide/NavBarRightSide";

const Teammates = () => {
  const [allClient, setAllClient] = useState([]);
  const { user, reload } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  // Add New Exercise Modal----------
  const onOpenModal = () => setOpen(true);
  const onCloseModal = () => setOpen(false);

  const toggleLeft = useContext(ToggleLeftContext);

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
        console.log(res?.data?.data);
        setAllClient(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [user?.email, reload]);

  return (
    <div className="mx-4 pt-4 w-full">
      {/* Teammate Nav bar----- */}
      <div>
        <div className="flex justify-between items-center">
          <div className="flex gap-2 items-center">
            <HiOutlineMenuAlt3 onClick={toggleLeft} className="text-2xl" />
            <h2 className="text-2xl font-semibold">Teammates</h2>
          </div>
          <NavBarRightSide></NavBarRightSide>
        </div>
        <div className="mt-8 flex justify-end items-center">
          <button onClick={onOpenModal}>
            <div className="flex gap-2 ml-2 p-1 px-6 py-2 items-center rounded-md bg-primary text-white">
              <FaPlus />
              <p className="text-sm">Add Teammate</p>
            </div>
          </button>

          {/* Add Teammate Modal-------- */}
          <Modal
            open={open}
            closeIcon={<ImCross />}
            onClose={onCloseModal}
            center
            classNames={{
              modal: "p-0 overflow-visible rounded-md w-2/5",
              closeButton:
                "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
            }}
          >
            <AddTeammate onCloseModal={onCloseModal}></AddTeammate>
          </Modal>
        </div>
      </div>

      {/* Teammate Table---- */}
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
                <th>
                  <div className="flex gap-1 items-center">
                    <FaRegEnvelope className="text-base" />
                    Email
                    <FaAngleDown />
                  </div>
                </th>
                <th>
                  <div className="flex gap-1 items-center">
                    <PiTextAlignCenter className="text-base rotate-90" />
                    Status
                    <FaAngleDown />
                  </div>
                </th>
                <th>
                  <div className="flex gap-1 items-center">
                    <FaUsersRectangle className="text-base" />
                    Role
                    <FaAngleDown />
                  </div>
                </th>
                <th>
                  <div className="flex gap-1 items-center">
                    <FaLink className="text-base" />
                    Invite Link
                    <FaAngleDown />
                  </div>
                </th>
              </tr>
            </thead>
            <tbody className="">
              {allClient?.map((client, i) => (
                <tr key={i}>
                  <th>
                    <div className="flex gap-3 items-center">
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
                  <td>{client?.email}</td>
                  <td>{client?.status}</td>
                  <td>{client?.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default Teammates;
