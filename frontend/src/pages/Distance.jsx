import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function Distance() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } = useContext(PredictionContext);

  const [distance, setDistance] = useState(predictionData.Distance_km);
  const [error, setError] = useState("");

  const nextPage = () => {
    if (!distance) {
      setError("Distance is required");
      return;
    }

    if (Number(distance) <= 0) {
      setError("Distance must be greater than 0");
      return;
    }

    setError("");

    setPredictionData({
      ...predictionData,
      Distance_km: distance,
    });

    navigate("/predict/weather");
  };

  return (
    <WizardLayout title="Enter Distance" step={1} progress={14}>
      <div className="space-y-2">
        <input
          type="number"
          placeholder="Distance in KM"
          value={distance}
          onChange={(e) => {
            setDistance(e.target.value);
            setError("");
          }}
          className={`
            w-full
            p-4
            rounded-xl
            bg-white/10
            text-white
            border
            ${
              error
                ? "border-red-500"
                : "border-white/20"
            }
            focus:outline-none
            focus:ring-2
            focus:ring-purple-500
          `}
        />

        {error && (
          <p className="text-red-400 text-sm">
            {error}
          </p>
        )}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={() => navigate("/")}
          className="
            px-6 py-3
            bg-blue-400
            hover:bg-blue-500
            rounded-xl
            text-white
            transition
          "
        >
          Back
        </button>

        <button
          onClick={nextPage}
          className="
            px-6 py-3
            bg-purple-600
            hover:bg-purple-700
            rounded-xl
            text-white
            transition
          "
        >
          Next
        </button>
      </div>
    </WizardLayout>
  );
}

export default Distance;