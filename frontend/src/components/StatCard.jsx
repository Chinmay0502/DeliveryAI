function StatCard({ title, value }) {
  return (
    <div
      className="
      bg-white/10
      backdrop-blur-lg
      border border-white/10
      rounded-2xl
      p-6
      shadow-lg
    "
    >
      <h3 className="text-gray-300">
        {title}
      </h3>

      <p className="text-3xl font-bold text-white mt-3">
        {value}
      </p>
    </div>
  );
}

export default StatCard;