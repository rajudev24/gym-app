/* eslint-disable no-unused-vars */
import React, { useContext, useEffect, useState } from "react";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { useParams } from "react-router-dom";
import axios from "axios";
import { format } from "date-fns";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";

const Hip = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [hip, setHip] = useState([]);
  const [metricsValue, setMetricsValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Add New Metrics-------
  const addNewMetrics = (hipmetrics) => {
    const metrics = {
      hip: [
        {
          date: hipmetrics?.date,
          measurement: {
            value: hipmetrics?.metrics,
            unit: "cm",
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
    console.log("Hip:", updateMetrics);
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
        setMetricsValue(res?.data?.data[0]?.hip);
        const metricsData = res?.data?.data;
        const extractedHip = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.hip && Array.isArray(data.hip)) {
              data.hip.forEach((bodyHipEntry) => {
                if (
                  bodyHipEntry.date &&
                  bodyHipEntry.measurement &&
                  bodyHipEntry.measurement.value
                ) {
                  const datePortion = bodyHipEntry.date.split("T")[0];
                  extractedHip.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodyHipEntry.measurement.value,
                  });
                }
              });
            }
          });
          setHip(extractedHip);
          setLoading(false);
        } else {
          setHip([]);
        }
      })
      .catch((error) => {
        // console.log(error);
        setLoading(false);
      });
  }, [id, refresh]);

  return (
    <div>
      <MetricsSharePage
        title={"Hip"}
        loading={loading}
        metrics={hip}
        metricsValue={metricsValue}
        addNewMetrics={addNewMetrics}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default Hip;
