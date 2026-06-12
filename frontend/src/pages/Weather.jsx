import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function Weather() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } = useContext(PredictionContext);

  const handleSelect = (weather) => {
    setPredictionData({
      ...predictionData,
      Weather: weather,
    });

    navigate("/predict/traffic");
  };

  const weatherOptions = ["Clear", "Foggy", "Rainy", "Snowy", "Windy"];

  return (
    <WizardLayout title="Select Weather" step={2} progress={28}>
      {/* <button
        onClick={() => navigate("/")}
        className="
            px-6 py-3
            bg-blue-400
            hover:bg-blue-500
            rounded-xl
            text-white
            transition
            mb-8 
          "
      >
        Back
      </button> */}
      <div className="grid gap-4">
        {weatherOptions.map((weather) => (
          <button
            key={weather}
            onClick={() => handleSelect(weather)}
            className="p-4 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-purple-600 transition"
          >
            {weather}
          </button>
        ))}
      </div>
    </WizardLayout>
  );
}

export default Weather;
