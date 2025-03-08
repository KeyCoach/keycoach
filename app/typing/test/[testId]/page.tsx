"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import TypingBox, { OnTestCompleteCallback } from "@/app/typing-box";
import { useParams, useRouter } from "next/navigation";
import { Mistake, Word, type Test } from "@/app/lib/types";
import axios from "axios";
import { Button, LoadingPage } from "@/components";
import { useHandTracking } from "@/app/hand-track-context";
import { FeedbackInterpretModal } from "@/components/feedback-interpret-modal";

export default function Test() {
  const router = useRouter();
  const { testId } = useParams();
  const [test, setTest] = useState<Test | null>(null);
  const { cameraActivated, setSettingUp } = useHandTracking();
  const [netWpm, setNetWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);

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
    attemptId: string,
    _userInput: Word[],
    _mistakes: Mistake[],
    _testStart: number,
    _testEnd: number,
  ) => {
    router.push(`/typing/result/${attemptId}`);
  };

  if (!test) {
    return <LoadingPage />;
  }

  return (
    <div className="h-page bg-white p-4 dark:bg-slate-950">
      <FeedbackInterpretModal
        isOpen={feedbackModalOpen}
        onCloseAction={() => setFeedbackModalOpen(false)}
      />
      <div className="flex items-center justify-between gap-4">
        <div className="flex gap-4">
          <Button onClick={() => setSettingUp((prev) => !prev)}>
            {cameraActivated ? "Recalibrate Camera" : "Set up Camera"}
          </Button>
          {cameraActivated && (
            <Button onClick={() => setFeedbackModalOpen(true)}>Interpret Feedback</Button>
          )}
        </div>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          <div className="flex-1 rounded-lg bg-green-200 p-4 text-center shadow-md dark:bg-green-800">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">WPM</h2>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">
              {netWpm.toFixed()}
            </p>
          </div>
          <div className="flex-1 rounded-lg bg-cerulean-200 p-4 text-center shadow-md dark:bg-cerulean-800">
            <h2 className="text-lg font-semibold text-cerulean-700 dark:text-cerulean-300">
              Accuracy
            </h2>
            <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-200">
              {accuracy.toFixed()}%
            </p>
          </div>
        </div>
      </div>
      <div className="mt-6 flex justify-center">
        <TypingBox
          setNetWpm={setNetWpm}
          setAccuracy={setAccuracy}
          test={test}
          onTestComplete={onTestComplete}
        />
      </div>
    </div>
  );
}
