const mongoose = require("mongoose");

const predictionSchema = new mongoose.Schema(
  {
    orderId: Number,
    distance: Number,
    weather: String,
    traffic: String,
    timeOfDay: String,
    vehicleType: String,
    preparationTime: Number,
    experience: Number,
    predictedTime: Number
  },
  {
    timestamps: true
  }
);

module.exports = mongoose.model(
  "Prediction",
  predictionSchema
);