/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useContext, useEffect } from "react";
import { Dna } from "react-loader-spinner";
import { TbCloudUpload } from "react-icons/tb";
import { FaCalendar } from "react-icons/fa";
import { FcPicture } from "react-icons/fc";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";

const PhotoUploadModal = ({ closePhotoModal, refresh, setRefresh }) => {
  const [progressImage, setProgressImages] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [image, setImage] = useState();
  const [imageShow, setImageShow] = useState(null);
  const { user } = useContext(AuthContext);
  const { id } = useParams();

  const handleImage = (e) => {
    setIsLoading(true);
    const selectedImage = e.target.files[0];
    if (e.target.files && e.target.files[0]) {
      setImageShow(URL.createObjectURL(e.target.files[0]));
      setIsLoading(false);
      setProgressImages(selectedImage?.name);
    }

    setImage(selectedImage);
  };

  // Image Save to DB-------------------
  const handleImageSave = () => {
    closePhotoModal();

    const formData = new FormData();
    formData.append("image", image);
    formData.append("coachEmail", user?.email);
    formData.append("clientId", id);

    axios
      .post(
        "https://aperio-server.vercel.app/api/v1/progress/create-progress",
        formData,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          setProgressImages(res?.data);
          toast.success(res?.data?.message);
          setRefresh(!refresh);
          closePhotoModal();
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="grid grid-cols-5 p-5 w-full">
      <div className="col-span-3 rounded-md">
        <div className="p-5 bg-slate-50 rounded-md h-full">
          {isLoading ? (
            <div className="flex justify-center items-center h-full">
              <Dna
                visible={true}
                height="80"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            </div>
          ) : (
            <>
              {imageShow ? (
                <img
                  src={imageShow}
                  alt=""
                  className="w-full rounded-md object-cover"
                />
              ) : (
                <FcPicture className=" opacity-50 h-full flex justify-center items-center w-full" />
              )}
            </>
          )}
        </div>
      </div>
      <div className="col-span-2 border-l-2 border-gray-400">
        <div className="bg-slate-200 px-4 py-3 border-b-2 border-gray-400">
          <div className="flex gap-2 items-center">
            <div className="bg-red-300 w-7 h-7 p-2 flex justify-center items-center rounded-full">
              <h2 className="font-semibold text-white text-xs">AC</h2>
            </div>
            <h1 className="text-xl font-semibold">Progress Photo</h1>
          </div>
        </div>
        <div className="p-3">
          <label
            htmlFor="upload-photo"
            className="label flex flex-col justify-center items-center cursor-pointer bg-teal-50 border border-dashed border-gray-400 rounded-lg p-4 mt-2"
          >
            <div className="bg-gray-200 w-10 h-10 rounded-full flex justify-center items-center">
              <TbCloudUpload className="text-2xl text-primary" />
            </div>
            <p className="font-medium text-sm">
              Drag & Drop your File or{" "}
              <span className="text-primary">Browse</span>
            </p>
            <hr className="border-b-1 border-gray-400 border-dashed w-full my-2" />

            <p className="text-lg font-semibold text-success mt-3 ">
              {progressImage?.length > 20
                ? "..." + progressImage?.slice(-20, -1)
                : progressImage}
            </p>

            {isLoading && (
              <Dna
                visible={true}
                height="40"
                width="80"
                ariaLabel="dna-loading"
                wrapperStyle={{}}
                wrapperClass="dna-wrapper"
              />
            )}
          </label>
          <input
            onChange={handleImage}
            type="file"
            id="upload-photo"
            className="px-3 py-3 border w-full rounded-md hidden"
          />
          <div className="flex justify-between items-center mt-5">
            <input
              type="date"
              name=""
              id="select-date"
              className="w-32 rounded-md px-2 text-sm focus:outline-none border text-black "
            />

            <button
              onClick={handleImageSave}
              className="ml-3 px-3 py-1 rounded-md bg-primary hover:bg-secondary text-sm text-white border-none"
            >
              Save
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PhotoUploadModal;
