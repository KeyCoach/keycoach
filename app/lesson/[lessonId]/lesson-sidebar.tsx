import React, { useState } from "react";

export default function Sidebar({lessonId, currentLevel}: {lessonId: string, currentLevel: number}) {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const levels = Array.from({ length: 10 }, (_, i) => i + 1);

  return (
    <aside
      className={`${
        isCollapsed ? "w-16" : "w-64"
      } h-full dark:bg-slate-950 dark:text-slate-50 bg-slate-50 text-slate-950 flex flex-col shadow-lg border-r border-gray-700 transition-width duration-300`}
      id={`lesson-sidebar-${lessonId}`}
    >
      <div className="flex items-center justify-between p-4 border-b border-gray-700">
        <h2 className={`text-xl font-bold ${isCollapsed ? "hidden" : "block"}`}>
          Lesson <span className="dark:text-amber-200 text-amber-700 text-clip">{lessonId}</span> Progress
        </h2>
        <button
          className="w-8 h-8 bg-blue-500 dark:text-slate-50 text-slate-950 rounded-full flex items-center justify-center shadow-md hover:bg-blue-400"
          onClick={() => setIsCollapsed(!isCollapsed)}
        >
          {isCollapsed ? ">" : "<"}
        </button>
      </div>
      <ul className="flex-1 overflow-y-auto">
        {levels.map((level) => (
          <li
            key={level}
            className={`p-4 border-b border-gray-700 
              ${level === currentLevel ? "dark:bg-cerulean-300 bg-cerulean-600 dark:text-slate-950 text-slate-50 font-bold" : "hover:bg-gray-700"}
            `}
          >
            {isCollapsed ? level : `Level ${level}`}
          </li>
        ))}
      </ul>
    </aside>
  );
}
