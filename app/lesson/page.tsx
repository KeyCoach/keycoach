"use client";

import Link from "next/link";
import { Button, Card, Badge, H1, H3 } from "@/components";

export default function LessonDashboard() {
  return (
    <div className="min-h-screen w-full bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-7xl text-center pt-10 dark:text-slate-50 text-slate-900">
      <H1 className="mb-10">Lesson Dashboard</H1>
        <H3 className="mb-10 text-lg">
          Choose from our typing lessons below to improve your skills:
        </H3>
        {/* <div className="mb-8 flex flex-col items-center">
          <ul className="text-left list-disc mb-6">
            <li>View lesson progress</li>
            <li>Recommended next lesson</li>
            <li>All lessons</li>
          </ul>
          <Link href="/dashboard" className="no-underline">
            <Button colorTheme="cerulean">Back to Dashboard</Button>
          </Link>
        </div> */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 px-4">
          {[...Array(10).keys()].map((i) => (
            <Link key={i} className="no-underline text-slate-900" href={`/lesson/${i}`}>
              <Card
                title={`Lesson ${i + 1}`}
                subtitle={`Learn essential typing skills in Lesson ${i + 1}`}
                badgeIcon="remove"
                badgeTheme="amber"
                buttonText="Start Lesson"
                onButtonClick={() => {}}
              />
            </Link>
          ))}
        </div>
        
      </div>
    </div>
  );
}