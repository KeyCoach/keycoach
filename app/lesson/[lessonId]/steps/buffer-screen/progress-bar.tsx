interface ProgressBarProps {
  totalLevels?: number;
  currentLevel: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalLevels = 7, currentLevel }) => {
  return (
    <div className="mt-4 flex w-full flex-col items-center justify-between shadow-md">
      {/* TODO: implement shadow-bottom-md, defined in tailwind.config.ts */}
      <div className="shadow-md mb-2 flex w-full justify-between rounded-t-xl bg-slate-800 px-6 py-3 shadow-slate-600/50">
        <h2 className="text-lg font-semibold">Lesson Progress</h2>

        <p className="text-md font-medium">
          Part {currentLevel} of {totalLevels}
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mx-4 flex w-full flex-1 gap-0.5">
        {Array.from({ length: totalLevels }, (_, index) => {
          const isActive = index + 1 === currentLevel;
          return (
            <div
              key={index}
              className={`box-border flex-1 py-1 text-center text-sm font-medium ${
                isActive
                  ? "shadow-md bg-slate-300 text-slate-900 shadow-slate-600"
                  : "bg-slate-800 text-slate-300"
              } ${index === 0 ? "rounded-l-lg rounded-t-none" : ""} ${index === totalLevels - 1 ? "rounded-r-lg rounded-t-none" : ""} shadow-md shadow-slate-600`}
            >
              {index + 1}
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default ProgressBar;
