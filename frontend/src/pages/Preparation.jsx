import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function Preparation() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } =
    useContext(PredictionContext);

  const [prepTime, setPrepTime] = useState(
    predictionData.Preparation_Time_min
  );

  const handleNext = () => {
    setPredictionData({
      ...predictionData,
      Preparation_Time_min: prepTime,
    });

    navigate("/predict/experience");
  };

  return (
    <WizardLayout
      title="Preparation Time"
      step={6}
      progress={85}
    >
      <input
        type="number"
        value={prepTime}
        onChange={(e) =>
          setPrepTime(e.target.value)
        }
        placeholder="Minutes"
        className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20"
      />

      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-purple-600 rounded-xl text-white"
      >
        Next
      </button>
    </WizardLayout>
  );
}

export default Preparation;