import { useState } from "react";
import { useLessonContext } from "./lesson-context";

export default function Sidebar() {
  const { lessonPlan, currentStepIndex, lessonId } = useLessonContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const levels = lessonPlan.steps;

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-fit"
      } transition-width h-contain flex -translate-y-1/2 transform flex-col gap-2 text-nowrap rounded-lg bg-slate-50 text-slate-950 shadow-md shadow-slate-200 duration-300 dark:bg-slate-950 dark:text-slate-50 dark:shadow-slate-600`}
      id={`lesson-sidebar-${lessonId}`}
    >
      <div className="flex items-center justify-between rounded-t-lg p-4 dark:bg-slate-900">
        <h2 className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}>Lesson Progress</h2>
        <button
          className={`${isCollapsed ? "" : "ml-4"} flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-slate-950 shadow-md hover:bg-blue-400 dark:text-slate-50`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {levels.map((level, i) => {
          const isLastLevel = level === levels[levels.length - 1];
          const isCurrentLevel = levels.indexOf(level) === currentStepIndex;
          return (
            <li
              key={level.id}
              className={`${isCollapsed && "text-center"} ${isLastLevel ? "rounded-lg" : ""} p-4 ${isCurrentLevel ? "bg-cerulean-600 font-bold text-slate-50 dark:bg-cerulean-300 dark:text-slate-950" : "hover:bg-gray-700 dark:bg-slate-900"} border border-slate-50 dark:border-slate-950`}
            >
              {i + 1}
              {!isCollapsed && ` - ${level.name}`}
            </li>
          );
        })}
      </ul>
    </aside>
  );
}
