import React from "react";
import { Attempt, MistakeType } from "@/app/lib/types";

export function FingerPlacementAnalysis({ attempt }: { attempt: Attempt }) {
  if (!attempt.cameraActivated) {
    return (
      <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
        <div className="space-y-4 text-center">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="mx-auto h-16 w-16 text-amber-500"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
            />
          </svg>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
            Camera Analysis Unavailable
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            To receive detailed finger placement accuracy, you need to set up your camera.
          </p>
          <p className="text-slate-600 dark:text-slate-300">
            Set up your camera when taking your next test.
          </p>
        </div>
      </div>
    );
  }

  // Helper function to format finger names
  const formatFingerName = (fingerCode: string) => {
    if (!fingerCode) return "unknown finger";

    const parts = fingerCode.split("_");
    if (parts.length !== 2) return fingerCode;

    const hand = parts[0] === "l" ? "left" : "right";
    const finger = parts[1];

    return `${hand} ${finger}`;
  };

  // Analyze finger mistakes
  const getFingerMistakesAnalysis = () => {
    if (!attempt.cameraActivated || !attempt.mistakes) {
      return null;
    }

    // Filter to only get WrongFinger mistakes
    const fingerMistakes = attempt.mistakes.filter(
      (mistake) => mistake.type === MistakeType.Technique,
    );

    if (fingerMistakes.length === 0) {
      return (
        <div className="rounded-lg bg-green-100 p-4 dark:bg-green-900 dark:text-green-200">
          <p className="font-medium text-green-700 dark:text-green-200">
            No finger placement errors detected. Great technique!
          </p>
        </div>
      );
    }

    // Detailed analysis with keyStrokes data
    if (attempt.keyStrokes && attempt.keyStrokes.length > 0) {
      // Group by correct finger vs pressed finger
      const fingerErrorMap: Record<string, { count: number; keys: Record<string, number> }> = {};

      attempt.keyStrokes.forEach((keystroke) => {
        if (keystroke.correctFinger !== keystroke.pressedFinger) {
          const key = `${keystroke.correctFinger} → ${keystroke.pressedFinger}`;
          if (!fingerErrorMap[key]) {
            fingerErrorMap[key] = { count: 0, keys: {} };
          }
          fingerErrorMap[key].count++;

          // Count occurrences of each key
          if (!fingerErrorMap[key].keys[keystroke.correctLetter]) {
            fingerErrorMap[key].keys[keystroke.correctLetter] = 0;
          }
          fingerErrorMap[key].keys[keystroke.correctLetter]++;
        }
      });

      // Sort by frequency
      const sortedErrors = Object.entries(fingerErrorMap).sort((a, b) => b[1].count - a[1].count);

      // Group mistakes by key for the summary card
      const keyMistakesMap: Record<string, number> = {};
      attempt.keyStrokes.forEach((keystroke) => {
        if (keystroke.correctFinger !== keystroke.pressedFinger) {
          if (!keyMistakesMap[keystroke.correctLetter]) {
            keyMistakesMap[keystroke.correctLetter] = 0;
          }
          keyMistakesMap[keystroke.correctLetter]++;
        }
      });

      // Sort keys by mistake frequency
      const sortedKeyMistakes = Object.entries(keyMistakesMap).sort((a, b) => b[1] - a[1]);

      return (
        <div className="space-y-6">
          {/* Problem keys summary */}
          <div className="rounded-lg bg-amber-100 p-4 dark:bg-amber-900">
            <h3 className="mb-3 text-lg font-medium text-amber-800 dark:text-amber-200">
              Problem Keys
            </h3>
            <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4">
              {sortedKeyMistakes.map(([key, count]) => (
                <div
                  key={key}
                  className="flex items-center justify-between rounded-md bg-white p-3 shadow-sm dark:bg-slate-700"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-amber-200 font-bold text-amber-800 dark:bg-amber-800 dark:text-amber-200">
                    {key}
                  </div>
                  <div className="text-right">
                    <div className="text-xs text-slate-500 dark:text-slate-400">mistakes</div>
                    <div className="font-bold text-amber-700 dark:text-amber-300">{count}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Detailed analysis */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-slate-800 dark:text-slate-200">
              Finger Placement Details
            </h3>
            {sortedErrors.map(([fingerPair, data], index) => {
              const [correctFinger, usedFinger] = fingerPair.split(" → ");

              // Get sorted keys for this finger pair
              const sortedKeys = Object.entries(data.keys).sort((a, b) => b[1] - a[1]);

              return (
                <div key={index} className="rounded-lg bg-white p-4 shadow dark:bg-slate-700">
                  <div className="mb-3 flex items-center justify-between">
                    <div className="font-medium text-slate-800 dark:text-slate-200">
                      Used {formatFingerName(usedFinger)} instead of{" "}
                      {formatFingerName(correctFinger)}
                    </div>
                    <div className="font-bold text-cerulean-600 dark:text-cerulean-400">
                      {data.count} times
                    </div>
                  </div>

                  <div className="flex flex-wrap gap-2">
                    {sortedKeys.map(([key, keyCount]) => (
                      <div
                        key={key}
                        className="flex items-center space-x-1 rounded-full bg-slate-100 px-3 py-1 dark:bg-slate-600"
                      >
                        <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
                          {key}
                        </span>
                        <span className="text-xs text-slate-500 dark:text-slate-400">
                          ×{keyCount}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      );
    }

    // Simplified analysis for when keyStrokes data is not available
    // Count mistakes by key
    const keyMistakesMap: Record<string, number> = {};
    fingerMistakes.forEach((mistake) => {
      if (!keyMistakesMap[mistake.key]) {
        keyMistakesMap[mistake.key] = 0;
      }
      keyMistakesMap[mistake.key]++;
    });

    const sortedKeyMistakes = Object.entries(keyMistakesMap).sort((a, b) => b[1] - a[1]);

    return (
      <div className="space-y-4">
        <div className="rounded-lg border border-amber-200 bg-amber-50/70 p-4 dark:border-amber-800 dark:bg-amber-900/50">
          <p className="flex items-center text-sm text-amber-700 dark:text-amber-300">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="mr-2 h-5 w-5 text-amber-500"
              viewBox="0 0 20 20"
              fill="currentColor"
            >
              <path
                fillRule="evenodd"
                d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z"
                clipRule="evenodd"
              />
            </svg>
            {fingerMistakes.length} finger placement errors detected. Focus on using correct fingers
            for each key.
          </p>
        </div>

        <div className="grid grid-cols-3 gap-3 sm:grid-cols-5">
          {sortedKeyMistakes.slice(0, 4).map(([key, count]) => (
            <div
              key={key}
              className="rounded-lg bg-white p-3 text-center shadow-sm dark:bg-slate-700"
            >
              <div className="mb-1 text-3xl font-bold text-amber-600 dark:text-amber-400">
                {key}
              </div>
              <div className="text-xs text-slate-500 dark:text-slate-400">{count} mistakes</div>
            </div>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="rounded-2xl bg-white p-6 shadow-lg dark:bg-slate-800">
      <div className="mb-6 flex items-center justify-between">
        <h2 className="text-2xl font-bold text-slate-800 dark:text-slate-100">
          Finger Placement Analysis
        </h2>
        {/* {attempt.cameraActivated && (
            <span className="px-3 py-1 bg-green-100 dark:bg-green-900 text-green-700 dark:text-green-300 rounded-full text-xs font-medium">
              Camera Analysis Active
            </span>
          )} */}
      </div>
      <div>{getFingerMistakesAnalysis()}</div>
    </div>
  );
}
