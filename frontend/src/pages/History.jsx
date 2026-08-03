import { useEffect, useState } from "react";
import axios from "axios";
const API_URL = import.meta.env.VITE_API_URL;

function History() {

  const [predictions, setPredictions] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHistory();
  }, []);

  const fetchHistory = async () => {
    try {

      const response = await axios.get(
        `${API_URL}/api/history`
      );

      setPredictions(
        response.data.predictions
      );

    } catch (error) {

      console.error(error);

    } finally {

      setLoading(false);

    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-slate-950 text-white text-2xl">
        Loading History...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 p-8">

      <div className="max-w-7xl mx-auto">

        <h1 className="text-4xl font-bold text-white mb-8">
          Prediction History
        </h1>

        <div className="overflow-x-auto bg-white/10 backdrop-blur-lg rounded-2xl border border-white/10">

          <table className="w-full text-white">

            <thead>
              <tr className="border-b border-white/10">

                <th className="p-4 text-left">
                  Order ID
                </th>

                <th className="p-4 text-left">
                  Distance
                </th>

                <th className="p-4 text-left">
                  Weather
                </th>

                <th className="p-4 text-left">
                  Traffic
                </th>

                <th className="p-4 text-left">
                  Vehicle
                </th>

                <th className="p-4 text-left">
                  Predicted Time
                </th>

                <th className="p-4 text-left">
                  Date
                </th>

              </tr>
            </thead>

            <tbody>

              {predictions.length === 0 ? (
                <tr>
                  <td
                    colSpan="7"
                    className="p-6 text-center text-gray-400"
                  >
                    No Predictions Found
                  </td>
                </tr>
              ) : (
                predictions.map((item) => (
                  <tr
                    key={item._id}
                    className="border-b border-white/10 hover:bg-white/5"
                  >

                    <td className="p-4">
                      {item.orderId}
                    </td>

                    <td className="p-4">
                      {item.distance} km
                    </td>

                    <td className="p-4">
                      {item.weather}
                    </td>

                    <td className="p-4">
                      {item.traffic}
                    </td>

                    <td className="p-4">
                      {item.vehicleType}
                    </td>

                    <td className="p-4 font-bold text-cyan-400">
                      {item.predictedTime} min
                    </td>

                    <td className="p-4">
                      {new Date(
                        item.createdAt
                      ).toLocaleDateString()}
                    </td>

                  </tr>
                ))
              )}

            </tbody>

          </table>

        </div>

      </div>

    </div>
  );
}

export default History;