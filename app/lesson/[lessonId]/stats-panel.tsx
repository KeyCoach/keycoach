import { useState } from "react";
import { Icon } from "@/components/icon";

export default function StatsPanel({
  lessonId,
  currentLevel,
}: {
  lessonId?: string;
  currentLevel?: number;
}) {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section className="dark:border-gray-300 w-contain absolute right-0 top-1/2 mr-8 max-w-md flex-1 text-nowrap rounded-lg border border-slate-950 bg-slate-50 p-4 shadow-lg dark:border-slate-50 dark:bg-slate-950">
      <div
        className="flex cursor-pointer items-center gap-6 justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h2 className="text-xl font-bold">Lesson Stats</h2>
        <Icon
          src={isExpanded ? "/icons/chevron-down.svg" : "/icons/chevron-up.svg"}
          alt="chevron icon"
          w={"1rem"}
          h={"1rem"}
          className="duration-250 ease transition-transform rotate-180"
        />
      </div>
      <div
        className={`duration-500 mt-4 overflow-hidden transition-[max-height] ease-in-out ${isExpanded ? "max-h-96" : "max-h-0"}`}
      >
        {isExpanded && (
          <div>
            <div className="mb-2">
              <p className="text-gray-700">Words Per Minute (WPM):</p>
              <p className="text-gray-900 text-2xl font-bold">75</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-700">Key Accuracy:</p>
              <p className="text-gray-900 text-2xl font-bold">98%</p>
            </div>
            <div className="mb-2">
              <p className="text-gray-700">Finger Accuracy:</p>
              <p className="text-gray-900 text-2xl font-bold">95%</p>
            </div>
          </div>
        )}
      </div>
    </section>
  );
}
