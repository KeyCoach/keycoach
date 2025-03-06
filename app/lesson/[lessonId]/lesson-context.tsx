"use client";
import { LessonContextType, LessonStats, Stat } from "@/app/lib/types";
import { createContext, useContext, useState } from "react";
import { lessonPlans } from "../lesson-plans";
import { useHandTracking } from "@/app/hand-track-context";

const LessonContext = createContext({});
export function useLessonContext() {
  const context = useContext(LessonContext);
  if (!context) {
    throw new Error("useLessonContext must be used within a LessonContextProvider");
  }
  return context as LessonContextType;
}

export function LessonContextProvider({
  children,
  lessonId,
}: {
  children: React.ReactNode;
  lessonId: string;
}) {
  const { cameraActivated } = useHandTracking();
  const [currentStepIndex, setLessonStep] = useState(0);
  const [stats, setStats] = useState<LessonStats>({});
  const lessonPlan = lessonPlans[lessonId];
  const currentStep = lessonPlans[lessonId].steps[currentStepIndex];
  function handleNextStep() {
    setLessonStep(currentStepIndex + 1);
  }
  function handlePreviousStep() {
    setLessonStep(currentStepIndex - 1);
  }
  function goToStep(step: number) {
    setLessonStep(step);
  }
  function addStat(stepId: string, newStats: Stat) {
    setStats((prevStats) => ({
      ...prevStats,
      [stepId]: { ...newStats, cameraActivated },
    }));
  }
  function resetStats() {
    setStats({});
  }
  const wpm = stats[currentStep.id]?.wpm ?? 0;
  const acc = stats[currentStep.id]?.accuracy ?? 0;
  const fingerAcc = stats[currentStep.id]?.fingerAccuracy ?? 0;

  const statsArr = Object.values(stats);

  const avgWpm = statsArr.reduce((acc, curr) => acc + curr.wpm, 0) / statsArr.length;
  const avgAcc = statsArr.reduce((acc, curr) => acc + curr.accuracy, 0) / statsArr.length;
  const avgFingerAcc =
    statsArr.reduce((acc, curr) => acc + curr.fingerAccuracy, 0) / statsArr.length;

  const data: LessonContextType = {
    lessonPlan,
    lessonId,
    currentStep,
    currentStepIndex,
    handleNextStep,
    handlePreviousStep,
    addStat,
    resetStats,
    stats,
    goToStep,
    wpm,
    acc,
    fingerAcc,
    avgWpm,
    avgAcc,
    avgFingerAcc,
  };

  return <LessonContext.Provider value={data}>{children}</LessonContext.Provider>;
}
