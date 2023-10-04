/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import { format } from "date-fns";
import React, { useState } from "react";
import { Controller, useForm } from "react-hook-form";
import { FaEdit, FaPlus, FaTrashAlt } from "react-icons/fa";
import TimeField from "react-simple-timefield";
import Loading from "../Loading/Loading";
import { convertToCamelCase } from "../../utils";

const ProgressSection = ({
  title,
  loading,
  metricsValue,
  addNewMetrics,
  updateMetrics,
}) => {
  const [showField, setShowField] = useState(false);
  const [editShow, setEditShow] = useState();
  const [metrics, setMetrics] = useState();

  // Add metrics--------
  // const { register, handleSubmit, control, formState: { errors }, } = useForm();
  const {
    register: registerForm1,
    handleSubmit: handleSubmitForm1,
    control: controlForm1,
    reset: reset1,
    formState: { errors: errorsForm1 },
  } = useForm();
  const {
    register: registerForm2,
    handleSubmit: handleSubmitForm2,
    control: controlForm2,
    reset: reset2,
    formState: { errors: errorsForm2 },
  } = useForm();

  // submit new metrics--------
  const onSubmitForm1 = (data) => {
    addNewMetrics(data);
    setShowField(false);
    reset1();
  };
  const metricCategory = convertToCamelCase(title);

  // Update Metrics
  const onSubmitForm2 = (data) => {
    updateMetrics(data);
    const updatedValue = {
      value: data.update_metrics,
      updateId: editShow,
    };
    const url = `https://aperio-server.vercel.app/api/v1/matrics/64f2ea89adf6c6b930eedf56/bodyFat`;

    // const updateMetrics = {
    //     date: data?.update_date ? data?.update_date : metrics?.date,
    //     time: data?.time ? data?.time : metrics?.date,
    //     update_metrics: data?.update_metrics ? data?.update_metrics : metrics?.measurement?.value
    // }
    // console.log(updateMetrics);
  };

  // Edit Body Fat-------
  const handleBodyFatEdit = (metrics) => {
    setEditShow(metrics?._id);
    setMetrics(metrics);
    reset2();
  };

  // Cancle edit field----
  const cancelBodyFatEdit = () => {
    setEditShow(0);
    reset2();
  };

  // Delete Body fat
  const handleBodyFat = () => {
    console.log("object");
  };

  const dates = [1];

  return (
    <div>
      <div>
        <button
          onClick={() => setShowField(true)}
          className={`p-3 flex gap-1 items-center text-sm text-gray-500 ${
            showField ? "hidden" : "block"
          }`}
        >
          <FaPlus />
          <span>Add Result</span>
        </button>

        <form
          onSubmit={handleSubmitForm1(onSubmitForm1)}
          className={`py-3 px-4 text-sm grid grid-cols-4 gap-5 ${
            showField ? "block" : "hidden"
          }`}
        >
          <input
            type="text"
            id=""
            defaultValue={format(new Date(), "P")}
            className="px-2 w-[90px] bg-gray-50 focus:outline-none"
            {...registerForm1("date")}
          />

          <div>
            <Controller
              name="time"
              control={controlForm1}
              defaultValue={format(new Date(), "k:m")}
              render={({ field }) => (
                <TimeField
                  {...field}
                  style={{
                    width: 55,
                    color: "#333",
                  }}
                  className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary rounded-sm focus:border focus:outline-none"
                />
              )}
            />
          </div>
          <input
            type="text"
            className="w-24 rounded border focus:outline-none px-2 text-xs"
            placeholder={`Add ${title}`}
            {...registerForm1("metrics")}
          />

          <div className="flex items-center gap-2 text-sm text-gray-400 justify-end">
            <div
              onClick={() => setShowField(reset1())}
              className="text-xs text-gray-500 cursor-pointer"
            >
              Cancel
            </div>
            <button
              type="submit"
              className="text-xs bg-green-500 px-4 py-1 shadow rounded-full text-white"
            >
              Save
            </button>
          </div>
        </form>
        <hr className=" border-gray-300" />
      </div>

      {/* update metrics---------- */}
      {loading && <Loading />}
      {metricsValue?.map((metrics, i) => (
        // console.log(metrics)
        <div key={i} className="flex items-center w-full px-3">
          <h2 className="text-xs">{i + 1}.</h2>
          <form
            onSubmit={handleSubmitForm2(onSubmitForm2)}
            className={`py-3 px-2 text-sm hover:font-semibold grid grid-cols-4 gap-5 w-full`}
          >
            {editShow === metrics?._id ? (
              <input
                type="text"
                name=""
                id=""
                defaultValue={format(new Date(metrics?.date), "P")}
                className="px-2 w-[90px] bg-gray-50 focus:outline-none"
                {...registerForm2("update_date")}
              />
            ) : (
              <h2>{format(new Date(metrics?.date), "PP")}</h2>
            )}
            {editShow === metrics?._id ? (
              <Controller
                name="time"
                control={controlForm2}
                defaultValue={format(new Date(metrics?.date), "k:m")}
                render={({ field }) => (
                  <TimeField
                    {...field}
                    style={{
                      width: 55,
                      color: "#333",
                    }}
                    className="px-2 py-[2px] hover:border-primary border border-base-100 focus:border-primary rounded-sm focus:border focus:outline-none"
                  />
                )}
              />
            ) : (
              <p>{format(new Date(metrics?.date), "p")}</p>
            )}
            {editShow === metrics?._id ? (
              <div className="flex gap-2 items-center">
                <input
                  type="text"
                  className="w-20 rounded border focus:outline-none px-2 py-1 text-xs"
                  defaultValue={metrics?.measurement?.value}
                  {...registerForm2("update_metrics")}
                />
                {metrics?.measurement?.unit}
              </div>
            ) : (
              <p className="">
                {metrics?.measurement?.value}
                {metrics?.measurement?.unit}
              </p>
            )}
            {editShow === metrics?._id ? (
              <div className="flex items-center gap-2 text-sm text-gray-400 justify-end">
                <div
                  onClick={() => cancelBodyFatEdit()}
                  className="text-xs text-gray-500 cursor-pointer"
                >
                  Cancel
                </div>
                <button
                  type="submit"
                  className="text-xs bg-green-500 px-4 shadow rounded-full text-white"
                >
                  Save
                </button>
              </div>
            ) : (
              <div className="flex gap-2 text-sm text-gray-400 justify-end">
                <div
                  onClick={() => handleBodyFatEdit(metrics)}
                  className="hover:text-green-500 cursor-pointer duration-300"
                >
                  <FaEdit />
                </div>
                <div
                  onClick={() => handleBodyFat()}
                  className="hover:text-red-500 duration-300 cursor-pointer"
                >
                  <FaTrashAlt />
                </div>
              </div>
            )}
          </form>
          <hr className=" border-gray-300" />
        </div>
      ))}
    </div>
  );
};

export default ProgressSection;
