/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState, useContext } from "react";
import { useForm } from "react-hook-form";
import { toast } from "react-hot-toast";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { FaCamera } from "react-icons/fa";

const ProfileModal = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [client, setClient] = useState();
  const [gender, setGender] = useState();
  const [refresh, setRefresh] = useState(false);
  const { reload, setReload } = useContext(AuthContext);
  const { id } = useParams();

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
        setGender(res?.data?.data?.gender ? res?.data?.data?.gender : "male");
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, refresh]);

  const handleGender = (e) => {
    setGender(e.target.value);
  };

  // update Porfile-----------
  const onSubmit = (data) => {
    const updateClient = {
      firstName: data?.firstName ? data?.firstName : client?.firstName,
      lastName: data?.lastName ? data?.lastName : client?.lastName,
      phoneNumber: data?.phone ? data?.phone : client?.number,
      birthDate: data?.B_date ? data?.B_date : client?.birthData,
      gender: gender ? gender : client?.gender,
      category: data?.category ? data?.category : client?.category,
      owner: client?.creatorName
        ? client?.creatorName
        : "APEIRO PERSONAL TRAINING",
    };
    console.log(updateClient);
    axios
      .patch(
        `https://aperio-server.vercel.app/api/v1/user/update-a-user/${id}`,
        updateClient,
        {
          headers: {
            authorization: `bearer ${localStorage.getItem("userToken")}`,
          },
        }
      )
      .then((res) => {
        console.log(res?.data);
        toast.success(`${res?.data?.massage}`);
        setRefresh(!refresh);
        setReload(!reload);
        reset();
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          {/* <div className='flex justify-center items-center'>
                        <h2 className='text-4xl font-semibold text-white w-20 h-20 rounded-full bg-red-300 items-center flex justify-center uppercase'>{client?.firstName.slice(0, 2)}</h2>
                    </div> */}
          <div className="flex justify-center items-center">
            <label
              htmlFor="upload-photo"
              className="label w-20 h-20 flex flex-col justify-center items-center cursor-pointer bg-primary rounded-full mt-2 relative"
            >
              <h2 className="text-4xl font-bold text-white">
                {client?.firstName.slice(0, 2)}
              </h2>
              <div className="absolute w-6 h-6 p-1 flex justify-center items-center right-2 bottom-0 bg-gray-400 rounded-full">
                <FaCamera className="text-white text-sm" />
              </div>
            </label>
            <input
              // onChange={handleImage}
              type="file"
              id="upload-photo"
              className="px-3 py-3 border w-full rounded-md hidden"
            />
          </div>

          <div className="p-8 flex flex-col gap-4">
            <div className="grid grid-cols-2 gap-5">
              <div className="text-sm">
                <label>First Name:</label>
                <div>
                  <input
                    {...register("firstName")}
                    type="text"
                    id=""
                    defaultValue={client?.firstName}
                    className="px-3 py-2 border border-primary focus:outline-none w-full rounded-md font-semibold"
                  />
                </div>
              </div>
              <div className="text-sm">
                <label>Last Name:</label>
                <div>
                  <input
                    {...register("lastName")}
                    type="text"
                    id=""
                    defaultValue={client?.lastName}
                    className="px-3 py-2 border border-primary focus:outline-none w-full rounded-md font-semibold"
                  />
                </div>
              </div>
            </div>
            <div className="text-sm">
              <label>Email:</label>
              <div>
                <input
                  {...register("email")}
                  type="email"
                  id=""
                  value={client?.email}
                  className=" px-3 py-2 border  focus:outline-none w-full rounded-md font-semibold"
                  disabled
                />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-5">
              <div className="text-sm">
                <label>Phone:</label>
                <div>
                  <input
                    {...register("phone")}
                    type="text"
                    id=""
                    defaultValue={client?.phoneNumber}
                    className="px-3 py-2 border focus:border-primary hover:border-primary focus:outline-none w-full rounded-md"
                  />
                </div>
              </div>
              <div className="text-sm">
                <label>Birth Date:</label>
                <div>
                  <input
                    {...register("B_date")}
                    type="date"
                    id=""
                    defaultValue={client?.birthDate}
                    className="px-3 py-2 border focus:border-primary hover:border-primary focus:outline-none w-full rounded-md"
                  />
                </div>
              </div>
            </div>

            <div className="flex gap-5">
              <div className="form-control">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={handleGender}
                    checked={gender === "male"}
                    value="male"
                    type="radio"
                    name="radio-2"
                    className="radio w-5 h-5 radio-primary"
                  />
                  <span className="label-text">Male</span>
                </label>
              </div>
              <div className="form-control">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={handleGender}
                    value="female"
                    checked={gender === "female"}
                    type="radio"
                    name="radio-2"
                    className="radio w-5 h-5 radio-primary"
                  />
                  <span className="label-text">Female</span>
                </label>
              </div>
              <div className="form-control">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    onChange={handleGender}
                    value="other"
                    checked={gender === "other"}
                    type="radio"
                    name="radio-2"
                    className="radio w-5 h-5 radio-primary"
                  />
                  <span className="label-text">Other</span>
                </label>
              </div>
            </div>

            <div className="text-sm flex flex-col gap-3">
              <label className="uppercase text-xs text-gray-500">
                Category:
              </label>
              <select
                {...register("category")}
                className="select select-bordered border border-primary rounded-md focus:outline-none w-56"
              >
                <option
                  selected={client?.category ? client?.category : "In-Person"}
                >
                  In-Person
                </option>
                <option
                  selected={client?.category && client?.category === "Online"}
                >
                  Online
                </option>
                <option
                  selected={client?.category && client?.category === "Hybrid"}
                >
                  Hybrid
                </option>
              </select>
            </div>
            <div className="text-sm flex flex-col gap-3">
              <h2 className="uppercase text-xs text-gray-500">Owner:</h2>

              <div className="text-sm flex flex-col gap-3 border rounded-md w-56 py-3">
                <h2 className="uppercase text-xs text-gray-500 flex justify-center">
                  {client?.creatorName
                    ? client?.creatorName
                    : "Apeiro Personal Training"}
                </h2>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="bg-slate-100 px-4 py-3 flex justify-end rounded-b-md">
          <button
            type="submit"
            className="px-10 py-2 rounded-md bg-primary hover:bg-secondary duration-300 text-white font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProfileModal;
