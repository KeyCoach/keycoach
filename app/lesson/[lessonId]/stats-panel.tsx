import { useState } from "react";

export default function StatsPanel({
  lessonId,
  currentLevel,
}: {
  lessonId?: string;
  currentLevel?: number;
}) {
  return (
    <section className="dark:border-gray-300 mr-8 w-1/3 max-w-md flex-1 text-nowrap rounded-lg border border-slate-950 bg-slate-50 p-4 shadow-lg dark:border-slate-50 dark:bg-slate-950">
      <h2 className="mb-4 text-xl font-bold">Aggregate Lesson Stats</h2>
      <div className="mb-2">
        <p className="text-gray-700">Words Per Minute (WPM):</p>
        <p className="text-gray-900 text-2xl font-bold">75</p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700">Key Accuracy:</p>
        <p className="text-gray-900 text-2xl font-bold">98%</p>
      </div>
      <div className="mb-2">
        <p className="text-gray-700">Finger Accuracy:</p>
        <p className="text-gray-900 text-2xl font-bold">95%</p>
      </div>
    </section>
  );
}
