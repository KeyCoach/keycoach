"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import TypingBox, { OnTestCompleteCallback } from "@/app/typing-box";
import { useParams, useRouter } from "next/navigation";
import { Letter, Mistake, Word, type Test } from "@/app/lib/types";
import axios from "axios";
import { Button, LoadingPage } from "@/components";
import { useHandTracking } from "@/app/hand-track-context";

export default function Test() {
  const router = useRouter();
  const { testId } = useParams();
  const [test, setTest] = useState<Test | null>(null);
  const { cameraActivated, setSettingUp } = useHandTracking();
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);

  useEffect(() => {
    console.log("fetching test");
    axios
      .get("/api/test", { params: { testId } })
      .then((res) => {
        setTest(res.data.test);
      })
      .catch((err) => {
        console.log(err);
        router.push("/404");
      });
  }, [testId, router]);

  const onTestComplete: OnTestCompleteCallback = (
    userInput: Word[],
    mistakes: Mistake[],
    testStart: number,
    testEnd: number,
  ) => {
    const correctChars = userInput.reduce((acc, word) => {
      return acc + word.inputs.filter((input) => input.status === Letter.Correct).length;
    }, 0);
    const body = {
      testId,
      correctChars,
      duration: testEnd - testStart,
      userInput,
      mistakes,
      cameraActivated,
    };
    axios.post("/api/attempt", body).then((res) => {
      router.push(`/typing/result/${res.data.attemptId}`);
    });
  };

  if (!test) {
    return <LoadingPage />;
  }

  return (
    <div className="h-page bg-white p-4 dark:bg-slate-950">
      <div className="flex items-center justify-between gap-4">
        <Button onClick={() => setSettingUp((prev) => !prev)}>
          {cameraActivated ? "Recalibrate Camera" : "Set up Camera"}
        </Button>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex-1 rounded-lg bg-green-200 p-4 text-center shadow-md dark:bg-green-800">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">WPM</h2>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">{wpm}</p>
          </div>
          <div className="flex-1 rounded-lg bg-cerulean-200 p-4 text-center shadow-md dark:bg-cerulean-800">
            <h2 className="text-lg font-semibold text-cerulean-700 dark:text-cerulean-300">
              Accuracy
            </h2>
            <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-200">
              {accuracy}%
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <TypingBox
          setWpm={setWpm}
          setAccuracy={setAccuracy}
          test={test}
          onTestComplete={onTestComplete}
        />
      </div>
    </div>
  );
}
