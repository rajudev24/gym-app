/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-undef */
/* eslint-disable no-unused-vars */
import React, { useEffect, useState, useContext } from "react";
import Modal from "react-responsive-modal";
import BodyMetricsModal from "../../AllModals/BodyMetricsModal/BodyMetricsModal";
import { ImCross } from "react-icons/im";
import axios from "axios";
import { useParams } from "react-router-dom";
import { AuthContext } from "../../../Context/AuthProvider/AuthProvider";
import { format } from "date-fns";
import { FaChartBar } from "react-icons/fa";
import ShowChart from "../../../Shared/ShowChart/ShowChart";
import Loading from "../../../Shared/Loading/Loading";

const AddBodyMetrics = () => {
  const [metrics, setMetrics] = useState(false);
  const [openBodyMetrics, setOpenBodyMetrics] = useState(false);
  const { reload } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [bodyMetrics, setBodyMetrics] = useState([]);
  const [bodyWeight, setBodyWeight] = useState([]);
  const { id } = useParams();
  // console.log(id);

  // Body Metrics Modal----------------------------
  const openBodyMetricsModal = () => setOpenBodyMetrics(true);
  const closeBodyMetricsModal = () => setOpenBodyMetrics(false);

  // Get Body Weight----------
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
        const metricsData = res?.data?.data;
        const extractedWeight = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.weight && Array.isArray(data.weight)) {
              data.weight.forEach((bodyWeightEntry) => {
                if (
                  bodyWeightEntry.date &&
                  bodyWeightEntry.measurement &&
                  bodyWeightEntry.measurement.value
                ) {
                  const datePortion = bodyWeightEntry.date.split("T")[0];
                  extractedWeight.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodyWeightEntry.measurement.value,
                  });
                }
              });
            }
          });
          setBodyWeight(extractedWeight);
          setLoading(false);
        } else {
          setBodyWeight([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id, reload]);

  // Get Body Fat---------
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
        const metricsData = res?.data?.data;
        const extractedBodyFat = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.bodyFat && Array.isArray(data.bodyFat)) {
              data.bodyFat.forEach((bodyFatEntry) => {
                if (
                  bodyFatEntry.date &&
                  bodyFatEntry.measurement &&
                  bodyFatEntry.measurement.value
                ) {
                  const datePortion = bodyFatEntry.date.split("T")[0];
                  extractedBodyFat.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodyFatEntry.measurement.value,
                  });
                }
              });
            }
          });
          setBodyMetrics(extractedBodyFat);
          setLoading(false);
        } else {
          setBodyMetrics([]);
        }
      })
      .catch((error) => {
        setLoading(false);
        console.log(error);
      });
  }, [id, reload]);

  return (
    <div>
      {/* metrics modal----------------- */}
      {/* Body metrics Modal Start------------------------ */}
      <Modal
        open={openBodyMetrics}
        closeIcon={<ImCross />}
        onClose={closeBodyMetricsModal}
        center
        classNames={{
          modal: "p-0 overflow-visible rounded-md w-1/3",
          closeButton:
            "-top-3 -right-3 text-[8px] bg-black text-white p-2 rounded-full",
        }}
      >
        <BodyMetricsModal
          closeBodyMetricsModal={closeBodyMetricsModal}
        ></BodyMetricsModal>
      </Modal>
      {/* Body metrics Modal End------------------------ */}

      {/* metrcis body----------- */}
      <div
        onMouseOver={() => setMetrics(true)}
        onMouseOut={() => setMetrics(false)}
        className="border rounded-md bg-slate-50"
      >
        <div className="flex justify-between items-center mx-4 my-2">
          <h5 className="text-base font-medium text-slate-700">Body Metrics</h5>

          <button
            onClick={() => openBodyMetricsModal()}
            className={
              metrics ? "text-sm block hover:underline duration-500" : "hidden"
            }
          >
            Update All
          </button>
        </div>
        <hr className=" border-gray-300" />
        <div className="grid lg:grid-cols-2 grid-cols-1 gap-5 p-4 bg-white rounded-md">
          {/* bodyFat----------- */}
          <div className="border rounded-md p-2">
            <h2 className="font-semibold text-gray-500">Body Fat</h2>

            <div className="">
              {loading && <Loading />}
              {bodyMetrics?.length ? (
                <ShowChart data={bodyMetrics}></ShowChart>
              ) : (
                <div className="flex justify-center items-center h-[250px]">
                  <FaChartBar className="text-5xl text-gray-400" />
                </div>
              )}
            </div>
          </div>

          {/* bodyWeight--------- */}
          <div className="border rounded-md p-2">
            <h2 className="font-semibold text-gray-500">Weight</h2>
            <div className="">
              {loading && <Loading />}
              {bodyMetrics?.length ? (
                <ShowChart data={bodyWeight}></ShowChart>
              ) : (
                <div className="flex justify-center items-center h-[250px]">
                  <FaChartBar className="text-5xl text-gray-400" />
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AddBodyMetrics;
