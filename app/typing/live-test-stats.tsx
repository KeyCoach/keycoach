// components/live-test-stats.tsx
"use client";

interface LiveTestStatsProps {
    netWpm: number;
    accuracy: number;
    fingerAccuracy: number;
    cameraActivated: boolean;
}

export function LiveTestStats({
    netWpm,
    accuracy,
    fingerAccuracy,
    cameraActivated,
}: LiveTestStatsProps) {
    return (
        <div
            id="live-test-stats"
            className="absolute bottom-16 left-0 right-0 mb-18 flex justify-center"
        >
            <div className="flex justify-center">
                <div className="m-4 min-w-48 h-fit rounded-lg bg-green-200/70 p-4 text-center shadow-md dark:bg-green-900/60">
                    <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">WPM</h2>
                    <p className="text-2xl font-bold text-green-800 dark:text-green-200">
                        {netWpm.toFixed()}
                    </p>
                </div>
                <div className="m-4 min-w-48 h-fit rounded-lg bg-cerulean-200/70 p-4 text-center shadow-md dark:bg-cerulean-900/60">
                    <h2 className="text-lg font-semibold text-cerulean-700 dark:text-cerulean-300">
                        Accuracy
                    </h2>
                    <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-200">
                        {accuracy.toFixed()}%
                    </p>
                </div>

                <div className="m-4 min-w-48 h-fit rounded-lg bg-amber-200/70 p-4 text-center shadow-md dark:bg-amber-900/60">
                    <h2 className="text-lg font-semibold text-amber-700 dark:text-amber-200">
                        Finger Accuracy
                    </h2>
                    <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
                        {cameraActivated ? `${fingerAccuracy.toFixed()}%` : "N/A"}
                    </p>
                </div>
            </div>
        </div>
    );
}