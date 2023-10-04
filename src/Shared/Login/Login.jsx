/* eslint-disable react/no-unescaped-entities */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { BiLogIn } from "react-icons/bi";
import { FaArrowRight, FaEye, FaEyeSlash } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import axios from "axios";
import { AuthContext } from "../../Context/AuthProvider/AuthProvider";
import { Oval } from "react-loader-spinner";
import logo from "../../assets/logo.jpeg";
import Lottie from "lottie-react";
import animaton from "../../assets/animation/animation_lmdw61t1.json";

const Login = () => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();
  const { setUser } = useContext(AuthContext);
  const [checked, setChecked] = useState(true);
  const [loading, setLoading] = useState(false);
  const [show, setShow] = useState(false);
  const [loginUser, setLoginUser] = useState({});
  const [error, setError] = useState();

  // get save user email and Password-------
  useEffect(() => {
    const user = JSON.parse(localStorage.getItem("login-user"));
    setLoginUser(user);
  }, []);

  // handle Login-----------------------
  const onSubmit = (data) => {
    // setLoading(true);
    const user = {
      email: data?.email ? data?.email : loginUser?.email,
      password: data?.password ? data?.password : loginUser?.password,
    };

    if (checked) {
      localStorage.setItem("login-user", JSON.stringify(user));
    } else {
      localStorage.removeItem("login-user");
    }
    axios
      .post("https://aperio-server.vercel.app/api/v1/user/log-in", user)
      .then((res) => {
        if (res?.data?.status === "success") {
          // console.log(res?.data?.data?.others);
          setUser(res?.data?.data?.user);
          const token = res?.data?.data?.token;
          localStorage.setItem("userToken", token);
          setLoading(false);
          navigate("/");
        }
      })
      .catch((error) => {
        console.log(error);
        setError("Invalid Email or Password");
        setLoading(false);
      });
  };

  return (
    <div className="bg-[#f8f8f8]">
      <div className="w-4/5 h-screen py-10 mx-auto flex items-center justify-center">
        <div className="">
          <Lottie animationData={animaton} loop={true} autoplay={true} />
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="bg-white shadow-lg flex flex-col gap-5 w-96 justify-center px-6 py-10 mx-10 rounded-md"
        >
          <div className="w-full flex flex-col gap-2 justify-center items-center">
            <img src={logo} alt="" className="w-16 rounded" />
            <h2 className="text-4xl font-bold text-center ">Login</h2>
          </div>
          <div className="flex flex-col gap-1">
            <label htmlFor="" className="text-sm text-secondary">
              Your Email Address
            </label>
            <input
              type="email"
              defaultValue={loginUser ? loginUser?.email : ""}
              placeholder="Your Email Address"
              className="text-sm border-b focus:outline-none focus:bg-transparent p-2"
              {...register("email")}
            />
          </div>
          <div className="flex flex-col gap-1 relative">
            <label htmlFor="" className="text-sm text-secondary">
              Password
            </label>
            <input
              type={show ? "text" : "password"}
              defaultValue={loginUser ? loginUser?.password : ""}
              placeholder="Password"
              className="text-sm border-b focus:outline-none focus:bg-transparent p-2"
              {...register("password")}
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
          <p className="text-error text-sm">{error}</p>
          <div className="flex justify-between">
            <div className="form-control">
              <label className="flex items-center cursor-pointer gap-2">
                <input
                  onChange={() => setChecked(!checked)}
                  type="checkbox"
                  className="checkbox border-gray-400 w-5 h-5 rounded-md checkbox-primary"
                  defaultChecked={checked}
                />
                <span className="label-text">Remember me</span>
              </label>
            </div>
            <div className="text-secondary text-sm font-semibold cursor-pointer">
              Forgot your password?
            </div>
          </div>
          <button
            type="submit"
            className={`btn w-full disabled bg-primary ${
              loading ? "hover:bg-primary" : "hover:bg-secondary"
            } text-white duration-300`}
          >
            {loading ? (
              <div className="flex gap-2 items-center">
                <Oval
                  visible={true}
                  height="25"
                  width="25"
                  color="#ffffff"
                  secondaryColor="#cce7ce"
                  ariaLabel="dna-loading"
                  wrapperStyle={{}}
                  strokeWidth={8}
                  wrapperClass="dna-wrapper"
                />

                <p className="text-base font-semibold">Loading...</p>
              </div>
            ) : (
              <div className="flex gap-2 items-center">
                <p className="text-base font-semibold">Login</p>
                <FaArrowRight className="text-lg" />
              </div>
            )}
          </button>

          <h2 className="text-center">
            Don't have an account?{" "}
            <Link
              to="/signup"
              className="text-primary font-medium hover:underline"
            >
              Sign Up
            </Link>
          </h2>
        </form>
      </div>
    </div>
  );
};

export default Login;
