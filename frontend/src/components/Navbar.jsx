import { Link } from "react-router-dom";
function Navbar() {
  return (
    <nav className="bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 backdrop-blur-lg border-b border-white/10">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">

        <Link to={"/"} className="text-2xl font-bold text-white">
          DeliveryAI
        </Link>

        <div className="flex gap-6 text-white">
          <Link to="/" className="hidden md:flex">Dashboard</Link>
          <Link to="/history">History</Link>
          <Link to="/analytics">Analytics</Link>
        </div>

      </div>
    </nav>
  );
}

export default Navbar;