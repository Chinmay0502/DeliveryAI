const axios = require("axios");
const Prediction = require("../models/Prediction");

// Prediction API
const predictDelivery = async (req, res) => {
  try {
    const flaskResponse = await axios.post(
      "http://127.0.0.1:5000/predict",
      req.body
    );

    const prediction =
      flaskResponse.data.predicted_delivery_time;

    const savedPrediction =
      await Prediction.create({
        orderId: req.body.Order_ID,
        distance: req.body.Distance_km,
        weather: req.body.Weather,
        traffic: req.body.Traffic_Level,
        timeOfDay: req.body.Time_of_Day,
        vehicleType: req.body.Vehicle_Type,
        preparationTime:
          req.body.Preparation_Time_min,
        experience:
          req.body.Courier_Experience_yrs,
        predictedTime: prediction
      });

    res.json({
      success: true,
      prediction,
      savedPrediction
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

// Dashboard Statistics API
const getDashboardStats = async (req, res) => {
  try {

    const totalPredictions =
      await Prediction.countDocuments();

    const averagePrediction =
      await Prediction.aggregate([
        {
          $group: {
            _id: null,
            averageTime: {
              $avg: "$predictedTime"
            }
          }
        }
      ]);

    const averageTime =
      averagePrediction.length > 0
        ? averagePrediction[0].averageTime.toFixed(2)
        : 0;

    const recentPredictions =
      await Prediction.find()
        .sort({ createdAt: -1 })
        .limit(5);

    res.json({
      success: true,
      totalPredictions,
      averageTime,
      modelAccuracy: 82,
      recentPredictions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

const getPredictionHistory = async (req, res) => {
  try {

    const predictions = await Prediction.find()
      .sort({ createdAt: -1 });

    res.json({
      success: true,
      predictions
    });

  } catch (error) {

    res.status(500).json({
      success: false,
      error: error.message
    });

  }
};

const getAnalytics = async (req, res) => {
  try {
    const predictions = await Prediction.find();

    res.json({
      success: true,
      predictions
    });

  } catch (error) {
    res.status(500).json({
      success: false,
      error: error.message
    });
  }
};

module.exports = {
  predictDelivery,
  getDashboardStats,
  getPredictionHistory,
  getAnalytics
};