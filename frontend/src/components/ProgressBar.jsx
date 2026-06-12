function ProgressBar({ progress }) {
  return (
    <div className="w-full bg-gray-700 rounded-full h-3">
      <div
        className="
          h-3
          rounded-full
          bg-gradient-to-r
          from-purple-500
          to-cyan-500
        "
        style={{
          width: `${progress}%`
        }}
      />
    </div>
  );
}

export default ProgressBar;