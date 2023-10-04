/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useParams } from "react-router";
import Swal from "sweetalert2";

const InvitePage = () => {
  const [show, setShow] = useState(false);
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const { id } = useParams();
  const [user, setUser] = useState();

  // console.log(user);

  const onSubmit = (data) => {
    console.log(data);

    const updatePassword = {
      id: user?._id,
      password: data?.password,
    };

    const url = `https://aperio-server.vercel.app/api/v1/user/set-password/${user?._id}`;

    axios
      .post(url, updatePassword)
      .then((res) => {
        console.log(res);
        Swal.fire("Good job!", "Login from App Again!", "success");
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Get Invited User----------------
  useEffect(() => {
    const url = `https://aperio-server.vercel.app/api/v1/user/accept-invite/${id}`;
    axios
      .post(url)
      .then((res) => {
        // console.log(res);
        setUser(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="w-1/2 mx-auto my-10 p-10 border rounded-md">
      <div className="font-bold text-center">
        <h2 className="text-2xl">Create you account to train with</h2>
        <h2 className="text-3xl">{user?.creatorName}</h2>
      </div>
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="my-5 w-4/5 mx-auto flex flex-col gap-4"
      >
        <div>
          <label className="text-sm font-semibold">FIRST NAME</label>
          <input
            {...register("first_name")}
            defaultValue={user?.firstName}
            type="text"
            className="p-3 border mt-2 focus:outline-none w-full rounded-md font-semibold"
            disabled
          />
        </div>
        <div>
          <label className="text-sm font-semibold">LAST NAME</label>
          <input
            {...register("last_name")}
            defaultValue={user?.lastName}
            type="text"
            className="p-3 border mt-2 focus:outline-none w-full rounded-md font-semibold"
            disabled
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Email</label>
          <input
            {...register("email")}
            type="email"
            defaultValue={user?.email}
            className="p-3 border mt-2 focus:outline-none w-full rounded-md font-semibold"
            disabled
          />
        </div>
        <div>
          <label className="text-sm font-semibold">Password</label>
          <div className="relative">
            <input
              {...register("password", { required: true })}
              type={show ? "text" : "password"}
              className="p-3 border mt-2 focus:outline-none w-full rounded-md "
            />
            <div className="absolute right-5 top-6 text-xl">
              {show ? (
                <FaEyeSlash
                  onClick={() => setShow(!show)}
                  className="cursor-pointer"
                />
              ) : (
                <FaEye
                  onClick={() => setShow(!show)}
                  className="cursor-pointer"
                />
              )}
            </div>
          </div>
        </div>
        <input
          type="submit"
          value="Submit"
          className="bg-primary p-3 mt-5 rounded-md text-white text-lg font-semibold"
        />
      </form>
    </div>
  );
};

export default InvitePage;
