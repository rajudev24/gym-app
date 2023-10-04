/* eslint-disable react/prop-types */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from "react";
import { AiOutlinePushpin } from "react-icons/ai";
import { FaPlusCircle } from "react-icons/fa";
import { ImCross } from "react-icons/im";
import Modal from "react-responsive-modal";
import AddNewMetricsModal from "../AddNewMetrics/AddNewMetrics";
import axios from "axios";

const AllMetricsList = ({ closeAllMetricsListModal }) => {
  const [openAddNewMetrics, setOpenAddNewMetrics] = useState(false);
  const [allMetrics, setAllMetrics] = useState([]);

  const openAddNewMetricsModal = () => {
    setOpenAddNewMetrics(true);
  };
  const closeAddNewMetricsModal = () => {
    setOpenAddNewMetrics(false);
  };

  const array = [1, 2, 3, 4, 5, 6, 7];

  // All Metrics------------
  useEffect(() => {
    axios(
      " https://aperio-server.vercel.app/api/v1/add-new-matric/get-new-matrics",
      {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      }
    )
      .then((res) => {
        console.log(res.data?.data);
        setAllMetrics(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  // update status----------
  const updateStatus = (e, metric) => {
    console.log(e.target.checked);
  };

  return (
    <div>
      {/* Add New metrics modal---------- */}
      <Modal
        open={openAddNewMetrics}
        closeIcon={<ImCross />}
        onClose={closeAddNewMetricsModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-1/3",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <AddNewMetricsModal
          closeAllMetricsListModal={closeAllMetricsListModal}
        ></AddNewMetricsModal>
      </Modal>

      <div className="p-5">
        <h2 className="text-xl font-semibold">Setup list of metrics</h2>
        <p>
          Select the metrics you want your client to use for progress tracking
          and accountability.
        </p>
      </div>
      <div className="bg-gray-100 py-2 px-5">
        <h2 className="text-sm font-semibold">Metrics of the Team</h2>
      </div>
      <div className="bg-white">
        <div className="shadow-sm">
          <ul className="text-[10px] px-5 py-3 font-semibold flex justify-between">
            <li>METRICS</li>
            <li>UNIT</li>
            <li>PIN TO OVERVIEW</li>
          </ul>
        </div>
        <div className="pl-5 pr-16 py-3 h-56 overflow-y-scroll">
          {allMetrics?.map((metric, i) => (
            <ul key={i} className="flex justify-between items-center py-2">
              <li className="flex gap-1 items-center">
                {metric?.status ? (
                  <input
                    onChange={(e) => updateStatus(e, metric)}
                    type="checkbox"
                    className="checkbox checkbox-primary w-5 h-5 rounded-full"
                    defaultChecked={metric?.status}
                  />
                ) : (
                  <input
                    onChange={(e) => updateStatus(e, metric)}
                    type="checkbox"
                    className="checkbox checkbox-primary w-5 h-5 rounded-full"
                  />
                )}
                {/* <input onChange={(e) => updateStatus(e, metric)} type="checkbox" className="checkbox checkbox-primary w-5 h-5 rounded-full" checked={metric?.status} /> */}

                <p>{metric?.matricName}</p>
              </li>
              <li className="flex gap-1">
                <select className="w-18 py-1 focus:outline-none h-8 hover:border rounded-md">
                  <option>{metric?.unit}</option>
                  <option>Greedo</option>
                </select>
              </li>
              <li className="flex gap-1">
                <AiOutlinePushpin className="text-2xl" />
              </li>
            </ul>
          ))}
        </div>
      </div>

      <hr />
      <div className="bg-slate-100 px-4 py-3 flex justify-between items-center rounded-b-md">
        <button
          onClick={() => openAddNewMetricsModal()}
          className="flex gap-2 justify-center font-semibold items-center text-gray-500 hover:text-primary text-sm"
        >
          <FaPlusCircle className="text-lg font-bold" />
          <div>Add New Matrics</div>
        </button>
        <button
          type="submit"
          className="px-8 py-2 text-sm rounded-md bg-primary hover:bg-[#4b27b1] duration-300 text-white font-medium"
        >
          Save
        </button>
      </div>
    </div>
  );
};

export default AllMetricsList;
