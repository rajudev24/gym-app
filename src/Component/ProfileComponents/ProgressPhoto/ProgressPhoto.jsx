/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { FaEye, FaPlus, FaUser } from "react-icons/fa";
import { FcGallery, FcPicture } from "react-icons/fc";
import { ImCross } from "react-icons/im";
import Modal from "react-responsive-modal";
import PhotoUploadModal from "../../AllModals/PhotoUploadModal/PhotoUploadModal";
import axios from "axios";
import { useParams } from "react-router-dom";
import AddMultipleClient from "../../AllModals/AddMultipleClient/AddMultipleClient";
import AllPorgressPhotoView from "../../AllModals/AllPorgressPhotoView/AllPorgressPhotoView";

const ProgressPhoto = () => {
  const [photo, setPhoto] = useState(false);
  const [openPhoto, setOpentPhoto] = useState(false);
  const [openPhotoView, setOpentPhotoView] = useState(false);
  const [images, setImages] = useState([]);
  const [refresh, setRefresh] = useState(false);
  const { id } = useParams();

  // Clients Photo Upload Modal-------------------
  const openPhotoModal = () => setOpentPhoto(true);
  const closePhotoModal = () => setOpentPhoto(false);

  // Clients Photo View Modal-------------------
  const openPhotoViewModal = () => setOpentPhotoView(true);
  const closePhotoViewModal = () => setOpentPhotoView(false);

  // Get All Images-----------------
  useEffect(() => {
    axios(`https://aperio-server.vercel.app/api/v1/progress/${id}`, {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setImages(res?.data?.data?.photos.slice(0, 6));
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, refresh]);

  return (
    <div>
      {/* Clients Photo Upload Modal Start------------ */}
      <Modal
        open={openPhoto}
        closeIcon={<ImCross />}
        onClose={closePhotoModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-full",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <PhotoUploadModal
          closePhotoModal={closePhotoModal}
          refresh={refresh}
          setRefresh={setRefresh}
        ></PhotoUploadModal>
      </Modal>
      {/* Clients Photo Upload Modal End------------ */}

      {/* Clients Photo View Modal Start------------ */}
      <Modal
        open={openPhotoView}
        closeIcon={<ImCross />}
        onClose={closePhotoViewModal}
        center
        classNames={{
          modal: "p-0 max-w-4xl overflow-visible rounded-md",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        {/* <AddMultipleClient></AddMultipleClient> */}
        <AllPorgressPhotoView></AllPorgressPhotoView>
      </Modal>
      {/* Clients Photo View Modal End------------ */}

      <div
        onMouseOver={() => setPhoto(true)}
        onMouseOut={() => setPhoto(false)}
        className="bg-slate-50 border rounded-md "
      >
        <div className="flex justify-between mx-2 my-2 items-center">
          <div className="flex gap-1 items-center">
            <h5 className="text-base font-medium text-slate-700 flex gap-1 items-center">
              <FcGallery className="text-2xl" />
              Progress Photo
            </h5>
          </div>
          <button
            onClick={() => openPhotoModal()}
            className={
              photo ? "text-gray-400 flex gap-1 items-center" : "hidden"
            }
          >
            <div className="bg-gray-200 p-1 rounded-full">
              <FaPlus className="text-xs" />
            </div>
            <span>Add</span>
          </button>
        </div>

        <hr className="border-gray-300" />

        <div className="p-3 bg-white rounded-md w-full">
          {images?.length ? (
            <div className="grid grid-cols-3 gap-2">
              {images?.map((image, i) => (
                <div key={i}>
                  <img
                    src={image}
                    alt=""
                    className="rounded-sm h-12 w-full object-cover"
                  />
                </div>
              ))}
            </div>
          ) : (
            <FcPicture className="opacity-50 w-16 mx-auto h-full" />
          )}

          <button
            onClick={() => openPhotoViewModal()}
            className="text-sm font-semibold flex gap-1 items-center text-gray-500 mt-2"
          >
            <FaEye />
            View All
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProgressPhoto;
