import { useEffect, useState } from "react";
import { Icon } from "@/components/icon";
import { useLessonContext } from "./lesson-context";
import { useHandTracking } from "@/app/hand-track-context";

function formatNumber(num: number, percentage = false) {
  if (Number.isNaN(num)) return "-";
  if (percentage) return num.toFixed(0) + "%";

  return num.toFixed(0);
}

let statsLen = 0;

export default function StatsPanel() {
  const { avgNetWpm, avgFingerAcc, avgAcc, stats } = useLessonContext();
  const [isExpanded, setIsExpanded] = useState(Object.keys(stats).length > 0);
  const wpm = formatNumber(avgNetWpm);
  const fingerAcc = formatNumber(avgFingerAcc, true);
  const acc = formatNumber(avgAcc, true);
  const { cameraActivated } = useHandTracking();

  useEffect(() => {
    statsLen = Object.keys(stats).length;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (statsLen !== Object.keys(stats).length) {
      setIsExpanded(true);
    }
  }, [stats]);

  return (
    <section className="w-contain max-w-md flex-1 -translate-y-3/4 text-nowrap rounded-lg bg-slate-100 p-4 text-slate-950 shadow-md shadow-slate-200 dark:bg-slate-800 dark:text-slate-50 dark:shadow-slate-600">
      <div
        className="flex cursor-pointer items-center justify-between gap-6 stroke-black"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">Lesson Stats</h2>
        <Icon
          src={isExpanded ? "/icons/chevron-down.svg" : "/icons/chevron-up.svg"}
          alt="chevron icon"
          w={16}
          h={16}
          className="duration-250 ease rotate-180 transition-transform dark:invert"
        />
      </div>
      <div
        className={`mt-4 overflow-hidden transition-[max-height] duration-500 ease-in-out ${isExpanded ? "max-h-96" : "max-h-0"}`}
      >
        {isExpanded && (
          <div>
            <div className="mb-2">
              <p className="text-gray-700">Words Per Minute (WPM):</p>
              <p className="text-gray-900 text-2xl font-bold">{wpm}</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-700">Key Accuracy:</p>
              <p className="text-gray-900 text-2xl font-bold">{acc}</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-700">Finger Accuracy:</p>
              <p className="text-gray-900 text-2xl font-bold">
                {cameraActivated ? fingerAcc : "-"}
              </p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
