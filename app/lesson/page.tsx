"use client";

import { useState } from "react";
import { Link } from "@/components/link";
import { Card, H1, H3, Icon, Button, Badge } from "@/components";
import { lessonPlans } from "./lesson-plans";
import { LessonTableRow } from "@/components/lesson-page/lesson-table-row";

// Regular letter lessons
const letterLessons = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z",
];

// Special lessons (coming soon)
const specialLessons = [
  { id: "shift", title: "Proper Shifting", description: "Learn efficient shifting techniques for uppercase letters and symbols" },
  { id: "numbers", title: "Numbers Row", description: "Master the numbers row for faster numerical data entry" },
  { id: "punctuation", title: "Punctuation", description: "Practice common punctuation marks for professional typing" },
  { id: "symbols", title: "Special Symbols", description: "Learn to type special symbols efficiently" },
  { id: "shortcuts", title: "Common Shortcuts", description: "Essential keyboard shortcuts to improve productivity" },
  { id: "brackets", title: "Brackets & Parentheses", description: "Master brackets and parentheses for coding and formal writing" },
  { id: "combination", title: "Key Combinations", description: "Practice complex key combinations used in professional settings" },
  { id: "speed", title: "Speed Drills", description: "Targeted exercises to increase your typing speed" },
  { id: "accuracy", title: "Accuracy Training", description: "Focus on precision typing with challenging exercises" },
  { id: "coding", title: "Coding Symbols", description: "Specialized practice for programming-related symbols" },
];

export default function LessonDashboard() {
  const [screenView, setScreenView] = useState("grid");
  const [lessonType, setLessonType] = useState("letters");

  return (
    <div className="min-h-page mt-16 mb-12 flex w-full items-center bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl w-full text-center text-slate-900 dark:text-slate-50">
        <H1 className="mb-10">Lesson Dashboard</H1>
        <H3 className="mb-10 text-lg">
          Choose from our typing lessons below to improve your skills:
        </H3>

        <div className="w-full px-4">
          <div className="flex justify-between w-full mb-6">
            {/* Lesson type toggle */}
            <div className="flex rounded-lg bg-slate-200 p-1 dark:bg-slate-800">
              <button
                onClick={() => setLessonType("letters")}
                className={`px-4 py-2 rounded-md transition-colors ${lessonType === "letters"
                    ? "bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                Letter Lessons
              </button>
              <button
                onClick={() => setLessonType("special")}
                className={`px-4 py-2 rounded-md transition-colors ${lessonType === "special"
                    ? "bg-white text-slate-900 shadow-md dark:bg-slate-700 dark:text-white"
                    : "text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-white"
                  }`}
              >
                Special Lessons
              </button>
            </div>

            {/* View toggle */}
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
            </div>
          </div>

          {/* Letter Lessons */}
          {lessonType === "letters" && screenView === "grid" && (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {letterLessons.map((lesson) => {
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
          )}

          {/* Letter Lessons - List View */}
          {lessonType === "letters" && screenView === "list" && (
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
                  {letterLessons.map((lesson) => {
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
                  <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                    <div className="bg-amber-500 text-white px-3 py-1 rounded-full font-semibold transform rotate-12 text-sm">
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
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Lesson
                    </th>
                    <th scope="col" className="px-6 py-3 text-left text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300 w-full">
                      Description
                    </th>
                    <th scope="col" className="px-6 py-3 text-center text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Status
                    </th>
                    <th scope="col" className="px-6 py-3 text-right text-xs font-medium uppercase tracking-wider text-slate-700 dark:text-slate-300">
                      Action
                    </th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200 bg-white dark:divide-slate-700 dark:bg-slate-900">
                  {specialLessons.map((lesson) => (
                    <tr key={lesson.id} className="opacity-60">
                      <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-slate-900 dark:text-white">
                        {lesson.title}
                      </td>
                      <td className="px-6 py-4 whitespace-normal text-sm text-left text-slate-700 dark:text-slate-300">
                        {lesson.description}
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-center">
                        <span className="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-amber-100 text-amber-800 dark:bg-amber-800 dark:text-amber-100">
                          Coming Soon
                        </span>
                      </td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-right">
                        <Button colorTheme="gray" disabled>Coming Soon</Button>
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