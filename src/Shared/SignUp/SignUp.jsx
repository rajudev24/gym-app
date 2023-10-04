/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import signup from "../../assets/login.svg";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import Lottie from "lottie-react";
import animaton from "../../assets/animation/animation_lmdw61t1.json";
import logo from "../../assets/logo.jpeg";

const SignUp = () => {
  const [checked, setChecked] = useState("coach");
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const { setUser } = useContext(AuthContext);
  const navigate = useNavigate();
  const [show, setShow] = useState(false);

  // handle user Role---------------------
  const handleradio = (e) => {
    setChecked(e.target.name);
  };

  // handle SignUp-----------------------
  const onSubmit = (data) => {
    const user = {
      name: data?.name,
      email: data?.email,
      password: data?.password,
      role: checked,
    };
    // console.log(user);
    axios
      .post("https://aperio-server.vercel.app/api/v1/user/create-user", user)
      .then((res) => {
        if (res?.data?.status === "success") {
          // console.log(res?.data?.data);
          navigate("/login");
        }
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="bg-[#f8f8f8]">
      <div className="w-4/5 py-10 mx-auto flex items-center justify-center gap-10">
        {/* <div className=' w-full'>
                    <img src={signup} alt="" />
                </div> */}
        <div className="">
          <Lottie animationData={animaton} loop={true} autoplay={true} />
        </div>

        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg flex flex-col gap-5 w-96 justify-center px-6 py-10 mx-10 rounded-md"
        >
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <img src={logo} alt="" className="w-16 rounded" />
            <h2 className="text-4xl font-bold text-center">Sign up</h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm text-secondary">
              Your Name
            </label>
            <input
              type="text"
              placeholder="Enter Your Name"
              className="text-sm border-b focus:outline-none focus:bg-transparent p-2"
              {...register("name", { required: "Please Enter Your Name" })}
            />
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm text-secondary">
              Your Email Address
            </label>

            <input
              type="email"
              placeholder="Your Email Address"
              className="text-sm border-b focus:outline-none focus:bg-transparent p-2"
              {...register("email", { required: "Please Enter Your Email" })}
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="" className="text-sm text-secondary">
              Create Password
            </label>

            <input
              type={show ? "text" : "password"}
              placeholder="Create Password"
              className="text-sm border-b focus:outline-none focus:bg-transparent p-2"
              {...register("password", {
                required: "Please Enter Your Password",
              })}
            />
            <div className="absolute right-5 top-9 text-gray-700 text-lg">
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
          <div className="flex w-full justify-between gap-4">
            <div className="border font-medium p-3 text-center text rounded-md w-full">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">I'm a coach</span>
                  <input
                    type="radio"
                    name="coach"
                    className="radio radio-primary"
                    checked={checked === "coach"}
                    onChange={(e) => handleradio(e)} // Add onChange handler to update the state
                  />
                </label>
              </div>
            </div>
            <div className="border font-medium p-3 text-center text rounded-md w-full">
              <div className="form-control">
                <label className="cursor-pointer label">
                  <span className="label-text">I'm a client</span>
                  <input
                    type="radio"
                    name="client"
                    className="radio radio-primary"
                    checked={checked === "client"}
                    onChange={(e) => handleradio(e)} // Add onChange handler to update the state
                  />
                </label>
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="btn w-full bg-primary hover:bg-secondary text-white"
          >
            Signup
            <FaArrowRight className="text-lg" />
          </button>

          <h2 className="text-center">
            Already have an account?{" "}
            <Link
              to="/Login"
              className="text-primary font-medium hover:underline"
            >
              Log In
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default SignUp;
