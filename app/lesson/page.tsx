"use client";

import { useState } from "react";
import { Link } from "@/components/link";
import { Card, H1, H3, Icon, Button } from "@/components";
import { lessonPlans } from "./lesson-plans";
import { LessonTableRow } from "@/components/lesson-page/lesson-table-row";

// Special lessons (coming soon)
const specialLessons = [
  {
    id: "shift",
    title: "Proper Shifting",
    description: "Learn efficient shifting techniques for uppercase letters and symbols",
  },
  {
    id: "numbers",
    title: "Numbers Row",
    description: "Master the numbers row for faster numerical data entry",
  },
  {
    id: "punctuation",
    title: "Punctuation",
    description: "Practice common punctuation marks for professional typing",
  },
  {
    id: "symbols",
    title: "Special Symbols",
    description: "Learn to type special symbols more efficiently",
  },
  {
    id: "shortcuts",
    title: "Common Shortcuts",
    description: "Essential keyboard shortcuts to improve productivity",
  },
  {
    id: "brackets",
    title: "Brackets & Parentheses",
    description: "Master brackets and parentheses for coding and formal writing",
  },
  {
    id: "combination",
    title: "Key Combinations",
    description: "Practice complex key combinations used in professional settings",
  },
  {
    id: "speed",
    title: "Speed Drills",
    description: "Targeted exercises to increase your typing speed",
  },
  {
    id: "accuracy",
    title: "Accuracy Training",
    description: "Focus on precision typing with challenging exercises",
  },
  {
    id: "coding",
    title: "Coding Symbols",
    description: "Specialized practice for programming-related symbols",
  },
];

export default function LessonDashboard() {
  const [screenView, setScreenView] = useState("grid");
  const [lessonType, setLessonType] = useState("letters");

  return (
    <div className="min-h-page mb-12 mt-16 flex w-full items-center bg-white dark:bg-slate-950">
      <div className="mx-auto w-full max-w-7xl text-center text-slate-900 dark:text-slate-50">
        <H1 className="mb-8">Lesson Dashboard</H1>
        <H3 className="mb-2 text-lg">
          Choose from our typing lessons below to improve your skills:
        </H3>

        <div className="w-full px-4">
          <div className="mb-4 flex w-full justify-between rounded-t-lg border-b-2 border-slate-200 dark:border-slate-800">
            {/* Lesson type toggle */}
            <div className="relative flex rounded-lg rounded-b-none bg-slate-200 p-1 dark:bg-slate-800">
              {/* Sliding background element */}
              <div
                className="absolute bottom-1 top-1 z-0 rounded-md bg-white shadow-md transition-all duration-300 ease-in-out dark:bg-slate-700"
                style={{
                  left: lessonType === "letters" ? "4px" : "calc(50% + 4px)",
                  width: "calc(50% - 8px)",
                }}
              />

              <button
                onClick={() => setLessonType("letters")}
                className={`relative z-10 rounded-md px-4 py-2 transition-colors ${
                  lessonType === "letters"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Letter Lessons
              </button>
              <button
                onClick={() => setLessonType("special")}
                className={`relative z-10 rounded-md px-4 py-2 transition-colors ${
                  lessonType === "special"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                Special Lessons
              </button>
            </div>

            {/* View toggle */}
            <div className="relative flex rounded-lg rounded-b-none bg-slate-200 p-1 dark:bg-slate-800">
              {/* Sliding background element */}
              <div
                className="absolute bottom-1 top-1 z-0 rounded-md bg-white shadow-md transition-all duration-300 ease-in-out dark:bg-slate-700"
                style={{
                  left: screenView === "grid" ? "4px" : "calc(50%)",
                  width: "calc(50% - 4px)",
                }}
              />

              {/* Buttons */}
              <button
                onClick={() => setScreenView("grid")}
                className={`relative z-10 flex items-center justify-center rounded-md p-2 transition-colors ${
                  screenView === "grid"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon src="/icons/grid.svg" alt="Grid view" w={24} h={24} className="dark:invert" />
              </button>
              <button
                onClick={() => setScreenView("list")}
                className={`relative z-10 flex items-center justify-center rounded-md p-2 transition-colors ${
                  screenView === "list"
                    ? "text-slate-900 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                }`}
              >
                <Icon src="/icons/list.svg" alt="List view" w={24} h={24} className="dark:invert" />
              </button>
            </div>
          </div>

          {/* Letter Lessons */}
          {lessonType === "letters" && screenView === "grid" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {Object.entries(lessonPlans).map(([lesson, lessonPlan]) => {
                const link = lessonPlan ? `/lesson/${lesson}` : "/lesson";
                return (
                  <Link key={lesson} className="text-slate-900 hover:no-underline" href={link}>
                    <Card
                      title={`Lesson ${lesson.toUpperCase()}`}
                      subtitle={`Learn essential typing skills about the ${lesson.toLocaleUpperCase()} key`}
                      buttonText="Start Lesson"
                      hideBadge
                    />
                  </Link>
                );
              })}
            </div>
          )}

          {/* Letter Lessons - List View */}
          {lessonType === "letters" && screenView === "list" && (
            <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Key
                    </th>
                    <th
                      scope="col"
                      className="w-full px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                  {Object.keys(lessonPlans).map((lesson) => {
                    const lessonPlan = lessonPlans[lesson];
                    const link = lessonPlan ? `/lesson/${lesson}` : "/lesson";
                    return <LessonTableRow key={lesson} lesson={lesson} link={link} />;
                  })}
                </tbody>
              </table>
            </div>
          )}

          {/* Special Lessons - Grid View */}
          {lessonType === "special" && screenView === "grid" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {specialLessons.map((lesson) => (
                <div key={lesson.id} className="relative">
                  <div className="opacity-60">
                    <Card
                      title={lesson.title}
                      subtitle={lesson.description}
                      badgeIcon="more"
                      badgeTheme="cerulean"
                      buttonText="Coming Soon"
                    />
                  </div>
                  <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
                    <div className="rotate-12 transform rounded-full bg-amber-500 px-3 py-1 text-sm font-semibold text-white">
                      Coming Soon
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Special Lessons - List View */}
          {lessonType === "special" && screenView === "list" && (
            <div className="w-full overflow-hidden rounded-lg border border-slate-200 dark:border-slate-700">
              <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                <thead className="bg-slate-100 dark:bg-slate-800">
                  <tr>
                    <th
                      scope="col"
                      className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Lesson
                    </th>
                    <th
                      scope="col"
                      className="w-full px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Description
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Status
                    </th>
                    <th
                      scope="col"
                      className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300"
                    >
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                  {specialLessons.map((lesson) => (
                    <tr key={lesson.id} className="opacity-60">
                      <td className="whitespace-nowrap px-6 py-4 text-sm font-medium text-slate-900 dark:text-white">
                        {lesson.title}
                      </td>
                      <td className="whitespace-normal px-6 py-4 text-left text-sm text-slate-700 dark:text-slate-300">
                        {lesson.description}
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-center">
                        <span className="inline-flex items-center rounded-full bg-amber-100 px-2.5 py-0.5 text-xs font-medium text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                          Coming Soon
                        </span>
                      </td>
                      <td className="whitespace-nowrap px-6 py-4 text-right text-sm">
                        <Button colorTheme="gray" disabled>
                          Coming Soon
                        </Button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
