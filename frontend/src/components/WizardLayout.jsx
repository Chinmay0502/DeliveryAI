import ProgressBar from "./ProgressBar";

function WizardLayout({
  title,
  step,
  progress,
  children
}) {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-950 via-indigo-950 to-slate-950 flex justify-center items-center p-6">

      <div
        className="
          bg-white/10
          backdrop-blur-lg
          border border-white/10
          rounded-3xl
          p-8
          w-full
          max-w-2xl
        "
      >

        <p className="text-gray-300 mb-2">
          Step {step} of 7
        </p>

        <ProgressBar progress={progress} />

        <h1 className="text-3xl text-white font-bold mt-8 mb-8">
          {title}
        </h1>

        {children}

      </div>

    </div>
  );
}

export default WizardLayout;