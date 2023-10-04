/* eslint-disable no-unused-vars */
import React, { useState, useEffect, useContext } from "react";
import MetricsSharePage from "../MetricsSharePage/MetricsSharePage";
import { format } from "date-fns";
import { useParams } from "react-router-dom";
import axios from "axios";
import { toast } from "react-hot-toast";
import { AuthContext } from "../../../../Context/AuthProvider/AuthProvider";

const BmiPage = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [loading, setLoading] = useState(true);
  const [Bmi, setBmi] = useState([]);
  const [metricsValue, setMetricsValue] = useState([]);
  const [refresh, setRefresh] = useState(false);

  // Add New Metrics-------
  const addNewMetrics = (BMImetric) => {
    const metrics = {
      bmi: [
        {
          date: BMImetric?.date,
          measurement: {
            value: BMImetric?.metrics,
            unit: " ",
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
    console.log("BMI:", updateMetrics);
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
        setMetricsValue(res?.data?.data[0]?.bmi);
        const metricsData = res?.data?.data;
        const extractedBmi = [];
        if (metricsData && metricsData.length > 0) {
          metricsData.forEach((data) => {
            if (data.bmi && Array.isArray(data.bmi)) {
              data.bmi.forEach((bodyBmiEntry) => {
                if (
                  bodyBmiEntry.date &&
                  bodyBmiEntry.measurement &&
                  bodyBmiEntry.measurement.value
                ) {
                  const datePortion = bodyBmiEntry.date.split("T")[0];
                  extractedBmi.push({
                    date: format(new Date(datePortion), "LLL, dd"),
                    value: bodyBmiEntry.measurement.value,
                  });
                }
              });
            }
          });
          setBmi(extractedBmi);
          setLoading(false);
        } else {
          setBmi([]);
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
        title={"BMI"}
        loading={loading}
        metrics={Bmi}
        metricsValue={metricsValue}
        addNewMetrics={addNewMetrics}
        updateMetrics={updateMetrics}
      />
    </div>
  );
};

export default BmiPage;
