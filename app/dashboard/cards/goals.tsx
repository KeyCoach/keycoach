"use client";
import { useUser } from "@/app/user-context";
import { Button, LoadingSpinner, TextInput } from "@/components";
import axios from "axios";
import { useState } from "react";

export default function GoalsCard({ avgSpeed }: { avgSpeed: number }) {
  const [wpmGoalLoading, setWpmGoalLoading] = useState(false);
  const [edittingWpmGoal, setEdittingWpmGoal] = useState(false);
  const { setUser, user } = useUser();

  if (!user) {
    return null;
  }

  async function SetWpmGoal(e: any) {
    e.preventDefault();
    const formData = new FormData(e.target);

    const body = {
      wpmGoal: formData.get("wpm-goal"),
    };
    setWpmGoalLoading(true);

    axios
      .patch("/api/user/wpm-goal", body)
      .then((res) => {
        setUser(res.data.user);
      })
      .finally(() => {
        setWpmGoalLoading(false);
        setEdittingWpmGoal(false);
      });
  }

  let component = null;

  if (wpmGoalLoading) {
    component = <LoadingSpinner />;
  } else if (!user.wpmGoal || edittingWpmGoal) {
    component = <GoalUpdateForm setEdittingWpmGoal={setEdittingWpmGoal} SetWpmGoal={SetWpmGoal} />;
  } else if (user.wpmGoal > avgSpeed) {
    component = (
      <GoalProgress
        setEdittingWpmGoal={setEdittingWpmGoal}
        wpmGoal={user.wpmGoal}
        avgSpeed={avgSpeed}
      />
    );
  } else {
    component = (
      <GoalExceeded
        setEdittingWpmGoal={setEdittingWpmGoal}
        wpmGoal={user.wpmGoal}
        avgSpeed={avgSpeed}
      />
    );
  }

  return (
    <div className="rounded-xl bg-slate-50 p-6 shadow dark:bg-slate-800">
      <h2 className="mb-4 text-xl font-semibold text-slate-900 dark:text-slate-50">
        Practice Goal
      </h2>
      <div className="py-4 text-center">{component}</div>
    </div>
  );
}

function GoalUpdateForm({
  setEdittingWpmGoal,
  SetWpmGoal,
}: {
  setEdittingWpmGoal: (value: boolean) => void;
  SetWpmGoal: (e: any) => void;
}) {
  return (
    <div className="relative">
      <div className="absolute right-0 top-0" onClick={() => setEdittingWpmGoal(false)}>
        <div className="cursor-pointer text-sm text-cerulean-600 hover:underline dark:text-cerulean-400">
          Cancel
        </div>
      </div>
      <form onSubmit={SetWpmGoal}>
        <TextInput label="Set a WPM goal" type="number" name="wpm-goal" required />
        <Button colorTheme="cerulean" className="mt-4 w-full">
          Set Goal
        </Button>
      </form>
    </div>
  );
}

function GoalProgress({
  setEdittingWpmGoal,
  wpmGoal,
  avgSpeed,
}: {
  setEdittingWpmGoal: (value: boolean) => void;
  wpmGoal: number;
  avgSpeed: number;
}) {
  return (
    <div className="relative">
      <div
        className="absolute right-0 top-0 cursor-pointer"
        onClick={() => setEdittingWpmGoal(true)}
      >
        <div className="cursor-pointer text-sm text-cerulean-600 hover:underline dark:text-cerulean-400">
          Edit goal
        </div>
      </div>
      <p className="mb-2 text-slate-700 dark:text-slate-300">WPM Goal</p>
      <div className="mb-2 text-5xl font-bold text-cerulean-600 dark:text-cerulean-400">
        {wpmGoal} <span className="text-sm font-normal">WPM</span>
      </div>
      <p className="text-sm text-slate-500 dark:text-slate-400">
        You're currently at {avgSpeed.toFixed()} WPM
      </p>
      <div className="mt-4 h-2 w-full rounded-full bg-slate-200 dark:bg-slate-700">
        <div
          className="h-2 rounded-full bg-cerulean-500"
          style={{
            width: `${Math.min(100, (avgSpeed / wpmGoal) * 100)}%`,
          }}
        ></div>
      </div>
    </div>
  );
}

function GoalExceeded({
  setEdittingWpmGoal,
  wpmGoal,
  avgSpeed,
}: {
  setEdittingWpmGoal: (value: boolean) => void;
  wpmGoal: number;
  avgSpeed: number;
}) {
  return (
    <div className="relative">
      <div
        className="absolute right-0 top-0 cursor-pointer"
        onClick={() => setEdittingWpmGoal(true)}
      >
        <div className="cursor-pointer text-sm text-cerulean-600 hover:underline dark:text-cerulean-400">
          Edit goal
        </div>
      </div>
      <p className="mb-2 text-slate-700 dark:text-slate-300">WPM Goal</p>
      <div className="mb-2 text-5xl font-bold text-cerulean-600 dark:text-cerulean-400">
        Congrats!
        <div className="mt-3 text-lg font-normal">You've exceeded your goal!</div>
        <div className="text-2xl font-normal">
          {avgSpeed.toFixed()} / {wpmGoal} WPM
        </div>
      </div>
    </div>
  );
}
