const express = require("express");

const {
  predictDelivery,
  getDashboardStats,
  getPredictionHistory,
  getAnalytics
} = require("../controllers/predictionController");

const router = express.Router();

router.post("/predict", predictDelivery);

router.get("/dashboard", getDashboardStats);
router.get("/history", getPredictionHistory);
router.get("/analytics", getAnalytics);
module.exports = router;