import { useState } from "react";
import { useLessonContext } from "./lesson-context";
import { Icon } from "@/components";

export default function Sidebar() {
  const { goToStep, lessonPlan, currentStepIndex, lessonId } = useLessonContext();
  const [isCollapsed, setIsCollapsed] = useState(false);

  const levels = lessonPlan.steps;

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-fit"
      } transition-width h-contain flex -translate-y-1/2 transform flex-col gap-2 text-nowrap rounded-lg bg-slate-100 text-slate-950 shadow-md shadow-slate-200 duration-300 dark:bg-slate-950 dark:text-slate-100 dark:shadow-slate-600`}
      id={`lesson-sidebar-${lessonId}`}
    >
      <div className="flex items-center justify-between rounded-t-lg p-4 dark:bg-slate-900">
        <h2 className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}>Lesson Progress</h2>
        <button
          className={`${isCollapsed ? "" : "ml-4"} flex h-8 w-8 items-center justify-center rounded-full bg-cerulean-500 text-slate-950 shadow-md hover:bg-cerulean-400 dark:text-slate-50`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? (
            <Icon
              src="/icons/chevron-right.svg"
              alt="chevron icon"
              w={16}
              h={16}
              className="dark:invert"
            />
          ) : (
            <Icon
              src="/icons/chevron-left.svg"
              alt="chevron icon"
              w={16}
              h={16}
              className="dark:invert"
            />
          )}
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {levels.map((level, i) => {
          const isLastLevel = level === levels[levels.length - 1];
          const isCurrentLevel = levels.indexOf(level) === currentStepIndex;
          return (
            <li
              key={level.id}
              className={`${isCollapsed && "text-center"} ${isLastLevel ? "rounded-lg" : ""} p-4 ${isCurrentLevel ? "bg-cerulean-600 font-bold text-slate-100 dark:bg-cerulean-300 dark:text-slate-950" : "hover:bg-gray-200 dark:hover:bg-gray-700 cursor-pointer hover:bg-slate-200 dark:bg-slate-900 dark:hover:bg-slate-700"} border border-slate-50 dark:border-slate-950`}
              onClick={() => goToStep(i)}
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
