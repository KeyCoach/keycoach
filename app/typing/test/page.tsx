"use client";
import React, { useEffect } from "react";
import { useState } from "react";
import TypingBox, { OnTestCompleteCallback } from "@/app/typing-box";
import { useRouter } from "next/navigation";
import { TestType, ToTestType, type Test } from "@/app/lib/types";
import axios from "@/app/axios-client";
import { Button, H2, LoadingPage } from "@/components";
import { useHandTracking } from "@/app/hand-track-context";
import { FeedbackInterpretModal } from "@/components/feedback-interpret-modal";
import { GenerateTimedTest, GenerateWordsTest } from "@/utils/generate-random-test";
import { TestTypeSelector } from "@/app/typing/test-type-selector";

export default function Test() {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const { cameraActivated, setSettingUp } = useHandTracking();
  const [netWpm, setNetWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [fingerAccuracy, setFingerAccuracy] = useState(0);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [testType, setTestType] = useState<TestType | null>(null);
  const [wordCount, setWordCount] = useState(50);
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  // set Test parameters from local storage
  useEffect(() => {
    const storedTestType = localStorage.getItem("testType") ?? "Words";
    const storedWordCount = localStorage.getItem("wordCount") ?? "50";
    const storedDuration = localStorage.getItem("duration") ?? "30";
    if (storedTestType) setTestType(ToTestType(storedTestType));
    if (storedWordCount) setWordCount(parseInt(storedWordCount));
    if (storedDuration) setDuration(parseInt(storedDuration));
  }, []);

  useEffect(() => {
    if (test) {
      if (testType) localStorage.setItem("testType", testType);
      localStorage.setItem("wordCount", wordCount.toString());
      localStorage.setItem("duration", duration.toString());
    }
  }, [test, testType, wordCount, duration]);

  // set Test
  useEffect(() => {
    if (testType === "Quote") {
      setLoading(true);
      axios
        .get("/api/random-test")
        .then((res) => {
          setTest(res.data.test);
        })
        .catch((err) => {
          console.log(err);
          router.push("/404");
        })
        .finally(() => setLoading(false));
    } else if (testType === "Words") {
      GenerateWordsTest(wordCount).then((test) => setTest(test));
    } else if (testType === "Timed") {
      GenerateTimedTest(duration).then((test) => setTest(test));
    }
  }, [testType, router, duration, wordCount]);

  const onTestComplete: OnTestCompleteCallback = async (attemptId: string) => {
    router.push(`/typing/result/${attemptId}`);
  };

  return (
    <div className="h-page grid grid-cols-12 bg-white p-4 dark:bg-slate-950">
      <div className="col-span-1"></div>
      <div className="col-span-10">
        {loading || !test || !testType ? (
          <LoadingPage />
        ) : (
          <div className="mt-12">
            {/* Using the new TestTypeSelector component */}
            <TestTypeSelector
              testType={testType}
              setTestType={setTestType}
              wordCount={wordCount}
              setWordCount={setWordCount}
              duration={duration}
              setDuration={setDuration}
            />

            <div className="mt-6 flex justify-center">
              <TypingBox
                setNetWpm={setNetWpm}
                setAccuracy={setAccuracy}
                test={test}
                onTestComplete={onTestComplete}
                duration={duration}
                testType={testType}
                setFingerAccuracy={setFingerAccuracy}
              />
            </div>
          </div>
        )}

        <div className="flex justify-end">
          <Button onClick={() => setSettingUp((prev) => !prev)} className="w-fit">
            {cameraActivated ? "Recalibrate Camera" : "Set up Camera"}
          </Button>
        </div>

        <div className="col-span-2">
          <div className="m-4 h-fit rounded-lg bg-green-200 p-4 text-center shadow-md dark:bg-green-800">
            <h2 className="text-lg font-semibold text-green-700 dark:text-green-300">WPM</h2>
            <p className="text-2xl font-bold text-green-800 dark:text-green-200">
              {netWpm.toFixed()}
            </p>
          </div>
          <div className="m-4 h-fit rounded-lg bg-cerulean-200 p-4 text-center shadow-md dark:bg-cerulean-800">
            <h2 className="text-lg font-semibold text-cerulean-700 dark:text-cerulean-300">
              Accuracy
            </h2>
            <p className="text-2xl font-bold text-cerulean-800 dark:text-cerulean-200">
              {accuracy.toFixed()}%
            </p>
          </div>

          <div className="m-4 h-fit rounded-lg bg-amber-200 p-4 text-center shadow-md dark:bg-amber-800">
            <h2 className="text-lg font-semibold text-amber-700 dark:text-amber-200">
              Finger Accuracy
            </h2>
            <p className="text-2xl font-bold text-amber-800 dark:text-amber-200">
              {cameraActivated ? `${fingerAccuracy.toFixed()}%` : "N/A"}
            </p>
          </div>
        </div>
      </div>
      <div className="col-span-1"></div>

      {/* Comment out but keeping for reference */}
      {/*
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
      </div>
      */}
    </div>
  );
}