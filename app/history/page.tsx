import { type User as TUser } from "@/app/lib/types";
import { H1 } from "@/components";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/app/actions";
import { Button } from "@/components";
import { TestTextReview } from "../test-text-review";

export default async function Results() {
  const user = await AuthenticateUser();
  return (
    <div className="h-page w-full bg-white pt-20 dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl p-6 text-slate-900 dark:text-slate-50">
        <div className="mb-6 flex items-center justify-between">
          <H1>Test History</H1>
          <Button href="/dashboard" colorTheme="cerulean">
            Back to Dashboard
          </Button>
        </div>
        {user ? (
          <History user={user} />
        ) : (
          <div className="rounded-xl bg-slate-100 p-8 text-center shadow dark:bg-slate-800">
            <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">
              Please log in to view your test history
            </p>
            <Button colorTheme="cerulean" href="/login">
              Login
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

async function History({ user }: { user: TUser }) {
  const attempts = await GetAttemptsByEmail(user.email);
  if (!attempts || attempts?.length === 0) {
    return (
      <div className="rounded-xl bg-slate-100 p-8 text-center shadow dark:bg-slate-800">
        <p className="mb-4 text-lg text-slate-700 dark:text-slate-300">
          You haven't completed any tests yet
        </p>
        <Button colorTheme="cerulean" href="/typing/test">
          Take your first test
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {attempts
        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
        .map((attempt) => (
          <div
            key={attempt.id}
            className="overflow-hidden rounded-xl bg-slate-100 shadow dark:bg-slate-800"
          >
            {/* Header with key metrics */}
            <div className="border-b border-slate-200 p-6 dark:border-slate-700">
              <div className="flex flex-wrap items-center justify-between gap-4">
                <div>
                  <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                    {attempt.test.author ? `${attempt.test.author}'s Test` : "Test"}
                  </h2>
                  <p className="text-sm text-slate-600 dark:text-slate-400">
                    {new Date(attempt.date).toLocaleDateString()} at{" "}
                    {new Date(attempt.date).toLocaleTimeString()}
                  </p>
                </div>
                <div className="flex gap-3">
                  <div className="px-3 text-center">
                    <p className="text-xs font-medium text-green-700 dark:text-green-400">WPM</p>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-300">
                      {Math.round(attempt.netWpm)}
                    </p>
                  </div>
                  <div className="px-3 text-center">
                    <p className="text-xs font-medium text-cerulean-700 dark:text-cerulean-400">
                      Accuracy
                    </p>
                    <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-300">
                      {attempt.accuracy.toFixed(0)}%
                    </p>
                  </div>
                  <div className="px-3 text-center">
                    <p className="text-xs font-medium text-amber-700 dark:text-amber-400">
                      Finger Accuracy
                    </p>
                    <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">
                      {attempt.cameraActivated ? `${attempt.fingerAccuracy.toFixed(0)}%` : "N/A"}
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Collapsible details section */}
            <details className="group">
              <summary className="flex cursor-pointer items-center bg-slate-200 p-4 font-medium text-slate-700 hover:bg-slate-300 dark:bg-slate-700 dark:text-slate-300 dark:hover:bg-slate-600">
                <svg
                  className="mr-2 h-5 w-5 transition-transform group-open:rotate-90"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 5l7 7-7 7"
                  />
                </svg>
                View Test Details
              </summary>
              <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
                {/* Test details */}
                <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
                  <h3 className="mb-3 font-medium text-slate-900 dark:text-slate-100">
                    Test Information
                  </h3>
                  <div className="space-y-2 text-sm">
                    <p className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Word Count:</span>
                      <span>{attempt.test.wordCount}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Character Count:</span>
                      <span>{attempt.test.charCount}</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Duration:</span>
                      <span>{Math.round(attempt.duration / 1000)} seconds</span>
                    </p>
                    <p className="flex justify-between">
                      <span className="text-slate-500 dark:text-slate-400">Mistakes:</span>
                      <span>{attempt.mistakes.length}</span>
                    </p>
                  </div>
                </div>

                {/* Test text */}
                <div className="rounded-lg bg-white p-4 dark:bg-slate-900">
                  <h3 className="mb-3 font-medium text-slate-900 dark:text-slate-100">Test Text</h3>
                  <div className="max-h-40 overflow-y-auto rounded border border-slate-200 bg-slate-100 p-3 text-sm text-slate-700 dark:border-slate-700 dark:bg-slate-800 dark:text-slate-300">
                    <TestTextReview attempt={attempt} />
                  </div>
                </div>

                {/* Keystroke data - only if it exists and only show first 10 */}
                {attempt.keyStrokes && attempt.keyStrokes.length > 0 && (
                  <div className="rounded-lg bg-white p-4 md:col-span-2 dark:bg-slate-900">
                    <h3 className="mb-3 font-medium text-slate-900 dark:text-slate-100">
                      Key Stroke Analysis
                    </h3>
                    <div className="overflow-x-auto">
                      <table className="w-full text-sm">
                        <thead>
                          <tr className="border-b border-slate-200 dark:border-slate-700">
                            <th className="px-2 py-2 text-left font-medium text-slate-500 dark:text-slate-400">
                              Expected Finger
                            </th>
                            <th className="px-2 py-2 text-left font-medium text-slate-500 dark:text-slate-400">
                              Used Finger
                            </th>
                            <th className="px-2 py-2 text-left font-medium text-slate-500 dark:text-slate-400">
                              Expected Key
                            </th>
                            <th className="px-2 py-2 text-left font-medium text-slate-500 dark:text-slate-400">
                              Pressed Key
                            </th>
                            <th className="px-2 py-2 text-right font-medium text-slate-500 dark:text-slate-400">
                              Confidence
                            </th>
                          </tr>
                        </thead>
                        <tbody>
                          {attempt.keyStrokes.slice(0, 10).map((stroke, index) => (
                            <tr
                              key={index}
                              className="border-b border-slate-100 dark:border-slate-800"
                            >
                              <td className="px-2 py-2 text-slate-700 dark:text-slate-300">
                                {stroke.correctFinger}
                              </td>
                              <td className="px-2 py-2 text-slate-700 dark:text-slate-300">
                                <span
                                  className={
                                    stroke.correctFinger === stroke.pressedFinger
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }
                                >
                                  {stroke.pressedFinger}
                                </span>
                              </td>
                              <td className="px-2 py-2 text-slate-700 dark:text-slate-300">
                                {stroke.correctLetter}
                              </td>
                              <td className="px-2 py-2 text-slate-700 dark:text-slate-300">
                                <span
                                  className={
                                    stroke.correctLetter === stroke.pressedLetter
                                      ? "text-green-600 dark:text-green-400"
                                      : "text-red-600 dark:text-red-400"
                                  }
                                >
                                  {stroke.pressedLetter}
                                </span>
                              </td>
                              <td className="px-2 py-2 text-right text-slate-700 dark:text-slate-300">
                                {stroke.modelConfidence?.toFixed(2) || "N/A"}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                      {attempt.keyStrokes.length > 10 && (
                        <p className="mt-2 text-center text-xs text-slate-500 dark:text-slate-400">
                          Showing 10 of {attempt.keyStrokes.length} keystrokes
                        </p>
                      )}
                    </div>
                  </div>
                )}
              </div>
            </details>
          </div>
        ))}
    </div>
  );
}
