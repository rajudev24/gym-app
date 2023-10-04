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
import { format } from "date-fns";
import ShowChart from "../../../../Shared/ShowChart/ShowChart";
import ProgressSection from "../../../../Shared/ProgressSection/ProgressSection";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const SkeletalMuscleMass = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [muscleMass, setmuscleMass] = useState([]);
  const [loading, setLoading] = useState(true);
  const [metricsValue, setMetricsValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Add New Metrics-------
  const addNewMetrics = (skeletalMass) => {
    const metrics = {
      skeletalMuscleMass: [
        {
          date: skeletalMass?.date,
          measurement: {
            value: skeletalMass?.metrics,
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
    console.log("SkeletalMuscle:", updateMetrics);
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
        setMetricsValue(res?.data?.data[0]?.skeletalMuscleMass);
        const metricsData = res?.data?.data;
        const extractedMuscleMass = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (
              data.skeletalMuscleMass &&
              Array.isArray(data.skeletalMuscleMass)
            ) {
              data.skeletalMuscleMass.forEach((bodymuscleMass) => {
                if (
                  bodymuscleMass.date &&
                  bodymuscleMass.measurement &&
                  bodymuscleMass.measurement.value
                ) {
                  const datePortion = bodymuscleMass.date.split("T")[0];
                  extractedMuscleMass.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodymuscleMass.measurement.value,
                  });
                }
              });
            }
          });
          setmuscleMass(extractedMuscleMass);
          setLoading(false);
        } else {
          setmuscleMass([]);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, [id, refresh]);

  const dates = [1, 2, 3, 4, 5];

  return (
    <div>
      <MetricsSharePage
        title={"Skeletal Muscle Mass"}
        loading={loading}
        metrics={muscleMass}
        metricsValue={metricsValue}
        addNewMetrics={addNewMetrics}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default SkeletalMuscleMass;
