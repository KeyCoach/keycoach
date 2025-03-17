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
import { LiveTestStats } from "@/app/typing/live-test-stats";

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
    <div className="h-page grid grid-cols-12 bg-white p-4 dark:bg-slate-950 relative">
      <div className="col-span-1"></div>
      <div className="col-span-10">
        {loading || !test || !testType ? (
          <LoadingPage />
        ) : (
          <div className="mt-12">
            {/* Using the TestTypeSelector component */}
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

        <div className="flex justify-end mt-6 gap-4">
          <Button onClick={() => setSettingUp((prev) => !prev)} className="w-fit">
            {cameraActivated ? "Recalibrate Camera" : "Set up Camera"}
          </Button>
          {cameraActivated && (
            <Button onClick={() => setFeedbackModalOpen(true)}>Interpret Feedback</Button>
          )}
        </div>
      </div>
      <div className="col-span-1"></div>

      {/* Using the LiveTestStats component */}
      <LiveTestStats
        netWpm={netWpm}
        accuracy={accuracy}
        fingerAccuracy={fingerAccuracy}
        cameraActivated={cameraActivated}
      />

      {/* Comment out but keeping for reference */}
      <FeedbackInterpretModal
        isOpen={feedbackModalOpen}
        onCloseAction={() => setFeedbackModalOpen(false)}
      />
    </div>
  );
}