"use client";

import { Link } from "@/components/link";
import { Card, H1, H3 } from "@/components";

const lessons = ["a", "s", "d", "f", "g", "h", "j", "k", "l"];

export default function LessonDashboard() {
  return (
    <div className="h-page flex w-full items-center bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl text-center text-slate-900 dark:text-slate-50">
        <H1 className="mb-10">Lesson Dashboard</H1>
        <H3 className="mb-10 text-lg">
          Choose from our typing lessons below to improve your skills:
        </H3>
        <div className="grid grid-cols-1 gap-4 px-4 sm:grid-cols-2 lg:grid-cols-4">
          {lessons.map((lesson) => (
            <Link key={lesson} className="text-slate-900 no-underline" href={`/lesson/${lesson}`}>
              <Card
                title={`Lesson ${lesson}`}
                subtitle={`Learn essential typing skills about the ${lesson} key`}
                badgeIcon="remove"
                badgeTheme="amber"
                buttonText="Start Lesson"
              />
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
