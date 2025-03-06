import { Link } from "@/components/link";
import { H1 } from "@/components";
import { Button } from "@/components";
import { GetAttemptById } from "@/service-interfaces/dynamo-db";
import { AuthenticateUser } from "@/utils/authenticate-user";
import { type Attempt } from "@/app/lib/types";
import { FingerPlacementAnalysis } from "@/components/finger-analysis";

export default async function TestResult({ params }: { params: Promise<{ attemptId: string }> }) {
  const user = await AuthenticateUser();
  const email = user?.email || null;
  const attemptId = (await params).attemptId;

  const attempt = await GetAttemptById(attemptId, email);
  return (
    <div className="h-page w-full bg-white p-6 dark:bg-slate-950">
      <div className="mx-auto max-w-4xl">
        <H1 className="mb-6 text-slate-900 dark:text-slate-50">Typing Results</H1>

        <div className="mb-8 flex gap-4">
          <Button colorTheme="cerulean" variant="previous-nav">
            <Link className="block w-40 text-slate-50 no-underline" href="/typing/test">
              Take another Test
            </Link>
          </Button>
          <Button colorTheme="cerulean">
            <Link className="block w-40 text-slate-50 no-underline" href="/lesson">
              Continue Learning
            </Link>
          </Button>
        </div>

        {attempt ? <Attempt attempt={attempt} /> : <p>No test found</p>}
      </div>
    </div>
  );
}

function Attempt({ attempt }: { attempt: Attempt }) {
  const formatDate = (date: string | number) => {
    const dateObj = typeof date === "string" ? new Date(date) : new Date(Number(date));
    return dateObj.toLocaleString(undefined, {
      weekday: "long",
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  return (
    <div className="space-y-6 pb-16">
      {/* Main Stats Card */}
      <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
        <div className="rounded-xl bg-green-200 p-6 shadow-lg dark:bg-green-800">
          <h2 className="mb-1 text-sm font-medium text-green-700 dark:text-green-300">WPM</h2>
          <p className="text-4xl font-bold text-green-800 dark:text-green-200">
            {Math.round(attempt.wpm)}
          </p>
        </div>
        <div className="rounded-xl bg-cerulean-200 p-6 shadow-lg dark:bg-cerulean-800">
          <h2 className="mb-1 text-sm font-medium text-cerulean-700 dark:text-cerulean-300">
            Accuracy
          </h2>
          <p className="text-4xl font-bold text-cerulean-800 dark:text-cerulean-200">
            {attempt.accuracy.toFixed(0)}%
          </p>
        </div>
        <div className="rounded-xl bg-amber-200 p-6 shadow-lg dark:bg-amber-800">
          <h2 className="mb-1 text-sm font-medium text-amber-700 dark:text-amber-300">
            Finger Accuracy
          </h2>
          {attempt.cameraActivated ? (
            <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">
              {attempt.fingerAccuracy.toFixed(0)}%
            </p>
          ) : (
            <p className="text-4xl font-bold text-amber-800 dark:text-amber-200">N/A</p>
          )}
        </div>
      </div>

      {/* Finger Placement Analysis */}
      <FingerPlacementAnalysis attempt={attempt} />

      {/* Test Details */}
      <div className="rounded-xl bg-slate-50 p-6 shadow-lg dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
          Test Details
        </h2>
        <div className="grid grid-cols-1 gap-4 text-slate-700 md:grid-cols-2 dark:text-slate-300">
          <div>
            <p className="mb-2">
              <span className="font-medium">Duration:</span> {(attempt.duration / 1000).toFixed(1)}s
            </p>
            <p className="mb-2">
              <span className="font-medium">Mistakes:</span> {attempt.mistakes.length}
            </p>
            <p className="mb-2">
              <span className="font-medium">Date:</span> {formatDate(attempt.date)}
            </p>
          </div>
          <div>
            <p className="mb-2">
              <span className="font-medium">Author:</span> {attempt.test.author}
            </p>
            <p className="mb-2">
              <span className="font-medium">Difficulty:</span> {attempt.test.difficulty}
            </p>
            <p className="mb-2">
              <span className="font-medium">Word Count:</span> {attempt.test.wordCount}
            </p>
          </div>
        </div>
      </div>

      {/* Test Text */}
      <div className="rounded-xl bg-slate-50 p-6 shadow-lg dark:bg-slate-800">
        <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">Test Text</h2>
        <p className="leading-relaxed text-slate-700 dark:text-slate-300">
          {attempt.test.textBody}
        </p>
      </div>
    </div>
  );
}
