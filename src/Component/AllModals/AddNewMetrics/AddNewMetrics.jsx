/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { FaArrowLeft } from "react-icons/fa";
import { toast } from "react-hot-toast";

// eslint-disable-next-line react/prop-types
const AddNewMetrics = ({ closeAllMetricsListModal }) => {
  const [allTypes, setAllTypes] = useState([]);
  const [type, setType] = useState();
  const [units, setUnits] = useState();
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
    reset,
  } = useForm();

  // get All types-----------
  useEffect(() => {
    axios("https://aperio-server.vercel.app/api/v1/type/all-type", {
      headers: {
        authorization: `bearer ${localStorage.getItem("userToken")}`,
      },
    })
      .then((res) => {
        // console.log(res?.data?.data);
        setAllTypes(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // // All Metrics------------
  // useEffect(() => {
  //     axios(' https://aperio-server.vercel.app/api/v1/add-new-matric/get-new-matrics', {
  //         headers: {
  //             authorization: `bearer ${localStorage.getItem("userToken")}`
  //         }
  //     })
  //         .then(res => {
  //             console.log(res);
  //         })
  //         .catch(error => {
  //             console.log(error);
  //         })
  // }, [])

  // Save New Metrics to database-------------
  const onSubmit = (data) => {
    const newMetrics = {
      matricName: data?.metrics_name,
      type: type,
      unit: data?.unit,
    };

    const url =
      "https://aperio-server.vercel.app/api/v1/add-new-matric/create-new-matrics";
    axios
      .post(url, newMetrics, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        toast.success(res?.data?.massage);
        // console.log(res);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleType = (e) => {
    const type = e.target.value;
    setType(type);

    axios(`https://aperio-server.vercel.app/api/v1/type/get-type/${type}`)
      .then((res) => {
        // console.log(res?.data?.data);
        setUnits(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="p-5">
      <div className="flex gap-2 items-center">
        <FaArrowLeft />
        <h2 className="text-lg font-semibold">Add New Metric</h2>
      </div>

      <form onSubmit={handleSubmit(onSubmit)} className="my-5">
        <div>
          <label className="text-xs">METRIC NAME</label>
          <div className="text-sm mt-2">
            <input
              {...register("metrics_name", { required: true })}
              type="text"
              id=""
              className=" px-3 py-2 border  focus:outline-none w-full rounded-md"
            />
          </div>
        </div>
        <div className="mt-5 grid grid-cols-2 gap-4">
          <div className="text-sm flex flex-col gap-3">
            <label className="uppercase text-xs text-gray-500">TYPE</label>
            <select
              onChange={handleType}
              // {...register("type", { required: true })}
              defaultValue="Select One"
              className=" px-3 border py-2 rounded-md focus:outline-none w-full"
              required
            >
              <option disabled>Select One</option>
              {allTypes?.map((type, i) => (
                <option key={i} value={type?.type}>
                  {type?.type}
                </option>
              ))}
            </select>
          </div>
          <div className="text-sm flex flex-col gap-3">
            <label className="uppercase text-xs text-gray-500">UNIT</label>
            <select
              {...register("unit", { required: true })}
              defaultValue="Select One"
              className="px-3 border py-2 rounded-md focus:outline-none w-full"
              required
            >
              <option disabled>Select One</option>
              {units?.unit?.map((unit, i) => (
                <option key={i} value={unit}>
                  {unit}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="w-full mt-5 justify-end flex">
          <button
            type="submit"
            className="px-8 py-2 text-sm rounded-md bg-primary hover:bg-[#4b27b1] duration-300 text-white font-medium"
          >
            Create
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddNewMetrics;
