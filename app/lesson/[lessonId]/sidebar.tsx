// app/lesson/[lessonId]/sidebar.tsx
import { useState } from "react";

export default function Sidebar({
  lessonId,
  currentLevel,
}: {
  lessonId: string;
  currentLevel: number;
}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-fit"
      } border-gray-700 transition-width h-contain absolute left-0 top-1/2 ml-8 flex -translate-y-1/2 transform flex-col text-nowrap rounded-lg border bg-slate-50 text-slate-950 shadow-lg duration-300 dark:bg-slate-950 dark:text-slate-50`}
      id={`lesson-sidebar-${lessonId}`}
    >
      <div className="border-gray-700 flex items-center justify-between rounded-t-lg border-b p-4 dark:bg-slate-900">
        <h2 className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}>
          Lesson <span className="text-clip text-amber-700 dark:text-amber-200">{lessonId}</span>{" "}
          Progress
        </h2>
        <button
          className={`${isCollapsed ? "" : "ml-4"} flex h-8 w-8 items-center justify-center rounded-full bg-blue-500 text-slate-950 shadow-md hover:bg-blue-400 dark:text-slate-50`}
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {levels.map((level) => (
          <li
            key={level}
            className={`border-gray-700 ${level < 10 ? "border-b" : "rounded-lg"} p-4 ${level === currentLevel ? "bg-cerulean-600 font-bold text-slate-50 dark:bg-cerulean-300 dark:text-slate-950" : "hover:bg-gray-700 dark:bg-slate-900"} `}
          >
            {isCollapsed ? level : `Level ${level}`}
          </li>
        ))}
      </ul>
    </aside>
  );
}
