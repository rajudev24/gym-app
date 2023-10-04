/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FcCalendar } from "react-icons/fc";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import axios from "axios";
import { toast } from "react-hot-toast";

const BodyMetricsModal = ({ closeBodyMetricsModal }) => {
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();
  const [client, setClient] = useState();

  const { id } = useParams();
  const { user, reload, setReload } = useContext(AuthContext);

  // console.log(user);

  // Get Single Client-----------------------
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
        console.log(error);
      });
  }, [id]);

  const onSubmit = (data) => {
    const metrics = {
      bodyFat: [
        {
          measurement: {
            value: data?.fat,
            unit: "%",
          },
        },
      ],
      weight: [
        {
          measurement: {
            value: data?.weight,
            unit: "kg",
          },
        },
      ],
      hip: [
        {
          measurement: {
            value: data?.hip,
            unit: "cm",
          },
        },
      ],
      calf: [
        {
          measurement: {
            value: data?.calf,
            unit: "cm",
          },
        },
      ],
      chest: [
        {
          measurement: {
            value: data?.chest,
            unit: "cm",
          },
        },
      ],
      waist: [
        {
          measurement: {
            value: data?.waist,
            unit: "cm",
          },
        },
      ],
      shoulders: [
        {
          measurement: {
            value: data?.shoulders,
            unit: "cm",
          },
        },
      ],
      thigh: [
        {
          measurement: {
            value: data?.thigh,
            unit: "cm",
          },
        },
      ],
      bicep: [
        {
          measurement: {
            value: data?.bicep,
            unit: "cm",
          },
        },
      ],
      skeletalMuscleMass: [
        {
          measurement: {
            value: data?.M_mass,
            unit: "kg",
          },
        },
      ],
      fatMass: [
        {
          measurement: {
            value: data?.F_mass,
            unit: "kg",
          },
        },
      ],
      coachEmail: user?.email,
      clientId: client?._id,
    };
    // console.log(metrics);

    const url =
      "https://aperio-server.vercel.app/api/v1/matrics/create-matrics";
    axios
      .post(url, metrics, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        console.log(res?.data?.data);
        toast.success(res?.data?.massage);
        reset();
        closeBodyMetricsModal();
        setReload(!reload);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="p-5">
          <div className="flex justify-between items-center">
            <h2 className="text-xl font-bold">Update All Metrics</h2>
            <div className="flex gap-2 items-center">
              <p>Today</p>
              <FcCalendar className="text-lg" />
            </div>
          </div>

          <div className="p-8 flex flex-col gap-4">
            <div className="flex justify-between items-center">
              <span className="text-sm">Body Fat:</span>
              <div>
                <input
                  {...register("fat")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-4 text-lg">%</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Weight:</span>
              <div>
                <input
                  {...register("weight")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-3 text-lg">kg</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Hip:</span>
              <div>
                <input
                  {...register("hip")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Calf:</span>
              <div>
                <input
                  {...register("calf")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Chest:</span>
              <div>
                <input
                  {...register("chest")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Waist:</span>
              <div>
                <input
                  {...register("waist")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Shoulders:</span>
              <div>
                <input
                  {...register("shoulders")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Thigh:</span>
              <div>
                <input
                  {...register("thigh")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Bicep:</span>
              <div>
                <input
                  {...register("bicep")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-2 text-lg">cm</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Skeletal Muscle Mass:</span>
              <div>
                <input
                  {...register("M_mass")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-3 text-lg">kg</span>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-sm">Fat Mass:</span>
              <div>
                <input
                  {...register("F_mass")}
                  type="number"
                  id=""
                  className="px-3 py-2 border border-primary focus:outline-none w-32 rounded-md"
                />{" "}
                <span className="ml-3 text-lg">kg</span>
              </div>
            </div>
          </div>
        </div>
        <hr />
        <div className="bg-slate-100 px-4 py-3 flex justify-end rounded-b-md">
          <button
            type="submit"
            className="px-8 py-2 rounded-md bg-primary hover:bg-secondary duration-300 text-white font-medium"
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

export default BodyMetricsModal;
