"use client";

import { useState } from "react";
import { Link } from "@/components/link";
import { Card, H1, H3, Icon } from "@/components";
import { lessonPlans } from "./lesson-plans";
import { LessonTableRow } from "@/components/lesson-page/lesson-table-row";

const lessons = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z",
];

export default function LessonDashboard() {
  const [screenView, setScreenView] = useState("grid");

  return (
    <div className="min-h-page mt-16 mb-12 flex w-full items-center bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl w-full text-center text-slate-900 dark:text-slate-50">
        <H1 className="mb-10">Lesson Dashboard</H1>
        <H3 className="mb-2 text-lg">
          Choose from our typing lessons below to improve your skills:
        </H3>

        <div className="w-full px-4">
          <div className="flex justify-end w-full mb-2">
            <div className="flex rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
              <button
                onClick={() => setScreenView("grid")}
                className={`flex items-center justify-center rounded-md p-2 transition-colors ${screenView === "grid"
                  ? "bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                <Icon src="/icons/grid.svg" alt="Grid view" w={24} h={24} />
              </button>
              <button
                onClick={() => setScreenView("list")}
                className={`flex items-center justify-center rounded-md p-2 transition-colors ${screenView === "list"
                  ? "bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                <Icon src="/icons/list.svg" alt="List view" w={24} h={24} />
              </button>
              {/* TODO: keyboard view later */}
              {/* <button
                onClick={() => setScreenView("keyboard")}
                className={`flex items-center justify-center rounded-md p-2 transition-colors ${screenView === "keyboard"
                  ? "bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white"
                  : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                <Icon src="/icons/keyboard.svg" alt="Keyboard view" w={24} h={24} />
              </button> */}
            </div>
          </div>

          {screenView === "grid" ? (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {lessons.map((lesson) => {
                const lessonPlan = lessonPlans[lesson];
                const link = lessonPlan ? `/lesson/${lesson}` : "/lesson";
                return (
                  <Link key={lesson} className="text-slate-900 hover:no-underline" href={link}>
                    <Card
                      title={`Lesson ${lesson.toUpperCase()}`}
                      subtitle={`Learn essential typing skills about the ${lesson.toLocaleUpperCase()} key`}
                      badgeIcon="remove"
                      badgeTheme="amber"
                      buttonText="Start Lesson"
                    />
                  </Link>
                );
              })}
            </div>
          ) : (
            <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Key
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300 w-full">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Badge
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                  {lessons.map((lesson) => {
                    const lessonPlan = lessonPlans[lesson];
                    const link = lessonPlan ? `/lesson/${lesson}` : "/lesson";
                    return <LessonTableRow key={lesson} lesson={lesson} link={link} />;
                  })}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}