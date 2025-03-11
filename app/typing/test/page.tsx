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
import { Hourglass, Quote } from "react-bootstrap-icons";

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
      <div className="col-span-2">
        <div className="mx-4 px-4 pt-4">
          <Button onClick={() => setSettingUp((prev) => !prev)} className="w-full">
            {cameraActivated ? "Recalibrate Camera" : "Set up Camera"}
          </Button>
        </div>
        <div className="m-8 h-fit rounded-lg shadow-md p-6">
          <H2 className="">Color Key</H2>
          <hr className="my-3" />
          <div className="text-xl text-amber-800 dark:text-amber-200">
            <div className="text-slate-900 dark:text-slate-50">- Correct, Good Job! </div>
            <div className="text-red-500 underline decoration-red-400 dark:text-red-400">
              - Incorrect Letter
            </div>
            <div className="text-yellow-600 underline decoration-red-400 dark:text-yellow-400">
              - Wrong Finger Used
            </div>
            <div className="text-slate-400 underline decoration-red-400">- Missing Letter</div>
          </div>
        </div>
      </div>
      <div className="col-span-8">
        {loading || !test || !testType ? (
          <LoadingPage />
        ) : (
          <div className="mt-12">
            <div className="flex justify-center">
              <div>
                <div className="flex rounded-lg bg-slate-100 px-12 py-2 dark:bg-slate-900">
                  <div
                    className={`mx-2 flex cursor-pointer items-center ${testType === TestType.Timed ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                    onClick={() => setTestType(TestType.Timed)}
                  >
                    <div className="inline-block pe-1">
                      <Hourglass />
                    </div>
                    Time
                  </div>
                  <div
                    className={`mx-2 flex cursor-pointer items-center ${testType === TestType.Words ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                    onClick={() => setTestType(TestType.Words)}
                  >
                    <span className="pe-2 font-serif">A</span>
                    Words
                  </div>
                  <div
                    className={`mx-2 flex cursor-pointer items-center ${testType === TestType.Quote ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                    onClick={() => setTestType(TestType.Quote)}
                  >
                    <div className="inline-block pe-1 pt-[0.1rem]">
                      <Quote />
                    </div>
                    Quote
                  </div>
                  {testType !== TestType.Quote && (
                    <div className="ms-2 flex items-center text-lg leading-none">|</div>
                  )}

                  <div
                    className={`${testType !== TestType.Quote ? "ms-4" : ""} flex items-center gap-x-6 overflow-hidden leading-none`}
                    style={{
                      width: testType === TestType.Words ? "14rem" : "0",
                      transition: "width 0.5s",
                    }}
                  >
                    <div
                      className={`cursor-pointer ${wordCount === 10 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setWordCount(10)}
                    >
                      10
                    </div>
                    <div
                      className={`cursor-pointer ${wordCount === 25 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setWordCount(25)}
                    >
                      25
                    </div>
                    <div
                      className={`cursor-pointer ${wordCount === 50 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setWordCount(50)}
                    >
                      50
                    </div>
                    <div
                      className={`cursor-pointer ${wordCount === 100 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setWordCount(100)}
                    >
                      100
                    </div>
                    <div>words</div>
                  </div>

                  <div
                    className="flex items-center gap-x-6 overflow-hidden leading-none"
                    style={{
                      width: testType === TestType.Timed ? "15rem" : "0",
                      transition: "width 0.5s",
                    }}
                  >
                    <div
                      className={`cursor-pointer ${duration === 15 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setDuration(15)}
                    >
                      15
                    </div>
                    <div
                      className={`cursor-pointer ${duration === 30 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setDuration(30)}
                    >
                      30
                    </div>
                    <div
                      className={`cursor-pointer ${duration === 60 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setDuration(60)}
                    >
                      60
                    </div>
                    <div
                      className={`cursor-pointer ${duration === 120 ? "text-orange-600 dark:text-yellow-400" : "text-slate-400 hover:text-slate-900 dark:text-slate-500 dark:hover:text-slate-50"}`}
                      onClick={() => setDuration(120)}
                    >
                      120
                    </div>
                    <div>seconds</div>
                  </div>
                </div>
              </div>
            </div>
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
  );
}

/**
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
*/
