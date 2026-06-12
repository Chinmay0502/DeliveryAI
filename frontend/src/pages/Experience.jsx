import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function Experience() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } =
    useContext(PredictionContext);

  const [experience, setExperience] = useState(
    predictionData.Courier_Experience_yrs
  );

  const handleNext = () => {
    setPredictionData({
      ...predictionData,
      Courier_Experience_yrs: experience,
    });

    navigate("/result");
  };

  return (
    <WizardLayout
      title="Courier Experience"
      step={7}
      progress={100}
    >
      <input
        type="number"
        value={experience}
        onChange={(e) =>
          setExperience(e.target.value)
        }
        placeholder="Years"
        className="w-full p-4 rounded-xl bg-white/10 text-white border border-white/20"
      />

      <button
        onClick={handleNext}
        className="mt-6 px-6 py-3 bg-purple-600 rounded-xl text-white"
      >
        Predict
      </button>
    </WizardLayout>
  );
}

export default Experience;