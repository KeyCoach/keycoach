interface ProgressBarProps {
  totalLevels?: number;
  currentLevel: number;
}

const ProgressBar: React.FC<ProgressBarProps> = ({ totalLevels = 9, currentLevel }) => {
  return (
    <div className="flex w-full flex-col items-center justify-between shadow-md">
      <div className="mb-2 flex w-full justify-between rounded-t-xl bg-slate-800 px-6 py-4 shadow-md shadow-slate-600">
        <h2 className="text-xl font-semibold">Lesson Progress</h2>

        <p className="text-lg font-medium">
          {currentLevel} / {totalLevels} Screens Completed
        </p>
      </div>

      {/* Progress Bar */}
      <div className="mx-4 flex w-full flex-1 gap-2">
        {Array.from({ length: totalLevels }, (_, index) => {
          const isActive = index + 1 === currentLevel;
          return (
            <div
              key={index}
              className={`box-border flex-1 py-2 text-center text-sm font-medium ${
                isActive ? "bg-slate-300 text-slate-900" : "bg-slate-800 text-slate-300"
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
