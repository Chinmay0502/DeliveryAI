import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import WizardLayout from "../components/WizardLayout";
import { PredictionContext } from "../context/PredictionContext";

function Vehicle() {
  const navigate = useNavigate();

  const { predictionData, setPredictionData } =
    useContext(PredictionContext);

  const handleSelect = (vehicle) => {
    setPredictionData({
      ...predictionData,
      Vehicle_Type: vehicle,
    });

    navigate("/predict/preparation");
  };

  const vehicles = [
    "Bike",
    "Car",
    "Scooter",
  ];

  return (
    <WizardLayout
      title="Vehicle Type"
      step={5}
      progress={71}
    >
      <div className="grid gap-4">
        {vehicles.map((vehicle) => (
          <button
            key={vehicle}
            onClick={() => handleSelect(vehicle)}
            className="p-4 rounded-xl bg-white/10 text-white border border-white/20 hover:bg-purple-600 transition"
          >
            {vehicle}
          </button>
        ))}
      </div>
    </WizardLayout>
  );
}

export default Vehicle;