/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import axios from "axios";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";
import { toast } from "react-hot-toast";

const chestPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [chest, setChest] = useState([]);
  const [metricsValue, setMetricsValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Add New Metrics-------
  const addNewMetrics = (chestMetrics) => {
    const metrics = {
      chest: [
        {
          date: chestMetrics?.date,
          measurement: {
            value: chestMetrics?.metrics,
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
    console.log("Chest:", updateMetrics);
  };

  // Get All Metrices----------
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
        setMetricsValue(res?.data?.data[0]?.chest);
        const metricsData = res?.data?.data;
        const extractedchest = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.chest && Array.isArray(data.chest)) {
              data.chest.forEach((bodychestEntry) => {
                if (
                  bodychestEntry.date &&
                  bodychestEntry.measurement &&
                  bodychestEntry.measurement.value
                ) {
                  const datePortion = bodychestEntry.date.split("T")[0];
                  extractedchest.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodychestEntry.measurement.value,
                  });
                }
              });
            }
          });
          setChest(extractedchest);
          setLoading(false);
        } else {
          setChest([]);
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
        title={"chest"}
        loading={loading}
        metrics={chest}
        metricsValue={metricsValue}
        addNewMetrics={addNewMetrics}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default chestPage;
