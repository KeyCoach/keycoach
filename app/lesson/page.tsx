"use client";

import { Link } from "@/components/link";
import { Card, H1, H3 } from "@/components";
import { lessonPlans } from "./lesson-plans";

const lessons = [
  "a", "b", "c", "d", "e", "f", "g", "h", "i", "j",
  "k", "l", "m", "n", "o", "p", "q", "r", "s", "t",
  "u", "v", "w", "x", "y", "z",
];

export default function LessonDashboard() {
  return (
    <div className="min-h-page mt-16 mb-12 flex w-full items-center bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl text-center text-slate-900 dark:text-slate-50">
        <H1 className="mb-10">Lesson Dashboard</H1>
        <H3 className="mb-10 text-lg">
          Choose from our typing lessons below to improve your skills:
        </H3>
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
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
      </div>
    </div>
  );
}
