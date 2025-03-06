import { Link } from "@/components/link";
import { H1 } from "@/components";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import { Button } from "@/components";

export default async function Dashboard() {
  const user = await AuthenticateUser();
  if (!user) {
    return (
      <div className="h-page w-full bg-white pt-24 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center text-slate-900 dark:text-slate-50">
          <H1 className="mb-6">Please log in to view your dashboard</H1>
          <Link
            href="/login"
            className="inline-block rounded-lg bg-cerulean-600 px-4 py-2 text-white"
          >
            Login
          </Link>
        </div>
      </div>
    );
  }

  const attempts = await GetAttemptsByEmail(user.email);

  const stats = attempts?.reduce(
    (acc, attempt) => {
      return {
        totalTests: acc.totalTests + 1,
        totalTime: acc.totalTime + attempt.duration,
        avgSpeed: acc.avgSpeed + attempt.wpm,
        avgAcc: acc.avgAcc + attempt.accuracy * 100,
        avgFingerAccuracy: acc.avgFingerAccuracy + attempt.fingerAccuracy * 100,
      };
    },
    { totalTests: 0, totalTime: 0, avgSpeed: 0, avgAcc: 0, avgFingerAccuracy: 0 },
  ) || { totalTests: 0, totalTime: 0, avgSpeed: 0, avgAcc: 0, avgFingerAccuracy: 0 };

  const avgSpeed = stats.totalTests ? Math.round(stats.avgSpeed / stats.totalTests) : 0;
  const avgAcc = stats.totalTests ? (stats.avgAcc / stats.totalTests).toFixed(1) : 0;
  const totalTimeMinutes = Math.round(stats.totalTime / (1000 * 60));
  const avgFingerAccuracy = stats.totalTests
    ? Math.round(stats.avgFingerAccuracy / stats.totalTests)
    : 0;

  // Calculate skill level based on WPM
  const getSkillLevel = (wpm: number): string => {
    if (wpm < 20) return "Beginner";
    if (wpm < 40) return "Intermediate";
    if (wpm < 60) return "Advanced";
    if (wpm < 80) return "Professional";
    return "Expert";
  };

  const skillLevel = getSkillLevel(avgSpeed);

  return (
    <div className="h-page w-full bg-white dark:bg-slate-950">
      <div className="mx-auto w-full max-w-6xl p-6 text-slate-900 dark:text-slate-50">
        {/* Stats Row */}
        <div className="mb-6">
          <H1 className="mb-3">Welcome back, {user.fname || user.email}!</H1>
          <p className="text-slate-600 dark:text-slate-400">
            Your current skill level:{" "}
            <span className="font-semibold text-cerulean-600 dark:text-cerulean-400">
              {skillLevel}
            </span>
          </p>
        </div>
        <div className="mb-8 grid grid-cols-5 gap-4">
          <div className="rounded-xl bg-green-200 p-6 dark:bg-green-800">
            <h2 className="mb-1 text-sm font-medium text-green-700 dark:text-green-300">
              Average WPM
            </h2>
            <p className="text-4xl font-bold text-green-800 dark:text-green-200">{avgSpeed}</p>
          </div>

          <div className="rounded-xl bg-cerulean-200 p-6 dark:bg-cerulean-800">
            <h2 className="mb-1 text-sm font-medium text-cerulean-700 dark:text-cerulean-300">
              Average Accuracy
            </h2>
            <p className="text-4xl font-bold text-cerulean-800 dark:text-cerulean-200">{avgAcc}%</p>
          </div>

          <div className="rounded-xl bg-amber-200 p-6 dark:bg-amber-800">
            <h2 className="mb-1 text-sm font-medium text-amber-700 dark:text-amber-300">
              Average Finger Accuracy
            </h2>
            <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">
              {avgFingerAccuracy}%
            </p>
          </div>

          <div className="rounded-xl bg-red-200 p-6 dark:bg-red-800">
            <h2 className="mb-1 text-sm font-medium text-red-700 dark:text-red-300">
              Tests Completed
            </h2>
            <p className="text-4xl font-bold text-red-800 dark:text-red-200">{stats.totalTests}</p>
          </div>

          <div className="rounded-xl bg-slate-200 p-6 dark:bg-slate-800">
            <h2 className="mb-1 text-sm font-medium text-slate-700 dark:text-slate-300">
              Time Typing
            </h2>
            <p className="text-4xl font-bold text-slate-800 dark:text-slate-200">
              {totalTimeMinutes}m
            </p>
          </div>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          {/* Left Column (2/3 width on large screens) */}
          <div className="space-y-6 lg:col-span-2">
            {/* User Profile */}
            <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Profile Information
              </h2>
              <div className="grid grid-cols-1 gap-4 text-slate-700 md:grid-cols-2 dark:text-slate-300">
                <div>
                  <p className="mb-2">
                    First Name: <span className="font-medium">{user.fname || "Not set"}</span>
                  </p>
                  <p className="mb-2">
                    Email: <span className="font-medium">{user.email}</span>
                  </p>
                </div>
                <div>
                  <p className="mb-2">
                    Last Name: <span className="font-medium">{user.lname || "Not set"}</span>
                  </p>
                  <p className="mb-2">
                    User ID: <span className="font-mono text-sm">{user.id}</span>
                  </p>
                </div>
              </div>
              {/* <div className="mt-4 border-t border-slate-200 pt-4 dark:border-slate-700">
                <Link
                  href="/profile/edit"
                  className="text-sm text-cerulean-600 hover:underline dark:text-cerulean-400"
                >
                  Edit profile settings
                </Link>
              </div> */}
            </div>

            {/* Recent Activity */}
            <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
              <div className="mb-4 flex items-center justify-between">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">
                  Recent Activity
                </h2>
                <Link
                  href="/history"
                  className="text-sm text-cerulean-600 hover:underline dark:text-cerulean-400"
                >
                  View all →
                </Link>
              </div>
              {attempts && attempts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="py-2 text-left font-medium text-slate-500 dark:text-slate-400">
                          Date
                        </th>
                        <th className="py-2 text-left font-medium text-slate-500 dark:text-slate-400">
                          Finger Accuracy
                        </th>
                        <th className="py-2 text-right font-medium text-slate-500 dark:text-slate-400">
                          WPM
                        </th>
                        <th className="py-2 text-right font-medium text-slate-500 dark:text-slate-400">
                          Accuracy
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {attempts
                        .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
                        .slice(0, 5)
                        .map((attempt, i) => (
                          <tr key={i} className="border-b border-slate-100 dark:border-slate-800">
                            <td className="py-3 text-slate-700 dark:text-slate-300">
                              {new Date(attempt.date).toLocaleDateString()}
                            </td>
                            <td className="py-3 text-slate-700 dark:text-slate-300">
                              {attempt.cameraActivated
                                ? `${(attempt.fingerAccuracy * 100).toFixed(1)}%`
                                : "N/A"}
                            </td>
                            <td className="py-3 text-right font-medium text-slate-900 dark:text-slate-100">
                              {Math.round(attempt.wpm)}
                            </td>
                            <td className="py-3 text-right text-slate-700 dark:text-slate-300">
                              {(attempt.accuracy * 100).toFixed(1)}%
                            </td>
                          </tr>
                        ))}
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className="rounded-lg border border-dashed border-slate-300 py-8 text-center text-slate-500 dark:border-slate-600 dark:text-slate-400">
                  <p>No tests completed yet</p>
                  <Link
                    href="/typing/test"
                    className="mt-2 inline-block rounded bg-cerulean-600 px-4 py-2 text-sm text-white"
                  >
                    Take your first test
                  </Link>
                </div>
              )}
            </div>
          </div>

          {/* Right Column (1/3 width on large screens) */}
          <div className="space-y-6">
            {/* Quick Actions */}
            <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Quick Actions
              </h2>
              <div className="grid grid-cols-1 gap-3">
                <Button colorTheme="cerulean">
                  <Link className="block w-40 text-slate-50 no-underline" href="/typing/test">
                    Take a Test
                  </Link>
                </Button>
                <Button colorTheme="green">
                  <Link className="block w-40 text-slate-50 no-underline" href="/lesson">
                    Continue Learning
                  </Link>
                </Button>
                <Button colorTheme="amber">
                  <Link className="block w-40 text-slate-50 no-underline" href="/history">
                    View History
                  </Link>
                </Button>
              </div>
            </div>

            {/* Practice Goal */}
            <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
              <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
                Practice Goal
              </h2>
              <div className="py-4 text-center">
                <p className="mb-2 text-slate-700 dark:text-slate-300">Current Goal</p>
                <div className="mb-2 text-5xl font-bold text-cerulean-600 dark:text-cerulean-400">
                  {avgSpeed + 10} <span className="text-sm font-normal">WPM</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  You're currently at {avgSpeed} WPM
                </p>
                <div className="mt-4 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
                  <div
                    className="h-2 rounded-full bg-cerulean-500"
                    style={{ width: `${Math.min(100, (avgSpeed / (avgSpeed + 10)) * 100)}%` }}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
