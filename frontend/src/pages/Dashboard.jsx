import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

import {
  LineChart,
  Line,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";

import {
  FaTruck,
  FaClock,
  FaBrain,
  FaChartLine,
  FaBolt,
} from "react-icons/fa";

function Dashboard() {
  const navigate = useNavigate();

  const [stats, setStats] = useState({
    totalPredictions: 0,
    averageTime: 0,
    modelAccuracy: 82,
    recentPredictions: [],
  });

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      const response = await axios.get(
        "http://localhost:5001/api/dashboard"
      );

      setStats(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const chartData =
    stats.recentPredictions?.map((item) => ({
      distance: item.distance,
      time: item.predictedTime,
    })) || [];

  const maxTime =
    stats.recentPredictions?.length > 0
      ? Math.max(
          ...stats.recentPredictions.map(
            (item) => item.predictedTime
          )
        )
      : 0;

  const minTime =
    stats.recentPredictions?.length > 0
      ? Math.min(
          ...stats.recentPredictions.map(
            (item) => item.predictedTime
          )
        )
      : 0;

  if (loading) {
    return (
      <div className="min-h-screen flex justify-center items-center bg-slate-950">
        <div className="text-white text-2xl font-semibold">
          Loading Dashboard...
        </div>
      </div>
    );
  }

  return (
  <div className="relative min-h-screen overflow-hidden bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950">

    {/* Background Glow */}
    <div className="absolute top-20 left-10 w-72 h-72 bg-purple-500/20 blur-3xl rounded-full"></div>
    <div className="absolute bottom-20 right-10 w-72 h-72 bg-cyan-500/20 blur-3xl rounded-full"></div>

    {/* SECTION 1 - HERO + STATS */}
    <section className="min-h-screen flex flex-col justify-center max-w-7xl mx-auto px-6">

      {/* Hero */}
      <div className="text-center">

        <h1 className="text-5xl md:text-6xl font-extrabold text-white mb-4 mt-10 md:mt-0">
          Food Delivery Time Prediction
        </h1>

        <p className="max-w-3xl mx-auto text-slate-400 text-lg">
          AI-powered delivery time prediction using
          Machine Learning and real-time analytics.
        </p>

        <button
          onClick={() => navigate("/predict/distance")}
          className="
            mt-8
            px-8 py-4
            rounded-2xl
            bg-gradient-to-r
            from-purple-600
            via-indigo-500
            to-cyan-500
            text-white
            font-semibold
            hover:scale-105
            transition
          "
        >
          Start Prediction
        </button>

      </div>

      {/* Colorful Stats Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-6 mt-16">

        <div className="bg-gradient-to-r from-purple-600 to-purple-800 rounded-3xl p-6 shadow-xl">
          <p className="text-purple-100">
            Total Predictions
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            {stats.totalPredictions}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-cyan-500 to-cyan-700 rounded-3xl p-6 shadow-xl">
          <p className="text-cyan-100">
            Average Time
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            {stats.averageTime}
          </h2>
        </div>

        <div className="bg-gradient-to-r from-green-500 to-green-700 rounded-3xl p-6 shadow-xl">
          <p className="text-green-100">
            Model Accuracy
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            82%
          </h2>
        </div>

        <div className="bg-gradient-to-r from-orange-500 to-red-500 rounded-3xl p-6 shadow-xl">
          <p className="text-orange-100">
            Orders
          </p>

          <h2 className="text-5xl font-bold text-white mt-3">
            {stats.totalPredictions}
          </h2>
        </div>

      </div>

      {/* Scroll Indicator */}
      <div className="text-center mt-12 animate-bounce">

        <p className="text-slate-400">
          Scroll Down
        </p>

        <div className="text-4xl text-cyan-400">
          ↓
        </div>

      </div>

    </section>

    {/* SECTION 2 - INSIGHTS + GRAPH */}
    <section className="max-w-7xl mx-auto px-6">

      <div className="grid xl:grid-cols-3 gap-8">

        {/* Quick Insights */}
        <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

          <h2 className="text-2xl font-bold text-white mb-6">
            Quick Insights
          </h2>

          <div className="space-y-4">

            <div className="bg-cyan-500/10 rounded-xl p-4">
              <p className="text-slate-400">
                Fastest Delivery
              </p>

              <h3 className="text-cyan-400 text-2xl font-bold">
                {minTime} min
              </h3>
            </div>

            <div className="bg-yellow-500/10 rounded-xl p-4">
              <p className="text-slate-400">
                Longest Delivery
              </p>

              <h3 className="text-yellow-400 text-2xl font-bold">
                {maxTime} min
              </h3>
            </div>

            <div className="bg-green-500/10 rounded-xl p-4">
              <p className="text-slate-400">
                Algorithm
              </p>

              <h3 className="text-green-400 text-xl font-bold">
                Linear Regression
              </h3>
            </div>

          </div>

        </div>

        {/* Trend Graph */}
        <div className="xl:col-span-2 bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

  <div className="flex items-center justify-between mb-6">

    <div>
      <h2 className="text-2xl font-bold text-white">
        Prediction Trend
      </h2>

      <p className="text-slate-400 mt-1">
        Distance vs Predicted Delivery Time
      </p>
    </div>

    <div className="bg-cyan-500/10 px-4 py-2 rounded-xl">
      <span className="text-cyan-400 font-semibold">
        Live Analytics
      </span>
    </div>

  </div>

  <ResponsiveContainer
    width="100%"
    height={400}
  >
    <LineChart data={chartData}>

      <defs>

        <linearGradient
          id="lineGradient"
          x1="0"
          y1="0"
          x2="1"
          y2="0"
        >
          <stop
            offset="0%"
            stopColor="#8B5CF6"
          />

          <stop
            offset="100%"
            stopColor="#06B6D4"
          />
        </linearGradient>

      </defs>

      <CartesianGrid
        stroke="#334155"
        strokeDasharray="3 3"
      />

      <XAxis
        dataKey="distance"
        stroke="#CBD5E1"
        tick={{
          fill: "#CBD5E1",
          fontSize: 12
        }}
        label={{
          value: "Distance (KM)",
          position: "insideBottom",
          offset: -5,
          fill: "#CBD5E1"
        }}
      />

      <YAxis
        stroke="#CBD5E1"
        tick={{
          fill: "#CBD5E1",
          fontSize: 12
        }}
        label={{
          value: "Time (Min)",
          angle: -90,
          position: "insideLeft",
          fill: "#CBD5E1"
        }}
      />

      <Tooltip
        contentStyle={{
          backgroundColor: "#0F172A",
          border: "1px solid #334155",
          borderRadius: "12px",
          color: "#fff"
        }}
      />

      <Legend />

      <Line
        type="monotone"
        dataKey="time"
        name="Predicted Time"
        stroke="url(#lineGradient)"
        strokeWidth={4}
        dot={{
          fill: "#06B6D4",
          strokeWidth: 2,
          r: 6
        }}
        activeDot={{
          r: 10,
          fill: "#8B5CF6"
        }}
      />

    </LineChart>
  </ResponsiveContainer>

</div>

      </div>

    </section>

    {/* SECTION 3 - RECENT PREDICTIONS */}
    <section className="max-w-7xl mx-auto px-6 py-10">

  <div className="bg-white/10 backdrop-blur-xl border border-white/10 rounded-3xl p-6">

    <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-8">

      <div>
        <h2 className="text-3xl font-bold text-white">
          Recent Predictions
        </h2>

        <p className="text-slate-400 mt-2">
          Latest delivery time predictions generated by users.
        </p>
      </div>

      <div className="mt-4 md:mt-0 bg-cyan-500/10 px-4 py-2 rounded-xl">
        <span className="text-cyan-400 font-semibold">
          {stats.recentPredictions?.length || 0} Records
        </span>
      </div>

    </div>

    {stats.recentPredictions?.length === 0 ? (

      <div className="text-center py-16">

        <div className="text-6xl mb-4">
          📦
        </div>

        <h3 className="text-white text-2xl font-bold">
          No Predictions Yet
        </h3>

        <p className="text-slate-400 mt-2">
          Start predicting delivery times to see records here.
        </p>

      </div>

    ) : (

      <div className="overflow-x-auto">

        <table className="w-full">

          <thead>

            <tr className="border-b border-white/10">

              <th className="text-left p-4 text-cyan-400 font-semibold">
                Order ID
              </th>

              <th className="text-left p-4 text-cyan-400 font-semibold">
                Distance
              </th>

              <th className="text-left p-4 text-cyan-400 font-semibold">
                Weather
              </th>

              <th className="text-left p-4 text-cyan-400 font-semibold">
                Traffic
              </th>

              <th className="text-left p-4 text-cyan-400 font-semibold">
                Vehicle
              </th>

              <th className="text-left p-4 text-cyan-400 font-semibold">
                Predicted Time
              </th>

            </tr>

          </thead>

          <tbody>

            {stats.recentPredictions.map((item) => (

              <tr
                key={item._id}
                className="
                  border-b
                  border-white/5
                  hover:bg-white/5
                  transition
                "
              >

                <td className="p-4 text-white">
                  {item.orderId}
                </td>

                <td className="p-4 text-slate-300">
                  {item.distance} km
                </td>

                <td className="p-4">

                  <span className="
                    px-3 py-1
                    rounded-full
                    bg-blue-500/20
                    text-blue-400
                    text-sm
                  ">
                    {item.weather}
                  </span>

                </td>

                <td className="p-4">

                  <span className="
                    px-3 py-1
                    rounded-full
                    bg-orange-500/20
                    text-orange-400
                    text-sm
                  ">
                    {item.traffic}
                  </span>

                </td>

                <td className="p-4">

                  <span className="
                    px-3 py-1
                    rounded-full
                    bg-purple-500/20
                    text-purple-400
                    text-sm
                  ">
                    {item.vehicleType}
                  </span>

                </td>

                <td className="p-4">

                  <span className="
                    px-4 py-2
                    rounded-xl
                    bg-green-500/20
                    text-green-400
                    font-bold
                  ">
                    {item.predictedTime} min
                  </span>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

    )}

    {/* Summary Cards */}

    <div className="grid md:grid-cols-3 gap-6 mt-8">

      <div className="bg-purple-500/10 rounded-2xl p-5">

        <p className="text-slate-400">
          Total Predictions
        </p>

        <h3 className="text-3xl font-bold text-purple-400 mt-2">
          {stats.totalPredictions}
        </h3>

      </div>

      <div className="bg-cyan-500/10 rounded-2xl p-5">

        <p className="text-slate-400">
          Average Delivery Time
        </p>

        <h3 className="text-3xl font-bold text-cyan-400 mt-2">
          {stats.averageTime} min
        </h3>

      </div>

      <div className="bg-green-500/10 rounded-2xl p-5">

        <p className="text-slate-400">
          Model Accuracy
        </p>

        <h3 className="text-3xl font-bold text-green-400 mt-2">
          82%
        </h3>

      </div>

    </div>

  </div>

</section>

    {/* SECTION 4 - MODEL INFO */}
    <section className="max-w-7xl mx-auto px-6 py-10">

      <div className="bg-gradient-to-r from-purple-600/20 to-cyan-500/20 border border-purple-500/20 rounded-3xl p-8">

        <h2 className="text-3xl font-bold text-white mb-6">
          Machine Learning Model
        </h2>

        <p className="text-slate-300 leading-8">
          This application uses a Linear Regression model
          trained on delivery data including distance,
          weather, traffic level, preparation time,
          courier experience, and vehicle information.
        </p>

        <div className="grid md:grid-cols-3 gap-6 mt-8">

          <div className="bg-cyan-500/10 rounded-2xl p-5">
            <h4 className="text-slate-400">
              Algorithm
            </h4>

            <p className="text-cyan-400 text-xl font-bold">
              Linear Regression
            </p>
          </div>

          <div className="bg-green-500/10 rounded-2xl p-5">
            <h4 className="text-slate-400">
              Accuracy
            </h4>

            <p className="text-green-400 text-xl font-bold">
              82%
            </p>
          </div>

          <div className="bg-purple-500/10 rounded-2xl p-5">
            <h4 className="text-slate-400">
              Features
            </h4>

            <p className="text-purple-400 text-xl font-bold">
              8 Input Variables
            </p>
          </div>

        </div>

      </div>

    </section>

  </div>
);
}

export default Dashboard;