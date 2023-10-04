/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import {
  FaFileUpload,
  FaHome,
  FaNotesMedical,
  FaRegComments,
  FaRegEdit,
} from "react-icons/fa";
import { ImCross } from "react-icons/im";
import { IoIosStarOutline } from "react-icons/io";
import Modal from "react-responsive-modal";
import ProfileModal from "../../AllModals/ProfileModal/ProfileModal";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";

const UpdateProfile = () => {
  const [profile, setProfile] = useState(false);
  const [openProfile, setOpenProfile] = useState(false);
  const [client, setClient] = useState();
  const { id } = useParams();

  // Profile Modal---------------------------
  const openProfileModal = () => setOpenProfile(true);
  const closeProfileModal = () => setOpenProfile(false);

  // Get Single Client ---------------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/user/get-a-user/${id}`;
    axios(url, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data.data);
        setClient(res?.data?.data);
        // setGender(res?.data?.data?.gender ? res?.data?.data?.gender : 'male');
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div>
      {/* Profile Modal Start------------------------ */}
      <Modal
        open={openProfile}
        closeIcon={<ImCross />}
        onClose={closeProfileModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-1/2",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <ProfileModal closeProfileModal={closeProfileModal}></ProfileModal>
      </Modal>
      {/* Profile Modal End------------------------ */}

      <div
        onMouseOver={() => setProfile(true)}
        onMouseOut={() => setProfile(false)}
        className="bg-slate-50 border rounded-md"
      >
        <div className="flex justify-between mx-2 my-2 items-center">
          <div className="flex items-center gap-1">
            <h5 className="text-base font-medium text-slate-700 flex gap-1 items-center">
              Profile
            </h5>
            <IoIosStarOutline className="text-xl text-gray-400" />
          </div>
          <div
            className={
              profile ? "text-gray-400 flex gap-1 items-center" : "hidden"
            }
          >
            <button
              onClick={() => openProfileModal()}
              className="bg-gray-200 text-xs px-3 p-1 rounded-full"
            >
              <span className="text-gray-500">Open</span>
            </button>
          </div>
        </div>

        <hr className="border-gray-300" />

        <div className="p-4 bg-white rounded-md">
          <div className="flex gap-1 py-2 justify-center mb-2">
            <div className="bg-gray-100 p-2 rounded-full">
              <FaRegComments className="text-xl text-gray-500" />
            </div>
            <div className="bg-gray-100 p-2 rounded-full">
              <FaFileUpload className="text-xl text-gray-500" />
            </div>
          </div>
          <div className="flex items-center gap-2 mx-auto">
            <FaNotesMedical className="text-sm text-gray-400"></FaNotesMedical>
            <p className="text-sm">{client?.email}</p>
          </div>
          <div className="flex items-center gap-2 mx-auto my-2">
            <FaHome className="text-sm text-gray-400"></FaHome>
            {/* <p className='text-sm'>{client?.createdAt}</p> */}
            {client?.createdAt && (
              <p className="text-sm">
                {format(new Date(client?.createdAt), "pppp")}
              </p>
            )}
          </div>
          <div className="flex items-center gap-2 mx-auto">
            <FaNotesMedical className="text-sm text-gray-400"></FaNotesMedical>
            <p className="text-xs">{client?.owner}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UpdateProfile;
