import { H1 } from "@/components";

export default function StatsRow({
  user,
  skillLevel,
  avgSpeed,
  avgAcc,
  avgFingerAccuracy,
  stats,
  totalTimeMinutes,
}: {
  user: any;
  skillLevel: string;
  avgSpeed: number;
  avgAcc: number;
  avgFingerAccuracy: number;
  stats: any;
  totalTimeMinutes: number;
}) {
  return (
    <>
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
          <p className="text-4xl font-bold text-green-800 dark:text-green-200">
            {avgSpeed.toFixed() || "-"}
          </p>
        </div>

        <div className="rounded-xl bg-cerulean-200 p-6 dark:bg-cerulean-800">
          <h2 className="mb-1 text-sm font-medium text-cerulean-700 dark:text-cerulean-300">
            Average Accuracy
          </h2>
          <p className="text-4xl font-bold text-cerulean-800 dark:text-cerulean-200">
            {avgAcc ? `${avgAcc.toFixed()}%` : "-"}
          </p>
        </div>

        <div className="rounded-xl bg-amber-200 p-6 dark:bg-amber-800">
          <h2 className="mb-1 text-sm font-medium text-amber-700 dark:text-amber-300">
            Average Finger Accuracy
          </h2>
          <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">
            {avgFingerAccuracy ? `${avgFingerAccuracy.toFixed()}%` : "-"}
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
            {totalTimeMinutes.toFixed()}m
          </p>
        </div>
      </div>
    </>
  );
}
