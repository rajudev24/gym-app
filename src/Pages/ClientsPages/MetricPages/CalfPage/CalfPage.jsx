/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const calfPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [calf, setcalf] = useState([]);
  const [metricsValue, setMetricsValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Add New Metrics-------
  const addNewMetrics = (calfMetrics) => {
    const metrics = {
      calf: [
        {
          date: calfMetrics?.date,
          measurement: {
            value: calfMetrics?.metrics,
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
    console.log("Calf:", updateMetrics);
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
        setMetricsValue(res?.data?.data[0]?.calf);
        const metricsData = res?.data?.data;
        const extractedcalf = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.calf && Array.isArray(data.calf)) {
              data.calf.forEach((bodycalfEntry) => {
                if (
                  bodycalfEntry.date &&
                  bodycalfEntry.measurement &&
                  bodycalfEntry.measurement.value
                ) {
                  const datePortion = bodycalfEntry.date.split("T")[0];
                  extractedcalf.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodycalfEntry.measurement.value,
                  });
                }
              });
            }
          });
          setcalf(extractedcalf);
          setLoading(false);
        } else {
          setcalf([]);
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
        title={"calf"}
        loading={loading}
        metrics={calf}
        metricsValue={metricsValue}
        addNewMetrics={addNewMetrics}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default calfPage;
