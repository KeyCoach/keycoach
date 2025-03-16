import { Attempt } from "@/app/lib/types";
import Link from "next/link";

export default function RecentActivity({ attempts }: { attempts: Attempt[] }) {
  return (
    <div className="rounded-xl bg-slate-100 p-6 shadow dark:bg-slate-800">
      <div className="mb-4 flex items-center justify-between">
        <h2 className="text-xl font-semibold text-slate-900 dark:text-slate-50">Recent Activity</h2>
        <Link
          href="/history"
          className="text-sm text-cerulean-600 no-underline hover:underline dark:text-cerulean-400"
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
                  <tr key={i} className="border-b border-slate-200 dark:border-slate-800">
                    <td className="py-3 text-slate-700 dark:text-slate-300">
                      {new Date(attempt.date).toLocaleDateString()}
                    </td>
                    <td className="py-3 text-slate-700 dark:text-slate-300">
                      {attempt.cameraActivated ? `${attempt.fingerAccuracy.toFixed(0)}%` : "N/A"}
                    </td>
                    <td className="py-3 text-right font-medium text-slate-900 dark:text-slate-100">
                      {Math.round(attempt.netWpm)}
                    </td>
                    <td className="py-3 text-right text-slate-700 dark:text-slate-300">
                      {attempt.accuracy.toFixed(0)}%
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
  );
}
