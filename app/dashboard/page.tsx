import { Link } from "@/components/link";
import { H1 } from "@/components";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import { Button } from "@/components";

export default async function Dashboard() {
  const user = await AuthenticateUser();
  if (!user) {
    return (
      <div className="min-h-screen w-full pt-24 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center text-slate-900 dark:text-slate-50">
          <H1 className="mb-6">Please log in to view your dashboard</H1>
          <Link href="/login" className="inline-block bg-cerulean-600 text-white py-2 px-4 rounded-lg">
            Login
          </Link>
        </div>
      </div>
    );
  }
  
  const attempts = await GetAttemptsByEmail(user.email);
  
  const stats = attempts?.reduce((acc, attempt) => {
    return {
      totalTests: acc.totalTests + 1,
      totalTime: acc.totalTime + attempt.duration,
      avgSpeed: acc.avgSpeed + attempt.wpm,
      avgAcc: acc.avgAcc + (attempt.accuracy * 100),
      avgFingerAccuracy: acc.avgFingerAccuracy + (attempt.fingerAccuracy * 100)
    };
  }, { totalTests: 0, totalTime: 0, avgSpeed: 0, avgAcc: 0, avgFingerAccuracy: 0 }) || { totalTests: 0, totalTime: 0, avgSpeed: 0, avgAcc: 0, avgFingerAccuracy: 0 };

  const avgSpeed = stats.totalTests ? Math.round(stats.avgSpeed / stats.totalTests) : 0;
  const avgAcc = stats.totalTests ? (stats.avgAcc / stats.totalTests).toFixed(1) : 0;
  const totalTimeMinutes = Math.round(stats.totalTime / (1000 * 60));
  const avgFingerAccuracy = stats.totalTests ? Math.round(stats.avgFingerAccuracy / stats.totalTests) : 0;

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
    <div className="min-h-screen w-full pt-20 bg-white dark:bg-slate-950">
      <div className="mx-auto max-w-6xl w-full text-slate-900 dark:text-slate-50 p-6">
        {/* Stats Row */}
        <div className="mb-6">
          <H1 className="mb-3">Welcome back, {user.fname || user.email}!</H1>
          <p className="text-slate-600 dark:text-slate-400">
            Your current skill level: <span className="font-semibold text-cerulean-600 dark:text-cerulean-400">{skillLevel}</span>
          </p>
        </div>
        <div className="grid grid-cols-5 gap-4 mb-8">
          <div className="bg-green-200 dark:bg-green-800 p-6 rounded-xl">
            <h2 className="text-green-700 dark:text-green-300 text-sm font-medium mb-1">Average WPM</h2>
            <p className="text-4xl font-bold text-green-800 dark:text-green-200">{avgSpeed}</p>
          </div>
          
          <div className="bg-cerulean-200 dark:bg-cerulean-800 p-6 rounded-xl">
            <h2 className="text-cerulean-700 dark:text-cerulean-300 text-sm font-medium mb-1">Average Accuracy</h2>
            <p className="text-4xl font-bold text-cerulean-800 dark:text-cerulean-200">{avgAcc}%</p>
          </div>

          <div className="bg-amber-200 dark:bg-amber-800 p-6 rounded-xl">
            <h2 className="text-amber-700 dark:text-amber-300 text-sm font-medium mb-1">Average Finger Accuracy</h2>
            <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">{avgFingerAccuracy}%</p>
          </div>

          <div className="bg-red-200 dark:bg-red-800 p-6 rounded-xl">
            <h2 className="text-red-700 dark:text-red-300 text-sm font-medium mb-1">Tests Completed</h2>
            <p className="text-4xl font-bold text-red-800 dark:text-red-200">{stats.totalTests}</p>
          </div>

          <div className="bg-slate-200 dark:bg-slate-800 p-6 rounded-xl">
            <h2 className="text-slate-700 dark:text-slate-300 text-sm font-medium mb-1">Time Typing</h2>
            <p className="text-4xl font-bold text-slate-800 dark:text-slate-200">{totalTimeMinutes}m</p>
          </div>
        </div>
        
        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Left Column (2/3 width on large screens) */}
          <div className="lg:col-span-2 space-y-6">
            {/* User Profile */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Profile Information</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-slate-700 dark:text-slate-300">
                <div>
                  <p className="mb-2">First Name: <span className="font-medium">{user.fname || 'Not set'}</span></p>
                  <p className="mb-2">Email: <span className="font-medium">{user.email}</span></p>
                </div>
                <div>
                  <p className="mb-2">Last Name: <span className="font-medium">{user.lname || 'Not set'}</span></p>
                  <p className="mb-2">User ID: <span className="font-mono text-sm">{user.id}</span></p>
                </div>
              </div>
              <div className="mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                <Link href="/profile/edit" className="text-cerulean-600 dark:text-cerulean-400 hover:underline text-sm">
                  Edit profile settings
                </Link>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Recent Activity</h2>
                <Link href="/history" className="text-sm text-cerulean-600 dark:text-cerulean-400 hover:underline">
                  View all →
                </Link>
              </div>
              {attempts && attempts.length > 0 ? (
                <div className="overflow-x-auto">
                  <table className="w-full text-sm">
                    <thead>
                      <tr className="border-b border-slate-200 dark:border-slate-700">
                        <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">Date</th>
                        <th className="text-left py-2 font-medium text-slate-500 dark:text-slate-400">FingerAccuracy</th>
                        <th className="text-right py-2 font-medium text-slate-500 dark:text-slate-400">WPM</th>
                        <th className="text-right py-2 font-medium text-slate-500 dark:text-slate-400">Accuracy</th>
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
                            {attempt.fingerAccuracy}
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
                <div className="text-center py-8 text-slate-500 dark:text-slate-400 border border-dashed border-slate-300 dark:border-slate-600 rounded-lg">
                  <p>No tests completed yet</p>
                  <Link href="/typing/test" className="inline-block mt-2 text-sm bg-cerulean-600 text-white py-2 px-4 rounded">
                    Take your first test
                  </Link>
                </div>
              )}
            </div>
          </div>
          
          {/* Right Column (1/3 width on large screens) */}
          <div className="space-y-6">
            
            {/* Quick Actions */}
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Quick Actions</h2>
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
            <div className="bg-slate-50 dark:bg-slate-800 rounded-xl p-6 shadow">
              <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50 mb-4">Practice Goal</h2>
              <div className="text-center py-4">
                <p className="text-slate-700 dark:text-slate-300 mb-2">Current Goal</p>
                <div className="text-5xl font-bold text-cerulean-600 dark:text-cerulean-400 mb-2">
                  {avgSpeed + 10} <span className="text-sm font-normal">WPM</span>
                </div>
                <p className="text-sm text-slate-500 dark:text-slate-400">
                  You're currently at {avgSpeed} WPM
                </p>
                <div className="w-full bg-slate-200 dark:bg-slate-700 rounded-full h-2 mt-4">
                  <div 
                    className="bg-cerulean-500 h-2 rounded-full" 
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