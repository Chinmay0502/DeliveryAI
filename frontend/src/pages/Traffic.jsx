import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function Traffic() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } =
    useContext(PredictionContext);

  const handleSelect = (traffic) => {
    setPredictionData({
      ...predictionData,
      Traffic_Level: traffic,
    });

    navigate("/predict/time");
  };

  const trafficOptions = [
    "Low",
    "Medium",
    "High",
  ];

  return (
    <WizardLayout
      title="Traffic Level"
      step={3}
      progress={42}
    >
      <div className="grid gap-4">
        {trafficOptions.map((traffic) => (
          <button
            key={traffic}
            onClick={() => handleSelect(traffic)}
            className="p-4 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-purple-600 transition"
          >
            {traffic}
          </button>
        ))}
      </div>
    </WizardLayout>
  );
}

export default Traffic;