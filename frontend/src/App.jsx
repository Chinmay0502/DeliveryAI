import { BrowserRouter, Routes, Route } from "react-router-dom";

import Navbar from "./components/Navbar";

import Dashboard from "./pages/Dashboard";
import Distance from "./pages/Distance";
import Weather from "./pages/Weather";
import Traffic from "./pages/Traffic";
import TimeOfDay from "./pages/TimeOfDay";
import Vehicle from "./pages/Vehicle";
import Preparation from "./pages/Preparation";
import Experience from "./pages/Experience";
import Result from "./pages/Result";
import History from "./pages/History";
import Analytics from "./pages/Analytic";

function App() {
  return (
    <BrowserRouter>
      <Navbar />

      <Routes>
        <Route path="/" element={<Dashboard />} />
        <Route path="/predict/distance" element={<Distance />} />
        <Route path="/predict/weather" element={<Weather />} />
        <Route path="/predict/traffic" element={<Traffic />} />
        <Route path="/predict/time" element={<TimeOfDay />} />
        <Route path="/predict/vehicle" element={<Vehicle />} />
        <Route path="/predict/preparation" element={<Preparation />} />
        <Route path="/predict/experience" element={<Experience />} />
        <Route path="/result" element={<Result />} />
        <Route path="/history" element={<History />} />
        <Route path="/analytics" element={<Analytics />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;