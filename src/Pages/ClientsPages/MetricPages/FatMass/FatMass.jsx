/* eslint-disable no-unused-vars */
import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { FaChartBar, FaEdit, FaPlus, FaTrash } from "react-icons/fa";
import { useParams } from "react-router-dom";
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
import { FcBarChart } from "react-icons/fc";
import { format } from "date-fns";
import ShowChart from "../../../../Shared/ShowChart/ShowChart";
import ProgressSection from "../../../../Shared/ProgressSection/ProgressSection";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";

const FatMass = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [fatMass, setFatMass] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metricsValue, setMetricsValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Add New Metrics-------
  const addNewMetrics = (fatMass) => {
    const metrics = {
      fatMass: [
        {
          date: fatMass?.date,
          measurement: {
            value: fatMass?.metrics,
            unit: "kg",
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
        // console.log(res?.data);
        toast.success(res?.data?.massage);
        setRefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  // Update Existing Metrics--------
  const updateMetrics = (updateMetrics) => {
    console.log("FatMass:", updateMetrics);
  };

  // Get All metrics----------------
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
        setMetricsValue(res?.data?.data[0]?.fatMass);
        const metricsData = res?.data?.data;
        const extractedFatMass = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.fatMass && Array.isArray(data.fatMass)) {
              data.fatMass.forEach((bodyfatMass) => {
                if (
                  bodyfatMass.date &&
                  bodyfatMass.measurement &&
                  bodyfatMass.measurement.value
                ) {
                  const datePortion = bodyfatMass.date.split("T")[0];
                  extractedFatMass.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodyfatMass.measurement.value,
                  });
                }
              });
            }
          });
          setFatMass(extractedFatMass);
          setLoading(false);
        } else {
          setFatMass([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, refresh]);

  const dates = [1, 2, 3, 4, 5];

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
    //             <h2 className="text-xl font-semibold">Fat Mass</h2>
    //             <h2>1M / 2M / 6M /1Y</h2>
    //           </div>
    //           <div>
    //             <h2 className="text-3xl font-semibold text-green-400">20%</h2>
    //             <h2>17.7%</h2>
    //           </div>
    //         </div>

    //         <div className="px-8 pb-10">
    //           {
    //             fatMass?.length ?
    //               <ShowChart data={fatMass} />
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
    //       </div>

    //       <ProgressSection />
    //     </div>
    //   </div>
    // </div>
    <div>
      <MetricsSharePage
        title={"Fat Mass"}
        loading={loading}
        metrics={fatMass}
        metricsValue={metricsValue}
        addNewMetrics={addNewMetrics}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default FatMass;
