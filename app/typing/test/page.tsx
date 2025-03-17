"use client";
import React, { useEffect, useState, useRef } from "react";
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

// TODO: Move this to a separate file
// Custom hook for safely using localStorage
function useLocalStorage<T>(key: string, initialValue: T): [T, (value: T) => void] {
  const [storedValue, setStoredValue] = useState<T>(initialValue);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      try {
        const item = localStorage.getItem(key);
        setStoredValue(item ? JSON.parse(item) : initialValue);
      } catch (error) {
        console.error(`Error reading localStorage key "${key}":`, error);
        setStoredValue(initialValue);
      }
    }
  }, [key, initialValue]);

  const setValue = (value: T) => {
    try {
      setStoredValue(value);
      if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
      }
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  };

  return [storedValue, setValue];
}

export default function Test() {
  const router = useRouter();
  const [test, setTest] = useState<Test | null>(null);
  const { cameraActivated, setSettingUp, settingUp } = useHandTracking();
  const [netWpm, setNetWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [fingerAccuracy, setFingerAccuracy] = useState(0);
  const [feedbackModalOpen, setFeedbackModalOpen] = useState(false);
  const [testType, setTestType] = useState<TestType | null>(null);
  const [wordCount, setWordCount] = useState(50);
  const [duration, setDuration] = useState(30);
  const [loading, setLoading] = useState(false);

  const [hasShownFeedbackModal, setHasShownFeedbackModal] = useLocalStorage<boolean>("hasShownFeedbackModal", false);
  const previousSettingUpRef = useRef(settingUp);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const storedTestType = localStorage.getItem("testType") ?? "Words";
      const storedWordCount = localStorage.getItem("wordCount") ?? "50";
      const storedDuration = localStorage.getItem("duration") ?? "30";
      if (storedTestType) setTestType(ToTestType(storedTestType));
      if (storedWordCount) setWordCount(parseInt(storedWordCount));
      if (storedDuration) setDuration(parseInt(storedDuration));
    }
  }, []);

  useEffect(() => {
    if (test && typeof window !== 'undefined') {
      if (testType) localStorage.setItem("testType", testType);
      localStorage.setItem("wordCount", wordCount.toString());
      localStorage.setItem("duration", duration.toString());
    }
  }, [test, testType, wordCount, duration]);

  useEffect(() => {
    if (previousSettingUpRef.current && !settingUp && cameraActivated && !hasShownFeedbackModal) {
      setFeedbackModalOpen(true);
      setHasShownFeedbackModal(true);
    }
    previousSettingUpRef.current = settingUp;
  }, [settingUp, cameraActivated, hasShownFeedbackModal, setHasShownFeedbackModal]);

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

      {/* Feedback modal that will automatically show after first camera setup */}
      <FeedbackInterpretModal
        isOpen={feedbackModalOpen}
        onCloseAction={() => setFeedbackModalOpen(false)}
      />
    </div>
  );
}