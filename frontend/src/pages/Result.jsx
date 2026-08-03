import { useContext, useEffect, useState } from "react";
import { PredictionContext } from "../context/PredictionContext";
import { useNavigate } from "react-router-dom";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function Result() {
  const navigate = useNavigate();

  const {
    predictionData,
    setPredictionData
  } = useContext(PredictionContext);

  const [loading, setLoading] = useState(true);
  const [prediction, setPrediction] = useState(null);
  const [error, setError] = useState("");

  useEffect(() => {

    const getPrediction = async () => {

      try {

        const response = await axios.post(
          `${API_URL}/api/predict`,
          {
            Order_ID: predictionData.Order_ID,
            Distance_km: Number(
              predictionData.Distance_km
            ),
            Weather: predictionData.Weather,
            Traffic_Level:
              predictionData.Traffic_Level,
            Time_of_Day:
              predictionData.Time_of_Day,
            Vehicle_Type:
              predictionData.Vehicle_Type,
            Preparation_Time_min: Number(
              predictionData.Preparation_Time_min
            ),
            Courier_Experience_yrs: Number(
              predictionData.Courier_Experience_yrs
            )
          }
        );

        setPrediction(
          response.data.prediction
        );

        setPredictionData({
          ...predictionData,
          predictedTime:
            response.data.prediction
        });

      } catch (err) {

        setError(
          err.response?.data?.error ||
          "Prediction Failed"
        );

      } finally {

        setLoading(false);

      }
    };

    getPrediction();

  }, []);

  const handleNewPrediction = () => {

    setPredictionData({
      Order_ID:
        Math.floor(Math.random() * 100000),

      Distance_km: "",
      Weather: "",
      Traffic_Level: "",
      Time_of_Day: "",
      Vehicle_Type: "",
      Preparation_Time_min: "",
      Courier_Experience_yrs: "",
      predictedTime: null
    });

    navigate("/predict/distance");
  };

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white text-3xl">
        Predicting...
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-950 text-red-500 text-2xl">
        {error}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-8 text-white">

      <div className="max-w-4xl mx-auto">

        <div
          className="
          bg-white/10
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-10
          text-center
          mb-8
        "
        >
          <h1 className="text-4xl font-bold mb-4">
            Estimated Delivery Time
          </h1>

          <p
            className="
            text-6xl
            font-extrabold
            bg-gradient-to-r
            from-cyan-400
            to-purple-500
            bg-clip-text
            text-transparent
          "
          >
            {prediction} min
          </p>
        </div>

        <div
          className="
          bg-white/10
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-8
        "
        >
          <h2 className="text-2xl font-bold mb-6">
            Prediction Summary
          </h2>

          <div className="grid md:grid-cols-2 gap-6">

            <div>
              <strong>Distance:</strong>{" "}
              {predictionData.Distance_km} km
            </div>

            <div>
              <strong>Weather:</strong>{" "}
              {predictionData.Weather}
            </div>

            <div>
              <strong>Traffic:</strong>{" "}
              {predictionData.Traffic_Level}
            </div>

            <div>
              <strong>Time:</strong>{" "}
              {predictionData.Time_of_Day}
            </div>

            <div>
              <strong>Vehicle:</strong>{" "}
              {predictionData.Vehicle_Type}
            </div>

            <div>
              <strong>Preparation:</strong>{" "}
              {predictionData.Preparation_Time_min} min
            </div>

            <div>
              <strong>Experience:</strong>{" "}
              {predictionData.Courier_Experience_yrs} yrs
            </div>

          </div>

          <div className="flex gap-4 mt-10">

            <button
              onClick={handleNewPrediction}
              className="
                px-6 py-3
                rounded-xl
                bg-purple-600
                hover:bg-purple-700
              "
            >
              New Prediction
            </button>

            <button
              onClick={() => navigate("/")}
              className="
                px-6 py-3
                rounded-xl
                bg-cyan-600
                hover:bg-cyan-700
              "
            >
              Dashboard
            </button>

          </div>

        </div>

      </div>

    </div>
  );
}

export default Result;