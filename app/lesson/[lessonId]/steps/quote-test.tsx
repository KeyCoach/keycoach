import { useLessonContext } from "../lesson-context";
import { BufferScreen } from "./buffer-screen";
import { useEffect, useState } from "react";
import { Mistake, Test, Word } from "@/app/lib/types";
import { useRouter } from "next/navigation";
import axios from "axios";
import TypingBox, { OnTestCompleteCallback } from "@/app/typing-box";
import { Button, LoadingPage } from "@/components";
import { CalculateStats } from "@/utils/calculate-stats";
import { useHandTracking } from "@/app/hand-track-context";

// app/lesson/[lessonId]/QuoteTest.tsx
export function QuoteTest({ testId }: { testId: string }) {
  const [test, setTest] = useState<Test | null>(null);
  const { currentStep, addStat } = useLessonContext();
  const [testCompleted, setTestCompleted] = useState(false);
  const router = useRouter();
  const { cameraActivated, setSettingUp } = useHandTracking();

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

  if (!test) {
    return <LoadingPage />;
  }

  const onTestComplete: OnTestCompleteCallback = (
    userInput: Word[],
    mistakes: Mistake[],
    testStart: number,
    testEnd: number,
  ) => {
    setTestCompleted(true);
    const stats = CalculateStats(test, userInput, mistakes, testEnd - testStart);
    addStat(currentStep.id, stats);
  };

  if (testCompleted) {
    return <BufferScreen />;
  }
  return (
    <div className="h-page flex items-center justify-center">
      {/* TODO: add boxes that have realtime wpm and acc */}
      {/* TODO: allow users to set up the camera  */}
      <div>
        <Button className="mb-3" onClick={() => setSettingUp(true)}>
          {cameraActivated ? "Recalibrate" : "Activate Camera"}
        </Button>
        <TypingBox test={test} onTestComplete={onTestComplete} />
      </div>
    </div>
  );
}
