import { Button, H1 } from "@/components";
import { AuthenticateUser } from "@/app/actions";
import { GetAttemptsByEmail } from "@/service-interfaces/dynamo-db";
import GoalsCard from "./cards/goals";
import StatsRow from "./cards/stats-row";
import ProfileInformation from "./cards/profile-information";
import RecentActivity from "./cards/recent-activity";
import QuickActions from "./cards/quick-actions";

export default async function Dashboard() {
  const user = await AuthenticateUser();
  if (!user) {
    return (
      <div className="h-page w-full bg-white pt-24 dark:bg-slate-950">
        <div className="mx-auto max-w-3xl text-center text-slate-900 dark:text-slate-50">
          <H1 className="mb-6">Please log in to view your dashboard</H1>

          <Button href="/login">Login</Button>
        </div>
      </div>
    );
  }

  const attempts = (await GetAttemptsByEmail(user.email)) || [];

  const stats = attempts?.reduce(
    (acc, attempt) => {
      return {
        totalTests: acc.totalTests + 1,
        totalTime: acc.totalTime + attempt.duration,
        avgSpeed: acc.avgSpeed + attempt.netWpm,
        avgAcc: acc.avgAcc + attempt.accuracy,
        avgFingerAccuracy: acc.avgFingerAccuracy + attempt.fingerAccuracy,
      };
    },
    { totalTests: 0, totalTime: 0, avgSpeed: 0, avgAcc: 0, avgFingerAccuracy: 0 },
  ) || { totalTests: 0, totalTime: 0, avgSpeed: 0, avgAcc: 0, avgFingerAccuracy: 0 };

  const avgSpeed = stats.totalTests ? stats.avgSpeed / stats.totalTests : 0;
  const avgAcc = stats.totalTests ? stats.avgAcc / stats.totalTests : 0;
  const totalTimeMinutes = stats.totalTime / (1000 * 60);
  const avgFingerAccuracy = stats.totalTests ? stats.avgFingerAccuracy / stats.totalTests : 0;

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
        <StatsRow
          {...{ user, skillLevel, avgSpeed, avgAcc, avgFingerAccuracy, stats, totalTimeMinutes }}
        />

        <div className="grid grid-cols-1 gap-6 lg:grid-cols-3">
          <div className="space-y-6 lg:col-span-2">
            <ProfileInformation />
            <RecentActivity attempts={attempts} />
          </div>

          <div className="space-y-6">
            <QuickActions />

            <GoalsCard avgSpeed={avgSpeed} />
          </div>
        </div>
      </div>
    </div>
  );
}
