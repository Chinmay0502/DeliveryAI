import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function TimeOfDay() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } =
    useContext(PredictionContext);

  const handleSelect = (time) => {
    setPredictionData({
      ...predictionData,
      Time_of_Day: time,
    });

    navigate("/predict/vehicle");
  };

  const options = [
    "Morning",
    "Afternoon",
    "Evening",
    "Night",
  ];

  return (
    <WizardLayout
      title="Time Of Day"
      step={4}
      progress={57}
    >
      <div className="grid gap-4">
        {options.map((time) => (
          <button
            key={time}
            onClick={() => handleSelect(time)}
            className="p-4 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-purple-600 transition"
          >
            {time}
          </button>
        ))}
      </div>
    </WizardLayout>
  );
}

export default TimeOfDay;