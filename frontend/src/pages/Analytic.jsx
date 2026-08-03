import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

import {
  BarChart,
  Bar,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  CartesianGrid,
  Legend,
  LineChart,
  Line,
} from "recharts";

function Analytic() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  const COLORS = [
    "#8B5CF6",
    "#06B6D4",
    "#10B981",
    "#F59E0B",
    "#EF4444",
  ];

  useEffect(() => {
    fetchAnalytics();
  }, []);

  const fetchAnalytics = async () => {
    try {
      const response = await axios.get(
        `${API_URL}/api/analytics`
      );

      setData(response.data.predictions);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const weatherData = [
    {
      name: "Clear",
      value: data.filter(
        (item) => item.weather === "Clear"
      ).length,
    },
    {
      name: "Rainy",
      value: data.filter(
        (item) => item.weather === "Rainy"
      ).length,
    },
    {
      name: "Foggy",
      value: data.filter(
        (item) => item.weather === "Foggy"
      ).length,
    },
    {
      name: "Snowy",
      value: data.filter(
        (item) => item.weather === "Snowy"
      ).length,
    },
    {
      name: "Windy",
      value: data.filter(
        (item) => item.weather === "Windy"
      ).length,
    },
  ];

  const distanceData = data.map((item) => ({
    distance: item.distance,
    predictedTime: item.predictedTime,
  }));

  const vehicleData = [
    {
      name: "Bike",
      count: data.filter(
        (item) => item.vehicleType === "Bike"
      ).length,
    },
    {
      name: "Car",
      count: data.filter(
        (item) => item.vehicleType === "Car"
      ).length,
    },
    {
      name: "Scooter",
      count: data.filter(
        (item) => item.vehicleType === "Scooter"
      ).length,
    },
  ];

  const averageTime = data.length
    ? (
        data.reduce(
          (acc, item) => acc + item.predictedTime,
          0
        ) / data.length
      ).toFixed(2)
    : 0;

  const maxTime = data.length
    ? Math.max(
        ...data.map(
          (item) => item.predictedTime
        )
      )
    : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-950 text-white text-2xl">
        Loading Analytics...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-8">
      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">
          Analytics Dashboard
        </h1>

        {/* Statistics Cards */}
        <div className="grid md:grid-cols-4 gap-6 mb-10">

          <div className="bg-purple-600 p-6 rounded-2xl shadow-lg">
            <h3 className="text-white text-sm">
              Total Predictions
            </h3>
            <p className="text-3xl font-bold text-white">
              {data.length}
            </p>
          </div>

          <div className="bg-cyan-600 p-6 rounded-2xl shadow-lg">
            <h3 className="text-white text-sm">
              Average Time
            </h3>
            <p className="text-3xl font-bold text-white">
              {averageTime} min
            </p>
          </div>

          <div className="bg-green-600 p-6 rounded-2xl shadow-lg">
            <h3 className="text-white text-sm">
              Longest Delivery
            </h3>
            <p className="text-3xl font-bold text-white">
              {maxTime} min
            </p>
          </div>

          <div className="bg-yellow-500 p-6 rounded-2xl shadow-lg">
            <h3 className="text-white text-sm">
              Model Accuracy
            </h3>
            <p className="text-3xl font-bold text-white">
              82%
            </p>
          </div>

        </div>

        {/* Charts */}
        <div className="grid lg:grid-cols-2 gap-8">

          {/* Line Chart */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">

            <h2 className="text-xl font-bold text-white mb-2">
              Distance vs Delivery Time
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Relationship between distance and
              predicted delivery duration.
            </p>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <LineChart data={distanceData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#475569"
                />

                <XAxis
                  dataKey="distance"
                  stroke="#ffffff"
                />

                <YAxis
                  stroke="#ffffff"
                />

                <Tooltip />

                <Legend />

                <Line
                  type="monotone"
                  dataKey="predictedTime"
                  stroke="#06B6D4"
                  strokeWidth={4}
                  dot={{
                    fill: "#8B5CF6",
                    r: 6,
                  }}
                  activeDot={{
                    r: 8,
                  }}
                />
              </LineChart>
            </ResponsiveContainer>

          </div>

          {/* Pie Chart */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">

            <h2 className="text-xl font-bold text-white mb-2">
              Weather Distribution
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Distribution of weather conditions
              used in predictions.
            </p>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <PieChart>
                <Pie
                  data={weatherData}
                  cx="50%"
                  cy="50%"
                  outerRadius={110}
                  dataKey="value"
                  label={({ name, percent }) =>
                    `${name} ${(percent * 100).toFixed(
                      0
                    )}%`
                  }
                >
                  {weatherData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Pie>

                <Tooltip />

                <Legend />
              </PieChart>
            </ResponsiveContainer>

          </div>

          {/* Bar Chart */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10">

            <h2 className="text-xl font-bold text-white mb-2">
              Vehicle Usage
            </h2>

            <p className="text-gray-400 text-sm mb-4">
              Most frequently selected vehicle
              types.
            </p>

            <ResponsiveContainer
              width="100%"
              height={320}
            >
              <BarChart data={vehicleData}>
                <CartesianGrid
                  strokeDasharray="3 3"
                  stroke="#475569"
                />

                <XAxis
                  dataKey="name"
                  stroke="#ffffff"
                />

                <YAxis
                  stroke="#ffffff"
                />

                <Tooltip />

                <Legend />

                <Bar
                  dataKey="count"
                  radius={[10, 10, 0, 0]}
                >
                  {vehicleData.map(
                    (_, index) => (
                      <Cell
                        key={index}
                        fill={
                          COLORS[
                            index %
                              COLORS.length
                          ]
                        }
                      />
                    )
                  )}
                </Bar>
              </BarChart>
            </ResponsiveContainer>

          </div>

          {/* Summary Card */}
          <div className="bg-white/10 backdrop-blur-lg p-6 rounded-2xl border border-white/10 text-white">

            <h2 className="text-2xl font-bold mb-6">
              Analytics Summary
            </h2>

            <div className="space-y-5 text-lg">

              <div className="flex justify-between">
                <span>Total Predictions</span>
                <span className="font-bold">
                  {data.length}
                </span>
              </div>

              <div className="flex justify-between">
                <span>Average Delivery Time</span>
                <span className="font-bold text-cyan-400">
                  {averageTime} min
                </span>
              </div>

              <div className="flex justify-between">
                <span>Longest Delivery</span>
                <span className="font-bold text-yellow-400">
                  {maxTime} min
                </span>
              </div>

              <div className="flex justify-between">
                <span>Model Accuracy</span>
                <span className="font-bold text-green-400">
                  82%
                </span>
              </div>

            </div>

          </div>

        </div>
      </div>
    </div>
  );
}

export default Analytic;