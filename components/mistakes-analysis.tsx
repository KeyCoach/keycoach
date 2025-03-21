import React from "react";
import { Attempt, MistakeType } from "@/app/lib/types";

export function MistakesAnalysis({ attempt }: { attempt: Attempt }) {
  const errors = attempt.mistakes.filter((mistake) => mistake.type !== MistakeType.Technique);

  if (errors.length === 0) {
    return (
      <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900 dark:text-green-200">
        <p className="font-medium text-green-700 dark:text-green-200">
          Perfect accuracy! Well done!
        </p>
      </div>
    );
  }

  const errorMap: Record<string, number> = {};

  errors.forEach((mistake) => {
    const key = mistake.key.toUpperCase();
    errorMap[key] = errorMap[key] ? errorMap[key] + 1 : 1;
  });

  const sortedErrors = Object.entries(errorMap).sort((a, b) => b[1] - a[1]);

  return (
    <div className="rounded-2xl bg-slate-100 p-6 shadow-lg dark:bg-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">Mistakes Analysis</h2>
      </div>

      <div className="space-y-6">
        <div className="rounded-lg bg-cerulean-200 p-4 dark:bg-cerulean-700">
          <h3 className="mb-3 text-lg font-medium text-cerulean-700 dark:text-cerulean-200">
            Problem Keys
          </h3>
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
            {sortedErrors.slice(0, 4).map(([key, count]) => (
              <div
                key={key}
                className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm dark:bg-slate-700"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-cerulean-200 text-lg font-bold text-cerulean-700 dark:bg-cerulean-600 dark:text-cerulean-300">
                  {key.trim() || "_"}
                </div>
                <div className="text-right">
                  <div className="text-xs text-slate-500 dark:text-slate-400">mistakes</div>
                  <div className="font-bold text-cerulean-700 dark:text-cerulean-300">{count}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
