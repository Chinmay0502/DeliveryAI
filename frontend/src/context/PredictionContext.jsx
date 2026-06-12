import { createContext, useState } from "react";

export const PredictionContext = createContext();

export const PredictionProvider = ({ children }) => {

  const [predictionData, setPredictionData] = useState({
    Order_ID: Math.floor(Math.random() * 100000),

    Distance_km: "",
    Weather: "",
    Traffic_Level: "",
    Time_of_Day: "",
    Vehicle_Type: "",
    Preparation_Time_min: "",
    Courier_Experience_yrs: "",

    predictedTime: null
  });

  return (
    <PredictionContext.Provider
      value={{
        predictionData,
        setPredictionData
      }}
    >
      {children}
    </PredictionContext.Provider>
  );
};