/* eslint-disable no-unused-vars */
import React, { useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import { FaCog, FaDumbbell, FaPlusCircle } from "react-icons/fa";
import { PiPulseBold } from "react-icons/pi";
import { FcSettings } from "react-icons/fc";
import { Link, Outlet, useParams } from "react-router-dom";
import { format } from "date-fns";
import Modal from "react-responsive-modal";
import { ImCross } from "react-icons/im";
import AllMetricsList from "../../Component/AllModals/AllMetricsList/AllMetricsList";
import axios from "axios";

const MetricsLayout = () => {
  const [active, setActive] = useState(false);
  const [openAllMetricsList, setOpenAllMetricsList] = useState(false);
  const [allMetrics, setAllMetrics] = useState([]);
  const { id } = useParams();

  // Body Metrics Modal----------------------------
  const openAllMetricsListModal = () => setOpenAllMetricsList(true);
  const closeAllMetricsListModal = () => setOpenAllMetricsList(false);

  // Get All Metrics--------------
  useEffect(() => {
    axios(
      `https://aperio-server.vercel.app/api/v1/matrics/get-matrics-clientId/${id}`,
      {
        method: "GET",
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      }
    )
      .then((res) => {
        // console.log(res?.data?.data);
        setAllMetrics(res?.data?.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id]);

  return (
    <div className="flex gap-2 ">
      {/* All metrics List modal---------- */}
      <Modal
        open={openAllMetricsList}
        closeIcon={<ImCross />}
        onClose={closeAllMetricsListModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-1/3",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <AllMetricsList
          closeAllMetricsListModal={closeAllMetricsListModal}
        ></AllMetricsList>
      </Modal>

      <div className="relative">
        <div className="w-72 fixed top-20">
          <div className="shadow-lg flex flex-col justify-between min-h-screen overflow-y-scroll pb-20">
            <div className="">
              {/* button section---------- */}
              <div className="border border-primary m-5 flex rounded-md text-white">
                <Link
                  to={`/profile/${id}/metrics`}
                  onClick={() => setActive(false)}
                  className={`flex gap-1 items-center justify-center px-2 py-2 ${
                    !active && "bg-primary text-white"
                  } rounded-l-sm w-1/2 text-black`}
                >
                  <PiPulseBold />
                  <span className="text-xs">Body Matrics</span>
                </Link>
                <Link
                  to={`/profile/${id}/exercise`}
                  onClick={() => setActive(true)}
                  className={`flex items-center gap-2 justify-center px-2 py-2 ${
                    active && "bg-primary text-white"
                  } rounded-r-sm w-1/2 text-black`}
                >
                  <FaDumbbell className="text-gray-600 -rotate-45" />
                  <span className="text-xs">Exercise Matrics</span>
                </Link>
              </div>
              {/* Steps section---------- */}
              <div className="flex flex-col gap-2 mt-5">
                <div className="flex justify-between items-center px-5 border-b shadow-sm">
                  <p className="text-gray-500 font-semibold">
                    <small>Total(5)</small>
                  </p>
                  <p className="text-gray-500 font-semibold">
                    <small>Last Updated(5)</small>
                  </p>
                </div>

                <div className="h-56 overflow-y-scroll flex text-xs flex-col gap-3">
                  <Link
                    to={`/profile/${id}/metrics`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Body Fat</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />

                  <Link
                    to={`/profile/${id}/metrics/weight`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Weight</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                  <Link
                    to={`/profile/${id}/metrics/fatmass`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Fat Mass</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                  <Link
                    to={`/profile/${id}/metrics/hip`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Hip</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                  <Link
                    to={`/profile/${id}/metrics/bmi`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">BMI</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                  <Link
                    to={`/profile/${id}/metrics/calf`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Calf</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                  <Link
                    to={`/profile/${id}/metrics/chest`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Chest</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />

                  <Link
                    to={`/profile/${id}/metrics/sketetalmass`}
                    className="flex justify-between items-center px-4 "
                  >
                    <h6 className="font-semibold">Skeletal Muscle Mass</h6>
                    <p className="text-gray-500 ">
                      <small>{format(new Date(), "PP")}</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                  <Link
                    to={`/profile/${id}/metrics/steps`}
                    className="flex justify-between items-center px-4"
                  >
                    <h6 className="font-semibold">Steps</h6>
                    <p className="text-gray-500 ">
                      <small>June 26,2023</small>
                    </p>
                  </Link>
                  <hr className="border-gray-200" />
                </div>
              </div>
            </div>

            <div className="flex flex-col m-5 pb-5 justify-center gap-5 text-xs">
              <div className="md:flex justify-evenly items-center gap-2">
                <button
                  onClick={() => openAllMetricsListModal()}
                  className="flex gap-1 justify-center font-semibold items-center duration-300 hover:text-primary"
                >
                  <FaCog className="text-sm" />
                  <div>Manage Matrics</div>
                </button>
                <button
                  onClick={() => openAllMetricsListModal()}
                  className="flex gap-1 justify-center font-semibold items-center duration-300 hover:text-primary"
                >
                  <FaPlusCircle className="text-sm font-bold" />
                  <div>Add New Matrics</div>
                </button>
              </div>
              <div className="flex gap-3 justify-center items-center">
                <button className="btn btn-sm rounded-full px-5">
                  <div className="text-xs font-semibold">Update all values</div>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="p-5 ml-[285px] w-full">
        <Outlet />
      </div>
    </div>
  );
};

export default MetricsLayout;
