import { type User as TUser } from "@/app/lib/types";
import { H1 } from "@/components";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { Link } from "@/components/link";
import { Button } from "@/components";

export default async function Results() {
  const user = await AuthenticateUser();
  return (
    <div className="min-h-screen w-full pt-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl w-full text-slate-900 dark:text-slate-50 p-6">
        <div className="flex justify-between items-center mb-6">
          <H1>Test History</H1>
          <Button colorTheme="cerulean">
            <Link className="block w-40 text-slate-50 no-underline" href="/dashboard">
              Back to Dashboard
            </Link>
          </Button>
        </div>
        {user ? <History user={user} /> : (
          <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 shadow text-center">
            <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">Please log in to view your test history</p>
            <Button colorTheme="cerulean">
              <Link className="block w-40 text-slate-50 no-underline" href="/login">
                Login
              </Link>
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}

async function History({ user }: { user: TUser }) {
  const attempts = await GetAttemptsByEmail(user.email);
  if (!attempts) {
    return (
      <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-8 shadow text-center">
        <p className="text-lg text-slate-700 dark:text-slate-300 mb-4">You haven't completed any tests yet</p>
        <Button colorTheme="cerulean">
          <Link className="block w-40 text-slate-50 no-underline" href="/typing/test">
            Take your first test
          </Link>
        </Button>
      </div>
    );
  }
  

  return (
    <div className="space-y-6">
      {attempts
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .map((attempt) => (
        <div key={attempt.id} className="bg-slate-50 dark:bg-slate-800 rounded-xl shadow overflow-hidden">
          {/* Header with key metrics */}
          <div className="p-6 border-b border-slate-200 dark:border-slate-700">
            <div className="flex flex-wrap items-center justify-between gap-4">
              <div>
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  {attempt.test.author ? `${attempt.test.author}'s Test` : 'Test'}
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400">
                  {new Date(attempt.date).toLocaleDateString()} at {new Date(attempt.date).toLocaleTimeString()}
                </p>
              </div>
              <div className="flex gap-3">
                <div className="text-center px-3">
                  <p className="text-xs text-green-700 dark:text-green-400 font-medium">WPM</p>
                  <p className="text-2xl font-bold text-green-800 dark:text-green-300">{Math.round(attempt.wpm)}</p>
                </div>
                <div className="text-center px-3">
                  <p className="text-xs text-cerulean-700 dark:text-cerulean-400 font-medium">Accuracy</p>
                  <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-300">{(attempt.accuracy * 100).toFixed(1)}%</p>
                </div>
                <div className="text-center px-3">
                  <p className="text-xs text-amber-700 dark:text-amber-400 font-medium">Finger Accuracy</p>
                  <p className="text-2xl font-bold text-amber-800 dark:text-amber-300">{(attempt.fingerAccuracy * 100).toFixed(1)}%</p>
                </div>
              </div>
            </div>
          </div>
          
          {/* Collapsible details section */}
          <details className="group">
            <summary className="p-4 cursor-pointer bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-300 font-medium flex items-center">
              <svg className="w-5 h-5 mr-2 group-open:rotate-90 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
              View Test Details
            </summary>
            <div className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Test details */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Test Information</h3>
                <div className="space-y-2 text-sm">
                  <p className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Test ID:</span>
                    <span className="font-mono">{attempt.testId}</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Difficulty:</span>
                    <span className="capitalize">{attempt.test.difficulty}</span>
                  </p>
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
                    <span>{(attempt.duration / 1000).toFixed(1)} seconds</span>
                  </p>
                  <p className="flex justify-between">
                    <span className="text-slate-500 dark:text-slate-400">Mistakes:</span>
                    <span>{attempt.mistakesCount}</span>
                  </p>
                </div>
              </div>
              
              {/* Test text */}
              <div className="bg-white dark:bg-slate-900 p-4 rounded-lg">
                <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Test Text</h3>
                <div className="max-h-40 overflow-y-auto text-sm text-slate-700 dark:text-slate-300 p-3 bg-slate-50 dark:bg-slate-800 rounded border border-slate-200 dark:border-slate-700">
                  {attempt.test.textBody}
                </div>
              </div>
              
              {/* Keystroke data - only if it exists and only show first 10 */}
              {attempt.keyStrokes && attempt.keyStrokes.length > 0 && (
                <div className="md:col-span-2 bg-white dark:bg-slate-900 p-4 rounded-lg">
                  <h3 className="font-medium text-slate-900 dark:text-slate-100 mb-3">Key Stroke Analysis</h3>
                  <div className="overflow-x-auto">
                    <table className="w-full text-sm">
                      <thead>
                        <tr className="border-b border-slate-200 dark:border-slate-700">
                          <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400 px-2">Expected Finger</th>
                          <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400 px-2">Used Finger</th>
                          <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400 px-2">Expected Key</th>
                          <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400 px-2">Pressed Key</th>
                          <th className="text-right py-2 font-medium text-slate-500 dark:text-slate-400 px-2">Confidence</th>
                        </tr>
                      </thead>
                      <tbody>
                        {attempt.keyStrokes.slice(0, 10).map((stroke, index) => (
                          <tr key={index} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-2 text-slate-700 dark:text-slate-300 px-2">{stroke.correctFinger}</td>
                            <td className="py-2 text-slate-700 dark:text-slate-300 px-2">
                              <span className={stroke.correctFinger === stroke.pressedFinger ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                {stroke.pressedFinger}
                              </span>
                            </td>
                            <td className="py-2 text-slate-700 dark:text-slate-300 px-2">{stroke.correctLetter}</td>
                            <td className="py-2 text-slate-700 dark:text-slate-300 px-2">
                              <span className={stroke.correctLetter === stroke.pressedLetter ? "text-green-600 dark:text-green-400" : "text-red-600 dark:text-red-400"}>
                                {stroke.pressedLetter}
                              </span>
                            </td>
                            <td className="py-2 text-right text-slate-700 dark:text-slate-300 px-2">{stroke.modelConfidence?.toFixed(2) || 'N/A'}</td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                    {attempt.keyStrokes.length > 10 && (
                      <p className="text-xs text-slate-500 dark:text-slate-400 text-center mt-2">
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
