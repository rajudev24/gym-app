/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { BiPlus } from "react-icons/bi";
import {
  FaChartBar,
  FaEdit,
  FaPlus,
  FaTrash,
  FaTrashAlt,
  FaXRay,
} from "react-icons/fa";
import { FcSettings } from "react-icons/fc";
import { useParams } from "react-router-dom";
// import { AreaChart } from 'recharts';
import {
  AreaChart,
  Area,
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Loading from "../../../../Shared/Loading/Loading";
import { format } from "date-fns";
import ShowChart from "../../../../Shared/ShowChart/ShowChart";
import TimeField from "react-simple-timefield";
import ProgressSection from "../../../../Shared/ProgressSection/ProgressSection";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const BodyFat = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bodyMetrics, setBodyMetrics] = useState([]);
  const [metricsValue, setMetricsValue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [refresh, setRefresh] = useState(false);
  // const today = new Date();

  // Add New Metrics-------
  const addNewMetrics = (bodyFat) => {
    const metrics = {
      bodyFat: [
        {
          date: bodyFat?.date,
          measurement: {
            value: bodyFat?.metrics,
            unit: "%",
          },
        },
      ],
      coachEmail: user?.email,
      clientId: id,
    };

    const url =
      "https://aperio-server.vercel.app/api/v1/matrics/create-matrics";
    axios
      .post(url, metrics, {
        headers: {
          authorization: `bearer ${localStorage.getItem("userToken")}`,
        },
      })
      .then((res) => {
        // console.log(res?.data?.data);
        toast.success(res?.data?.massage);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update Existing Metrics--------
  const updateMetrics = (updateMetrics) => {
    console.log("Body Fat:", updateMetrics);
  };

  // Get BodyFat-------------
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
        setMetricsValue(res?.data?.data[0]?.bodyFat);
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
        console.log(error);
      });
  }, [id, refresh]);

  return (
    // <div className="h-auto ">
    //   <div className="grid grid-cols-3 gap-5">
    //     {loading ? (
    //       <div className="col-span-2 border rounded-md">
    //         <Loading />
    //       </div>
    //     ) : (
    //       <div className="col-span-2 border rounded-md ">
    //         <div className="flex justify-between p-5">
    //           <div>
    //             <h2 className="text-2xl font-semibold">Body Fat</h2>
    //             <h2>1M / 2M / 6M /1Y</h2>
    //           </div>
    //           <div>
    //             <h2 className="text-3xl font-semibold text-green-400">20%</h2>
    //             <h2>17.7%</h2>
    //           </div>
    //         </div>

    //         <div className="px-8 pb-10">
    //           {
    //             bodyMetrics?.length ?
    //               <ShowChart data={bodyMetrics}></ShowChart>
    //               :
    //               <div className="flex justify-center items-center h-[250px]">
    //                 <FaChartBar className="text-5xl text-gray-400" />
    //               </div>
    //           }

    //         </div>
    //       </div>
    //     )}

    //     <div className="border rounded-md">
    //       <div className="bg-slate-50 rounded-md">
    //         <div className="flex justify-between items-center mx-4 py-3">
    //           <h5 className="text-sm font-medium text-gray-500">Details</h5>
    //         </div>
    //         <hr className=" border-gray-300" />
    //       </div>
    //       <div className="p-4">all details</div>
    //     </div>
    //   </div>

    //   <div className="grid grid-cols-3 gap-5 my-5">
    //     <div className="col-span-2 border rounded-md ">
    //       <div className="bg-slate-50 rounded-md">
    //         <div className="flex justify-between items-center mx-4 py-3">
    //           <h5 className="text-base font-medium text-slate-700 ">
    //             Progress
    //           </h5>
    //         </div>
    //         <hr className=" border-gray-300" />
    //         <ProgressSection />
    //       </div>
    //     </div>
    //   </div>
    // </div>
    <div>
      <MetricsSharePage
        addNewMetrics={addNewMetrics}
        title={"Body Fat"}
        loading={loading}
        metrics={bodyMetrics}
        metricsValue={metricsValue}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default BodyFat;
