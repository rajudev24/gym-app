/* eslint-disable no-unused-vars */
/* eslint-disable react/no-unknown-property */
/* eslint-disable react/prop-types */
import { BsFillShareFill } from "react-icons/bs";
import { exerciseCategory, primaryFocusOptions } from "../../../utils";
import { useContext, useState } from "react";
import { FaLink, FaRegImages, FaVideo } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { TbCloudUpload } from "react-icons/tb";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";

const TagDisplay = ({ selectedTags }) => {
  return (
    <div className="mt-3">
      <h2 className="text-xs">TRACKING FIELDS </h2>
      <ul className="flex gap-4">
        {selectedTags?.map((tag, index) => (
          <li
            className="border px-2 py-1 mt-1 bg-white rounded-md shadow-sm"
            key={index}
          >
            {tag}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default function AddNewExerciseModal() {
  const [selectedItem, setSelectedItem] = useState("");
  const [selectedTags, setSelectedTags] = useState([]);
  const [expanded, setExpanded] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const [showLinkField, setShowLinkField] = useState(false);
  const { user } = useContext(AuthContext);
  const [images, setImages] = useState();
  const [video, setVideo] = useState();

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // handle video--------------
  const handleVideo = (e) => {
    const selectedVideo = e.target.files[0];
    setVideo(selectedVideo);
  };

  // handle Images--------------
  const handleImage = (e) => {
    const selectedImage = e.target.files;
    setImages(selectedImage);
  };

  const onSubmit = (data) => {
    // closeAllMetricsListModal()
    const formData = new FormData();
    formData.append("exerciseName", data.exerciseName);
    formData.append("primaryFocus", data.primaryFocus);
    formData.append("instructions", data.instructions);
    formData.append("trackingField", data.trackingField);

    if (images) {
      for (const image of images) {
        formData.append("imageUrls", image);
      }
    }
    if (video) {
      formData.append("videoUrl", video);
    }
    if (data.videoUrl) {
      formData.append("videoUrl", data.videoUrl);
    }
    if (data.tags) {
      formData.append("tags", data.tags);
    }
    if (data.link) {
      formData.append("link", data.link);
    }
    formData.append("coachId", user?._id);

    axios
      .post(
        "https://aperio-server.vercel.app/api/v1/exercise/create-exercise",
        formData,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
            "Content-Type": "multipart/form-data",
          },
        }
      )
      .then((res) => {
        if (res?.data?.status === "success") {
          toast.success(res?.data?.message);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const exerciseCategorys = exerciseCategory;

  const handleInputChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleInputClick = () => {
    setExpanded(true);
  };
  const handleInputBlur = () => {
    if (inputValue.trim() === "") {
      setExpanded(false);
    }
  };

  const handleSelectChange = (event) => {
    const selectedValue = event.target.value;
    const selectedItemData = exerciseCategorys.find(
      (item) => item.value === selectedValue
    );

    setSelectedItem(selectedValue);
    setSelectedTags(selectedItemData.tags);
  };

  const options = primaryFocusOptions;

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div className="flex justify-between p-5 ">
        {/* Left side---------------- */}
        <div className="w-96 px-4 flex gap-5 flex-col">
          <div className="flex gap-5 items-center justify-between w-full ">
            <input
              type="text"
              {...register("exerciseName", { required: true })}
              placeholder="Name your Exercise"
              className="border w-full py-2 px-4 rounded-md hover:bg-slate-100 border-gray-300 hover:border-primary focus:outline-none "
            />
            <BsFillShareFill className="text-xl font-bold" />
          </div>

          <div className="mt-2">
            <label className="text-xs" htmlFor="">
              PRIMARY FOCUS
            </label>{" "}
            <br />
            <select
              {...register("primaryFocus", { required: true })}
              className="border px-4 py-2 hover:border-primary w-full mt-1 rounded-md focus:outline-none"
            >
              <option disabled selected>
                Choose primary focus
              </option>
              {options.map((option, index) => (
                <option key={index}>{option}</option>
              ))}
            </select>
          </div>

          <div className="mt-2 bg-slate-100 px-4 py-4 rounded-md">
            <label className="font-semibold text-gray-500 text-xs" htmlFor="">
              TRACKING FIELD
            </label>{" "}
            <br />
            <select
              value={selectedItem}
              {...register("trackingField", { required: true })}
              onChange={handleSelectChange}
              className="border px-4 py-2 hover:border-primary w-full mt-1 rounded-md focus:outline-none"
            >
              <option disabled selected>
                Choose exercise category
              </option>
              {exerciseCategory.map((item) => (
                <option key={item.value} value={item.value}>
                  {item.label}
                </option>
              ))}
            </select>
            {selectedItem && <TagDisplay selectedTags={selectedTags} />}
          </div>

          <div className="mt-2">
            <label className="text-xs" htmlFor="">
              INSTRUCTIONS (Separate each step on a new line)
            </label>

            <textarea
              {...register("instructions")}
              // value={inputValue}
              // onChange={handleInputChange}
              onClick={handleInputClick}
              onBlur={handleInputBlur}
              style={{ height: expanded ? "100px" : "50px" }}
              placeholder="Add exercise instructions"
              className="border hover:border-indigo-600 focus:outline-none w-full p-3 rounded-md"
            />
          </div>

          <div>
            <label htmlFor="tag" className="text-xs">
              TAGS
            </label>
            <input
              {...register("tags")}
              list="tag"
              name="tags"
              id="tags"
              placeholder="Add an Exercise tag"
              className="border w-full rounded-md px-3 py-2"
            />
            <datalist defaultValue={""} id="tag" className="w-full bg-white">
              <option value="MOST RECENT" disabled></option>
            </datalist>
          </div>

          <div>
            {showLinkField ? (
              <button
                onClick={() => setShowLinkField(false)}
                className="flex gap-2 items-center my-3 text-sm"
              >
                <div className="bg-gray-200 p-2 rounded-full">
                  <FaLink />
                </div>
                <p className="font-semibold">Delete Link</p>
              </button>
            ) : (
              <button
                onClick={() => setShowLinkField(true)}
                className="flex gap-2 items-center my-3 text-sm"
              >
                <div className="bg-gray-200 p-2 rounded-full">
                  <FaLink />
                </div>
                <p className="font-semibold">Add Link</p>
              </button>
            )}
            {showLinkField && (
              <input
                {...register("link", { required: true })}
                className="w-full rounded-md p-2 border focus:border-indigo-600 focus:outline-none"
                type="text"
                placeholder="Add Link"
              />
            )}
          </div>
        </div>

        {/* Right Side---------- */}
        <div className="w-96 bg-slate-100 p-5 rounded-md">
          <div>
            <h1 className="mb-4 text-xl font-semibold">Media</h1>
            <label className="text-xs font-semibold text-gray-500" htmlFor="">
              VIDEO
            </label>
            <input
              {...register("videoUrl")}
              className="w-full rounded-md px-3 py-2 border focus:border-indigo-600 focus:outline-none"
              type="text"
              placeholder="Vimeo or Youtube Link"
            />
          </div>
          <div className=" text-gray-600 mt-3 font-semibold ">
            <label
              htmlFor="upload-video"
              className="flex gap-2 items-center cursor-pointer"
            >
              <div className="w-8 h-8 p-2 bg-gray-300 rounded-full">
                <FaVideo />
              </div>
              <p>Upload Video</p>
            </label>
            <input
              onChange={handleVideo}
              type="file"
              multiple
              id="upload-video"
              accept="video/*"
              className="px-3 py-3 border w-full rounded-md hidden"
            />
          </div>

          <div>
            <h2 className="text-xs pt-5 font-semibold text-gray-500">PHOTOS</h2>
            <label
              htmlFor="upload-photo"
              className="label flex gap-5 justify-center items-center cursor-pointer bg-white border border-dashed border-gray-400 rounded-lg px-5 py-4 mt-2"
            >
              <div className="flex justify-center items-center">
                <FaRegImages className="text-5xl text-gray-400" />
              </div>
              <p className="text-sm">
                Drag and drop up to 4 images here or{" "}
                <span className="text-primary hover:underline">
                  Choose file
                </span>
              </p>
            </label>
            <p className="text-xs text-gray-500 mt-2">
              Accepted: jpg, jpeg, png
            </p>
            <input
              onChange={handleImage}
              type="file"
              multiple
              id="upload-photo"
              className="px-3 py-3 border w-full rounded-md hidden"
            />
          </div>
        </div>
      </div>

      <div
        style={{ boxShadow: "5px 10px 30px #888888" }}
        className="py-3 mt-4 px-5 justify-end rounded-b-md flex items-center"
      >
        <input
          type="submit"
          value="Save"
          className="font-semibold border-2 px-5 py-1 rounded-md"
        />
        <input
          type="submit"
          value="Save & Close"
          className="ml-5 font-semibold text-white px-5 py-2 bg-primary rounded-md"
        />
      </div>
    </form>
  );
}
